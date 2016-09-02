package bjhit.storm;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeMap;

import backtype.storm.tuple.Tuple;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class cpuUsedPercent extends associatedData{
	String SEPARATOR = "#$#";

	//���캯���У����ڱ�����������ֻ��Ҫһ�������е�һ��json���Ϳɼ��㣬��calculateInNeed��calculateAccesible����Ҫ
	public cpuUsedPercent(String gatherid){
		this.calculateInNeed = 0;
		this.scn_id = gatherid;
		this.calculateAccesible = 0;
		
	}
	@Override
	public String[] getcalData() {
		// TODO Auto-generated method stub

		int i = 0;
		BigDecimal subsummary = new BigDecimal(0);
        //��json��ת��Ϊmap
		Map<String, String> rrtmp = new Gson().fromJson(this.value,new TypeToken<Map<String, String>>() {}.getType());
		Map<String, HashMap<String,String>> rr = ForMateToJson.toNormalFormate(rrtmp);
		//��caloidvalue��ֵ��������ۼ�
		for (Entry<String, HashMap<String,String>> entry : rr.entrySet()) {
			 i++;
			 this.caloidvalue.set(this.caldoid.indexOf("1.3.6.1.2.1.25.3.3.1.2"), entry.getValue().get("1.3.6.1.2.1.25.3.3.1.2."+entry.getKey()));
			 BigDecimal mi = new BigDecimal((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.25.3.3.1.2")));
			 subsummary = subsummary.add(mi);
				 
		 }
		 BigDecimal corecount = new BigDecimal(i);
		 BigDecimal count = new BigDecimal(100);
		 //����
		 BigDecimal pp = subsummary.divide(corecount, 4, RoundingMode.HALF_DOWN).divide(count, 2, RoundingMode.HALF_DOWN);
		 this.calValue = String.valueOf(pp);
		 //��֯���ݣ���storm�з���storeDB��regularMatchBolt
		 Date date=new Date();  
	     SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
	     //this.gtime = formatter.format(date);
	     String now = formatter.format(date);
		 String[] rett = new String[2];
		 rett[0] = this.Batch+SEPARATOR+this.bTime+SEPARATOR+this.IP+SEPARATOR+this.scn_id+SEPARATOR+this.calValue+SEPARATOR+now;
		 rett[1] = String.valueOf(this.Batch)+SEPARATOR+this.bTime+SEPARATOR+
				 this.IP+SEPARATOR+this.scn_id+SEPARATOR+this.scn_id+SEPARATOR+
				 this.calValue+SEPARATOR+now;
		 return rett;
		 
		
	}
	
	@Override
	public void getcalTuple(Tuple tt) {
		// TODO Auto-generated method stub
		this.tup = tt;
		
	}
	@Override
	public void setBatch(String batch) {
		// TODO Auto-generated method stub
		this.Batch = Integer.valueOf(batch);
		
	}
	@Override
	public void setBatchTime(String batchtime) {
		// TODO Auto-generated method stub
		this.bTime = batchtime;
	}
	@Override
	public void setIP(String ip) {
		// TODO Auto-generated method stub
		this.IP = ip;
		
	}
	@Override
	public void setGatherID(String id) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void setOid(String oid) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void setValue(String value) {
		// TODO Auto-generated method stub
		this.value = value;
	}
	@Override
	public void setGatherTime(String gathertime) {
		// TODO Auto-generated method stub
		this.gtime = gathertime;
	}
	//���ü��㵱ǰ��������������Ҫ�ļ������
	//ͬʱ������caloidvalue��ԭ����Ϊ�˱��ּ�������ͼ������ֵ�洢�ṹ��һ�£�λ�õȣ�
	//�����ڸ�caloidvalue��ֵʱ���ɸ���oid�ҵ���ֵ��caloidvalue�е�λ�ã�ʹ��set���и�ֵ
	@Override
	public void setOidList(String childoid) {
		// TODO Auto-generated method stub
		this.caldoid.add(childoid);
		this.caloidvalue.add(childoid);
	}
	@Override
	public void setOidInNeed() {
		// TODO Auto-generated method stub
		this.calculateInNeed += 1;
	}
	//���ݵ�ǰ�������ø��ϼ�����
	@Override
	public void setData(String batch, String batchTime, String ip, String gid,
			String oid, String value, String gathertime) {
		// TODO Auto-generated method stub
		this.setBatch(batch);
		this.setBatchTime(batchTime);
		this.setIP(ip);
		this.setGatherID(gid);
		this.setOid(oid);
		this.setValue(value);
		this.setGatherTime(gathertime);
	}
}
