package com.bjhit.jws;

import java.net.URL;

import javax.xml.namespace.QName;
import javax.xml.ws.Service;

import com.bjhit.util.Constant;

public class JwsFlowDevClient {
    /**
     * 抓包
     * @param type
     * @param taskid
     * @return
     */
    public static int capPackets(String type, String taskid){
        int result = 0;
        try {
            // 创建访问wsdl服务地址的url
            URL url = new URL(Constant.jws_url);
            // 通过QName指明服务的和具体信息
            QName sname = new QName("http://jws.bjhit.com/", "FlowDevServiceImplService");
            // 创建服务
            Service service = Service.create(url, sname);
            // 实现接口
            FlowDevService ms = service.getPort(FlowDevService.class);
            System.out.println("开始抓包...任务号：" + taskid + ", 类型：" + type);
            ms.capPackets(taskid, type);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    
    /**
     * 发包
     * @param taskid
     * @param protocalType tcp/udp/icmp/arp
     * @param starTime yyyy-MM-dd HH:mm:ss.SSS
     * @param endTime yyyy-MM-dd HH:mm:ss.SSS
     * @return
     */
    public static int sendPackets(String taskid, String protocalType, String starTime, String endTime){
        int r = 0;
        try {
            // 创建访问wsdl服务地址的url
            URL url = new URL(Constant.jws_url);
            // 通过QName指明服务的和具体信息
            QName sname = new QName("http://jws.bjhit.com/", "FlowDevServiceImplService");
            // 创建服务
            Service service = Service.create(url, sname);
            // 实现接口
            FlowDevService ms = service.getPort(FlowDevService.class);
            r = ms.sendPackets(taskid, protocalType, starTime, endTime);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return r;
    }
    
    
    public static void main(String[] args){
        String taskid = "999";
        //sendPackets("1","", "2015-04-14 14:48:28", "2015-04-14 14:58:28");
        capPackets("1",taskid);
        try {
            Thread.currentThread().sleep(60*1000*1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        capPackets("2",taskid);
    }
    
}