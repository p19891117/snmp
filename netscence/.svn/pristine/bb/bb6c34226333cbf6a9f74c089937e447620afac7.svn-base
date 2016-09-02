package com.bjhit.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.bjhit.dao.model.SceneInfo;
import com.bjhit.dao.model.Task;
import com.bjhit.dao.model.TimeLine;
import com.bjhit.util.Constant;

/**
 * @Description TODO
 * @author lp
 * @date 2014年9月12日
 */
@Service
public class TimelineServiceImpl {
    
    public TimeLine timeLine(Task task, List<SceneInfo> sceneInfo_list) {
        SimpleDateFormat sf = new SimpleDateFormat("HH:mm");
        
        TimeLine timeLine = new TimeLine();
        Calendar cal1 = Calendar.getInstance();
        Calendar cal2 = Calendar.getInstance();
        cal1.setTime(task.getStarTime());
        //是否有实验场景结束时间
        if(task.getEndTime() != null){
            cal2.setTime(task.getEndTime());
        }else{
            cal2.setTime(new Date());
        }
        
        
        List<Map<String, String>> timelist = new ArrayList<Map<String, String>>();
        
        int i_axle = 0; //第几个轴
        Map<String, Object> map_wm = null;
        while(cal1.compareTo(cal2) < 0){
            i_axle += 1;
            map_wm = getWidthAndMinus(i_axle, cal1.getTime(), cal2.getTime());
            Map<String, String> map = new HashMap<String,String>();
            map.put("axle", i_axle + ""); //第几个轴
            map.put("time", sf.format(cal1.getTime())); //时间刻度
            map.put("width", (String)map_wm.get("width")); //时间宽度
            timelist.add(map);
            cal1.add(Calendar.MINUTE, (Integer)map_wm.get("minus"));
        }
        
        timeLine.setStarTime(sf.format(task.getStarTime()));
        timeLine.setEndTime(sf.format(task.getEndTime()));
        timeLine.setTimelist(timelist); //时间轴
        timeLine.setScenelist(getScenelist(task.getStarTime(), sceneInfo_list)); //场景点
        return timeLine;
    }
    
    /**
     * 获取宽度像素
     * @param date
     * @return
     */
    private Map<String, Object> getWidthAndMinus(int i_axle, Date date, Date endDate){
        Map<String, Object> map = new HashMap<String, Object>();
        SimpleDateFormat sf = new SimpleDateFormat("mm");
        int minus = 30; //和下一个整半小时的 时间差
        double width = 0;
        
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(date);
        c2.setTime(endDate);
        c1.add(Calendar.MINUTE, 30);
        
        if(c1.compareTo(c2) > 0){ //与结束时间相差不到半小时。
            map.put("minus", 30); //下一个时间间隔
            if(i_axle == 1){ //起点
                c1.setTime(date);
                double minus_minute = (c2.getTimeInMillis() - c1.getTimeInMillis()) / (60 * 1000); //时间差：分钟
                width = (minus_minute / Constant.TIMELINE_DIV_MINUTES)
                        * Constant.TIMELINE_DIV_WIDTH;
            }else{ //非起点
                String mm_ = sf.format(date);
                String mm_end_ = sf.format(endDate);
                int mm = Integer.parseInt(mm_);
                int mm_end = Integer.parseInt(mm_end_);
                width = ((double)(mm_end - mm) / Constant.TIMELINE_DIV_MINUTES)
                        * Constant.TIMELINE_DIV_WIDTH;
            }
        }else{ //与结束时间相差超过半小时
            c1.setTime(date);
            double minus_minute = (c2.getTimeInMillis() - c1.getTimeInMillis()) / (60 * 1000); //时间差：分钟
            //离结束轴小于40分钟特殊处理：防止两个轴之间距离太短。
            if(minus_minute <= 40){
                minus = new Double(minus_minute).intValue();
            }else{
                String mm_ = sf.format(date);
                int mm = Integer.parseInt(mm_);
                if (mm > 30) {
                    minus = 60 - mm;
                } else if (mm < 30) {
                    minus = 30 - mm;
                } 
                //小于10分钟特殊处理：防止两个轴之间距离太短。
                if(minus <= 10){
                    minus = minus + 30;
                }
            }
            map.put("minus", minus); //下一个时间间隔
            width = ((double)minus / Constant.TIMELINE_DIV_MINUTES)
                    * Constant.TIMELINE_DIV_WIDTH;
        }
        map.put("width", new Double(Math.ceil(width)).toString());
        return map;
    }
    
    /**
     * 获取场景轴信息
     * @param starTime
     * @param sceneInfo_list
     * @return
     */
    private List<Map<String, String>> getScenelist(Date starTime,
            List<SceneInfo> sceneInfo_list) {
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        double width = 0;
        
        List<Map<String, String>> list = new ArrayList<Map<String, String>>();
        String sce_flag = "0"; //场景类型0:振幅；1：阀值
        
        c1.setTime(starTime);
        for (SceneInfo sceneInfo : sceneInfo_list) {
            Map<String, String> map = new HashMap<String, String>();
            sce_flag = sceneInfo.getSce_flag() == null ? sce_flag : sceneInfo.getSce_flag();
            Date sceTime = sceneInfo.getSceTime();
            
            c2.setTime(sceTime);
            double minus_minute = (c2.getTimeInMillis() - c1.getTimeInMillis()) / (60 * 1000); //时间差：分钟
            width = (minus_minute / Constant.TIMELINE_DIV_MINUTES)
                    * Constant.TIMELINE_DIV_WIDTH;
            map.put("sceTime", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(sceneInfo.getSceTime()));
            map.put("sceDev", sceneInfo.getIp());
            map.put("sceCondition", sceneInfo.getScetri_condition());
            map.put("css_style", "0".equals(sce_flag) ? "point" : "point1");
            map.put("width", new Double(Math.ceil(width)).toString());
            list.add(map);
        }
        
        return list;
    }
    
}
