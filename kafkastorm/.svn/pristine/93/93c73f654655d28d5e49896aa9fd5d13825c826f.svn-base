package bjhit.storm;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import backtype.storm.tuple.Tuple;

public class sendRcvErrorPP extends associatedData{
	//private ArrayList<String> caldoid = new ArrayList<String>();
	String SEPARATOR = "#$#";
	public sendRcvErrorPP(String gatherid){
		this.calculateInNeed = 0;
		this.scn_id = gatherid;
		this.calculateAccesible = 0;
		this.Batch = -1;
	}
	@Override
	public String[] getcalData() {
		// TODO Auto-generated method stub
		if(this.calculateAccesible == this.calculateInNeed){
			for(int i = 0;i<this.caldoid.size();i++)
				if(!this.caloidvalue.get(i).matches("[0-9]+"))
				{
					this.Batch = -1;
					this.calculateAccesible = 0;
					return null;
				}
			//compute formular
			BigDecimal mi = new BigDecimal(this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.6.11")));
			BigDecimal mj = new BigDecimal(this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.6.10")));
			BigDecimal mk = mi.subtract(mj).divide(mi, 2,RoundingMode.HALF_DOWN);
			this.calValue = String.valueOf(mk);
			
			
			//·µ»Øsql
			Date date=new Date();  
		     SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
		     //this.gtime = formatter.format(date);
		     String now = formatter.format(date);
			 String[] rett = new String[2];
			 rett[0] = this.Batch+SEPARATOR+this.bTime+SEPARATOR+this.IP+SEPARATOR+this.scn_id+SEPARATOR+this.calValue+SEPARATOR+now;
			 rett[1] = String.valueOf(this.Batch)+SEPARATOR+this.bTime+SEPARATOR+
					 this.IP+SEPARATOR+this.scn_id+SEPARATOR+this.scn_id+SEPARATOR+
					 this.calValue+SEPARATOR+now;
			 //STDIO
			 
			 //reset
			 this.Batch = -1;
			 this.calculateAccesible = 0;
			 return rett;
			//
		}else{
		return null;
		}
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
		//this.oid = 
	}
	@Override
	public void setValue(String value) {
		// TODO Auto-generated method stub
		this.value = value;
		this.calculateAccesible += 1;
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
	
	public void setOidandValue(String oid,String value) {
		// TODO Auto-generated method stub
		this.caloidvalue.set(this.caldoid.indexOf(oid), value);
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
		int batchtmp = Integer.valueOf(batch);
		// the batch number is bigger that means the newer data
		if(batchtmp>this.Batch){
			this.calculateAccesible = 0;
			this.setBatch(batch);
			this.setBatchTime(batchTime);
			this.setIP(ip);
			//this.setGatherID(gid);
			this.setValue(value);
			this.setOid(oid);
			this.setOidandValue(oid, value);
			this.setGatherTime(gathertime);
		}else if(batchtmp == this.Batch){
			this.setValue(value);
			this.setOidandValue(oid, value);
		}
	}
}
