package com.bjhit.consumer.thread;

import java.util.List;
import java.util.TimerTask;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.bjhit.consumer.exception.KafkaSendException;
import com.bjhit.consumer.exception.ObjectHaveFromContainer;
import com.bjhit.consumer.util.ConsumerUtil;
import com.bjhit.database.bean.BackupBean;
import com.bjhit.database.bean.FileBackup;
import com.bjhit.database.bean.Ttask;
import com.bjhit.database.bean.VMBackupClient;
import com.bjhit.database.bean.VMBackupServer;
public class Execute extends Thread{
	private static final Log logger = LogFactory.getLog(Execute.class);
	public static enum OPERATION {START,STOP,RESTART,OVER,DUMPRATE};
	private static final String operation_START = "01";
	private static final String operation_STOP = "02";
	private static final String operation_KILL = "03";
	private static final String operation_RESTART = "04";
	private static final String oper = "operation(L)[";
	private Object obj = new Object();
	private int normalRate = 0;
	private int normalRateBackup = 0;
	private boolean stopState = true;
	private boolean startState = false;
	private boolean dumpRateFlag = false;
	private BackupBean data;
	private int task;
	public Execute(BackupBean data,String name) throws ObjectHaveFromContainer{
		super.setName(name);
		this.data = data;
		this.normalRate = this.data.gettTask().getNormalRate();
		this.normalRateBackup = this.normalRate;
		this.task = this.data.gettTask().getId();
		ConsumerUtil.add(this);
	}
	public BackupBean getData() {
		return data;
	}
	public int getTask() {
		return this.task;
	}
	
	@Override
	public void run() {
		try {
			String head = oper+this.task+"#"+operation_START+"]开启任务成功";
			logger.info(head+ConsumerUtil.send_success(operation_START,this.task));
		} catch (KafkaSendException e1) {
			changeState(true, true);
		}
		long batch = 1;
		while(this.startState){
			long batchTime = System.currentTimeMillis()+10;
			execution(this.data.getDataByType(Ttask.HOST_DEV), batch,batchTime);
			execution(this.data.getDataByType(Ttask.ROUTER_DEV), batch,batchTime);
			execution(this.data.getDataByType(Ttask.SWITCH_DEV), batch,batchTime);
			execution(this.data.getDataByType(Ttask.FIREWALL_DEV), batch,batchTime);
			batch++;
			try {
				sleep(this.normalRate*1000-3);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			while(this.stopState){
				synchronized (this.obj) {
					boolean headb1 = true;
					boolean headb2 = false;
					try {
						logger.info(oper+this.task+"#"+operation_STOP+"]暂停任务成功"+ConsumerUtil.send_success(operation_STOP,this.task));
						headb1 = false;
						headb2 = true;
						this.obj.wait();
						logger.info( oper+this.task+"#"+operation_RESTART+"]重新开启任务成功"+ConsumerUtil.send_success(operation_RESTART,this.task));
					} catch (InterruptedException e) {
						changeState(false, true);
					}catch (KafkaSendException e) {
						if(headb1){
							//暂停信号发送不成功的处理
							changeState(false, true);
						}
						if(headb2){
							//唤醒信号发送不成功的处理
							changeState(true, true);
						}
					}
				}
			}
		}
		ConsumerUtil.delete(String.valueOf(this.task));
		//KafkWriteMsg.newInstance().send("operation(L)$"+this.task+"#03 终止任务成功并且将任务从内存中删除",KafkTopicConfig.TOPIC_GCOMMAND, this.task+"#030");
		try {
			String head = oper+this.task+"#"+operation_KILL+"]终止并从内存中删除任务成功";
			logger.info(head+ConsumerUtil.send_success( operation_KILL,this.task));
		} catch (KafkaSendException e) {
			//终止信号发送不成功的处理
			try {
				ConsumerUtil.add(this);
				changeState(false, true);
				run();
			} catch (ObjectHaveFromContainer e1) {
			}
		}
	}
	
	private void execution(List<String>[] data,long batch,long batchTime){
		if(data[0].size()>0&&data[1].size()>0){
			for(String ip:data[0]){
				//System.out.println("ip:"+ip+"  oid:"+data[1]);
				ConsumerUtil.GATHER_INTER_FORDUBBO.gatherDeviceMsgs(ip, data[1], batch,batchTime,this.task);
			}
		}
	}
	public void operation(OPERATION o,int ...otherParagram){
		if(o==OPERATION.START){
			if(this.getState()==Thread.State.NEW){
				List<FileBackup> filebackups = this.data.getFileBackups();
				for(FileBackup filebackup:filebackups){
					ConsumerUtil.GATHER_INTER_FORDUBBO.backup(filebackup.url(),filebackup.getBack_command(),filebackup.getDevice_type(),filebackup.getId(),this.task,filebackup.getHardware_type(),filebackup.getBackup_files());
				}
				List<VMBackupServer> vmBackupServers = this.data.getVmBackupServers();
				for(VMBackupServer vmBackupServer:vmBackupServers){
					List<VMBackupClient> vmBackupClients = vmBackupServer.getVmBackupClients();
					for(VMBackupClient vmBackupClient:vmBackupClients){
						ConsumerUtil.GATHER_INTER_FORDUBBO.createSnapshot(vmBackupServer.url(),vmBackupClient.getUuid(),vmBackupClient.getId(),this.task);
					}
				}
				changeState(false,true);
				this.start();
				//logger.info("operation1$"+command+":start success and vm snapshot start number$"+/*i+*/":"+this.getState() );
			}else{
				try {
					String head = oper+this.task+"#"+operation_START+"]"+"开始任务失败$当前线程状态["+this.getState()+"]不等于"+Thread.State.NEW;
					logger.info(head+ConsumerUtil.send_fail(operation_START, this.task ));
				} catch (KafkaSendException e) {
					e.printStackTrace();
				}
			}
		}
		if(o==OPERATION.STOP){
			if(this.getState()==Thread.State.RUNNABLE||this.getState()==Thread.State.TIMED_WAITING){
				changeState(true, true);
			}else{
				try {
					String head = oper+this.task+"#"+operation_STOP+"]"+"暂停任务失败$当前线程状态["+this.getState()+"]不等于"+Thread.State.RUNNABLE+"、"+Thread.State.TIMED_WAITING;
					logger.info(head+ConsumerUtil.send_fail(operation_STOP, this.task));
				} catch (KafkaSendException e) {
					e.printStackTrace();
				}
			}
		}
		if(o==OPERATION.RESTART){
			if(this.getState()==Thread.State.WAITING){
				changeState(false, true);
				synchronized (this.obj) {
					this.obj.notify();
				}
			}else{
				try {
					String head = oper+this.task+"#"+operation_RESTART+"]"+"暂停任务失败$当前线程状态["+this.getState()+"]不等于"+Thread.State.WAITING;
					logger.info(head+ConsumerUtil.send_fail(operation_RESTART, this.task));
				} catch (KafkaSendException e) {
					e.printStackTrace();
				}
			}
		}
		if(o==OPERATION.OVER){
			if(this.getState()==Thread.State.WAITING||this.getState()==Thread.State.RUNNABLE||this.getState()==Thread.State.TIMED_WAITING){
				changeState(false, false);
			}else{
				try {
					String head = oper+this.task+"#"+operation_KILL+"]"+"终止任务失败$当前线程状态["+this.getState()+"]不等于"+Thread.State.RUNNABLE+"、"+Thread.State.TIMED_WAITING+"、"+Thread.State.WAITING;
					logger.info(head+ConsumerUtil.send_fail(operation_KILL, this.task));
				} catch (KafkaSendException e) {
					e.printStackTrace();
				}
			}
		}
		if(o==OPERATION.DUMPRATE){
			if(!this.dumpRateFlag){
				this.normalRate = otherParagram[0];
				this.dumpRateFlag = true;
				logger.info("rate(L)["+this.task+"#"+otherParagram[0]+"]变频成功,线程["+Thread.currentThread().getName()+"]正在变频中并且开启了一个复频定时器");
				ConsumerUtil.TIMER.schedule(new TimerTask() {
					@Override
					public void run() {
						int tmp = Execute.this.normalRate;
						Execute.this.normalRate = Execute.this.normalRateBackup;
						Execute.this.dumpRateFlag = false;
						ConsumerUtil.deleteForRate(Execute.this.task+"#"+tmp);
						Execute.logger.info("rate2(L)$"+Execute.this.task+"#"+tmp+"频率从调频中恢复到正常频率成功");
					}
				}, this.data.gettTask().getAfterWin()*1000);
			}
		}
	}
	private void changeState(boolean stop,boolean start){
		synchronized (this.obj) {
			this.stopState = stop;
			this.startState = start;
		}
	}
}