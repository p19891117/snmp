package com.bjhit.dao.model;

import java.util.Date;

public class SceneInfo {
	/**
	 *  场景编号     
	 */
	private String scn_id;
	/**
	 *  策略编号     
	 */     
	private String strategy_id;
	/**
	 *  场景回溯编号     
	 */
	private String task_id;
	/**
	 *  地址     
	 */
	private String ip; 
	/**
	 *  场景发生时间     
	 */
	private Date sceTime;  
	/**
	 *  场景触发条件     
	 */
	private String scetri_condition;
	/**
	 *  场景简单描述     
	 */
	private String sce_description;  
	/**
	 *  场景评论     
	 */      
	private String sce_conmment;
	/**
	 *  场景发现类型     
	 */      
	private String sce_flag;
	public String getSce_flag() {
		return sce_flag;
	}
	public void setSce_flag(String sce_flag) {
		this.sce_flag = sce_flag;
	}
	/**
	 * 场景级别
	 */
	private Integer sce_level;
	
	public String getScn_id() {
		return scn_id;
	}
	public void setScn_id(String scn_id) {
		this.scn_id = scn_id;
	}
	public String getStrategy_id() {
		return strategy_id;
	}
	public void setStrategy_id(String strategy_id) {
		this.strategy_id = strategy_id;
	}
	public String getTask_id() {
		return task_id;
	}
	public void setTask_id(String task_id) {
		this.task_id = task_id;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public Date getSceTime() {
        return sceTime;
    }
    public void setSceTime(Date sceTime) {
        this.sceTime = sceTime;
    }
    public String getScetri_condition() {
		return scetri_condition;
	}
	public void setScetri_condition(String scetri_condition) {
		this.scetri_condition = scetri_condition;
	}
	public String getSce_description() {
		return sce_description;
	}
	public void setSce_description(String sce_description) {
		this.sce_description = sce_description;
	}
	public String getSce_conmment() {
		return sce_conmment;
	}
	public void setSce_conmment(String sce_conmment) {
		this.sce_conmment = sce_conmment;
	}
    public Integer getSce_level() {
        return sce_level;
    }
    public void setSce_level(Integer sce_level) {
        this.sce_level = sce_level;
    }                    
	
}
