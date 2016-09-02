package com.bjhit.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.bjhit.dao.model.GatherItem;
import com.bjhit.dao.model.GatherItemDetail;
import com.bjhit.dao.model.SceneBack;
import com.bjhit.dao.model.SceneInfo;
import com.bjhit.service.NetTopoServiceImpl;
import com.bjhit.service.TaskServiceImpl;
import com.bjhit.service.VerifyTaskServiceImpl;

@Controller
@RequestMapping("/verTaskctrl")
public class VerifyTaskController {
	
	@Autowired
	private VerifyTaskServiceImpl verTaskService;
	@Autowired
    private NetTopoServiceImpl netTopoService;
    @Autowired
    private TaskServiceImpl taskService;
	/**
	 * 根据对应的task_id获取场景信息列表
	 * @param id    对应任务Id
	 * @param model
	 * @return
	 */
	@RequestMapping(value="listVerifyTask_")
	public String listVerifyTask_(String id , HttpServletRequest request,Model model){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	    Map map = new HashMap();
	    map.put("task_id", id);
	    map.put("scetri_condition",request.getParameter("scetri_condition") == null ? "" : String.valueOf(request.getParameter("scetri_condition")));
	    map.put("status",request.getParameter("status") == null ? "" : String.valueOf(request.getParameter("status")));
		try {
			if (null != request.getParameter("starTime")
					&& !"".equals(request.getParameter("starTime"))) {
				map.put("starTime", sdf.parse(String.valueOf(request
						.getParameter("starTime"))));
			} else {
				map.put("starTime", null);
			}
			if (null != request.getParameter("endTime")
					&& !"".equals(request.getParameter("starTime"))) {
				map.put("endTime", sdf.parse(String.valueOf(request
						.getParameter("endTime"))));
			} else {
				map.put("endTime", null);
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		model.addAttribute("sceneInfoList", new JSONArray(verTaskService.listSceneInfo(map)));
		model.addAttribute("id", id);
		model.addAttribute("task", taskService.getTaskById(Integer.valueOf(id)));
		return "verifyTask/verifyTask_list";
	}
	
	/**
     * 根据对应的task_id获取场景信息列表
     * @param id    对应任务Id
     * @param model
     * @return
     */
    @RequestMapping(value="listVerifyTask")
    public String listVerifyTask(String id , HttpServletRequest request,Model model){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Map map = new HashMap();
        map.put("task_id", id);
        map.put("scetri_condition",
          request.getParameter("scetri_condition") == null ? "" : String.valueOf(request.getParameter("scetri_condition")));
        map.put("status",request.getParameter("status") == null ? "" : String.valueOf(request.getParameter("status")));
        try {
            if (null != request.getParameter("starTime")
                    && !"".equals(request.getParameter("starTime"))) {
                map.put("starTime", sdf.parse(String.valueOf(request
                        .getParameter("starTime"))));
            } else {
                map.put("starTime", null);
            }
            if (null != request.getParameter("endTime")
                    && !"".equals(request.getParameter("starTime"))) {
                map.put("endTime", sdf.parse(String.valueOf(request
                        .getParameter("endTime"))));
            }else {
                map.put("endTime", null);
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
        model.addAttribute("sceneInfoList", new JSONArray(verTaskService.listSceneInfo(map)));
        String result = netTopoService.getTopoResult(id);
        /*String result = "{\"nodeDataArray\":"
                + "[{\"text\":\"192.168.2.152\",\"problem\":\"1\",\"type\":\"1\",\"key\":\"1\",\"ip\":\"192.168.2.152\"},"+
                   "{\"text\":\"192.168.2.134\",\"problem\":\"\",\"type\":\"1\",\"key\":\"2\",\"ip\":\"192.168.2.134\"},"+
                   "{\"text\":\"192.168.2.136\",\"problem\":\"\",\"type\":\"1\",\"key\":\"3\",\"ip\":\"192.168.2.136\"},"+
                   "{\"text\":\"192.168.2.137\",\"problem\":\"\",\"type\":\"1\",\"key\":\"4\",\"ip\":\"192.168.2.137\"},"+
                   "{\"text\":\"192.168.2.139\",\"problem\":\"\",\"type\":\"1\",\"key\":\"5\",\"ip\":\"192.168.2.139\"},"+
                   "{\"text\":\"192.168.3.76\", \"problem\":\"\",\"type\":\"1\",\"key\":\"6\",\"ip\":\"192.168.3.76\"}],"+
                        "\"linkDataArray\":"
                 + "[{\"to\":\"1\",\"problem\":\"\",\"from\":\"2\"},"
                  + "{\"to\":\"1\",\"problem\":\"\",\"from\":\"3\"},"+
                    "{\"to\":\"1\",\"problem\":\"\",\"from\":\"4\"},"
                  + "{\"to\":\"1\",\"problem\":\"\",\"from\":\"5\"},"+
                    "{\"to\":\"1\",\"problem\":\"\",\"from\":\"6\"}]}";*/
        model.addAttribute("result", result);
        model.addAttribute("id", id);
        model.addAttribute("task", taskService.getTaskById(Integer.valueOf(id)));
        return "verifyTask/verifyTask_list";
    }
	
	/**
	 * 根据对应的场景信息id获取场景回溯
	 * @param id
	 * @param printWriter
	 */
	@RequestMapping("/listSceneBack")
	public void listSceneBack(String id,PrintWriter printWriter){
		List<SceneBack> sceneBackList = verTaskService.getSceneBackList(id);
		StringBuffer rows = new StringBuffer();
		for(int i=0;i<sceneBackList.size();i++){
			SceneBack sb = sceneBackList.get(i);
			rows.append("<tr><td class='txt_c'>");
			rows.append(i+1);
			rows.append("</td><td>");
			rows.append(sb.getBackt_id());
			rows.append("</td><td>");
			rows.append(sb.getBackt_start());
			rows.append("</td><td>");
			rows.append(sb.getBackt_end());
			rows.append("</td><td>");
			rows.append(sb.getIsTrigge());
			rows.append("</td></tr>");
		}
		printWriter.write(rows.toString());
		printWriter.flush();
		printWriter.close();
		
	}
	
	/**
     * 根据对应的实验的起止时间和告警事件（每条告警包括：告警时间，id，告警设备ip，触发告警条件）
     * @param taskid(实验id)
     * @param printWriter
     */
    @RequestMapping("/getPlayAxisData")
    public void getPlayAxisData(String taskid,PrintWriter printWriter){
    	
        HashMap<String, ArrayList<?>> map = new HashMap<String, ArrayList<?>>();
        ArrayList<String> tt = new ArrayList<String>();//实验起止时间
        
        Map tMap = verTaskService.getTaskStartEndTime(taskid);
        tt.add(tMap.get("starTime").toString());//实验开始时间
        tt.add(tMap.get("endTime").toString());//实验结束时间
        map.put("time", tt);
        
        ArrayList<Map<String,String>> warning = new ArrayList<Map<String,String>>();
        ArrayList tempList = new ArrayList();

    	Map<String,String> m = new HashMap<String,String>();
    	m.put("task_id", taskid);
    	tempList = (ArrayList)verTaskService.getSceneList(m);
        map.put("warning", tempList);
        
        String object = JSONObject.valueToString(map);
        printWriter.write(object);
        printWriter.flush();
        printWriter.close();
    }
    /**
     * 根据对应的实验的SCNID查询报警信息
     * @param scn_id(报警id)
     * @param printWriter
     */
    @RequestMapping("/getWarningDataByScnID")
    public void getWarningDataByScnID(String scn_id,PrintWriter printWriter){
        String object = JSONObject.valueToString(verTaskService.getSceneMoreInfoByscnid(scn_id).get(0));
        
        printWriter.write(object);
        printWriter.flush();
        printWriter.close();
    }
    @RequestMapping("/expSceneByExcel")
	public void  expSceneByExcel(HttpServletRequest request,PrintWriter printWriter){
		String task_id = request.getParameter("task_id");
		Date date = new Date();
		String dateStr = new SimpleDateFormat("yyyyMMddhhmmss").format(date);
		String strReturn = "";
        String spStr = File.separator;
		// 文件保存路径  
		String filePath = "";
		filePath = request.getSession().getServletContext().getRealPath("/") + "uploaditem"+spStr+"ScenceInformation_"+dateStr+".xls"; 
		
        File fileWrite = new File(filePath);  
        try {
			fileWrite.createNewFile();
	        OutputStream os = new FileOutputStream(fileWrite);  
			List<SceneInfo> gtList = verTaskService
					.getSceneInfoForExcel(task_id);
			writeGatherItemExcel(os, gtList);
			strReturn = "uploaditem/ScenceInformation_"+dateStr+".xls";
	        
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
        printWriter.write(strReturn);
		printWriter.flush();
		printWriter.close();
		
	}
	
	 public static void writeGatherItemExcel(OutputStream os, List<SceneInfo> gtList)  
	    {  
	        try  
	        {  
	            WritableWorkbook wwb = Workbook.createWorkbook(os);  
	            //创建Excel工作表 指定名称和位置  
	            WritableSheet ws = wwb.createSheet("SceneInformation 1",0);  
	            Label label = null;
	            label = new Label(0,0,"场景序号");
	            ws.addCell(label); 
	            label = new Label(1,0,"任务号");
	            ws.addCell(label); 
	            label = new Label(2,0,"任务名称");
	            ws.addCell(label); 
	            label = new Label(3,0,"ip");
	            ws.addCell(label); 
	            label = new Label(4,0,"触发时间");
	            ws.addCell(label); 
	            label = new Label(5,0,"采集项名称");
	            ws.addCell(label); 
	            label = new Label(6,0,"实际采集值");
	            ws.addCell(label); 
	            label = new Label(7,0,"系统阀值");
	            ws.addCell(label); 
	            label = new Label(8,0,"场景描述");
	            ws.addCell(label); 
	           
	            //**************往工作表中添加数据******
	            	for(int j =0; j<gtList.size();j++){
	            		Map gt = (Map) gtList.get(j); 
	    	            for(int i = 0; i<9 ; i++){ 
	    	            	if(i == 0){
	    	            		label = new Label(i,j+1,(String) gt.get("scn_id")); 
	    					}else if(i == 1){
	    						label = new Label(i,j+1,String.valueOf( gt.get("task_id")));
	    					}else if(i == 2){
	    						label = new Label(i,j+1,(String) gt.get("name"));
	    					}else if(i == 3){
	    						label = new Label(i,j+1,(String) gt.get("ip"));
	    					}else if(i == 4){
	    						label = new Label(i,j+1,(String) gt.get("sceTime"));
	    					}else if(i == 5){
	    						label = new Label(i,j+1,(String) gt.get("gather_name"));
	    					}else if(i == 6){
	    						label = new Label(i,j+1,(String) gt.get("fact_value"));
	    					}else if(i == 7){
	    						label = new Label(i,j+1,(String) gt.get("top_value"));
	    					}else if(i == 8){
	    						label = new Label(i,j+1,(String) gt.get("scetri_condition"));
	    					}
	    	            	
	    	            	if(null != label){
	    	            		ws.addCell(label);  
	    	            	}
	            	} 
	            }
	            //写入工作表  
	            wwb.write();  
	            wwb.close();  
	        }  
	        catch(Exception e)  
	        {  
	            e.printStackTrace();  
	        }  
	    } 
}
