package com.bjhit.provider.bean;

import java.sql.Timestamp;

import org.apache.xmlrpc.XmlRpcException;

import com.bjhit.database.ProviderDao;
import com.bjhit.database.ProviderFactoryDao;
import com.bjhit.provider.exception.XSConnectionFail;
import com.bjhit.provider.exception.XSVMNotFound;
import com.bjhit.provider.util.ProviderUtil;
import com.xensource.xenapi.Connection;
import com.xensource.xenapi.Types.BadServerResponse;
import com.xensource.xenapi.Types.OperationNotAllowed;
import com.xensource.xenapi.Types.SrFull;
import com.xensource.xenapi.Types.VmBadPowerState;
import com.xensource.xenapi.Types.XenAPIException;
import com.xensource.xenapi.VM;

public class VMSnapshotBackupTaskBean implements Runnable {
	private static final ProviderDao dao = ProviderFactoryDao.newInstance().getDao();
	//snapshotName:task$client_id$timestamp
	private String uuid;
	private String[] serverTarget;
	private int client_id;
	private int task;
	public VMSnapshotBackupTaskBean(String[] serverTarget,String uuid,int client_id,int task){
		this.uuid = uuid;
		this.serverTarget = serverTarget;
		this.client_id = client_id;
		this.task = task;
	}
	@Override
	public void run() {
		String success = "0";
		Connection connection = null;
		String snapshotName = this.task+"$"+this.client_id+"$"+System.currentTimeMillis();
		try {
			connection = ProviderUtil.connect(this.serverTarget);
			VM vm = ProviderUtil.getVM(this.uuid, connection);
			vm.snapshot(connection, snapshotName);
			//VM snapshot = vm.checkpoint(connection,snapshotName);
			//snapshot.setNameDescription(connection, "回溯场景使用");
			success = "1";
		} catch (Exception e) {
			if(e instanceof XSConnectionFail){
				snapshotName = "不能连接服务器;"+e.getMessage();
			}
			if(e instanceof XSVMNotFound){
				snapshotName = "uuid在服务器中不存在;"+e.getMessage();
			}
			if(e instanceof VmBadPowerState||e instanceof SrFull||e instanceof OperationNotAllowed||e instanceof BadServerResponse||e instanceof XenAPIException||e instanceof XmlRpcException){
				snapshotName = "创建快照失败;"+e.getMessage();
			}
		}finally{
			ProviderUtil.disconnect(connection);
			dao.addVMBackup(this.client_id,snapshotName, new Timestamp(System.currentTimeMillis()),this.task,success);
		}
	}

}
