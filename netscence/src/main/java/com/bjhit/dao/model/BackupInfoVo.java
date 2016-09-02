package com.bjhit.dao.model;

public class BackupInfoVo {

    private int id;
    private String ip;
    private int task;
    private String info;
    private String type;
    private String scn_id;
    
    public String getScn_id() {
        return scn_id;
    }
    public void setScn_id(String scn_id) {
        this.scn_id = scn_id;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getIp() {
        return ip;
    }
    public void setIp(String ip) {
        this.ip = ip;
    }
    public int getTask() {
        return task;
    }
    public void setTask(int task) {
        this.task = task;
    }
    public String getInfo() {
        return info;
    }
    public void setInfo(String info) {
        this.info = info;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    
}
