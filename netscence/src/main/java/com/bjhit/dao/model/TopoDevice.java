package com.bjhit.dao.model;

/**
 * @Description 网络拓扑设备
 * @author lp
 * @date 2014年10月8日
 */

public class TopoDevice {

    /**
     * 试验场景id
     */
    private String task_id;
    /**
     * 设备id
     */
    private String dev_id;
    /**
     * 设备名称
     */
    private String dev_name;
    /**
     * 设备类型
     */
    private String dev_catgory;
    /**
     * 设备是否有故障
     */
    private String dev_problem;
    /**
     * 设备ip
     * @return
     */
    private String ip;
    
    private String username;
    
    private String password;
    
    private String uuid;
    
    private int vm_flag;
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getUuid() {
        return uuid;
    }
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
    public int getVm_flag() {
        return vm_flag;
    }
    public void setVm_flag(int vm_flag) {
        this.vm_flag = vm_flag;
    }
    public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getTask_id() {
        return task_id;
    }
    public void setTask_id(String task_id) {
        this.task_id = task_id;
    }
    public String getDev_id() {
        return dev_id;
    }
    public void setDev_id(String dev_id) {
        this.dev_id = dev_id;
    }
    public String getDev_name() {
        return dev_name;
    }
    public void setDev_name(String dev_name) {
        this.dev_name = dev_name;
    }
    public String getDev_catgory() {
        return dev_catgory;
    }
    public void setDev_catgory(String dev_catgory) {
        this.dev_catgory = dev_catgory;
    }
    public String getDev_problem() {
        return dev_problem;
    }
    public void setDev_problem(String dev_problem) {
        this.dev_problem = dev_problem;
    }

}
