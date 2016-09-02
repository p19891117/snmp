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

public class IfOutErrorP extends associatedData{
	String SEPARATOR = "#$#";
	public IfOutErrorP(String gatherid){
		this.calculateInNeed = 1;
		this.calculateInNeedNext = 2;
		this.scn_id = gatherid;
		this.calculateAccesible = 0;
		this.calculateAccesibleNext = 0;
		this.Batch = -1;
		this.BatchNext = -1;
		this.calValue = "-1";
	}
	@Override
	public String[] getcalData() {
		// TODO Auto-generated method stub
		String[] rett = null;
		
		if(this.calculateAccesibleNext == this.calculateInNeedNext){
			BigDecimal outError = new BigDecimal(0);
			BigDecimal outUnicast = new BigDecimal(0);
			BigDecimal outNUcast = new BigDecimal(0);
			BigDecimal outErrorNext = new BigDecimal(0);
			BigDecimal outUnicastNext = new BigDecimal(0);
			BigDecimal outNUcastNext = new BigDecimal(0);
			try{
				//Map<String, HashMap<String,String>> rr = new Gson().fromJson(this.value,new TypeToken<Map<String, HashMap<String,String>>>() {}.getType());
				//Map<String, HashMap<String,String>> rrNext = new Gson().fromJson(this.valueNext,new TypeToken<Map<String, HashMap<String,String>>>() {}.getType());
				
				Map<String, String> rrtmp1 = new Gson().fromJson(this.value,new TypeToken<Map<String, String>>() {}.getType());
				Map<String, HashMap<String,String>> rr = ForMateToJson.toNormalFormate(rrtmp1);
				
				Map<String, String> rrtmp = new Gson().fromJson(this.valueNext,new TypeToken<Map<String, String>>() {}.getType());
				Map<String, HashMap<String,String>> rrNext = ForMateToJson.toNormalFormate(rrtmp);
				
				//set and get value in need
				for (Entry<String, HashMap<String,String>> entry : rr.entrySet()) {
					//set value by the index of childoid in oidlist
					this.caloidvalue.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.20"), entry.getValue().get("1.3.6.1.2.1.2.2.1.20."+entry.getKey()));
					this.caloidvalue.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.18"), entry.getValue().get("1.3.6.1.2.1.2.2.1.18."+entry.getKey()));
					this.caloidvalue.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.17"), entry.getValue().get("1.3.6.1.2.1.2.2.1.17."+entry.getKey()));
					//prepare for the computing in the sequence of discards¡¢UniCast and BroadCast
					outError = outError.add(new BigDecimal((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.20"))));
					outUnicast = outUnicast.add(new BigDecimal((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.17"))));
					outNUcast = outNUcast.add(new BigDecimal((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.18"))));
					 
				}
				//next
				for (Entry<String, HashMap<String,String>> entry : rrNext.entrySet()) {
					//set value by the index of childoid in oidlist
					this.caloidvalueNext.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.20"), entry.getValue().get("1.3.6.1.2.1.2.2.1.20."+entry.getKey()));
					this.caloidvalueNext.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.18"), entry.getValue().get("1.3.6.1.2.1.2.2.1.18."+entry.getKey()));
					this.caloidvalueNext.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.17"), entry.getValue().get("1.3.6.1.2.1.2.2.1.17."+entry.getKey()));
					//prepare for the computing in the sequence of discards¡¢UniCast and BroadCast
					outErrorNext = outErrorNext.add(new BigDecimal((String)this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.20"))));
					outUnicastNext = outUnicastNext.add(new BigDecimal((String)this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.17"))));
					outNUcastNext = outNUcastNext.add(new BigDecimal((String)this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.18"))));
				 
				}
			 
				BigDecimal pp = outErrorNext.subtract(outError).divide((outUnicastNext.add(outNUcastNext).subtract(outNUcast).subtract(outUnicast)), 2, RoundingMode.HALF_DOWN);
				this.calValue = String.valueOf(pp);
			}catch(Exception e){
				System.out.println("IfOutErrorP "+e.toString());
				e.printStackTrace();
			}
			//
			System.out.println("IfOutErrorP");
			System.out.println("Ip is "+this.IP );
			System.out.println("Batch is "+this.Batch);
			System.out.println("BatchNext is "+this.BatchNext);
			System.out.println("Btime is "+this.bTime);
			System.out.println("BtimeNext is "+this.bTimeNext);
			//
			 if(this.Batch < this.BatchNext){
				 this.Batch = this.BatchNext;
				 this.bTime = this.bTimeNext;
				 this.value = this.valueNext;
				 //ÐÂÔö
				 this.gtime = this.gtimeNext;
			 }
			 //
			 Date date=new Date();  
		     SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");
		     //this.gtime = formatter.format(date);
		     String now = formatter.format(date);
			 rett = new String[2];
			 rett[0] = this.Batch+SEPARATOR+this.bTime+SEPARATOR+this.IP+SEPARATOR+this.scn_id+SEPARATOR+this.calValue+SEPARATOR+now;
			 rett[1] = String.valueOf(this.Batch)+SEPARATOR+this.bTime+SEPARATOR+
					 this.IP+SEPARATOR+this.scn_id+SEPARATOR+this.scn_id+SEPARATOR+
					 this.calValue+SEPARATOR+now;
			//STDIO
			 System.out.println("1.3.6.1.2.1.2.2.1.20 value is "+this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.20")));
			 System.out.println("1.3.6.1.2.1.2.2.1.18 value is "+this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.18")));
			 System.out.println("1.3.6.1.2.1.2.2.1.17 value is "+this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.17")));
			 System.out.println("1.3.6.1.2.1.2.2.1.20 value is "+this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.20")));
			 System.out.println("1.3.6.1.2.1.2.2.1.18 value is "+this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.18")));
			 System.out.println("1.3.6.1.2.1.2.2.1.17 value is "+this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.17")));			 
			 System.out.println("the value is "+this.value);
			 System.out.println("IfOutErrorP END");
			//reset
			this.calculateAccesibleNext = 1;
			this.calValue ="-1";
		}
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
		this.caloidvalueNext.add(childoid);
	}
	@Override
	public void setOidInNeed() {
		// TODO Auto-generated method stub
		//this.calculateInNeed += 1;
		//this.calculateInNeedNext += 2;
	}
	@Override
	public void setData(String batch, String batchTime, String ip, String gid,
			String oid, String value, String gathertime) {
		// TODO Auto-generated method stub
		int batchtmp = Integer.valueOf(batch);
		if(this.calculateAccesibleNext == 0){
			this.Batch = batchtmp;
			this.bTime = batchTime;
			this.IP = ip;
			this.oid = oid;
			this.value = value;
			this.gtime = gathertime;
			this.calculateAccesibleNext +=1;
		}else{
			if(this.Batch!=batchtmp){
				this.BatchNext = batchtmp;
				this.bTimeNext = batchTime;
				this.valueNext = value;
				this.gtimeNext = gathertime;
				this.calculateAccesibleNext +=1;
			}
		}

	}
}
