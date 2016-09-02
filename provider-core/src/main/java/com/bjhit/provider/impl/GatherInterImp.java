package com.bjhit.provider.impl;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.bjhit.provider.GatherInterForDubbo;
import com.bjhit.provider.bean.FileBackupTaskBean;
import com.bjhit.provider.bean.FileRecoverTaskBean;
import com.bjhit.provider.bean.SNMPGetTaksBean;
import com.bjhit.provider.bean.SNMPSetTaskBean;
import com.bjhit.provider.bean.VMSnapshotBackupTaskBean;
import com.bjhit.provider.bean.VMSnapshotRecoverTaskBean;
import com.bjhit.provider.util.ReadFile;

public class GatherInterImp implements GatherInterForDubbo {
	public static final ExecutorService THREAD_POOL = Executors.newFixedThreadPool(ReadFile.TreadPOOL_SIZE);
	@Override
	public void backup(String[] url, String command, String deviceType,int primary_key, int task, int hardware_type, String backup_files) {
		THREAD_POOL.execute(new FileBackupTaskBean(url,command,deviceType,primary_key,task,hardware_type,backup_files));
	}

	@Override
	public void recover(String[] url, String command, String deviceType,String task, int hardware_type, String files) {
		THREAD_POOL.execute(new FileRecoverTaskBean(url,command,deviceType,task,hardware_type,files));
	}

	@Override
	public void gatherDeviceMsgs(String ip, List<String> oids, Long batch,long batchTime, int task) {
		THREAD_POOL.execute(new SNMPGetTaksBean(ip, oids, batch, batchTime, task));
	}

	@Override
	public void setDeviceMsgs(String ip, List<String> oids, String task) {
		THREAD_POOL.execute(new SNMPSetTaskBean(ip,oids,task));
	}

	@Override
	public void revertSnapshot(String[] serverTarget, String snapshotName,String uuid, String ip, String task) {
		THREAD_POOL.execute(new VMSnapshotRecoverTaskBean(serverTarget,snapshotName,uuid,ip,task));
	}
	
	@Override
	public void createSnapshot(String[] serverTarget, String uuid,int client_id, int task) {
		THREAD_POOL.execute(new VMSnapshotBackupTaskBean(serverTarget,uuid,client_id,task));
	}
}
