package com.bjhit.dao.model;

import java.util.List;
import java.util.Map;

/**
 * @Description TODO
 * @author lp
 * @date 2014年9月2日
 */

public class TimeLine {

    /**
     * 开始时分
     */
    private String starTime;
    /**
     * 结束时分
     */
    private String endTime;
    /**
     * 时间刻度宽度比例
     */
    private List<Map<String, String>> timelist;
    /**
     * 场景刻度比例
     */
    private List<Map<String, String>> scenelist;
    
    public String getStarTime() {
        return starTime;
    }

    public void setStarTime(String starTime) {
        this.starTime = starTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public List<Map<String, String>> getTimelist() {
        return timelist;
    }

    public void setTimelist(List<Map<String, String>> timelist) {
        this.timelist = timelist;
    }

    public List<Map<String, String>> getScenelist() {
        return scenelist;
    }

    public void setScenelist(List<Map<String, String>> scenelist) {
        this.scenelist = scenelist;
    }

}
