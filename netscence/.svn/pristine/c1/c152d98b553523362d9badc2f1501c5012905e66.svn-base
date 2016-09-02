package com.bjhit.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.bjhit.dao.model.ComplexDataVo;
import com.bjhit.dao.model.DevData;
import com.bjhit.dao.model.FileBackUp;
import com.bjhit.dao.model.GatherItem;
import com.bjhit.dao.model.GatherItemTree;
import com.bjhit.dao.model.ScenceFindConfigVo;
import com.bjhit.dao.model.Task;
import com.bjhit.dao.model.TaskConfig;
import com.bjhit.dao.model.TopoDevice;
import com.bjhit.dao.model.VmbackClient;
import com.bjhit.dao.model.VmbackServer;

/**
 * @Description TODO
 * @author lp
 * @date 2014年8月20日
 */
@Repository
public interface TaskMapper {
    /**
     * 获取所有场景记录列表
     * @param task
     * @return
     */
    public List<Task> getTaskList(Task task);
    /**
     * 获取所有场景记录条数
     * @param task
     * @return
     */
    public int getTaskCount(Task task);
    /**
     * 获取所有备份文件条数
     * @param task
     * @return
     */
    public int getFileBackUpCount(FileBackUp fileBackUp);
    /**
     * 获取所有备份文件列表
     * @param task
     * @return
     */
    public List<Task> getFileBackUpList(FileBackUp fileBackUp);


    /**
     * 保存场景记录
     * @param task
     */
    public int saveTask(Task task);

    /**
     * 根据编号获取场景记录
     * @param taskid
     * @return
     */
    public Task getTaskById(Integer taskid);

    /**
     * 修改场景记录
     * @param task
     */
    public void modifyTask(Task task);

    /**
     * 删除场景记录
     * @param task
     */
    public int deleteTask(Task task);
    /**
     * 删除备份文件
     * @param task
     */
    public int deletefileback(Integer id);
    /**
     * 增加备份文件记录
     * @param task
     */
    public void savefileback(FileBackUp fileBackUp);
    public FileBackUp getfilebackbyId(String id);
    /**
     * 修改场景记录
     * @param task
     */
    public void modifyfileback(FileBackUp fileBackUp);
    /**
     * 保存场景对应的采集项配置
     * @param list
     */
    @SuppressWarnings("rawtypes")
    public void saveTaskConf(List list);

    /**
     * 获取全局采集项，和场景记录采集项列表
     * @param taskid
     */
    public List<GatherItem> getTaskConfList(@Param("devType")String devtype, @Param("taskid")Integer taskid);

    /**
     * 根据场景记录编号，删除场景记录采集项配置
     * @param id
     */
    public void deleteTaskConf(Integer taskid);

    /**
     * 获取设备采集信息
     * @param taskid
     * @param devid
     * @param oids
     * @param timeflag
     */
	public List<DevData> getDevDataList(DevData devData);
	
    public List<Map> ajaxGetDevInfo(String id, String ip);
    
    public List<ScenceFindConfigVo> getFindConfigList(@Param("task_id")String task_id, @Param("ip")String ip);
    
    public List<ScenceFindConfigVo> getFindListExists(ScenceFindConfigVo vo);
    
    public int deleteFind(String id);
    
    public int saveFindConfig(ScenceFindConfigVo vo);
    
    public List<TopoDevice> topoDevicesByTaskANDCategary(ScenceFindConfigVo vo);
    
    public List<Task> getTaskStarList(@Param("nowtime")String nowtime, @Param("agotime")String agotime);
    
    public List<Task> getTaskEndList(@Param("nowtime")String nowtime, @Param("agotime")String agotime);
    
    public List<ComplexDataVo> getCalcOidValue(String task_id, String ip, int gather_id);
    
    public List getDevDataListAll(DevData devData);
    
    public List getMultiData(DevData devData);
    
    public List getLastBatchs(DevData devData);
    
    public void modifyTaskTime(Task taskUpdate);
    
    public List<GatherItemTree> getTaskIp(@Param("task_id")String task_id);
    
    public List<GatherItemTree> getTaskIpSystype(@Param("task_id")String task_id);
    
    public List<GatherItemTree> getGatherItems(@Param("task_id")String task_id);
    
    /**
     * 根据任务id和ip判断类型
     * @param task_id
     * @param ip
     * @return
     * @author hekun
     * @version V1.0
     */
	public String judgeType(@Param("task_id")String task_id, @Param("ip")String ip);
	
	/**
	 * 获取虚拟机快照总记录数
	 * @param vmbackServer
	 * @return
	 * @author hekun
	 * @version V1.0
	 */
	public int getVmbackServerCount(VmbackServer vmbackServer);
	
	/**
	 * 获取虚拟机快照信息列表
	 * @param vmbackServer
	 * @return
	 * @author hekun
	 * @version V1.0
	 */
	public List<VmbackServer> getVmbackServerList(VmbackServer vmbackServer);
	
	/**
	 * 根据服务端id获取与之关联的客户端信息列表
	 * @param serverId
	 * @return
	 * @author hekun
	 * @version V1.0
	 */
	public List<VmbackClient> getVmbackClientList(@Param("serverId")Integer serverId);

	/**
	 * 根据服务端id查询整条记录
	 * @param serverId
	 * @return
	 * @author hekun
	 * @version V1.0
	 */
	public VmbackServer getVmbackServerbyId(@Param("serverId")Integer serverId);
	
	/**
	 * 修改虚拟机快照配置
	 * @param vmbackServer
	 * @return
	 * @author hekun
	 * @version V1.0
	 */
	public boolean updateVmbackServer(VmbackServer vmbackServer);
	
	/**
	 * 根据id删除虚拟机快照服务端配置
	 * @param id
	 * @return
	 * @author hekun
	 * @version V1.0
	 */
	public boolean deleteVmbackById(@Param("serverId")Integer serverId);
	
	/**
	 * 添加虚拟机快照服务端配置
	 * @param vmbackServer
	 * @return
	 * @author hekun
	 * @version V1.0
	 */
	public boolean saveVmback(VmbackServer vmbackServer);
	
	/**
	 * 添加虚拟机快照客户端配置
	 * @param vmbackClient
	 * @return
	 * @author hekun
	 * @version V1.0
	 */
	public boolean saveVmbackClient(VmbackClient vmbackClient);
	
	/**
	 * 根据id删除虚拟机快照客户端配置
	 * @param clientId
	 * @return
	 * @author hekun
	 * @version V1.0
	 */
	public boolean deleteVmbackClientById(@Param("clientId")Integer clientId);
    
	/**
	 * 获取任务采集项
	 * @param id
	 * @return
	 * @author hekun
	 * @version V1.0
	 */
	public List<TaskConfig> getTaskConfigList(@Param("id") Integer id);
    public int getTaskCount_hs(Task task);
    public List<?> getTaskList_hs(Task task);
}
