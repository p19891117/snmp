package com.bjhit.dao.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.bjhit.dao.model.SceneInfo;

@Repository
public interface SceneInfoMapper {
	
	public List<SceneInfo> getSceneInfoList(String id);
	public List<SceneInfo>  getSceneMoreInfoList(Map map);

	public List<SceneInfo> getSceneMoreInfoByscnid(String scn_id);
	public List<SceneInfo> getSceneList(Map map) ;
    public List<SceneInfo> getNewSceneInfoList(@Param("task_id")String task_id, @Param("starTime")String starTime);
	public Map getTaskStartEndTime(String taskid);
	public List<SceneInfo> getSceneInfoForExcel(String taskid) ;
}
