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

public class IfInDiscardP extends associatedData{
	String SEPARATOR = "#$#";
	//构造函数中，本复合类数据需要两个批次，calculateInNeedNext设为2，calculateInNeed未用到
	public IfInDiscardP(String gatherid){
		this.calculateInNeed = 1;
		this.calculateInNeedNext = 2;
		this.scn_id = gatherid;
		this.calculateAccesible = 0;
		this.calculateAccesibleNext = 0;
		this.Batch = -1;
		this.BatchNext = -1;//需要根据batch大小，为下次计算调换位置
		this.calValue = "-1";//默认为-1，所以当计算出现问题时返回的是-1
		}
	@Override
	public String[] getcalData() {
		// TODO Auto-generated method stub
		String[] rett = null;
		//可用计算分量是否完整，完整则计算，不完整则返回
		if(this.calculateAccesibleNext == this.calculateInNeedNext){
			//初始化局部变量，为0，类型BigDecimal
			BigDecimal inDiscards = new BigDecimal(0);
			BigDecimal inUnicast = new BigDecimal(0);
			BigDecimal inNUcast = new BigDecimal(0);
			BigDecimal inDiscardsNext = new BigDecimal(0);
			BigDecimal inUnicastNext = new BigDecimal(0);
			BigDecimal inNUcastNext = new BigDecimal(0);
			try{
				//将两个批次数据的json串转换为map
				//Map<String, HashMap<String,String>> rr = new Gson().fromJson(this.value,new TypeToken<Map<String, HashMap<String,String>>>() {}.getType());
				//Map<String, HashMap<String,String>> rrNext = new Gson().fromJson(this.valueNext,new TypeToken<Map<String, HashMap<String,String>>>() {}.getType());
				
				Map<String, String> rrtmp1 = new Gson().fromJson(this.value,new TypeToken<Map<String, String>>() {}.getType());
				Map<String, HashMap<String,String>> rr = ForMateToJson.toNormalFormate(rrtmp1);
				
				Map<String, String> rrtmp = new Gson().fromJson(this.valueNext,new TypeToken<Map<String, String>>() {}.getType());
				Map<String, HashMap<String,String>> rrNext = ForMateToJson.toNormalFormate(rrtmp);
				
				//set and get value in need，获取并设置需要的值，根据oidlist中的oid
				for (Entry<String, HashMap<String,String>> entry : rr.entrySet()) {
					//set value by the index of childoid in oidlist
					this.caloidvalue.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.13"), entry.getValue().get("1.3.6.1.2.1.2.2.1.13."+entry.getKey()));
					this.caloidvalue.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.12"), entry.getValue().get("1.3.6.1.2.1.2.2.1.12."+entry.getKey()));
					this.caloidvalue.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.11"), entry.getValue().get("1.3.6.1.2.1.2.2.1.11."+entry.getKey()));
					//prepare for the computing in the sequence of discards、UniCast and BroadCast
					//累加
					inDiscards = inDiscards.add(new BigDecimal((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.13"))));
					inUnicast = inUnicast.add(new BigDecimal((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.11"))));
					inNUcast = inNUcast.add(new BigDecimal((String)this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.12"))));
					 
				}
				//next，下一批次同样的操作
				for (Entry<String, HashMap<String,String>> entry : rrNext.entrySet()) {
					//set value by the index of childoid in oidlist
					this.caloidvalueNext.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.13"), entry.getValue().get("1.3.6.1.2.1.2.2.1.13."+entry.getKey()));
					this.caloidvalueNext.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.12"), entry.getValue().get("1.3.6.1.2.1.2.2.1.12."+entry.getKey()));
					this.caloidvalueNext.set(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.11"), entry.getValue().get("1.3.6.1.2.1.2.2.1.11."+entry.getKey()));
					//prepare for the computing in the sequence of discards、UniCast and BroadCast
					inDiscardsNext = inDiscardsNext.add(new BigDecimal((String)this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.13"))));
					inUnicastNext = inUnicastNext.add(new BigDecimal((String)this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.11"))));
					inNUcastNext = inNUcastNext.add(new BigDecimal((String)this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.12"))));
				 
				}
			    //计算
				BigDecimal pp = inDiscardsNext.subtract(inDiscards).divide((inUnicastNext.add(inNUcastNext).subtract(inNUcast).subtract(inUnicast)), 2, RoundingMode.HALF_DOWN);
				this.calValue = String.valueOf(pp);
			}catch(Exception e){
				System.out.println("IfInDiscard "+e.toString());
				e.printStackTrace();
			}
			 //STDIO
			System.out.println("IfInDiscardP");
			System.out.println("Ip is "+this.IP );
			System.out.println("Batch is "+this.Batch);
			System.out.println("NextBatch is "+this.BatchNext);
			System.out.println("Btime is "+this.bTime);
			System.out.println("BtimeNext is "+this.bTimeNext);
			 //计算完成后保留批次号较大批次的数据，供下次计算使用，
			 if(this.Batch < this.BatchNext){
				 this.Batch = this.BatchNext;
				 this.bTime = this.bTimeNext;
				 this.value = this.valueNext;
				 //新增
				 this.gtime = this.gtimeNext;

			 }
			 //将计算完成的数据组织成相应的数据格式，以在storeDB和regularMatchBolt中使用
			 Date date=new Date();  
		     SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");
		     //this.gtime = formatter.format(date);
		     String now  = formatter.format(date);
			 rett = new String[2];
			 rett[0] = this.Batch+SEPARATOR+this.bTime+SEPARATOR+this.IP+SEPARATOR+this.scn_id+SEPARATOR+this.calValue+SEPARATOR+now;
			 rett[1] = String.valueOf(this.Batch)+SEPARATOR+this.bTime+SEPARATOR+
					 this.IP+SEPARATOR+this.scn_id+SEPARATOR+this.scn_id+SEPARATOR+
					 this.calValue+SEPARATOR+now;
			 //STDIO
			 //System.out.println("IfInDiscardP");
			 System.out.println("1.3.6.1.2.1.2.2.1.13 value is "+this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.13")));
			 System.out.println("1.3.6.1.2.1.2.2.1.12 value is "+this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.12")));
			 System.out.println("1.3.6.1.2.1.2.2.1.11 value is "+this.caloidvalue.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.11")));
			 System.out.println("1.3.6.1.2.1.2.2.1.13 value is "+this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.13")));
			 System.out.println("1.3.6.1.2.1.2.2.1.12 value is "+this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.12")));
			 System.out.println("1.3.6.1.2.1.2.2.1.11 value is "+this.caloidvalueNext.get(this.caldoid.indexOf("1.3.6.1.2.1.2.2.1.11")));			 
			 System.out.println("the value is "+this.value);
			 System.out.println("IfInDiscardP END");
			 //reset
			 this.calculateAccesibleNext = 1;
			 this.calValue = "-1";
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
	//设置计算当前复合类数据所需要的计算分量
	//同时设置了caloidvalue、caloidvalueNext的原因是为了保持计算分量和计算分量值存储结构的一致（位置等）
	//这样在给caloidvalue、caloidvalueNext赋值时，可根据oid找到其值在caloidvalue、caloidvalueNext中的位置，使用set进行赋值
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
		int batchtmp = Integer.valueOf(batch);//批次
		//如果可用计算分量数为0
		if(this.calculateAccesibleNext == 0){
			//设置
			this.Batch = batchtmp;
			this.bTime = batchTime;
			this.IP = ip;
			this.oid = oid;
			this.value = value;
			this.gtime = gathertime;
			this.calculateAccesibleNext +=1;//可用计算分量加1
		}else{//可用计算分量为1
			//如果不是同一批次数据，若是同一批次放弃
			if(this.Batch!=batchtmp){
				//设置
				this.BatchNext = batchtmp;
				this.bTimeNext = batchTime;
				this.valueNext = value;
				this.gtimeNext = gathertime;
				this.calculateAccesibleNext +=1;//可用计算分量加1
			}
		}
	}
}
