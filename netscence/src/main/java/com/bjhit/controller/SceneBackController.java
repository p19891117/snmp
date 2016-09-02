package com.bjhit.controller;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;
import kafka.producer.ProducerConfig;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bjhit.dao.model.BackupInfoVo;
import com.bjhit.dao.model.ComplexDataVo;
import com.bjhit.dao.model.SceneInfo;
import com.bjhit.dao.model.TopoDevice;
import com.bjhit.dao.model.Task;
import com.bjhit.jws.JwsFlowDevClient;
import com.bjhit.jws.JwsThread;
import com.bjhit.service.KafkaProperties;
import com.bjhit.service.NetTopoServiceImpl;
import com.bjhit.service.ScenceBackService;
import com.bjhit.service.TaskServiceImpl;
import com.bjhit.service.VerifyTaskServiceImpl;
import com.bjhit.util.Constant;
import com.bjhit.util.Pinger;

@Controller
@RequestMapping("/sceneBackctrl")
public class SceneBackController {
    @Autowired
    private ScenceBackService scenceBackService;
    @Autowired
    private TaskServiceImpl taskService;
    
    private static Logger logger = Logger.getLogger(TaskController.class); // 类名

    @Autowired
    private NetTopoServiceImpl netTopoService;
    
	@Autowired
	private VerifyTaskServiceImpl verTaskService;
	
    
    /**
     * 跳转到场景回溯1页面
     * 
     * @return
     */
    @RequestMapping("/toSceneBack1")
    public String toSceneBack1(@RequestParam("id") String id, @RequestParam("taskName") String taskName, Model model) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Task task = taskService.getTaskById(Integer.parseInt(id));
        model.addAttribute("startime", sdf.format(task.getStarTime()));
        model.addAttribute("endtime", sdf.format(task.getEndTime()));
        model.addAttribute("task", task);
        model.addAttribute("taskName" , taskName);
        return "sceneBack/sceneBack1";
    }

    private Properties pCFG() {
        Properties props = new Properties();
        props.put("metadata.broker.list", "kafka1:9092,kafka2:9092,kafka3:9092");// 设置broker列表
        props.put("serializer.class", "kafka.serializer.StringEncoder");// 设置序列化方法
        props.put("request.required.acks", "1");// 设置ack,要求broker leader
        props.put(" producer.type", "sync");
        return props;
    }

    /**
     * 恢复设备信息
     * 
     * @param id
     * @param printWriter
     */
    @RequestMapping("/recover")
    public void recover(@RequestParam("id") String id, String scnid, PrintWriter printWriter) {
        List<BackupInfoVo> backupList_ = scenceBackService.getBackupByTaskid(id, scnid);
        StringBuffer showInfo = new StringBuffer();
        if(backupList_.size() > 0){
            for(int i=0; i<backupList_.size(); i++){
                BackupInfoVo vo = backupList_.get(i);
                showInfo.append("设备IP：");
                showInfo.append(vo.getIp());
                showInfo.append(" ， 恢复信息：");
                showInfo.append(vo.getInfo());
                showInfo.append("<br>");
            }
            System.out.println("加载数据成功:" + showInfo.toString());
        }else{
            Producer<String, String> producer = new Producer<String, String>(new ProducerConfig(pCFG()));// 声明并定义生产者
            // 防止producer创建为完成而进行发送数据
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e1) {
                e1.printStackTrace();
            }
            String taskScnId = id + "," + scnid;
            KeyedMessage<String, String> data = new KeyedMessage<String, String>(KafkaProperties.recover_topic, "recover#" + taskScnId + "#1"); // 构造传输的消息
            producer.send(data);// 默认同步发送
            producer.close();
    
            Object lock = new Object();
            synchronized (Constant.kafka_value_lock_recover) {
                Constant.kafka_lock_recover.put(taskScnId, lock);
            }
            synchronized (lock) {
                try {
                    logger.info(taskScnId + " wait " + Constant.TASKLOAD_TIMEOUT * 2 * 10 + " second !");
                    lock.wait(Constant.TASKLOAD_TIMEOUT * 1000 * 2 * 10);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            boolean flag = false;
            
            synchronized (Constant.kafka_value_lock_recover) {
                Object taskStartResult = Constant.kafka_lock_recover.remove(taskScnId);
                if (taskStartResult != null) {
                    logger.info(taskScnId + " task notified timeout!");
                } else {
                    flag = true;
                    logger.info(taskScnId + " success!");
                }
            }
            
            if (flag) {
                // 加载backup相关信息
                List<BackupInfoVo> backupList = scenceBackService.getBackupByTaskid(id, scnid);
                for(int i=0; i<backupList.size(); i++){
                    BackupInfoVo vo = backupList.get(i);
                    showInfo.append("设备IP：");
                    showInfo.append(vo.getIp());
                    showInfo.append(" ， 恢复信息：");
                    showInfo.append(vo.getInfo());
                    showInfo.append("<br>");
                }
                System.out.println("加载数据成功:" + showInfo.toString());
            } else {
                // 超时失败怎么处理
                showInfo.append("恢复失败!");
            }
        }
        
        printWriter.print(showInfo.toString());
        printWriter.flush();
        printWriter.close();
    }

    /**
     * 跳转到场景回溯2页面
     * 
     * @return
     */
    @RequestMapping("/toSceneBack2")
    public String toSceneBack2(@RequestParam("id") String id, String scnid, String ipScen, Model model) {
        String result = netTopoService.getTopoResult(id);
        Task task = taskService.getTaskById(Integer.parseInt(id));
        model.addAttribute("result", result);
        model.addAttribute("scnid", scnid);
        model.addAttribute("ip", ipScen);
        model.addAttribute("taskName", task.getName());
        model.addAttribute("taskid", id);
        return "sceneBack/sceneBack2";
    }

    /**
     * 网络拓扑恢复
     * @param id
     * @param model
     * @return
     * @author hekun
     * @version V1.0
     */
    @RequestMapping(value="recoveryNetTopo" , method=RequestMethod.POST)
    public void recoveryNetTopo( String id , PrintWriter printWriter){
        List<TopoDevice> topoDeviceList = new ArrayList<TopoDevice>();
        topoDeviceList = netTopoService.getTopoDeviceList(id);
        List<String> infoList = new ArrayList<String>();
        if(topoDeviceList != null){
            for(int i =0;i < topoDeviceList.size() ; i++){
                Pinger pinger = new Pinger(topoDeviceList.get(i).getIp(),4,128);
                boolean flag = pinger.isReachable();
                if(flag){
                    infoList.add("<span style='color:green;'>设备(ip:"+topoDeviceList.get(i).getIp()+")连接正常……</span>");
                }else{
                    infoList.add("<span style='color:red;'>设备(ip:"+topoDeviceList.get(i).getIp()+")连接失败……</span>");
                }
            }
        }
        JSONArray jsonArray = new JSONArray(infoList);
        printWriter.write(jsonArray.toString());
        printWriter.flush();
        printWriter.close();
    }
    /**
     * 跳转到场景回溯3页面
     * 
     * @return
     */
    @RequestMapping("/toSceneBack3")
    public String toSceneBack3(@RequestParam("id") String id,  @RequestParam("scenceId") String scenceId, @RequestParam("ip") String ip, Model model) {
        String result = netTopoService.getTopoResult(id);
        Task task = taskService.getTaskById(Integer.parseInt(id));
        model.addAttribute("task", task);
        model.addAttribute("scenceId", scenceId);
        model.addAttribute("ip", ip);
        model.addAttribute("result", result);
        model.addAttribute("taskid", id);
        model.addAttribute("retback", "0");
        model.addAttribute("starTime", "");
        model.addAttribute("endTime", "");
        model.addAttribute("oldtaskid", "");
        return "sceneBack/sceneBack3";
    }

    @RequestMapping("/flowRun")
    @ResponseBody
    public void flowRun(@RequestParam("id") String id, @RequestParam("starTime")String starTime, @RequestParam("endTime")String endTime, PrintWriter printWriter) {
        JwsFlowDevClient.sendPackets(id, "", starTime, endTime);
        printWriter.flush();
        printWriter.close();
    }

	
    /**
 * 跳转到场景回溯4页面
 * 
 * @return
 */
@RequestMapping("/toSceneBack4")
public String toSceneBack4(String id, Model model) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Map map = new HashMap();
    map.put("task_id", id);
    
    model.addAttribute("sceneInfoList", new JSONArray(verTaskService.listSceneInfo(map)));
    String result = netTopoService.getTopoResult(id);
   
    model.addAttribute("result", result);
    model.addAttribute("id", id);
    model.addAttribute("task", taskService.getTaskById(Integer.valueOf(id)));

    return "sceneBack/sceneBack4";

}
    
    /**
     * 创建子任务，跳转到流量回放页面
     * @param id
     * @param model
     * @return
     * @author hekun
     * @version V1.0
     */
    @RequestMapping("/createChildTask")
	public String createChildTask(@RequestParam("id") String id ,@RequestParam("scenceId") String scenceId ,@RequestParam("ip") String ip , Model model){
    	Task task = taskService.getTaskById(Integer.parseInt(id));
    	//创建子任务
    	task.setId(null);
    	task.setEndTime(null);
    	task.setStarTime(null);
    	task.setParent_taskid(Integer.parseInt(id));
    	task.setName(task.getName()+"_子实验场景："+scenceId);
    	int taskid = taskService.saveCopyTask(task , id);
    	int task_newid = task.getId();
    	List<SceneInfo> sList = scenceBackService.getSceneInfoByscnid(scenceId);
    	SceneInfo si = sList.get(0);
    	Calendar c = Calendar.getInstance();
    	c.setTime(si.getSceTime());
    	c.add(Calendar.SECOND, -1 * task.getBeforWin());
    	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	String starTime = sdf.format(c.getTime());
    	
    	c.setTime(si.getSceTime());
        c.add(Calendar.SECOND, task.getAfterWin());
    	String endTime = sdf.format(c.getTime());
    	
    	Task task_new = taskService.getTaskById(taskid);
    	
    	int r = scenceBackService.handleTask(String.valueOf(task_newid), "1");//启动
    	task_new.setStarTime(new Date());
    	c.setTime(new Date());
        c.add(Calendar.SECOND, task.getBeforWin() + task.getAfterWin());
    	task_new.setEndTime(c.getTime());
        taskService.modifyTask(task_new);
    	
    	String result = netTopoService.getTopoResult(id);
    	model.addAttribute("ip", ip);
        model.addAttribute("task", task_new);
        model.addAttribute("scenceId", scenceId);
        model.addAttribute("result", result);
        model.addAttribute("taskid", task_newid);
        model.addAttribute("oldtaskid", id);
        model.addAttribute("starTime", starTime);
        model.addAttribute("endTime", endTime);
        
        model.addAttribute("retback", "1");
        return "sceneBack/sceneBack3";
	}
    
    /**
     * ajax获取使用率
     * @param task_id
     * @param ip
     * @param printWriter
     */
    @RequestMapping(value = "/getUserd", method = RequestMethod.POST)
    public void getUserd(String task_id, String ip,  PrintWriter printWriter){
        HashMap<String, String> map = new HashMap<String, String>();
        String dev_type = "";
        String gather_id = "0";
        dev_type = taskService.judgeType(task_id, ip);
        if("2".equals(dev_type)){ //路由器
            gather_id = "157";
            map.put("157", "octsUsed");
        }else if("1".equals(dev_type)){//主机
            gather_id = "104";
            map.put("104", "octsUsed");
        }else if("3".equals(dev_type)){//交换机
            gather_id = "194";
            map.put("194", "octsUsed");
        }
        
        int cs = 1;
        
        JSONObject object = new JSONObject();
        double used = 0;
        DecimalFormat df = new DecimalFormat("0.00");
        
        List<ComplexDataVo> ld = null;
        ld = taskService.getCalcOidValue(task_id, ip, Integer.parseInt(gather_id));
        
        if(ld.size() > 0){
            ComplexDataVo vo = (ComplexDataVo)ld.get(0);
            used = Math.abs(Double.parseDouble(vo.getCalc_value())/cs);
        }
        object.put(map.get(gather_id), Double.parseDouble(df.format(used)));
        
        printWriter.write(object.toString());
        printWriter.flush();
        printWriter.close();
    }
    
    @RequestMapping(value = "/getUserdSend", method = RequestMethod.POST)
    public void getUserdSend(String task_id, String ip, PrintWriter printWriter){
        HashMap<String, String> map = new HashMap<String, String>();
        String dev_type = "";
        String gather_id = "0";
        dev_type = taskService.judgeType(task_id, ip);
        if("2".equals(dev_type)){ //路由器
            gather_id = "158";
            map.put("158", "octsSendUsed");
        }else if("1".equals(dev_type)){//主机
            gather_id = "105";
            map.put("105", "octsSendUsed");
        }else if("3".equals(dev_type)){//交换机
            gather_id = "195";
            map.put("195", "octsSendUsed");
        }
        
        int cs = 1;
        
        JSONObject object = new JSONObject();
        double used = 0;
        DecimalFormat df = new DecimalFormat("0.00");
        
        List<ComplexDataVo> ld = null;
        ld = taskService.getCalcOidValue(task_id, ip, Integer.parseInt(gather_id));
        
        if(ld.size() > 0){
            ComplexDataVo vo = (ComplexDataVo)ld.get(0);
            used = Math.abs(Double.parseDouble(vo.getCalc_value())/cs);
        }
        object.put(map.get(gather_id), Double.parseDouble(df.format(used)));
        
        printWriter.write(object.toString());
        printWriter.flush();
        printWriter.close();
    }
}
