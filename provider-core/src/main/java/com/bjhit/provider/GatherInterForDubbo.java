package com.bjhit.provider;

import java.util.List;

public interface GatherInterForDubbo {
	//---------------------------------------------------------file-------------------------------------------------------------------------------
	/**
	 * 文件备份接口
	 * @param url{ip, username, passwd, port}
	 * @param command
	 * @param deviceType
	 * @param primary_key
	 * @param task
	 * @param hardware_type
	 * @param backup_files
	 */
	public void backup(String[] url, String command, String deviceType,int primary_key,int task,int hardware_type,String backup_files);
	/**
	 * 文件恢复接口
	 * @param url{ip, username, passwd, port}
	 * @param command
	 * @param deviceType
	 * @param task
	 * @param hardware_type
	 * @param files
	 */
	public void recover(String[] url, String command, String deviceType,String task,int hardware_type,String files);

	//---------------------------------------------------------snmp-------------------------------------------------------------------------------
	/**
	 * 根据参数获取被采集设备数据
	 * @param config
	 * @param oid
	 * @return
	 * @Author tangshitai
	 */
	public void gatherDeviceMsgs(String ip, List<String> oids, Long batch,long batchTime,int task);
	/**
	 * 根据参数设置被采集设备数据
	 * @param ip
	 * @param oids
	 */
	public void setDeviceMsgs(String ip, List<String> oids,String task);
	//---------------------------------------------------------snapshot-------------------------------------------------------------------------------
	/**
	 * 创建快照接口
	 * @param serverTarget: parameter of server：first ip，second usercount，third password 
	 * @param snapshotName:task$client_id$timestamp
	 * @param uuidOrLabel
	 * @param flag
	 * @return
	 */
	public void createSnapshot(String[] serverTarget,String uuid,int client_id,int task);
	/**
	 * 恢复快照接口
	 * @param serverTarget: parameter of server：first ip，second usercount，third password 
	 * @param snapshotName
	 * @param uuidOrLabel
	 * @param flag
	 * @return
	 */
	public void revertSnapshot(String[] serverTarget, String snapshotName,String uuid,String ip,String task);
}
