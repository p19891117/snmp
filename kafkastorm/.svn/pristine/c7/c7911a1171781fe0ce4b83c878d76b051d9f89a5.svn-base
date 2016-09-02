package bjhit.storm;


import java.util.*;

import backtype.storm.tuple.Tuple;

public abstract class associatedData {
	public Tuple tup;
	public String taskID;
	public int Batch;
	public String IP;
	public String oid;
	public String scn_id;
	public String bTime;
	public String value;
	public String calValue;
	public String gtime;
	//存储计算当前复合类数据所需要的计算分量的个数
	public int calculateInNeed;
	//记录当前复合类数据计算类已经获得的计算分量的个数
	public int calculateAccesible;
	//存储所需计算分量的oid
	public ArrayList<String> caldoid = new ArrayList<String>();
	//存储所需计算分量的值
	public ArrayList<String> caloidvalue = new ArrayList<String>();
	
	//根据当前数据设置
	public abstract void setData(String batch,String batchTime,String ip,String gid,String oid,String value,String gathertime);
	//基于当前数据进行复合类数据计算
	public abstract String[] getcalData();
	//未用
	public abstract void getcalTuple(Tuple tt);
	//设置批次
	public abstract void setBatch(String batch);
	//设置批时间
	public abstract void setBatchTime(String batchtime);
	//设置IP
	public abstract void setIP(String ip);
	//设置gatherid
	public abstract void setGatherID(String id);
	//设置oid
	public abstract void setOid(String oid);
	//设置当前数据的原始值
	public abstract void setValue(String value);
	//设置采集时间
	public abstract void setGatherTime(String gathertime);
	//设置计算当前数据所需要的计算分量
	public abstract void setOidList(String childoid);
	//设置计算当前数据所需要的计算分量的个数
	public abstract void setOidInNeed();
	//对于需要两批数据计算增加的新数据
	//存储下一批次计算分量的值
	public ArrayList<String> caloidvalueNext = new ArrayList<String>();
	public String valueNext;
	public int BatchNext;
	public String bTimeNext;
	public String gtimeNext;
	public int calculateInNeedNext;
	public int calculateAccesibleNext;
}
