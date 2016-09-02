package bjhit.storm;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import backtype.storm.tuple.Tuple;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

public class diskUsed extends associatedData{
	String SEPARATOR = "#$#";
	public diskUsed(String gatherid){
		this.calculateInNeed = 0;
		this.scn_id = gatherid;
		this.calculateAccesible = 0;
		
	}
	@Override
	public String[] getcalData() {
		// TODO Auto-generated method stub
		BigDecimal memtotalused = new BigDecimal(0);
		//Map<String, HashMap<String,String>> rr = new Gson().fromJson(this.value,new TypeToken<Map<String, HashMap<String,String>>>() {}.getType());
		Map<String, String> rrtmp = new Gson().fromJson(this.value,new TypeToken<Map<String, String>>() {}.getType());
		Map<String, HashMap<String,String>> rr = ForMateToJson.toNormalFormate(rrtmp);
		for (Entry<String, HashMap<String,String>> entry : rr.entrySet()) {
			 if(entry.getValue().get("1.3.6.1.2.1.25.2.3.1.2."+entry.getKey()).equals("1.3.6.1.2.1.25.2.1.4")){
				 this.caloidvalue.set(this.caldoid.indexOf("1.3.6.1.2.1.25.2.3.1.4"), entry.getValue().get("1.3.6.1.2.1.25.2.3.1.4."+entry.getKey()));
				 this.caloidvalue.set(this.caldoid.indexOf("1.3.6.1.2.1.25.2.3.1.6"), entry.getValue().get("1.3.6.1.2.1.25.2.3.1.5."+entry.getKey()));
				 //float mem = Integer.valueOf((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.25.2.3.1.4")))*Integer.valueOf((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.25.2.3.1.6")))/1024/1024;
				 BigDecimal mi = new BigDecimal((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.25.2.3.1.4")));
				 BigDecimal mj = new BigDecimal((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.25.2.3.1.6")));
				 BigDecimal mk = new BigDecimal(1024);
				 BigDecimal memused = (mi.multiply(mj)).divide(mk, 4, RoundingMode.HALF_DOWN).divide(mk, 2, RoundingMode.HALF_DOWN);
				 memtotalused = memtotalused.add(memused);
				 
			 }
		 }
		 this.calValue = String.valueOf(memtotalused);
		 //
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
