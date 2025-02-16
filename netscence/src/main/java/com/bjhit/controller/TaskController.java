package com.bjhit.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.bjhit.dao.model.ComplexDataVo;
import com.bjhit.dao.model.DevData;
import com.bjhit.dao.model.FileBackUp;
import com.bjhit.dao.model.GatherItemTree;
import com.bjhit.dao.model.ScenceFindConfigVo;
import com.bjhit.dao.model.SceneInfo;
import com.bjhit.dao.model.Task;
import com.bjhit.dao.model.TimeLine;
import com.bjhit.dao.model.VmbackClient;
import com.bjhit.dao.model.VmbackServer;
import com.bjhit.jws.JwsFlowDevClient;
import com.bjhit.service.GlobaConfigServiceImpl;
import com.bjhit.service.KafkaProducerService;
import com.bjhit.service.KafkaProperties;
import com.bjhit.service.NetTopoServiceImpl;
import com.bjhit.service.TaskServiceImpl;
import com.bjhit.service.TimelineServiceImpl;
import com.bjhit.service.VerifyTaskServiceImpl;
import com.bjhit.util.Constant;
import com.bjhit.util.Pager;

/**
 * 实验场景记录管理
 * @author lp
 */
@Controller
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private TaskServiceImpl taskService;
    @Autowired
    private GlobaConfigServiceImpl globalConfigService;
    @Autowired
    private VerifyTaskServiceImpl verifyTaskService;
    @Autowired
    private TimelineServiceImpl timelineService;
    @Autowired
    private NetTopoServiceImpl netTopoService;
    @Autowired
    private KafkaProducerService kafkaProducerService;
    
    private static Logger logger = Logger.getLogger(TaskController.class); // 类名
    
    /**
     * 首页中转
     */
    @RequestMapping("mainFrame")
    public String mainFrame(@ModelAttribute Task task, Model model, HttpServletRequest request){
        
        return "main/mainFrame";
    }
    /**
     * 展示实验场景记录列表
     */
    @RequestMapping("tasklist")
    public String taskList(@ModelAttribute Task task, Model model, HttpServletRequest request){
        int start = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
        Pager pager=new Pager();
        pager.setCurrentPage(start);
        task.setStart((start-1)*pager.getPageSize());
        task.setMax(pager.getPageSize());
        Pager p=taskService.getTaskList(task,pager);
        
        model.addAttribute("pager",p.getPagerStr());
        model.addAttribute("task",task);
        model.addAttribute("tasklist", p.getItems());
        
        return "task/task_list";
    }
    /**
     * 展示实验场景回看记录列表
     */
    @RequestMapping("taskHis")
    public String taskHis(@ModelAttribute Task task, Model model, HttpServletRequest request){
        int start = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
        Pager pager=new Pager();
        pager.setCurrentPage(start);
        task.setStart((start-1)*pager.getPageSize());
        task.setMax(pager.getPageSize());
        task.setStatus(4);
        Pager p=taskService.getTaskList(task,pager);
        
        model.addAttribute("pager",p.getPagerStr());
        model.addAttribute("task",task);
        model.addAttribute("tasklist", p.getItems());
        
        return "task/task_his";
    }
    /**
     * 展示实验场景回溯记录列表
     */
    @RequestMapping("taskBack")
    public String taskBack(@ModelAttribute Task task, Model model, HttpServletRequest request){
        int start = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
        Pager pager=new Pager();
        pager.setCurrentPage(start);
        task.setStart((start-1)*pager.getPageSize());
        task.setMax(pager.getPageSize());
        Pager p=taskService.getTaskList_hs(task,pager);
        
        model.addAttribute("pager",p.getPagerStr());
        model.addAttribute("task",task);
        model.addAttribute("tasklist", p.getItems());
        
        return "task/task_back";
    }
    /**
     * 跳转到添加实验场景记录页面
     */
    @SuppressWarnings("rawtypes")
    @RequestMapping(value="addtask", method=RequestMethod.GET)
    public String addTask(@ModelAttribute Task task, Model model){
        List<Map> dev_conf_list = globalConfigService.getConfListByType();
        model.addAttribute("devConfList", dev_conf_list);
        model.addAttribute("fileflag","add");
        return "task/add_task";
    }
    
    /**
     * 添加实验场景记录
     */
    @SuppressWarnings("rawtypes")
    @RequestMapping(value="addtask", method=RequestMethod.POST)
    public String addTask(@Validated Task task,BindingResult br,MultipartFile topofile, Model model, HttpServletRequest request){
        if(topofile == null || "".equals(topofile.getName())){
            return "redirect:tasklist";
        }
        // 文件保存路径  
        String filePath = request.getSession().getServletContext().getRealPath("/") + "upload/"  
                + topofile.getOriginalFilename();  
        // 转存文件  
        File file = new File(filePath);
        if(file.exists()){
            file.delete();
        }
        try {
            topofile.transferTo(file);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
        }  
        
        if(br.hasErrors()){ // 服务器验证
            List<Map> dev_conf_list = globalConfigService.getConfListByType();
            model.addAttribute("devConfList", dev_conf_list);
            return "task/add_task";
        }
        
        int taskId = taskService.saveTask(task, file);
        //taskService.addTimer(task); //一旦重启，任务就丢失，放弃此方案
        file.delete();
        return "redirect:tasklist";
    }
    
    /**
     * 跳转到修改实验场景记录页面
     */
    @SuppressWarnings("rawtypes")
    @RequestMapping(value="edittask", method=RequestMethod.GET)
    public String editTask(String taskid, @ModelAttribute Task task, Model model){
        List<Map> dev_conf_list = taskService.getTaskConfList(new Integer(taskid));
        model.addAttribute("devConfList", dev_conf_list);
        task = taskService.getTaskById(new Integer(taskid));
        model.addAttribute(task);
        model.addAttribute("fileflag","modify");
        return "task/add_task";
    }
    
    /**
     * 跳转到详情实验场景记录页面
     */
    @SuppressWarnings("rawtypes")
    @RequestMapping(value="detailtask", method=RequestMethod.GET)
    public String detailtask(String taskid, @ModelAttribute Task task, Model model){
        List<Map> dev_conf_list = taskService.getTaskConfList(new Integer(taskid));
        model.addAttribute("devConfList", dev_conf_list);
        task = taskService.getTaskById(new Integer(taskid));
        model.addAttribute(task);
        model.addAttribute("fileflag","detail");
        return "task/add_task";
    }
    
    /**
     * 修改实验场景记录页面
     */
    @RequestMapping(value="edittask", method=RequestMethod.POST)
    public String editTask(@Validated Task task, BindingResult br){
        taskService.modifyTask(task);
        return "redirect:tasklist";
    }
    
    /**
     * 删除实验场景记录
     */
    @RequestMapping(value="deletetask", method=RequestMethod.GET)
    public String deleteTask(String taskid){
        taskService.deleteTask(taskid);
        return "redirect:tasklist";
    }
    
    /**
     * 跳转到展示实验场景记录页面
     */
    @RequestMapping(value="showtask_", method=RequestMethod.GET)
    public String showtask_(String taskid, @ModelAttribute Task task, Model model){
        task = taskService.getTaskById(new Integer(taskid));
        List<SceneInfo> sceneInfo_list = verifyTaskService.listSceneInfo(taskid);
        TimeLine timeLine = timelineService.timeLine(task, sceneInfo_list);
        String result = netTopoService.getTopoResult(taskid);
        model.addAttribute(task);
        model.addAttribute(timeLine);
        model.addAttribute("result", result);
        model.addAttribute("handleResult", "noMsg");
        return "task/show_task";
    }
    
    /**
     * 跳转到展示实验场景记录页面
     */
    @RequestMapping(value="showtask", method=RequestMethod.GET)
    public String showtask(String taskid, String tabpage,@ModelAttribute Task task, Model model){
        int tab = 1;
        if(tabpage != null && !"".equals(tabpage)){
            tab = Integer.parseInt(tabpage);
        }
        if(tab==1){
            model.addAttribute("tabpage",tab);
            task = taskService.getTaskById(new Integer(taskid));
            String result = netTopoService.getTopoResult(taskid);
            model.addAttribute(task);
            model.addAttribute("result", result);
            model.addAttribute("handleResult", "noMsg");
        }else if(tab==2){
            model.addAttribute("tabpage",tab);
            task = taskService.getTaskById(new Integer(taskid));
            String result = netTopoService.getTopoResult(taskid);
            model.addAttribute(task);
            model.addAttribute("handleResult", "noMsg");
            model.addAttribute("result", result);
        }
        return "task/show_task";
    }
    
    /**
     * 跳转到配置实验场景记录页面
     */
    @RequestMapping(value="configtask", method=RequestMethod.GET)
    public String configtask(String taskid, @ModelAttribute Task task, Model model){
        task = taskService.getTaskById(new Integer(taskid));
        String result = netTopoService.getTopoResult(taskid);
        model.addAttribute(task);
        model.addAttribute("result", result);
        model.addAttribute("handleResult", "noMsg");
        return "task/conf_task";
    }
    
    /**
     * 获取采集项
     */
    @RequestMapping(value = "/ajaxGetDevInfo", method = RequestMethod.GET)
    public void ajaxGetDevInfo(String id, String ip, PrintWriter printWriter){
        JSONObject object = new JSONObject();
        List<Map> gatherlist = taskService.ajaxGetDevInfo(id, ip);
        List<ScenceFindConfigVo> findList = taskService.getFindConfigList(id, ip);
        
        object.put("gatherlist", object.valueToString(gatherlist));
        object.put("findList", object.valueToString(findList));
        object.put("status", "success");
        
        printWriter.write(object.toString());
        printWriter.flush();
        printWriter.close();
    }
    
    /**
     * 服务的打开ssh
     */
    @RequestMapping(value = "/ajaxOpenSsh", method = RequestMethod.GET)
    public void ajaxOpenSsh(String ip, PrintWriter printWriter){
        String workDir=System.getProperty("user.dir");  
        System.out.println(workDir);  
        String startCmd="cmd /c start telnet 192.168.2.252"; 
        Process p2 = null;  
        try {  
            p2=Runtime.getRuntime().exec(startCmd);  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        
        JSONObject object = new JSONObject();
        printWriter.write(object.toString());
        printWriter.flush();
        printWriter.close();
    }
    
    /**
     * 保存发现策略
     * @param id
     * @param type
     * @param printWriter
     */
    @RequestMapping(value = "/ajaxSaveFindInfo", method = RequestMethod.GET)
    public void ajaxSaveFindInfo(ScenceFindConfigVo vo, PrintWriter printWriter){
        JSONObject object = new JSONObject();
        List<ScenceFindConfigVo> findListExists = taskService.getFindListExists(vo);
        if(findListExists.size() > 0){
            object.put("status", "failed");
            object.put("info", "保存失败，此规则已经存在！");
        }else{
            int result = taskService.saveFindConfig(vo);
            List<ScenceFindConfigVo> findList = taskService.getFindConfigList(String.valueOf(vo.getTask_id()), vo.getIp());
            object.put("findList", object.valueToString(findList));
            object.put("status", "success");
            object.put("info", "保存成功！");
        }
        
        printWriter.write(object.toString());
        printWriter.flush();
        printWriter.close();
    }
    
    /**
     * 获取发现策略
     * @param id
     * @param type
     * @param printWriter
     */
    @RequestMapping(value = "/getConfScen", method = RequestMethod.POST)
    public void getConfScen(String id, PrintWriter printWriter){
        JSONObject object = new JSONObject();
        ScenceFindConfigVo vo = new ScenceFindConfigVo();
        vo.setTask_id(Integer.parseInt(id));
        List<ScenceFindConfigVo> findListExists = taskService.getFindListExists(vo);
        if(findListExists.size() > 0){
            object.put("has", "1");
        }else{
            object.put("has", "0");
            object.put("info", "请先设置场景发现规则，再启动！");
        }
        printWriter.write(object.toString());
        printWriter.flush();
        printWriter.close();
    }
    
    /**
     * 获取发现策略
     * @param id
     * @param type
     * @param printWriter
     */
    @RequestMapping(value = "/flowGather", method = RequestMethod.POST)
    public void flowGather(String id, PrintWriter printWriter){
        JSONObject object = new JSONObject();
        JwsFlowDevClient.capPackets("1", id);
        printWriter.write(object.toString());
        printWriter.flush();
        printWriter.close();
    }
    
    /**
     * 删除发现策略
     * @param id
     * @param type
     * @param printWriter
     */
    @RequestMapping(value = "/deleteFind", method = RequestMethod.GET)
    public void deleteFind(String id, String task_id, String ip, PrintWriter printWriter){
        JSONObject object = new JSONObject();
        int result = taskService.deleteFind(id);
        List<ScenceFindConfigVo> findList = taskService.getFindConfigList(task_id, ip);
        object.put("findList", object.valueToString(findList));
        if(result > 0){
            object.put("status", "success");
            object.put("info", "删除成功！");
        }else{
            object.put("status", "failed");
            object.put("info", "删除失败！");
        }
        
        printWriter.write(object.toString());
        printWriter.flush();
        printWriter.close();
    }
    
    /**
     * 操作实验场景
     * @param task
     * @return
     */
    @RequestMapping(value="handle", method=RequestMethod.GET)
    public String handle(String id, String type, Model model){
        String handleResult = "操作失败！";
        String taskStartResult = null;
        Task task = taskService.getTaskById(new Integer(id));
        
        if(task.getStatus() == 2 && "1".equals(type)){
            handleResult = "已经启动！";
        }else if(task.getStatus() == 3 && "2".equals(type)){
            handleResult = "已经暂停！";
        }else if(task.getStatus() == 4 && "3".equals(type)){
            handleResult = "已经终止！";
        }else if(task.getStatus() == 2 && "4".equals(type)){
            handleResult = "已经启动！";
        }else {
            //kafka  发送kafka任务号
            if("1".equals(type)){
                kafkaProducerService.createOrWriteTopic(id);
                /**
                 * 获取线程中kafka消息值
                 */
                
                Object lock = new Object();
                Constant.kafka_lock_taskresult.put(id, lock);
                synchronized (lock) {
                    try {
                        logger.info(id + " wait " + Constant.TASKLOAD_TIMEOUT + " second !");
                        lock.wait(Constant.TASKLOAD_TIMEOUT * 1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                synchronized (Constant.kafka_value_lock_taskresult) {
                    Constant.kafka_lock_taskresult.remove(id); //移除全局锁
                    taskStartResult = Constant.kafka_value_taskresult.get(id);
                
                    if(taskStartResult != null){
                        Constant.kafka_value_taskresult.remove(id); //移除全局值
                    }else{
                        logger.info(id + " task notified timeout!");
                    }
                }
            }
            if("1".equals(type) && !"1".equals(taskStartResult)){
                handleResult = "任务加载失败！";
            }else{
                //kafka
                kafkaProducerService.createOrWriteTopic(KafkaProperties.web_command, id + "#0" + type);
                /**
                 * 获取线程中kafka消息值
                 */
                Object lock = new Object();
                Constant.kafka_lock.put(id, lock);
                synchronized (lock) {
                    try {
                        logger.info(id + " wait " + Constant.FINDCOMMAND_TIMEOUT + " second !");
                        lock.wait(Constant.FINDCOMMAND_TIMEOUT * 1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                String value = null;
                synchronized (Constant.kafka_value_lock) {
                    Constant.kafka_lock.remove(id); //移除全局锁
                    value = Constant.kafka_value.get(id);
                
                    if(value != null){
                        Constant.kafka_value.remove(id); //移除全局值
                    }else{
                        logger.info(id + " task notified timeout!");
                    }
                }
                handleResult = taskService.updateTaskById(id, value);
            }
            
            task = taskService.getTaskById(new Integer(id));
            //List<SceneInfo> sceneInfo_list = verifyTaskService.listSceneInfo(id);
            //TimeLine timeLine = timelineService.timeLine(task, sceneInfo_list);
            String result = netTopoService.getTopoResult(id);
            model.addAttribute(task);
            //model.addAttribute(timeLine);
            
            if("1".equals(type) || "4".equals(type)){
                if(handleResult.indexOf("成功") > 0){
                    model.addAttribute("flow", "1");
                }
            }
            model.addAttribute("result", result);
            model.addAttribute("tabpage", "1");
            model.addAttribute("handleResult", handleResult);
        }
        return "task/show_task";
    }
    
    /**
     * 获取oid当前采集值
     * @param taskid
     * @param ip
     * @param oid
     * @return
     */
    private String getOidValue(String taskid, String ip, String oid){
        List<String> oidList = null;
        DevData devdata = null;
        List syslist = null;
        String value = "";
        oidList = new ArrayList<String>();
        oidList.add(oid); 
        syslist = taskService.getDevData(taskid, ip, oidList, 0, 1);
        if(syslist.size() > 0){
            devdata = (DevData)syslist.get(0);
            value = devdata.getValue();
        }
        return value;
    }
    
    /**
     * 获取某个设备的采集信息
     * @param nodekey
     * @param printWriter
     */
    @RequestMapping(value="getNodeInfo", method=RequestMethod.GET)
    public String getNodeInfo(String taskid, String ip, String tabpage, Model model){
        int tab = 1;
        if(tabpage != null && !"".equals(tabpage)){
            tab = Integer.parseInt(tabpage);
        }
        model.addAttribute("tabpage",tabpage);
        model.addAttribute("ip",ip);
        model.addAttribute("taskid",taskid);
        List<String> multiOidList = new ArrayList();
        List batchList = new ArrayList();
        List<String> oidList = new ArrayList();
        List valueList = new ArrayList();
        List multiList = new ArrayList();
        HashMap oid_en = new HashMap();
        String type = taskService.judgeType(taskid, ip);
        String result = null;
        if("2".equals(type)){
             if(tab == 1){
                  //基本信息
                 oidList.add("1.3.6.1.2.1.1.1.0");
                 oid_en.put("1.3.6.1.2.1.1.1.0", "sysDescr");
                 oidList.add("1.3.6.1.2.1.1.5.0");
                 oid_en.put("1.3.6.1.2.1.1.5.0", "sysName");
                 oidList.add("1.3.6.1.2.1.1.3.0");
                 oid_en.put("1.3.6.1.2.1.1.3.0", "sysUpTime");
             }else if(tab == 2){
              /*******************ip报文信息************************/
                 //成功发送已输入的数据报数目
                 oidList.add("1.3.6.1.2.1.4.9.0");
                 oid_en.put("1.3.6.1.2.1.4.9.0", "ipInDelivers");
                 //缓存空间不足丢弃的接收报文数
                 oidList.add("1.3.6.1.2.1.4.8.0");
                 oid_en.put("1.3.6.1.2.1.4.8.0", "ipInDiscards");
                 //未知或不支持的协议而丢弃的报文的数量
                 oidList.add("1.3.6.1.2.1.4.7.0");
                 oid_en.put("1.3.6.1.2.1.4.7.0", "ipInUnknownProtos");
                 //转发的IP数据报数目
                 oidList.add("1.3.6.1.2.1.4.6.0");
                 oid_en.put("1.3.6.1.2.1.4.6.0", "ipForwDatagrams");
                 //无效目的地址数据报总数
                 oidList.add("1.3.6.1.2.1.4.5.0");
                 oid_en.put("1.3.6.1.2.1.4.5.0", "ipInAddrErrors");
                 //报头错误报总数
                 oidList.add("1.3.6.1.2.1.4.4.0");
                 oid_en.put("1.3.6.1.2.1.4.4.0", "ipInHdrErrors");
                 //接收到的数据报(包括错误数据报)总数
                 oidList.add("1.3.6.1.2.1.4.3.0");
                 oid_en.put("1.3.6.1.2.1.4.3.0", "ipInReceives");
                 //是否作为IP网关
                 oidList.add("1.3.6.1.2.1.4.1.0");
                 oid_en.put("1.3.6.1.2.1.4.1.0", "ipForwarding");
              /*******************路由表信息************************/
                 //路由信息
                 oidList.add("1.3.6.1.2.1.4.21.1");
              /*******************TCP************************/
                 //收到的报文段总数
                 oidList.add("1.3.6.1.2.1.6.10.0");
                 oid_en.put("1.3.6.1.2.1.6.10.0", "tcpInSegs");
                 //发送的报文段总数
                 oidList.add("1.3.6.1.2.1.6.11.0");
                 oid_en.put("1.3.6.1.2.1.6.11.0", "tcpOutSegs");
                 //可支持的最大TCP连接数
                 oidList.add("1.3.6.1.2.1.6.4.0");
                 oid_en.put("1.3.6.1.2.1.6.4.0", "tcpMaxConn");
              /*******************UDP************************/
                 //UDP输入报文统计
                 oidList.add("1.3.6.1.2.1.7.1.0");
                 oid_en.put("1.3.6.1.2.1.7.1.0", "udpInDatagrams");
                 //接收错误数据报数
                 oidList.add("1.3.6.1.2.1.7.3.0");
                 oid_en.put("1.3.6.1.2.1.7.3.0", "udpInErrors");
                 //发送的UDP数据报总数
                 oidList.add("1.3.6.1.2.1.7.4.0");
                 oid_en.put("1.3.6.1.2.1.7.4.0", "udpOutDatagrams");
             }else if(tab == 3){
                 
             }else if(tab == 4){
                 //tcp信息
                 oidList.add("1.3.6.1.2.1.6.4.0");
                 oid_en.put("1.3.6.1.2.1.6.4.0", "tcpMaxConn");
                 oidList.add("1.3.6.1.2.1.6.11.0");
                 oid_en.put("1.3.6.1.2.1.6.11.0", "tcpOutSegs");
                 oidList.add("1.3.6.1.2.1.6.10.0");
                 oid_en.put("1.3.6.1.2.1.6.10.0", "tcpInSegs");
                 oidList.add("1.3.6.1.2.1.6.14.0");
                 oid_en.put("1.3.6.1.2.1.6.14.0", "tcpInErrs");
                 oidList.add("1.3.6.1.2.1.6.15.0");
                 oid_en.put("1.3.6.1.2.1.6.15.0", "tcpOutRsts");
                 
                 //tcp信息
                 oidList.add("1.3.6.1.2.1.6.13.1");
             }else if(tab == 5){
                 //udp信息            
                 oidList.add("1.3.6.1.2.1.7.1.0");
                 oid_en.put("1.3.6.1.2.1.7.1.0", "udpInDatagrams");
                 oidList.add("1.3.6.1.2.1.7.2.0");
                 oid_en.put("1.3.6.1.2.1.7.2.0", "udpNoPorts");
                 oidList.add("1.3.6.1.2.1.7.3.0");
                 oid_en.put("1.3.6.1.2.1.7.3.0", "udpInErrors");
                 oidList.add("1.3.6.1.2.1.7.4.0");
                 oid_en.put("1.3.6.1.2.1.7.4.0", "udpOutDatagrams");
                 
                 //upd信息
                 oidList.add("1.3.6.1.2.1.7.5.1");
             }else if(tab == 6){
                 //进程信息
                 oidList.add("1.3.6.1.2.1.25.4.2.1");
                 //设备信息
                 oidList.add("1.3.6.1.2.1.25.3.2.1");
                 //安装程序信息
                 oidList.add("1.3.6.1.2.1.25.6.3.1");
                 //运行程序占CPU，内存信息
                 oidList.add("1.3.6.1.2.1.25.5.1.1");
             }
        }else if("1".equals(type)){
             if(tab == 1){
                 //基本信息
                 oidList.add("1.3.6.1.2.1.1.1.0");
                 oid_en.put("1.3.6.1.2.1.1.1.0", "sysDescr");
                 oidList.add("1.3.6.1.2.1.1.4.0");
                 oid_en.put("1.3.6.1.2.1.1.4.0", "sysContact");
                 oidList.add("1.3.6.1.2.1.1.5.0");
                 oid_en.put("1.3.6.1.2.1.1.5.0", "sysName");
                 oidList.add("1.3.6.1.2.1.25.1.5.0");
                 oid_en.put("1.3.6.1.2.1.25.1.5.0", "hrSystemNumUsers");
                 oidList.add("1.3.6.1.2.1.25.1.6.0");
                 oid_en.put("1.3.6.1.2.1.25.1.6.0", "hrSystemProcesses");
                 oidList.add("1.3.6.1.2.1.1.7.0");
                 oid_en.put("1.3.6.1.2.1.1.7.0", "sysServices");
                 oidList.add("1.3.6.1.2.1.2.1.0");
                 oid_en.put("1.3.6.1.2.1.2.1.0", "ifNumber");
                 
                 //硬盘使用大小
                 oidList.add("1.3.6.1.2.1.25.2.3.1");
             }else if(tab == 2){
                 //ip信息
                 oidList.add("1.3.6.1.2.1.4.20.1");
                 //if信息
                 oidList.add("1.3.6.1.2.1.2.2.1");
                 //路由信息
                 oidList.add("1.3.6.1.2.1.4.21.1");
             }else if(tab == 3){
                 
             }else if(tab == 4){
                 //tcp信息
                 oidList.add("1.3.6.1.2.1.6.4.0");
                 oid_en.put("1.3.6.1.2.1.6.4.0", "tcpMaxConn");
                 oidList.add("1.3.6.1.2.1.6.11.0");
                 oid_en.put("1.3.6.1.2.1.6.11.0", "tcpOutSegs");
                 oidList.add("1.3.6.1.2.1.6.10.0");
                 oid_en.put("1.3.6.1.2.1.6.10.0", "tcpInSegs");
                 oidList.add("1.3.6.1.2.1.6.14.0");
                 oid_en.put("1.3.6.1.2.1.6.14.0", "tcpInErrs");
                 oidList.add("1.3.6.1.2.1.6.15.0");
                 oid_en.put("1.3.6.1.2.1.6.15.0", "tcpOutRsts");
                 
                 //tcp信息
                 oidList.add("1.3.6.1.2.1.6.13.1");
             }else if(tab == 5){
                 //udp信息            
                 oidList.add("1.3.6.1.2.1.7.1.0");
                 oid_en.put("1.3.6.1.2.1.7.1.0", "udpInDatagrams");
                 oidList.add("1.3.6.1.2.1.7.2.0");
                 oid_en.put("1.3.6.1.2.1.7.2.0", "udpNoPorts");
                 oidList.add("1.3.6.1.2.1.7.3.0");
                 oid_en.put("1.3.6.1.2.1.7.3.0", "udpInErrors");
                 oidList.add("1.3.6.1.2.1.7.4.0");
                 oid_en.put("1.3.6.1.2.1.7.4.0", "udpOutDatagrams");
                 
                 //upd信息
                 oidList.add("1.3.6.1.2.1.7.5.1");
             }else if(tab == 6){
                 //进程信息
                 oidList.add("1.3.6.1.2.1.25.4.2.1");
                 //设备信息
                 oidList.add("1.3.6.1.2.1.25.3.2.1");
                 //安装程序信息
                 oidList.add("1.3.6.1.2.1.25.6.3.1");
                 //运行程序占CPU，内存信息
                 oidList.add("1.3.6.1.2.1.25.5.1.1");
             }
             if(tab == 4){
                 //tcp报文
                 multiOidList.add("1.3.6.1.2.1.6.10.0");
                 multiOidList.add("1.3.6.1.2.1.6.11.0");
                 multiOidList.add("1.3.6.1.2.1.6.14.0");
                 multiOidList.add("1.3.6.1.2.1.6.15.0");
             }else if(tab == 5){
                 //udp报文
                 multiOidList.add("1.3.6.1.2.1.7.1.0");
                 multiOidList.add("1.3.6.1.2.1.7.2.0");
                 multiOidList.add("1.3.6.1.2.1.7.3.0");
                 multiOidList.add("1.3.6.1.2.1.7.4.0");
             }
             
             if(tab == 4 || tab == 5){
                 List<String> listb = new ArrayList();
                 String time = "";
                 batchList = taskService.getLastBatchs(taskid, ip, 10); //去倒数的1 - 10 批次数据
                 
                 if(batchList.size() > 0){
                     SimpleDateFormat df = new SimpleDateFormat("HH:mm:ss");
                     String batch = "";
                     for(int i=batchList.size() - 1;i>=0; i--){
                         DevData dev = (DevData)batchList.get(i);
                         batch = String.valueOf(dev.getBatch());
                         listb.add(batch);
                         if(i != batchList.size() - 1){
                             time += ",";
                         }
                         time += ("'" + df.format(dev.getBatchTime()) + "'");
                     }
                 }
                 if(listb.size() > 0){
                     multiList = taskService.getMultiData(taskid, ip, multiOidList, listb);
                 }
                 
                 if(multiList.size() > 0){
                     Map map = taskService.getMultiOidInfo(multiList, listb);
                     model.addAllAttributes(map);
                 }
                 model.addAttribute("time", time);
             }
        }else if("3".equals(type)){
         if(tab == 1){
          //基本信息
            oidList.add("1.3.6.1.2.1.1.1.0");
            oid_en.put("1.3.6.1.2.1.1.1.0", "sysDescr");
            oidList.add("1.3.6.1.2.1.1.5.0");
            oid_en.put("1.3.6.1.2.1.1.5.0", "sysName");
            oidList.add("1.3.6.1.2.1.1.3.0");
            oid_en.put("1.3.6.1.2.1.1.3.0", "sysUpTime");
        }else if(tab == 2){
         /*******************ip报文信息************************/
            //成功发送已输入的数据报数目
            oidList.add("1.3.6.1.2.1.4.9.0");
            oid_en.put("1.3.6.1.2.1.4.9.0", "ipInDelivers");
            //缓存空间不足丢弃的接收报文数
            oidList.add("1.3.6.1.2.1.4.8.0");
            oid_en.put("1.3.6.1.2.1.4.8.0", "ipInDiscards");
            //未知或不支持的协议而丢弃的报文的数量
            oidList.add("1.3.6.1.2.1.4.7.0");
            oid_en.put("1.3.6.1.2.1.4.7.0", "ipInUnknownProtos");
            //转发的IP数据报数目
            oidList.add("1.3.6.1.2.1.4.6.0");
            oid_en.put("1.3.6.1.2.1.4.6.0", "ipForwDatagrams");
            //无效目的地址数据报总数
            oidList.add("1.3.6.1.2.1.4.5.0");
            oid_en.put("1.3.6.1.2.1.4.5.0", "ipInAddrErrors");
            //报头错误报总数
            oidList.add("1.3.6.1.2.1.4.4.0");
            oid_en.put("1.3.6.1.2.1.4.4.0", "ipInHdrErrors");
            //接收到的数据报(包括错误数据报)总数
            oidList.add("1.3.6.1.2.1.4.3.0");
            oid_en.put("1.3.6.1.2.1.4.3.0", "ipInReceives");
            //是否作为IP网关
            oidList.add("1.3.6.1.2.1.4.1.0");
            oid_en.put("1.3.6.1.2.1.4.1.0", "ipForwarding");
         /*******************路由表信息************************/
            //路由信息
            oidList.add("1.3.6.1.2.1.4.21.1");
         /*******************TCP************************/
            //收到的报文段总数
            oidList.add("1.3.6.1.2.1.6.10.0");
            oid_en.put("1.3.6.1.2.1.6.10.0", "tcpInSegs");
            //发送的报文段总数
            oidList.add("1.3.6.1.2.1.6.11.0");
            oid_en.put("1.3.6.1.2.1.6.11.0", "tcpOutSegs");
            //可支持的最大TCP连接数
            oidList.add("1.3.6.1.2.1.6.4.0");
            oid_en.put("1.3.6.1.2.1.6.4.0", "tcpMaxConn");
         /*******************UDP************************/
            //UDP输入报文统计
            oidList.add("1.3.6.1.2.1.7.1.0");
            oid_en.put("1.3.6.1.2.1.7.1.0", "udpInDatagrams");
            //接收错误数据报数
            oidList.add("1.3.6.1.2.1.7.3.0");
            oid_en.put("1.3.6.1.2.1.7.3.0", "udpInErrors");
            //发送的UDP数据报总数
            oidList.add("1.3.6.1.2.1.7.4.0");
            oid_en.put("1.3.6.1.2.1.7.4.0", "udpOutDatagrams");
        }else if(tab == 3){
            
        }else if(tab == 4){
            //tcp信息
            oidList.add("1.3.6.1.2.1.6.4.0");
            oid_en.put("1.3.6.1.2.1.6.4.0", "tcpMaxConn");
            oidList.add("1.3.6.1.2.1.6.11.0");
            oid_en.put("1.3.6.1.2.1.6.11.0", "tcpOutSegs");
            oidList.add("1.3.6.1.2.1.6.10.0");
            oid_en.put("1.3.6.1.2.1.6.10.0", "tcpInSegs");
            oidList.add("1.3.6.1.2.1.6.14.0");
            oid_en.put("1.3.6.1.2.1.6.14.0", "tcpInErrs");
            oidList.add("1.3.6.1.2.1.6.15.0");
            oid_en.put("1.3.6.1.2.1.6.15.0", "tcpOutRsts");
            
            //tcp信息
            oidList.add("1.3.6.1.2.1.6.13.1");
        }else if(tab == 5){
            //udp信息            
            oidList.add("1.3.6.1.2.1.7.1.0");
            oid_en.put("1.3.6.1.2.1.7.1.0", "udpInDatagrams");
            oidList.add("1.3.6.1.2.1.7.2.0");
            oid_en.put("1.3.6.1.2.1.7.2.0", "udpNoPorts");
            oidList.add("1.3.6.1.2.1.7.3.0");
            oid_en.put("1.3.6.1.2.1.7.3.0", "udpInErrors");
            oidList.add("1.3.6.1.2.1.7.4.0");
            oid_en.put("1.3.6.1.2.1.7.4.0", "udpOutDatagrams");
            
            //upd信息
            oidList.add("1.3.6.1.2.1.7.5.1");
        }else if(tab == 6){
            //进程信息
            oidList.add("1.3.6.1.2.1.25.4.2.1");
            //设备信息
            oidList.add("1.3.6.1.2.1.25.3.2.1");
            //安装程序信息
            oidList.add("1.3.6.1.2.1.25.6.3.1");
            //运行程序占CPU，内存信息
            oidList.add("1.3.6.1.2.1.25.5.1.1");
        }
        }
        if(oidList.size() > 0){
            valueList = taskService.getDevData(taskid, ip, oidList);
        }
        if(valueList.size() > 0){
            Map map = taskService.getOidInfo(valueList, oid_en);
            model.addAllAttributes(map);
        }
        
       
        if("2".equals(type)){
            result =  "task/dev_route_show";
        }else if("1".equals(type)){
            result =  "task/dev_datashow";
        }else if("3".equals(type)){
            result = "task/dev_switch_show";
        }
        return result;
    }
    
    /**
     * ajax获取使用率
     * @param task_id
     * @param ip
     * @param printWriter
     */
    @RequestMapping(value = "/getUserd", method = RequestMethod.POST)
    public void getUserd(String task_id, String ip, String gather_id, String tabpage, PrintWriter printWriter){
        HashMap<String, String> map = new HashMap<String, String>();
        int tab = 1;
        if(tabpage != null && !"".equals(tabpage)){
            tab = Integer.parseInt(tabpage);
        }
        String dev_type = "";
        dev_type = taskService.judgeType(task_id, ip);
        if("2".equals(dev_type)){ //路由器
        	map.put("150", "pmUsed");
            map.put("151", "vmUsed");
            map.put("167", "cpuUsed");
            map.put("153", "jsdbUsed");
            map.put("154", "fsdbUsed");
            map.put("155", "jscbUsed");
            map.put("156", "fscbUsed");
            map.put("157", "octsUsed");
            map.put("158", "octsSendUsed");
            map.put("159", "IfSpeed");
        }else if("1".equals(dev_type)){//主机
        	map.put("64", "pmUsed");
            map.put("65", "vmUsed");
            map.put("60", "cpuUsed");
            map.put("100", "jsdbUsed");
            map.put("101", "fsdbUsed");
            map.put("102", "jscbUsed");
            map.put("103", "fscbUsed");
            map.put("104", "octsUsed");
            map.put("105", "octsSendUsed");
        }else if("3".equals(dev_type)){
        	map.put("150", "pmUsed");
            map.put("151", "vmUsed");
            map.put("202", "cpuUsed");
            map.put("190", "jsdbUsed");
            map.put("191", "fsdbUsed");
            map.put("192", "jscbUsed");
            map.put("193", "fscbUsed");
            map.put("194", "octsUsed");
            map.put("195", "octsSendUsed");
            map.put("196", "IfSpeed");
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
    
    /**
     * 获取创建时间轴初始化数据（实验开始时间，结束时间，当前时间（time参数）之前的告警）
     * @param task_id
     * @param time 请求时刻的时间
     * @param printWriter
     */
    @RequestMapping(value = "/getAxisData", method = RequestMethod.POST)
    public void getAxisData(String task_id,String time,PrintWriter printWriter){
        HashMap<String, ArrayList<?>> map = new HashMap<String, ArrayList<?>>();
        Task task = taskService.getTaskById(Integer.parseInt(task_id));
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        
        ArrayList<String> startEndTime = new ArrayList<String>();//实验的起止时间
        startEndTime.add(dateFormat.format(task.getStarTime() == null ? new Date() : task.getStarTime()));
        startEndTime.add(task.getEndTime() == null ? null : dateFormat.format(task.getEndTime()));//实验结束时间可以为null
        map.put("time", startEndTime);
        
        ArrayList<Map<String,String>> warning = new ArrayList<Map<String,String>>();
        
        List<SceneInfo> sceneInfo_list = verifyTaskService.listSceneInfo(task_id);
        for(int i=0; i<sceneInfo_list.size(); i++){
            SceneInfo sceneInfo = sceneInfo_list.get(i);
            HashMap<String,String> w1 = new HashMap<String,String>();//告警事件
            w1.put("time", dateFormat.format(sceneInfo.getSceTime()));//告警时间
            w1.put("id", sceneInfo.getScn_id());//id
            w1.put("ip", sceneInfo.getIp());//告警机器ip
            w1.put("condition", sceneInfo.getScetri_condition());//告警条件
            warning.add(w1);
        }
        map.put("warning", warning);
        
        String object = JSONObject.valueToString(map);
        printWriter.write(object);
        printWriter.flush();
        printWriter.close();
    }
    
    /**
     * 获取某一个实验的最新告警数据
     * @param task_id 实验id（获取该实验的最新告警数据）
     * @param printWriter
     */
    public static int index = 0;
    @RequestMapping(value = "/getNewData", method = RequestMethod.POST)
    public void getNewData(String task_id,PrintWriter printWriter){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //场景数据
        ArrayList<Map<String,String>> warning = new ArrayList<Map<String,String>>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //30000毫秒前的场景、30000毫秒决定关于页面刷新取数据的间隔
        Calendar c = Calendar.getInstance();
        c.add(Calendar.SECOND, -30);
        String starTime = sdf.format(c.getTime());
        
        List<SceneInfo> sceneInfo_list = verifyTaskService.getNewSceneInfoList(task_id, starTime);
        for(int i=0; i<sceneInfo_list.size(); i++){
            SceneInfo sceneInfo = sceneInfo_list.get(i);
            HashMap<String,String> w1 = new HashMap<String,String>();//告警事件
            w1.put("time", dateFormat.format(sceneInfo.getSceTime()));//告警时间
            w1.put("id", sceneInfo.getScn_id());//id
            w1.put("ip", sceneInfo.getIp());//告警机器ip
            w1.put("condition", sceneInfo.getScetri_condition());//告警条件
            warning.add(w1);
        }
        
//        w1.put("time", time);//最新告警时间
//        w1.put("id", "6871bdd9-1def-4e30-8978-7efeec223d1a");//id
//        w1.put("ip", "192.168.2.173");//告警机器ip
//        w1.put("condition", "trigger condition:bigger than 0.60 of 60 which is 0.82");//告警条件
//        warning.add(w1);
        //数据
        
        String object = JSONObject.valueToString(warning);
        printWriter.write(object);
        printWriter.flush();
        printWriter.close();
    }
       
       /**
     * 获取已定义的图形数据
     * @param task_id 实验id
     * @param printWriter
     * @return 数据格式：
        * [{"chartID":"chartID_3","chartType":"3","serise":"110,111"},
        * {"chartID":"chartID_b","chartType":"3","serise":"210,211"}……]
        * 
        * chartID:图形所在div的id
        * chartType:图形类型，目前只有两种3为折线图，2为柱状图
        * serise：图形已定义的数据id
        * 
     */
       @RequestMapping(value = "/getInitChart", method = RequestMethod.POST)
       public void getInitChart(String task_id,PrintWriter printWriter){
           HashMap<String, ArrayList<?>> map = new HashMap<String, ArrayList<?>>();
           
           ArrayList<Map<String,String>> initChart = new ArrayList<Map<String,String>>();
           HashMap<String,String> c = new HashMap<String,String>();
         
//           c.put("chartID", "chartID_b");
//           c.put("chartType", "2");
//           c.put("serise", "112,113");
//           initChart.add(c);
           
          /* HashMap<String,String> c1 = new HashMap<String,String>();
           c1.put("chartID", "chartID_3");
           c1.put("chartType", "3");
           c1.put("serise", "111,112");
          
           initChart.add(c1);
           
           HashMap<String,String> c2 = new HashMap<String,String>();
           c2.put("chartID", "chartID_4");
           c2.put("chartType", "3");
           c2.put("serise", "111,112");
          
           initChart.add(c2);
           
           HashMap<String,String> c3 = new HashMap<String,String>();
           c3.put("chartID", "chartID_7");
           c3.put("chartType", "2");
           c3.put("serise", "111,112");
          
           initChart.add(c3);*/
           
           map.put("initChart", initChart);
           String object = JSONObject.valueToString(map);
           
           printWriter.write(object);
           printWriter.flush();
           printWriter.close();
       }
       
       
        /**
         * 获取数节点信息
         * 
         * @param task_id
         *            实验id
         * @param printWriter
         * @return 节点数据格式[{"id":"1","pid":"0","name":"192.168.1.1"},
         *         {"id":"2","pid":"0","name":" 192.168.1.2"}……]
         *         id:节点id。一级节点id为1-9，二级节点为10-99，三级节点为100-999，以此类推
         *         pid:父节点id。一级节点pid为0，二级节点pid为一级节点id.以此类推。 name:节点名称。
         */
        @RequestMapping(value = "/getTree", method = RequestMethod.POST)
        public void getTree(String task_id, PrintWriter printWriter) {
            HashMap<String, ArrayList<?>> map = new HashMap<String, ArrayList<?>>();
            ArrayList<Map<String, String>> json = new ArrayList<Map<String, String>>();
            List<GatherItemTree> ipDevs = taskService.getTaskIp(task_id);
            List<GatherItemTree> devItems = taskService.getTaskIpSystype(task_id);
            List<GatherItemTree> gathers = taskService.getGatherItems(task_id);
            //设备
            for (int i = 0; i < ipDevs.size(); i++) {
                GatherItemTree git = ipDevs.get(i);
                HashMap<String, String> node = new HashMap<String, String>();
                node.put("id", git.getDev_id());
                node.put("pId", "0");
                node.put("name", git.getIp());
                node.put("open", "false");
                node.put("nocheck", "true");
                json.add(node);
            }
            //采集项类型
            for (int i = 0; i < devItems.size(); i++) {
                GatherItemTree git = devItems.get(i);
                HashMap<String, String> node = new HashMap<String, String>();
                node.put("id", git.getItem_id());
                node.put("pId", git.getDev_id());
                node.put("name", git.getSys_type_name());
                node.put("open", "true");
                node.put("nocheck", "true");
                json.add(node);
            }
            
            for (int i = 0; i < gathers.size(); i++) {
                GatherItemTree git = gathers.get(i);
                HashMap<String, String> node = new HashMap<String, String>();
                node.put("id", git.getGather_id());
                node.put("pId", git.getItem_id());
                node.put("name", git.getGather_name());
                json.add(node);
            }
            
            map.put("treejson", json);
            String object = JSONObject.valueToString(map);
    
            printWriter.write(object);
            printWriter.flush();
            printWriter.close();
        }
          
          /**
           * 保存用户定义的图形
           * @param task_id 实验id
           * @param chartID 图表id
           * @param chartType 图表类型，目前只有两种3为折线图，2为柱状图
           * @param serise 图表数据id  "112,113,114……"
           * 
           * 数据格式：
           * [{"chartID":”chartID_3","chartType":"3","serise":"110,111"},
           * {"chartID":"chartID_b","chartType":"3","serise":"210,211"}……]
           */
          @RequestMapping(value="/addChart", method=RequestMethod.POST)
          public String addChart(String task_id,String chartID,String chartType,String serise,PrintWriter printWriter){
           HashMap<String, ArrayList<?>> map = new HashMap<String, ArrayList<?>>();
              ArrayList<Map<String,String>> c = new ArrayList<Map<String,String>>();
           
              HashMap<String,String> n = new HashMap<String,String>();
              n.put("task_id", task_id);
              n.put("chartID", chartID);
              n.put("chartType",chartType);
              n.put("serise", serise);
              c.add(n);
             
              map.put("chart", c);
              String object = JSONObject.valueToString(map);
              
              printWriter.write(object);
              printWriter.flush();
              printWriter.close();
           
              return "redirect:tasklist";
          }
          /**
           * 获取采集信息数据
           * @param task_id 实验id
           * @param 采集信息id
           * @return {"used":[{"data":"34"]}
           */
          @RequestMapping(value="/getData", method=RequestMethod.POST)
          public void getData(String task_id, String ipId, PrintWriter printWriter){
                 if(ipId == null || "".equals(ipId)){
                     return;
                 }
                 String[] ipids = ipId.split("#");
                 
                 double used = 0;
                 DecimalFormat df = new DecimalFormat("0.00");
                 
                 List<ComplexDataVo> ld = null;
                 ld = taskService.getCalcOidValue(task_id, ipids[0], Integer.parseInt(ipids[1]));
                 
                 if(ld.size() > 0){
                     ComplexDataVo vo = (ComplexDataVo)ld.get(0);
                     used = Math.abs(Double.parseDouble(vo.getCalc_value()));
                 }
                 
                 printWriter.write(used + "");
                 printWriter.flush();
                 printWriter.close();
              
             }
          
          /**
           * 备份文件列表
           */
          @RequestMapping("filebacklist")
          public String filebacklist(@ModelAttribute FileBackUp fileBackUp, Model model, HttpServletRequest request){
              int start = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
              Pager pager=new Pager();
              pager.setCurrentPage(start);
              fileBackUp.setStart((start-1)*pager.getPageSize());
              fileBackUp.setMax(pager.getPageSize());
              Pager p=taskService.filebacklist(fileBackUp,pager);
              
              model.addAttribute("pager",p.getPagerStr());
              model.addAttribute("backfilelist", p.getItems());
              model.addAttribute("fileBackUp", fileBackUp);
              
              return "task/fileback_list";
          }
          /**
           * 删除备份文件
           */
          @RequestMapping(value="deletefileback", method=RequestMethod.GET)
          public String deletefileback(String id){
              taskService.deletefileback(Integer.valueOf(id));
              return "redirect:filebacklist";
          }
          /**
           * 修改备份文件
           */
          @RequestMapping("/modifyfileback")
      	public String  modifyfileback(FileBackUp fileBackUp ){
      		
        	  taskService.modifyfileback(fileBackUp);
      		
      		return "redirect:filebacklist";
      	}
          /**
           * 添加备份文件
           */
          @RequestMapping("/savefileback")
      	public String  savefileback(FileBackUp fileBackUp ){
      		
        	  taskService.savefileback(fileBackUp);
      		
      		return "redirect:filebacklist";
      	}
          
          /**
           * AJAX获取单个备份文件信息
           */ 
      	@RequestMapping("/getfilebackbyId") 
      	public void getfilebackbyId(@RequestParam("id") String id, PrintWriter printWriter){
      		FileBackUp fileBackUp = taskService.getfilebackbyId(id);
      		JSONObject jo = new JSONObject(fileBackUp);
      		printWriter.write(jo.toString());
      		printWriter.flush();
      		printWriter.close();
      	}
      	
      	/****************************虚拟机快照模块***********************************************/
      	
        /**
         * 查询虚拟机快照信息列表(服务端)
         * @param vmbackServer
         * @param model
         * @param request
         * @return
         * @author hekun
         * @version V1.0
         */
         
        @RequestMapping("vmbacklist")
        public String vmbacklist(@ModelAttribute VmbackServer vmbackServer, Model model, HttpServletRequest request){
            int start = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
            Pager pager=new Pager();
            pager.setCurrentPage(start);
            vmbackServer.setStart((start-1)*pager.getPageSize());
            vmbackServer.setMax(pager.getPageSize());
            Pager p=taskService.vmbacklist(vmbackServer,pager);
            
            model.addAttribute("pager",p.getPagerStr());
            model.addAttribute("vmbackServer",vmbackServer);
            model.addAttribute("vmbacklist", p.getItems());
            
            return "task/vmback_list";
        }
        /**
         * 根据id删除虚拟机快照服务端配置
         */
        @RequestMapping(value="deleteVmback", method=RequestMethod.GET)
        public String deleteVmback(String id){
            taskService.deleteVmbackById(Integer.valueOf(id));
            return "redirect:vmbacklist";
        }
        
        /**
         * 根据id删除虚拟机快照客户端配置
         */
        @RequestMapping(value="deleteVmbackClient", method=RequestMethod.POST)
        public void deleteVmbackClient(String clientId , PrintWriter printWriter){
        	String message ="failure";
           boolean flag = taskService.deleteVmbackClientById(Integer.valueOf(clientId));
            if(flag){
            	message = "success";
            }
    		printWriter.write(message);
    		printWriter.flush();
    		printWriter.close();
        }
        
        /**
         * 修改备份文件
         */
        @RequestMapping("/modifyVmback")
    	public String  modifyvmback(@ModelAttribute VmbackServer vmbackServer ){
    		
      	  taskService.modifyVmback(vmbackServer);
    		
    		return "redirect:vmbacklist";
    	}
        /**
         * 添加虚拟机快照服务端配置
         */
        @RequestMapping("/saveVmback")
    	public String  saveVmback(@ModelAttribute VmbackServer vmbackServer ){
      	   taskService.saveVmback(vmbackServer);
      	   return "redirect:vmbacklist";
    	}
        
        /**
         * 添加虚拟机快照客户端配置
         */
        @RequestMapping("/saveVmbackClient")
    	public void  saveVmbackClient(@ModelAttribute VmbackClient vmbackClient ,PrintWriter printWriter ){
        	String message = "failure" ;
        	boolean flag = taskService.saveVmbackClient(vmbackClient);
        	if(flag){
        		message = "success" ;
            }
            printWriter.write(message);
            printWriter.flush();
            printWriter.close();
    	}
        
        /**
         * AJAX获取单个备份文件信息
         */ 
    	@RequestMapping("/getVmbackbyId") 
    	public void getVmbackbyId(@RequestParam("serverId") Integer serverId, PrintWriter printWriter){
    		VmbackServer vmbs  = taskService.getVmbackServerbyId(serverId);
    		JSONObject jo = new JSONObject(vmbs);
    		printWriter.write(jo.toString());
    		printWriter.flush();
    		printWriter.close();
    	}
    	
    	@RequestMapping(value="/getVmbackClientList" , method=RequestMethod.POST) 
    	public void getVmbackClientbyId(@RequestParam("serverId") Integer serverId, PrintWriter printWriter){
    		List<VmbackClient> vmbcList  = taskService.getVmbackClientbyId(serverId);
    		JSONArray jsonArray = new JSONArray(vmbcList);
    		printWriter.write(jsonArray.toString());
    		printWriter.flush();
    		printWriter.close();
    	}
          
}
