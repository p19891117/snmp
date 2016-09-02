package com.bjhit.provider.bean;

import java.io.IOException;
import java.util.List;

import kafka.producer.KeyedMessage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.snmp4j.CommunityTarget;
import org.snmp4j.PDU;
import org.snmp4j.Snmp;
import org.snmp4j.event.ResponseEvent;
import org.snmp4j.smi.Counter64;
import org.snmp4j.smi.Gauge32;
import org.snmp4j.smi.GenericAddress;
import org.snmp4j.smi.Integer32;
import org.snmp4j.smi.IpAddress;
import org.snmp4j.smi.OID;
import org.snmp4j.smi.OctetString;
import org.snmp4j.smi.TimeTicks;
import org.snmp4j.smi.Variable;
import org.snmp4j.smi.VariableBinding;

import com.bjhit.database.ProviderDao;
import com.bjhit.database.ProviderFactoryDao;
import com.bjhit.provider.util.ProviderUtil;
import com.bjhit.provider.util.ReadFile;

public class SNMPSetTaskBean implements Runnable {
	private static Log logger = LogFactory.getLog(SNMPSetTaskBean.class);
	private static final ProviderDao dao = ProviderFactoryDao.newInstance().getDao();
	private String ip;
	private List<String> oids;
	private CommunityTarget target ;
	private String task;
	public SNMPSetTaskBean(String ip, List<String> oids,String task){
		this.target = new CommunityTarget(GenericAddress.parse("udp:" + ip + "/"+ ReadFile.SNMP_PORT), new OctetString(ReadFile.SNMP_COMMUNITY));
		this.target.setVersion(ReadFile.SNMP_VERSION);
		this.target.setTimeout(ReadFile.SNMP_COMMUNITYTARGET_TIMEOUT);
		this.target.setMaxSizeRequestPDU(ReadFile.SNMP_COMMUNITYTARGET_MAXSIZERESPONSEPDU);
		this.target.setRetries(ReadFile.SNMP_COMMUNITYTARGET_RETRIES);
		this.ip = ip;
		this.oids = oids;
		this.task = task;
	}
	private Variable checkOIDType(String complixyOID[]){
		//oid+"#"+value+"#"+type
		Variable v = null;
		String value = complixyOID[1].trim();
		String value_type = complixyOID[2].trim();
		if("COUNTER".equals(value_type)){
			v = new Counter64(Long.parseLong(value));
		}else if("GAUGE".equals(value_type)){
			v = new Gauge32(Long.parseLong(value));
		}else if("INTEGER".equals(value_type)){
			v = new Integer32(Integer.parseInt(value));
		}else if("IPADDRESS".equals(value_type)){
			v = new IpAddress(value);
		}else if("OCTET-STRING".equals(value_type)){
			v = new OctetString(value);
		}else if("OID".equals(value_type)){
			v = new OID(value);
		}else if("TIMETICKS".equals(value_type)){
			v = new TimeTicks(Long.parseLong(value));
		}else{
			throw new RuntimeException("type don't exit");
		}
		return v;
	}
	@Override
	public void run() {
		one();
	}
	public void many() {
		String tasks[] = this.task.split("\\,");
		System.out.println("ip:"+this.ip+" oids:"+this.oids);
		Snmp snmp = ProviderUtil.snmp();
		PDU pdu = (PDU) ProviderUtil.pdu(PDU.SET);
		for(String oid:oids){
			try {
				String oids[] = oid.split("\\#");
				pdu.add(new VariableBinding(new OID(oids[0].trim()),checkOIDType(oids)));
			} catch (Exception e) {
				System.out.println("向PDU中存入一个oid出现错误，类型不匹配："+e.getMessage()+" ip:"+this.ip+" error_value_oid:"+oid);
				continue;
			}
		}
		if(pdu.size()>0){
			try {
				ResponseEvent resEvt = snmp.send(pdu, this.target);
				PDU response = resEvt.getResponse();
				if (response!=null&&response.getErrorStatus() == PDU.noError) {
					for(VariableBinding vb:response.getVariableBindings()){
						System.out.println("oid"+vb.getOid().toString()+"                      value"+vb.toValueString());
					}
					dao.addBackupInfo(ip,Integer.parseInt(tasks[0]),tasks[1],"SET success","3");//ip,task,info,type
				} else {
					dao.addBackupInfo(ip,Integer.parseInt(tasks[0]),tasks[1],"SET fail","3");
				}
				ProviderUtil.producer().send(new KeyedMessage<String,String>("recover",ip,"oid"+"#"+this.task));
			} catch (IOException e) {
				e.printStackTrace();
				ProviderUtil.producer().send(new KeyedMessage<String,String>("recover",ip,"oid"+"#"+this.task));
			}
		}
	}
	private void one() {
		String tasks[] = this.task.split("\\,");
		Snmp snmp = ProviderUtil.snmp();
		PDU pdu = (PDU) ProviderUtil.pdu(PDU.SET);
		String result = "";
		int suceessNUm = 0;
		int failNUm = 0;
		for(String oid:oids){
			//System.out.println("ip:"+this.ip+" oid:"+oid);
			try {
				String complixyoids[] = oid.split("\\#");
				pdu.add(new VariableBinding(new OID(complixyoids[0].trim()),checkOIDType(complixyoids)));
				ResponseEvent resEvt = snmp.send(pdu, this.target);
				PDU response = resEvt.getResponse();
				if(response!=null){
					if (response.getErrorStatus() == PDU.noError) {
						//success
						suceessNUm++;
						result = result+","+oid+":success";
					} 
					if(!(response.getErrorStatus() ==PDU.notWritable)){
						//没有写权
					}
					if(response.getErrorStatus()==PDU.noAccess){
						//错误含义：没有权进入
						result = result+","+complixyoids[0]+" :fail can't access";
						failNUm++;
					}
					if(response.getErrorIndex()==PDU.wrongType){
						//set时，类型输错
						result = result+","+complixyoids[0]+" :fail type error";
						failNUm++;
					}
					if(response.getErrorIndex()==PDU.wrongLength){
						//set的值太长
						result = result+","+complixyoids[0]+" :fail value to long";
						failNUm++;
					}
				}else{
					if(oids.size()<10){
						if(failNUm>=5){
							failNUm = (oids.size()-suceessNUm);
							break;
						}
					}else if(oids.size()<20){
						if(failNUm>=10){
							failNUm = (oids.size()-suceessNUm);
							break;
						}
					}else{
						if(failNUm>=10){
							failNUm = (oids.size()-suceessNUm);
							break;
						}
					}
					System.out.println(ip+"fail pdu null");
					result = result+","+complixyoids[0]+" :fail pdu null";
					failNUm++;
				}
				pdu.clear();
				pdu.setType(PDU.SET);
			} catch (IOException e) {
				e.printStackTrace();
				failNUm++;
				result = result+","+oid+":fail send error";
				continue;
			}
		}
		dao.addBackupInfo(ip,Integer.parseInt(tasks[0]),tasks[1],"成功OID:"+suceessNUm+";失败OID:"+failNUm,"3");//ip,task,info,type
		ProviderUtil.producer().send(new KeyedMessage<String,String>("recover",ip,"oid"+"#"+this.task));
		logger.info("oid不管恢复成功与失败，都发送了+1信号");
	}
}
