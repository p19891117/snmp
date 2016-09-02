package com.bjhit.jws;

public class JwsThread extends Thread {
    private String opr = "";
    
    private String type = "";
    private String taskid = "";
    private String protocalType = "";
    private String starTime = "";
    private String endTime = "";
    
    public JwsThread(String opr_, String type_, String taskid_, String protocalType_, String starTime_, String endTime_){
        opr = opr_;
        type = type_;
        taskid = taskid_;
        protocalType = protocalType_;
        starTime = starTime_;
        endTime = endTime_;
    }
    
    public void run(){
        if("1".equals(opr)){
            JwsFlowDevClient.capPackets(type, taskid);
        }else if("2".equals(opr)){
            JwsFlowDevClient.sendPackets(taskid, protocalType, starTime, endTime);
        }
    }
}
