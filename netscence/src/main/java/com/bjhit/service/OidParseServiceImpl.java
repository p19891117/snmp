package com.bjhit.service;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import org.springframework.stereotype.Service;

import com.bjhit.dao.model.DevData;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@Service
public class OidParseServiceImpl {
    /**
     * 硬盘信息
     * @param devData
     * @return
     */
    public Map getHardInfo(DevData devData) {
        HashMap map = new HashMap();
        String hardFlag = "";
        String hardUsed = "";
        String hardStatic = "";
        String mUsed = "";
        String mAll = "";
        String mName = "";
        String mUnit = "";
        String jsonVal = devData.getValue();
        jsonVal = jsonVal.replace("\\", "");
        Map<String, TreeMap<String,String>> retMap = new Gson().fromJson(jsonVal,  
                new TypeToken<Map<String, TreeMap<String,String>>>() {  
                }.getType());
        DecimalFormat df = new DecimalFormat("0.0");
        for (Map.Entry<String, TreeMap<String,String>> entry : retMap.entrySet()) {
            String lineNum = entry.getKey(); //行号
            TreeMap<String,String> tm = entry.getValue();
            if(tm.containsValue("1.3.6.1.2.1.25.2.1.4")){ //磁盘
                mName = tm.get("1.3.6.1.2.1.25.2.3.1.3." + lineNum); //磁盘名称
                mUnit = tm.get("1.3.6.1.2.1.25.2.3.1.4." + lineNum); //磁盘单元
                mUsed = tm.get("1.3.6.1.2.1.25.2.3.1.6." + lineNum); //磁盘使用
                mAll = tm.get("1.3.6.1.2.1.25.2.3.1.5." + lineNum); //磁盘总量
                double used1 = Double.parseDouble(mUsed)*Double.parseDouble(mUnit)/1024/1024/1024; //换算成GB
                double static1 = Double.parseDouble(mAll)*Double.parseDouble(mUnit)/1024/1024/1024; //换算成GB
                String used2 = df.format(used1);
                String static2 = df.format(static1);
                hardFlag += ",";
                hardUsed += ",";
                hardStatic += ",";
                hardFlag += ("'" + mName.substring(0,1) + "'");
                hardUsed += used2;
                hardStatic += static2;
            }
            map.put("hardFlag","".equals(hardFlag) ? "" : hardFlag.substring(1, hardFlag.length()));
            map.put("hardUsed","".equals(hardUsed) ? "" : hardUsed.substring(1, hardUsed.length()));
            map.put("hardStatic","".equals(hardStatic) ? "" : hardStatic.substring(1, hardStatic.length()));
        }
        return map;
    }

    /**
     * ip信息
     * @param devData
     * @return
     */
    public Map getIpInfo(DevData devData) {
        List list = new ArrayList();
        HashMap mapL = new HashMap();
        String jsonVal = devData.getValue();
        if(jsonVal == null || "".equals(jsonVal) || !jsonVal.startsWith("{")){
            mapL.put("ipAddrTable", list);
            return mapL;
        }
        jsonVal = jsonVal.replace("\\", "");
        Map<String, TreeMap<String,String>> retMap = new Gson().fromJson(jsonVal,  
                new TypeToken<Map<String, TreeMap<String,String>>>() {  
                }.getType());
        DecimalFormat df = new DecimalFormat("0.0");
        for (Map.Entry<String, TreeMap<String,String>> entry : retMap.entrySet()) {
            HashMap map = new HashMap();
            String lineNum = entry.getKey(); //行号
            TreeMap<String,String> tm = entry.getValue();
            Set<String> keys = tm.keySet();
            for (String key : keys) {  
                if(key.startsWith("1.3.6.1.2.1.4.20.1.1.")){
                    map.put("ipAdEntAddr", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.4.20.1.2.")){
                    map.put("ipAdEntIfIndex", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.4.20.1.3.")){
                    map.put("ipAdEntNetMask", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.4.20.1.4.")){
                    map.put("ipAdEntBcastAddr", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.4.20.1.5.")){
                    map.put("ipAdEntReasmMaxSize", tm.get(key));
                }
            }
            list.add(map);
        }
        mapL.put("ipAddrTable", list);
        return mapL;
    }

    /**
     * if信息
     * @param devData
     * @return
     */
    public Map getIfInfo(DevData devData) {
        List list = new ArrayList();
        HashMap mapL = new HashMap();
        String jsonVal = devData.getValue();
        if(jsonVal == null || "".equals(jsonVal) || !jsonVal.startsWith("{")){
            mapL.put("ifTable", list);
            return mapL;
        }
        jsonVal = jsonVal.replace("\\", "");
        Map<String, TreeMap<String,String>> retMap = new Gson().fromJson(jsonVal,  
                new TypeToken<Map<String, TreeMap<String,String>>>() {  
                }.getType());
        DecimalFormat df = new DecimalFormat("0.0");
        for (Map.Entry<String, TreeMap<String,String>> entry : retMap.entrySet()) {
            HashMap map = new HashMap();
            String lineNum = entry.getKey(); //行号
            TreeMap<String,String> tm = entry.getValue();
            Set<String> keys = tm.keySet();
            for (String key : keys) {  
                if(key.startsWith("1.3.6.1.2.1.2.2.1.1.")){
                    map.put("ifIndex", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.2.2.1.2.")){
                    map.put("ifDescr", getChinese(tm.get(key)));
                }else if(key.startsWith("1.3.6.1.2.1.2.2.1.3.")){
                /*	String message ="";
                	if("1".equals(tm.get(key))){
                		message="其他";
                	}else if("2".equals(tm.get(key))){
                		message="非法";
                	}else if("3".equals(tm.get(key))){
                		message="该路由目的地址为路由器直接连接的子网";
                	}else if("4".equals(tm.get(key))){
                		message="远程路由，目的地址为远程的主机、网络或子网";
                	}*/
                    map.put("ifType", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.2.2.1.4.")){
                    map.put("ifMtu", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.2.2.1.5.")){
                    map.put("ifSpeed", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.2.2.1.8.")){
                    map.put("ifOperStatus", tm.get(key));
                }
            }
            list.add(map);
        }
        mapL.put("ifTable", list);
        return mapL;
    }

    /**
     * 路由信息
     * @param devData
     * @return
     */
    public Map getRouterInfo(DevData devData) {
        List list = new ArrayList();
        HashMap mapL = new HashMap();
        String jsonVal = devData.getValue();
        if(jsonVal == null || "".equals(jsonVal) || !jsonVal.startsWith("{")){
            mapL.put("ipRouteTable", list);
            return mapL;
        }
        jsonVal = jsonVal.replace("\\", "");
        Map<String, TreeMap<String,String>> retMap = new Gson().fromJson(jsonVal,  
                new TypeToken<Map<String, TreeMap<String,String>>>() {  
                }.getType());
        DecimalFormat df = new DecimalFormat("0.0");
        for (Map.Entry<String, TreeMap<String,String>> entry : retMap.entrySet()) {
            
            String lineNum = entry.getKey(); //行号
            TreeMap<String,String> tm = entry.getValue();
            Set<String> keys = tm.keySet();
            for (String key : keys) { 
                if(key.startsWith("1.3.6.1.2.1.4.21.1.1.")){
                    HashMap map = new HashMap();
                    String ip = tm.get(key);
                    map.put("ipRouteDest", tm.get("1.3.6.1.2.1.4.21.1.1." + ip));
                    map.put("ipRouteIfIndex", tm.get("1.3.6.1.2.1.4.21.1.2." + ip));
                    map.put("ipRouteNextHop", tm.get("1.3.6.1.2.1.4.21.1.7." + ip));
                    String message ="";
                	if("1".equals(tm.get("1.3.6.1.2.1.4.21.1.8." + ip))){
                		message="其他";
                	}else if("2".equals(tm.get("1.3.6.1.2.1.4.21.1.8." + ip))){
                		message="非法";
                	}else if("3".equals(tm.get("1.3.6.1.2.1.4.21.1.8." + ip))){
                		message="该路由目的地址为路由器直接连接的子网";
                	}else if("4".equals(tm.get("1.3.6.1.2.1.4.21.1.8." + ip))){
                		message="远程路由，目的地址为远程的主机、网络或子网";
                	}
                    map.put("ipRouteType", message);
                    map.put("ipRouteMask", tm.get("1.3.6.1.2.1.4.21.1.11." + ip));
                    map.put("ipRouteAge", tm.get("1.3.6.1.2.1.4.21.1.10." + ip));
                    list.add(map);
                }
            }
        }
        mapL.put("ipRouteTable", list);
        return mapL;
    }
    /**
     * 进程信息
     * @param devData
     * @return
     */
    public Map getProcessInfo(DevData devData) {
        List list = new ArrayList();
        HashMap mapL = new HashMap();
        String jsonVal = devData.getValue();
        if(jsonVal == null || "".equals(jsonVal) || !jsonVal.startsWith("{")){
            mapL.put("processTable", list);
            return mapL;
        }
        jsonVal = jsonVal.replace("\\", "/").replace("-scmd -adtp exe -yypt \"C", "-scmd -adtp exe -yypt C");
        Map<String, TreeMap<String,String>> retMap = new Gson().fromJson(jsonVal,  
                new TypeToken<Map<String, TreeMap<String,String>>>() {  
                }.getType());
        DecimalFormat df = new DecimalFormat("0.0");
        for (Map.Entry<String, TreeMap<String,String>> entry : retMap.entrySet()) {
            
            String lineNum = entry.getKey(); //行号
            TreeMap<String,String> tm = entry.getValue();
            Set<String> keys = tm.keySet();
            for (String key : keys) { 
                if(key.startsWith("1.3.6.1.2.1.25.4.2.1.1.")){
                    HashMap map = new HashMap();
                    String ip = tm.get(key);
                    map.put("hrSWRunIndex",  ip);
                    map.put("hrSWRunName", tm.get("1.3.6.1.2.1.25.4.2.1.2." + ip));
                    if(tm.get("1.3.6.1.2.1.25.4.2.1.4." + ip) != null){
                        map.put("hrSWRunPath", tm.get("1.3.6.1.2.1.25.4.2.1.4." + ip).replace("/", "\\"));
                    }else{
                        map.put("hrSWRunPath", "");
                    }
                    map.put("hrSWRunParameters", tm.get("1.3.6.1.2.1.25.4.2.1.5." + ip));
                    map.put("hrSWRunType", tm.get("1.3.6.1.2.1.25.4.2.1.6." + ip));
                    map.put("hrSWRunStatus", tm.get("1.3.6.1.2.1.25.4.2.1.7." + ip));
                    list.add(map);
                }
               
            }
        }
        mapL.put("processTable", list);
        return mapL;
    }
    /**
     * 进程点内存CPU信息
     * @param devData
     * @return
     */
    public Map getProcessPerfCPUInfo(DevData devData) {
        List list = new ArrayList();
        HashMap mapL = new HashMap();
        String jsonVal = devData.getValue();
        if(jsonVal == null || "".equals(jsonVal) || !jsonVal.startsWith("{")){
            mapL.put("processPerCPUTable", list);
            return mapL;
        }
        jsonVal = jsonVal.replace("\\", "/").replace("-scmd -adtp exe -yypt \"C", "-scmd -adtp exe -yypt C");
        Map<String, TreeMap<String,String>> retMap = new Gson().fromJson(jsonVal,  
                new TypeToken<Map<String, TreeMap<String,String>>>() {  
                }.getType());
        DecimalFormat df = new DecimalFormat("0.0");
        for (Map.Entry<String, TreeMap<String,String>> entry : retMap.entrySet()) {
            
            String lineNum = entry.getKey(); //行号
            TreeMap<String,String> tm = entry.getValue();
            Set<String> keys = tm.keySet();
            for (String key : keys) { 
               
                if(key.startsWith("1.3.6.1.2.1.25.5.1.1.1.")){
                    HashMap map = new HashMap();
                    String ip = (key.split("\\."))[11];
                    map.put("hrSWRunIndex",  ip);
                    map.put("hrSWRunPerfMem", tm.get("1.3.6.1.2.1.25.5.1.1.2." + ip));
                    map.put("hrSWRunPerfCPU", tm.get("1.3.6.1.2.1.25.5.1.1.1." + ip));
                    list.add(map);
                }
            }
        }
        mapL.put("processPerCPUTable", list);
        return mapL;
    }
    /**
     * 设备信息
     * @param devData
     * @return
     */
    public Map getDeviceInfo(DevData devData) {
        List list = new ArrayList();
        HashMap mapL = new HashMap();
        String jsonVal = devData.getValue();
        if(jsonVal == null || "".equals(jsonVal) || !jsonVal.startsWith("{")){
            mapL.put("deviceTable", list);
            return mapL;
        }
        jsonVal = jsonVal.replace("\\", "");
        Map<String, TreeMap<String,String>> retMap = new Gson().fromJson(jsonVal,  
                new TypeToken<Map<String, TreeMap<String,String>>>() {  
                }.getType());
        DecimalFormat df = new DecimalFormat("0.0");
        for (Map.Entry<String, TreeMap<String,String>> entry : retMap.entrySet()) {
            
            String lineNum = entry.getKey(); //行号
            TreeMap<String,String> tm = entry.getValue();
            Set<String> keys = tm.keySet();
            for (String key : keys) { 
                if(key.startsWith("1.3.6.1.2.1.25.3.2.1.1.")){
                    HashMap map = new HashMap();
                    String ip = tm.get(key);
                    map.put("hrDeviceType", tm.get("1.3.6.1.2.1.25.3.2.1.2." + ip));
                    map.put("hrDeviceDescr", tm.get("1.3.6.1.2.1.25.3.2.1.3." + ip));
                    map.put("hrDeviceID", tm.get("1.3.6.1.2.1.25.3.2.1.4." + ip));
                    map.put("hrDeviceStatus", tm.get("1.3.6.1.2.1.25.3.2.1.5." + ip));
                    map.put("hrDeviceErrors", tm.get("1.3.6.1.2.1.25.3.2.1.6." + ip));
                    list.add(map);
                 }
            }
        }
        mapL.put("deviceTable", list);
        return mapL;
    }
    
    
    /**
     * 安装程序信息
     * @param devData
     * @return
     */
    public Map getInstalledInfo(DevData devData) {
        List list = new ArrayList();
        HashMap mapL = new HashMap();
        String jsonVal = devData.getValue();
        if(jsonVal == null || "".equals(jsonVal) || !jsonVal.startsWith("{")){
            mapL.put("installedTable", list);
            return mapL;
        }
        jsonVal = jsonVal.replace("\\", "");
        Map<String, TreeMap<String,String>> retMap = new Gson().fromJson(jsonVal,  
                new TypeToken<Map<String, TreeMap<String,String>>>() {  
                }.getType());
        DecimalFormat df = new DecimalFormat("0.0");
        for (Map.Entry<String, TreeMap<String,String>> entry : retMap.entrySet()) {
            
            String lineNum = entry.getKey(); //行号
            TreeMap<String,String> tm = entry.getValue();
            Set<String> keys = tm.keySet();
            for (String key : keys) { 
                if(key.startsWith("1.3.6.1.2.1.25.6.3.1.1.")){
                    HashMap map = new HashMap();
                    String ip = tm.get(key);
                    map.put("hrSWInstalledID", tm.get("1.3.6.1.2.1.25.6.3.1.3." + ip));
                    map.put("hrSWInstalledName", getChinese(tm.get("1.3.6.1.2.1.25.6.3.1.2." + ip)));
                    map.put("hrSWInstalledType", tm.get("1.3.6.1.2.1.25.6.3.1.4." + ip));
                    map.put("hrSWInstalledDate", tm.get("1.3.6.1.2.1.25.6.3.1.5." + ip)); 
                    list.add(map);
                 }
            }
        }
        mapL.put("installedTable", list);
        return mapL;
    }
    /**
     * tcp信息
     * @param devData
     * @return
     */
    public Map getTcpInfo(DevData devData) {
        List list = new ArrayList();
        HashMap mapL = new HashMap();
        String jsonVal = devData.getValue();
        if(jsonVal == null || "".equals(jsonVal) || !jsonVal.startsWith("{")){
            mapL.put("tcpConnTable", list);
            return mapL;
        }
        jsonVal = jsonVal.replace("\\", "");
        Map<String, TreeMap<String,String>> retMap = new Gson().fromJson(jsonVal,  
                new TypeToken<Map<String, TreeMap<String,String>>>() {  
                }.getType());
        DecimalFormat df = new DecimalFormat("0.0");
        for (Map.Entry<String, TreeMap<String,String>> entry : retMap.entrySet()) {
            HashMap map = new HashMap();
            String lineNum = entry.getKey(); //行号
            TreeMap<String,String> tm = entry.getValue();
            Set<String> keys = tm.keySet();
            for (String key : keys) {  
                if(key.startsWith("1.3.6.1.2.1.6.13.1.1.")){
                    map.put("tcpConnState", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.6.13.1.2.")){
                    map.put("tcpConnLocalAddress", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.6.13.1.3.")){
                    map.put("tcpConnLocalPort", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.6.13.1.4.")){
                    map.put("tcpConnRemAddress", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.6.13.1.5.")){
                    map.put("tcpConnRemPort", tm.get(key));
                }
            }
            list.add(map);
        }
        mapL.put("tcpConnTable", list);
        return mapL;
    }
    
    /**
     * udp信息
     * @param devData
     * @return
     */
    public Map getUdpInfo(DevData devData) {
        List list = new ArrayList();
        HashMap mapL = new HashMap();
        String jsonVal = devData.getValue();
        if(jsonVal == null || "".equals(jsonVal) || !jsonVal.startsWith("{")){
            mapL.put("udpTable", list);
            return mapL;
        }
        jsonVal = jsonVal.replace("\\", "");
        Map<String, TreeMap<String,String>> retMap = new Gson().fromJson(jsonVal,  
                new TypeToken<Map<String, TreeMap<String,String>>>() {  
                }.getType());
        DecimalFormat df = new DecimalFormat("0.0");
        for (Map.Entry<String, TreeMap<String,String>> entry : retMap.entrySet()) {
            HashMap map = new HashMap();
            String lineNum = entry.getKey(); //行号
            TreeMap<String,String> tm = entry.getValue();
            Set<String> keys = tm.keySet();
            for (String key : keys) {  
                if(key.startsWith("1.3.6.1.2.1.7.5.1.1.")){
                    map.put("udpLocalAddress", tm.get(key));
                }else if(key.startsWith("1.3.6.1.2.1.7.5.1.2.")){
                    map.put("udpLocalPort", tm.get(key));
                }
            }
            list.add(map);
        }
        mapL.put("udpTable", list);
        return mapL;
    }
    
    /**
     * 解决snmp4j中文乱码问题
     */
    public static String getChinese(String octetString){
        try{
            String[] temps = octetString.split(":");
            if(temps.length < 4){
                return octetString;
            }
            byte[] bs = new byte[temps.length];
            for(int i=0;i<temps.length;i++)
                bs[i] = (byte)Integer.parseInt(temps[i],16);
        
            return new String(bs,"GB2312");
        }catch(Exception e){
            return null;
        }
    }
}
