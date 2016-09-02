package com.bjhit.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bjhit.dao.mapper.SceneBackMapper;
import com.bjhit.dao.mapper.SceneInfoMapper;
import com.bjhit.dao.model.SceneBack;
import com.bjhit.dao.model.SceneInfo;

@Transactional
@Service("verifyTaskService")
public class VerifyTaskServiceImpl {

	@Autowired
	private SceneInfoMapper sceneInfoMapper;
	
	@Autowired
	private SceneBackMapper sceneBackMapper;
	
	
	public List<SceneInfo> listSceneInfo(String id) {
		
		return sceneInfoMapper.getSceneInfoList(id);
	}

	
	public List<SceneBack> getSceneBackList(String id) {
		// TODO Auto-generated method stub
		return sceneBackMapper.getSceneBackList(id);
	}

	
	public List<SceneInfo> getSceneList(Map map) {
		// TODO Auto-generated method stub
		return sceneInfoMapper.getSceneList(map);
	}
	public List<SceneInfo> listSceneInfo(Map map) {
		// TODO Auto-generated method stub
		return sceneInfoMapper.getSceneMoreInfoList(map);
	}
	public List<SceneInfo> getSceneMoreInfoByscnid(String scn_id) {
		// TODO Auto-generated method stub
		return sceneInfoMapper.getSceneMoreInfoByscnid(scn_id);
	}
	public Map getTaskStartEndTime(String taskid) {
		// TODO Auto-generated method stub
		return sceneInfoMapper.getTaskStartEndTime(taskid);
	}
	public List<SceneInfo> getSceneInfoForExcel(String taskid) {
		// TODO Auto-generated method stub
		return sceneInfoMapper.getSceneInfoForExcel(taskid);
	}

    public List<SceneInfo> getNewSceneInfoList(String task_id, String starTime) {
        return sceneInfoMapper.getNewSceneInfoList(task_id, starTime);
    }
}
