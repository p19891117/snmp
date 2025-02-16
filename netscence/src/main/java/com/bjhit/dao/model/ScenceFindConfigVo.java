package com.bjhit.dao.model;

import java.math.BigDecimal;

/**
 * t_scence_find_config 表对应实体类
 * @author lp
 */ 
public class ScenceFindConfigVo{
	/**
	 *
	 */
	private int id;
	/**
	 *
	 */
	private int task_id;
	/**
	 *
	 */
	private String ip;
	/**
	 *
	 */
	private int gather_id;
	/**
	 * 
	 */
	private String gather_name;
	/**
	 *
	 */
	private int compare_type;
	/**
	 *
	 */
	private String compare_type_name;
	/**
	 *
	 */
	private BigDecimal value;
	/**
	 *
	 */
	private int regular_type;
	
	private String regular_type_name;
	private String flag;
	private String dev_type;
	
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getDev_type() {
		return dev_type;
	}
	public void setDev_type(String dev_type) {
		this.dev_type = dev_type;
	}
	public String getRegular_type_name() {
        return regular_type_name;
    }
    public void setRegular_type_name(String regular_type_name) {
        this.regular_type_name = regular_type_name;
    }
    public int getRegular_type() {
        return regular_type;
    }
    public void setRegular_type(int regular_type) {
        this.regular_type = regular_type;
    }
    public BigDecimal getValue() {
        return value;
    }
    public void setValue(BigDecimal value) {
        this.value = value;
    }
    public int getCompare_type() {
        return compare_type;
    }
    public void setCompare_type(int compare_type) {
        this.compare_type = compare_type;
    }
    public String getGather_name() {
        return gather_name;
    }
    public void setGather_name(String gather_name) {
        this.gather_name = gather_name;
    }
    public String getCompare_type_name() {
        return compare_type_name;
    }
    public void setCompare_type_name(String compare_type_name) {
        this.compare_type_name = compare_type_name;
    }
    public void setId(int id){
		this.id=id;
	}
	public int getId(){
		return id;
	}
	public void setTask_id(int task_id){
		this.task_id=task_id;
	}
	public int getTask_id(){
		return task_id;
	}
	public void setIp(String ip){
		this.ip=ip;
	}
	public String getIp(){
		return ip;
	}
	public int getGather_id() {
        return gather_id;
    }
    public void setGather_id(int gather_id) {
        this.gather_id = gather_id;
    }
	
}

