package com.bjhit.dao.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.bjhit.dao.model.BackupInfoVo;
import com.bjhit.dao.model.SceneBack;
import com.bjhit.dao.model.SceneInfo;

@Repository
public interface SceneBackMapper {
	/**
	 * 根据id获取场景回溯列表
	 * @param id
	 * @return
	 */
    public List<SceneBack> getSceneBackList(String id);

    public List<BackupInfoVo> getBackupByTaskid(@Param("id")String id, @Param("scnid")String scnid);

    public List<SceneInfo> getSceneInfoByscnid(String scenceId);

}
