package com.bjhit.dao.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.bjhit.dao.model.TopoDevice;
import com.bjhit.dao.model.TopoDeviceConn;

/**
 * @Description 网络拓扑
 * @author lp
 * @date 2014年10月8日
 */
@Repository
public interface NetTopoMapper {
    /**
     * 保存网络拓扑设备
     * @param devList
     */
    public void saveTopoDevices(List<TopoDevice> devList);
    /**
     * 保存网络拓扑设备之间的连接
     * @param connList
     */
    public void saveTopoDeviceConns(List<TopoDeviceConn> connList);
    /**
     * 获取拓扑设备
     * @param taskid
     * @return
     */
    public List<TopoDevice> getDevList(String taskid);
    /**
     * 获取拓扑设备间连接
     * @param taskid
     * @return
     */
    public List<TopoDeviceConn> getConnList(String taskid);
}
