package com.bjhit.dao.model;

import java.util.Date;
import java.util.List;

/**
 * TODO
 * @author 罗平
 * @version 2014-11-27
 */
public class DevData {

	private String id;
	
	private int batch;
	
	private String ip;
	
	private String oid;
	
	private List<String> oidlist;
	
	private List<String> batchlist;
	
	private String value;
	
	private String taskNum;
	
	private Date batchTime;
	
	private Date gatherTime;
	
	private int timeflag;
	
	private int limitNum;
	
	public List<String> getBatchlist() {
        return batchlist;
    }

    public void setBatchlist(List<String> batchlist) {
        this.batchlist = batchlist;
    }

    public List<String> getOidlist() {
        return oidlist;
    }

    public void setOidlist(List<String> oidlist) {
        this.oidlist = oidlist;
    }

    public int getLimitNum() {
		return limitNum;
	}

	public void setLimitNum(int limitNum) {
		this.limitNum = limitNum;
	}

	public int getTimeflag() {
		return timeflag;
	}

	public void setTimeflag(int timeflag) {
		this.timeflag = timeflag;
	}

	public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getBatch() {
		return batch;
	}

	public void setBatch(int batch) {
		this.batch = batch;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getOid() {
        return oid;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getTaskNum() {
		return taskNum;
	}

	public void setTaskNum(String taskNum) {
		this.taskNum = taskNum;
	}

	public Date getBatchTime() {
		return batchTime;
	}

	public void setBatchTime(Date batchTime) {
		this.batchTime = batchTime;
	}

	public Date getGatherTime() {
		return gatherTime;
	}

	public void setGatherTime(Date gatherTime) {
		this.gatherTime = gatherTime;
	}
	
}
