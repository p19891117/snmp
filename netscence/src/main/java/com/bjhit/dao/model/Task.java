package com.bjhit.dao.model;

import java.sql.Blob;
import java.util.Date;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.format.annotation.DateTimeFormat;

/**
 * @Description 实验场景记录实体
 * @author lp
 * @date 2014年8月20日
 */

public class Task {
    /**
     * 任务号
     */
    private Integer id;
    /**
     * 任务名称
     */
    private String name;
    /**
     * 任务状态
     */
    private Integer status;
    /**
     * 任务描述
     */
    private String mark;
    /**
     * 页码
     */
    private int start;
    /**
     * 父任务id
     */
    private int parent_taskid;
    
    public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getMax() {
		return max;
	}
	public void setMax(int max) {
		this.max = max;
	}
	/**
     * 每页显示条数
     */
    private int max;
    /**
     * 任务开始时间
     */
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date starTime;
    /**
     * 任务结束时间
     */
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private Date endTime;
    /**
     * 任务操作时间
     */
    private Date operTime;
    /**
     * 正常采集频率
     */
    private Integer normalRate;
    /**
     * 报警采集频率
     */
    private Integer warningRate;
    /**
     * 异常采集频率
     */
    private Integer exceptRate;
    /**
     * 异常前置时间窗口
     */
    private Integer beforWin;
    /**
     * 异常后置时间窗口
     */
    private Integer afterWin;
    /**
     * 任务图片
     */
    private Blob icon;
    /**
     * 拓扑状态
     */
    private Integer topo_status;
    /**
     * 流量设备ip
     */
    private String flow_devip;
    /**
     * 流量入口设备ip
     */
    private String flow_enter_devip;
    /**
     * 网络拓扑发现网关
     */
    private String topo_gateway;
    /**
     * 场景记录策略
     */
    private String confid;
    
    private Integer swingTime;
    
    public Integer getSwingTime() {
        return swingTime;
    }
    public void setSwingTime(Integer swingTime) {
        this.swingTime = swingTime;
    }
    public Integer getWarningRate() {
		return warningRate;
	}
	public void setWarningRate(Integer warningRate) {
		this.warningRate = warningRate;
	}
	private String statusName;
    
    public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    @NotEmpty(message="名称不能为空")
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getStatus() {
        return status;
    }
    public void setStatus(Integer status) {
        this.status = status;
    }
    public String getMark() {
        return mark;
    }
    public void setMark(String mark) {
        this.mark = mark;
    }
    public Date getStarTime() {
        return starTime;
    }
    public void setStarTime(Date starTime) {
        this.starTime = starTime;
    }
    public Date getEndTime() {
        return endTime;
    }
    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }
    public Date getOperTime() {
        return operTime;
    }
    public void setOperTime(Date operTime) {
        this.operTime = operTime;
    }
    @NotNull (message="正常采集频率不能为空")
    public Integer getNormalRate() {
        return normalRate;
    }
    public void setNormalRate(Integer normalRate) {
        this.normalRate = normalRate;
    }
    @NotNull(message="异常采集频率不能为空")
    public Integer getExceptRate() {
        return exceptRate;
    }
    public void setExceptRate(Integer exceptRate) {
        this.exceptRate = exceptRate;
    }
    @NotNull(message="前置时间窗口不能为空")
    public Integer getBeforWin() {
        return beforWin;
    }
    public void setBeforWin(Integer beforWin) {
        this.beforWin = beforWin;
    }
    @NotNull(message="后置时间窗口不能为空")
    public Integer getAfterWin() {
        return afterWin;
    }
    public void setAfterWin(Integer afterWin) {
        this.afterWin = afterWin;
    }
    public Blob getIcon() {
        return icon;
    }
    public void setIcon(Blob icon) {
        this.icon = icon;
    }
    public Integer getTopo_status() {
        return topo_status;
    }
    public void setTopo_status(Integer topo_status) {
        this.topo_status = topo_status;
    }
    //@NotEmpty(message="流量设备ip不能为空")
    public String getFlow_devip() {
        return flow_devip;
    }
    public void setFlow_devip(String flow_devip) {
        this.flow_devip = flow_devip;
    }
    public String getFlow_enter_devip() {
        return flow_enter_devip;
    }
    public void setFlow_enter_devip(String flow_enter_devip) {
        this.flow_enter_devip = flow_enter_devip;
    }
    //@NotEmpty(message="网络拓扑网关不能为空")
    public String getTopo_gateway() {
        return topo_gateway;
    }
    public void setTopo_gateway(String topo_gateway) {
        this.topo_gateway = topo_gateway;
    }
    public String getConfid() {
        return confid;
    }
    public void setConfid(String confid) {
        this.confid = confid;
    }
    public int getParent_taskid() {
        return parent_taskid;
    }
    public void setParent_taskid(int parent_taskid) {
        this.parent_taskid = parent_taskid;
    }
    
}
