package com.bjhit.provider.bean;

import java.util.Iterator;
import java.util.Set;

import kafka.producer.KeyedMessage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.bjhit.database.ProviderDao;
import com.bjhit.database.ProviderFactoryDao;
import com.bjhit.provider.exception.XSConnectionFail;
import com.bjhit.provider.exception.XSVMNotFound;
import com.bjhit.provider.util.ProviderUtil;
import com.xensource.xenapi.Connection;
import com.xensource.xenapi.VM;

public class VMSnapshotRecoverTaskBean implements Runnable {
	private static Log logger = LogFactory.getLog(VMSnapshotRecoverTaskBean.class);
	private static final ProviderDao dao = ProviderFactoryDao.newInstance().getDao();
	private String snapshotName;
	private String uuid;
	private String[] serverTarget;
	private String ip ;
	//taskid,positionid
	private String task;
	public VMSnapshotRecoverTaskBean(String[] serverTarget, String snapshotName,String uuid,String ip,String task){
		this.serverTarget = serverTarget;
		this.snapshotName = snapshotName;
		this.uuid = uuid;
		this.ip = ip;
		this.task = task;
		
	}
	@Override
	public void run() {
		String msg = "快照备份成功";
		String tasks[] = this.task.split("\\,");
		Connection connection = null;
		try {
			connection = ProviderUtil.connect(serverTarget);
			VM vm = ProviderUtil.getVM(uuid, connection);
			Set<VM> snapshots = vm.getSnapshots(connection);
			Iterator<VM> it = snapshots.iterator();
			boolean flag = false;
			while (it.hasNext()) {
				VM snapshot = it.next();
				if (snapshot.getNameLabel(connection).equals(snapshotName)) {
					snapshot.revert(connection);
					//vm.resume(connection, false, true);
					vm.start(connection, false, true);
					//task , ip  , info
					flag = true;
				}
			}
			if(!flag){
				msg = "快照名称不存在";
			}
		} catch (Exception e) {
			if(e instanceof XSVMNotFound){
				msg = "uuid在服务器中不存在;"+e.getMessage();
			}else if(e instanceof XSConnectionFail){
				msg = "连接服务器除错;"+e.getMessage();
			}else{
				msg = "其他异常错误;"+e.getMessage();
			}
		}finally{
			ProviderUtil.disconnect(connection);
			dao.addBackupInfo(this.ip, Integer.parseInt(tasks[0]), tasks[1],msg,"1");
			logger.info("vm不管恢复成功与失败，都发送了+1信号");
			ProviderUtil.producer().send(new KeyedMessage<String,String>("recover",this.ip,"vm"+"#"+this.task));
		}
	}

}
