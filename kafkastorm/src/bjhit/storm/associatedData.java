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
	//�洢���㵱ǰ��������������Ҫ�ļ�������ĸ���
	public int calculateInNeed;
	//��¼��ǰ���������ݼ������Ѿ���õļ�������ĸ���
	public int calculateAccesible;
	//�洢������������oid
	public ArrayList<String> caldoid = new ArrayList<String>();
	//�洢������������ֵ
	public ArrayList<String> caloidvalue = new ArrayList<String>();
	
	//���ݵ�ǰ��������
	public abstract void setData(String batch,String batchTime,String ip,String gid,String oid,String value,String gathertime);
	//���ڵ�ǰ���ݽ��и��������ݼ���
	public abstract String[] getcalData();
	//δ��
	public abstract void getcalTuple(Tuple tt);
	//��������
	public abstract void setBatch(String batch);
	//������ʱ��
	public abstract void setBatchTime(String batchtime);
	//����IP
	public abstract void setIP(String ip);
	//����gatherid
	public abstract void setGatherID(String id);
	//����oid
	public abstract void setOid(String oid);
	//���õ�ǰ���ݵ�ԭʼֵ
	public abstract void setValue(String value);
	//���òɼ�ʱ��
	public abstract void setGatherTime(String gathertime);
	//���ü��㵱ǰ��������Ҫ�ļ������
	public abstract void setOidList(String childoid);
	//���ü��㵱ǰ��������Ҫ�ļ�������ĸ���
	public abstract void setOidInNeed();
	//������Ҫ�������ݼ������ӵ�������
	//�洢��һ���μ��������ֵ
	public ArrayList<String> caloidvalueNext = new ArrayList<String>();
	public String valueNext;
	public int BatchNext;
	public String bTimeNext;
	public String gtimeNext;
	public int calculateInNeedNext;
	public int calculateAccesibleNext;
}
