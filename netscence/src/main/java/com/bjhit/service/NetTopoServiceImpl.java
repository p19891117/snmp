package com.bjhit.service;

import java.io.File;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bjhit.dao.mapper.NetTopoMapper;
import com.bjhit.dao.model.TopoDevice;
import com.bjhit.dao.model.TopoDeviceConn;
import com.bjhit.util.Constant;
import com.bjhit.util.XmlUtil;

/**
 * @Description 网络拓扑发现服务实现类
 * @author lp
 * @date 2014年10月8日
 */

@Service
public class NetTopoServiceImpl {
    @Autowired
    private NetTopoMapper netTopoMapper;

    @SuppressWarnings("unchecked")
    
    public void parseSaveXmlDevicesConns(File file, String taskId) {
        try {
            //File file = FileUtil.getFile("H:/bjhit/项目文档", "与中控方案形式化描述结果0820.xml");
            //File file = FileUtil.getFile(filepath, filename);
            Document doc = XmlUtil.read(file);
            Element root = XmlUtil.getRootElement(doc);
            Element scenarios = root.element("Scenarios");
            //循环场景--一般只有一个场景
            for(Iterator<Element> iter_scen = scenarios.elementIterator(); iter_scen.hasNext(); ){
                Element scenario = (Element)iter_scen.next();
                Element deviceItems = scenario.element("DeviceItems");
                if(deviceItems == null){
                    return;
                }
                Element connections = scenario.element("Connections");
                if(connections == null){
                    return;
                }
                List<TopoDevice> devList = new ArrayList<TopoDevice>();
                List<TopoDeviceConn> connList = new ArrayList<TopoDeviceConn>();
                //循环获取设备
                for(Iterator<Element> iter_dev = deviceItems.elementIterator(); iter_dev.hasNext(); ){
                    Element deviceItem = (Element)iter_dev.next();
                    TopoDevice topoDevice = new TopoDevice();
                    topoDevice.setDev_id(deviceItem.elementText("ID"));
                    topoDevice.setDev_name(deviceItem.elementText("DeviceName"));
                    topoDevice.setDev_catgory(Constant.MAP_TOPO_DEVCATEGORY.get(deviceItem.elementText("DeviceCategory")));
                    if("Vm".equals(deviceItem.elementText("DeviceCategory"))){
                        topoDevice.setVm_flag(1);
                    }
                    //参数
                    Element paramItems = deviceItem.element("Parameters");
                    
                    String ip = "127.0.0.1";
                    String username = "";
                    String password = "";
                    String uuid = "";
                    if(paramItems != null){
	                    for(Iterator<Element> param_item = paramItems.elementIterator(); param_item.hasNext(); ){
	                    	Element paramItem = (Element)param_item.next();
	                    	Attribute name = paramItem.attribute("name");
	                    	if("IP".equals(name.getStringValue())){
	                    		ip = paramItem.attribute("value").getStringValue();
	                    	}
	                    	if("username".equals(name.getStringValue())){
	                    	    username = paramItem.attribute("value").getStringValue();
                            }
	                    	if("password".equals(name.getStringValue())){
	                    	    password = paramItem.attribute("value").getStringValue();
                            }
	                    	if("uuid".equals(name.getStringValue())){
	                    	    uuid = paramItem.attribute("value").getStringValue();
                            }
	                    }
                    }
                    topoDevice.setUsername(username);
                    topoDevice.setPassword(password);
                    topoDevice.setUuid(uuid);
                    topoDevice.setIp(ip);
                    topoDevice.setDev_problem("");
                    topoDevice.setTask_id(taskId);
                    devList.add(topoDevice);
                }
                netTopoMapper.saveTopoDevices(devList);
                
                //循环获取设备间连接关系
                for(Iterator<Element> iter_conn = connections.elementIterator(); iter_conn.hasNext(); ){
                    Element deviceConnItem = (Element)iter_conn.next();
                    TopoDeviceConn topoDeviceConn = new TopoDeviceConn();
                    topoDeviceConn.setDeva_id(deviceConnItem.elementText("DeviceA_ID"));
                    topoDeviceConn.setDevb_id(deviceConnItem.elementText("DeviceB_ID"));
                    topoDeviceConn.setConn_problem("");
                    topoDeviceConn.setTask_id(taskId);
                    connList.add(topoDeviceConn);
                }
                netTopoMapper.saveTopoDeviceConns(connList);
            }
            
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (DocumentException e) {
            e.printStackTrace();
        }
    }

    
    public String getTopoResult(String taskid) {
        //从数据库取拓扑数据信息
        List<TopoDevice> devList = netTopoMapper.getDevList(taskid);
        List<TopoDeviceConn> connList = netTopoMapper.getConnList(taskid);
        
        List<Map<String, String>> listNode = new ArrayList<Map<String, String>>();
        List<Map<String, String>> listLine = new ArrayList<Map<String, String>>();
        Map<String, String> map = null;
        //节点
        for(int i=0; i<devList.size(); i++){
            map = new HashMap<String, String>();
            TopoDevice topoDevice = (TopoDevice)devList.get(i);
            map.put("key", topoDevice.getDev_id());
            map.put("ip", topoDevice.getIp());
            map.put("text", topoDevice.getIp());
            //map.put("text", topoDevice.getDev_name());
            map.put("type", topoDevice.getDev_catgory());
            map.put("problem", topoDevice.getDev_problem());
            listNode.add(map);
        }
        
        //线条
        for(int i=0; i<connList.size(); i++){
            map = new HashMap<String, String>();
            TopoDeviceConn topoDeviceConn = (TopoDeviceConn)connList.get(i);
            map.put("from", topoDeviceConn.getDevb_id());
            map.put("to", topoDeviceConn.getDeva_id());
            map.put("problem", topoDeviceConn.getConn_problem());
            listLine.add(map);
        }
        
        JSONObject jo = new JSONObject();
        jo.put("nodeDataArray", listNode);
        jo.put("linkDataArray", listLine);
        
        return jo.toString();
    }

    /**
     * 根据任务id获取topo设备信息
     * @param taskid
     * @return
     * @author hekun
     * @version V1.0
     */
    public  List<TopoDevice> getTopoDeviceList(String taskid){
    	 List<TopoDevice> devList = netTopoMapper.getDevList(taskid);
    	 return devList;
    }
}
