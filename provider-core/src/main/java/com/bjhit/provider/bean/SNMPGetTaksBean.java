package com.bjhit.provider.bean;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.snmp4j.CommunityTarget;
import org.snmp4j.PDU;
import org.snmp4j.Snmp;
import org.snmp4j.smi.GenericAddress;
import org.snmp4j.smi.Null;
import org.snmp4j.smi.OID;
import org.snmp4j.smi.OctetString;
import org.snmp4j.smi.VariableBinding;
import org.snmp4j.util.DefaultPDUFactory;
import org.snmp4j.util.TableEvent;
import org.snmp4j.util.TableUtils;

import com.bjhit.database.ProviderDao;
import com.bjhit.database.ProviderFactoryDao;
import com.bjhit.provider.util.ProviderUtil;
import com.bjhit.provider.util.ReadFile;
import com.google.gson.Gson;

public class SNMPGetTaksBean implements Runnable {
	public static final String FLAG = "2";
	public static final String HEADER = "gatherData";
	public static final String SPLIT_OID ="\\&";
	public static final String SYMBOL ="#$#";
	private static final ProviderDao dao = ProviderFactoryDao.newInstance().getDao();
	private static final Log logger = LogFactory.getLog(SNMPGetTaksBean.class);
	private CommunityTarget target;
	private String ip; 
	private List<String> oids; 
	private Long batch;
	private long batchTime; 
	private int taskNum;
	public SNMPGetTaksBean(String ip, List<String> oids, Long batch,long batchTime, int taskNum) {
		this.target = new CommunityTarget(GenericAddress.parse("udp:" + ip + "/"+ ReadFile.SNMP_PORT), new OctetString(ReadFile.SNMP_COMMUNITY));
		this.target.setVersion(ReadFile.SNMP_VERSION);
		this.target.setTimeout(ReadFile.SNMP_COMMUNITYTARGET_TIMEOUT);
		this.target.setMaxSizeRequestPDU(ReadFile.SNMP_COMMUNITYTARGET_MAXSIZERESPONSEPDU);
		this.target.setRetries(ReadFile.SNMP_COMMUNITYTARGET_RETRIES);
		this.ip = ip;
		this.oids = oids;
		this.batch = batch;
		this.batchTime = batchTime;
		this.taskNum = taskNum;
	}
	@Override
	public void run() {
		Snmp snmp = ProviderUtil.snmp();
		Gson gson = ProviderUtil.gson();
		Producer<String, String> producer = ProviderUtil.producer();
		PDU requestPDU = (PDU) ProviderUtil.pdu(PDU.GET);
		//oid formate:oid&dataType&id,id...;
		Iterator<String> ite = this.oids.iterator();
		while(ite.hasNext()){
			String[] oidcomplex = ite.next().split(SPLIT_OID);
			if(FLAG.equals(oidcomplex[1])){
				try{
					List<TableEvent> tableEvents = new TableUtils(snmp, new DefaultPDUFactory(PDU.GET)).getTable(target, new OID[]{new OID(oidcomplex[0])}, null, null);
					long gatherTime = System.currentTimeMillis();
					Map<String,String> oidValues = new HashMap<String,String>();
					if(tableEvents!=null&&tableEvents.size()>0){
						for(TableEvent tableEvent:tableEvents){
							if(tableEvent.getStatus()==TableEvent.STATUS_OK){
								VariableBinding[] vbs = tableEvent.getColumns();
								for(VariableBinding vb:vbs){
									//vb.toValueString()
									oidValues.put(vb.getOid().toString(),ProviderUtil.handle(vb.getVariable()));
								}
							}
						}
						dealResult(oidcomplex, gson.toJson(oidValues), gatherTime,producer);
					}else{
						dealResult(oidcomplex, "DATA NOT RETURN", gatherTime,producer);
					}
				}catch(Exception e){
					dealResult(oidcomplex, "DATA NOT RETURN", System.currentTimeMillis(),producer);
					logger.error("[reason$" + e.getMessage()+"][oid$"+oidcomplex[0]+"][taskNum$"+taskNum+"][ip$"+ip+"][batch$"+batch+"]Some table data may not be sent");
				}finally{
					ite.remove();
				}
			}else{
				requestPDU.add(new VariableBinding(new OID(oidcomplex[0]),Null.instance));
			}
		}
		//处理单oid
		if(requestPDU.size()>0){
			try {
				PDU response = snmp.send(requestPDU, target).getResponse();
				if(response!=null&&response.getErrorIndex()==PDU.noError&&response.getErrorStatus()==PDU.noError){
					Vector<? extends VariableBinding> vbs = response.getVariableBindings();
					long gatherTime = System.currentTimeMillis();
					for(VariableBinding vb:vbs){
						Iterator<String> itesub = this.oids.iterator();
						while(itesub.hasNext()){
							String tmpsub = itesub.next();
							if(tmpsub.contains((vb.getOid().toString()))){
								itesub.remove();
								dealResult(tmpsub.split(SPLIT_OID), ProviderUtil.handle(vb.getVariable()), gatherTime,producer);
							}
						}
					}
				}else{
					if(response==null){
						for(String oidcomplex:this.oids){
							dealResult(oidcomplex.split(SPLIT_OID), "DATA NOT RETURN", System.currentTimeMillis(),producer);
						}
						logger.error("[reason$can't connection server for "+ip+"][tasks$"+taskNum+"][batch$"+batch+"]Some singleoid data may not be sent");
					}
					if(response!=null){
						for(String oidcomplex:this.oids){
							dealResult(oidcomplex.split(SPLIT_OID), "DATA NOT RETURN", System.currentTimeMillis(),producer);
						}
						logger.error("[reason$"+response.getErrorStatusText()+"][tasks$"+taskNum+"][ip$"+ip+"][batch$"+batch+"]Some singleoid data may not be sent");
					}
				}
			}catch(Exception e) {
				logger.error("[reason$" + e.getMessage()+"][tasks$"+taskNum+"][ip$"+ip+"][batch$"+batch+"]Some singleoid data may not be sent");
			}
		}
	}
	
	private void dealResult( String[] oidcomplex,String oidValue, long gatherTime,Producer<String, String> producer) {
		//oid formate:oid&dataType&id,id...;
		if(oidValue.equals("DATA NOT RETURN")||oidValue.equals("NULL")||oidValue.equals("noSuchObject")||oidValue.equals("noSuchInstance")||oidValue==null||oidValue.equals("{}")){
			logger.error("无数据返回#batch$"+batch+" ip$"+ip+" oid$"+ oidcomplex[0]+" value$"+ oidValue+" batchTime$"+ batchTime+" gatherTime$"+ gatherTime+" taskNum$"+taskNum);
			//oidValue = "DATA NOT RETURN";
			dao.saveTest(batch, ip, oidcomplex[0], oidValue, new Timestamp(batchTime), new Timestamp(gatherTime),taskNum,new Timestamp(System.currentTimeMillis()+100));
			return;
		}
		if("true".equals(ReadFile.IS_TEST)){
			testDeamon(oidcomplex, oidValue, gatherTime);
		}
		//批次号#批次开始时间(时间戳)#ip#id_super#oid#采集内容#采集时间(时间戳) 
		producer.send(new KeyedMessage<String,String>(HEADER+taskNum,ip,batch+SYMBOL+batchTime+SYMBOL+ip+SYMBOL+
				oidcomplex[2]+SYMBOL+oidcomplex[0]+SYMBOL+oidValue+SYMBOL+gatherTime));
	}
	public void testDeamon(String[] oidcomplex, String oidValue,long gatherTime) {
		for(String gatherID:oidcomplex[2].split("\\,")){
			gatherID.split("");
			dao.saveTest(batch, ip, oidcomplex[0], oidValue, new Timestamp(batchTime), new Timestamp(gatherTime),taskNum,new Timestamp(System.currentTimeMillis()+100));
		}
	}
	
}
