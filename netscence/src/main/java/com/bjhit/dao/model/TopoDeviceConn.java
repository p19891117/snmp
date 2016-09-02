package com.bjhit.dao.model;

/**
 * @Description 网络拓扑设备连接关系
 * @author lp
 * @date 2014年10月8日
 */

public class TopoDeviceConn {

    /**
     * 试验场景id
     */
    private String task_id;
    /**
     * 设备A id
     */
    private String deva_id;
    /**
     * 设备B id
     */
    private String devb_id;
    /**
     * 设备连接是否有故障
     */
    private String conn_problem;
    
    public String getTask_id() {
        return task_id;
    }
    public void setTask_id(String task_id) {
        this.task_id = task_id;
    }
    public String getDeva_id() {
        return deva_id;
    }
    public void setDeva_id(String deva_id) {
        this.deva_id = deva_id;
    }
    public String getDevb_id() {
        return devb_id;
    }
    public void setDevb_id(String devb_id) {
        this.devb_id = devb_id;
    }
    public String getConn_problem() {
        return conn_problem;
    }
    public void setConn_problem(String conn_problem) {
        this.conn_problem = conn_problem;
    }

}
