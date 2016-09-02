package com.bjhit.consumer.kafka;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import kafka.consumer.KafkaStream;

import com.bjhit.consumer.bean.KafkTopicConfig;
import com.bjhit.consumer.exception.KafkaSendException;
import com.bjhit.consumer.util.ConsumerUtil;
import com.bjhit.database.bean.DataTable;
import com.bjhit.database.bean.FileBackup;
import com.bjhit.database.bean.FileRecover;
import com.bjhit.database.bean.RecoverBean;
import com.bjhit.database.bean.VMBackupClient;
import com.bjhit.database.bean.VMRecover;
import com.bjhit.database.exception.LoadExcetpion;

public class RecoverRunnable extends AbstractRunnable {
	public RecoverRunnable(Map<String, List<KafkaStream<byte[], byte[]>>> kafkStreams) {
		super(kafkStreams);
	}
	/**
	 * 恢复操作
	 */
	@Override
	public void doThing(String command) {
		String commands[] = command.split("\\#");
		//recover#task,positionID#1
		if(commands.length==3){
			publishingTask(command, commands);
		}
		//vm/file/oid#task,positionID
		if(commands.length==2){
			acceptTask(command, commands);	
		}
	}
	private void acceptTask(String command, String[] commands) {
		RecoverBean bean = ConsumerUtil.RECOVER.get(commands[1]);
		if(bean!=null){
			if(commands[0].equals("file")){
				bean.setFile_number(bean.getFile_number()-1);
				logger.info("处理了一个file，还剩"+bean.getFile_number());
				punishOID(bean,commands[1]);
			}else if(commands[0].equals("vm")){
				bean.setVm_number(bean.getVm_number()-1);
				logger.info("处理了一个vm，还剩"+bean.getVm_number());
				punishOID(bean,commands[1]);
			}else if(commands[0].equals("oid")){
				bean.setOid_number(bean.getOid_number()-1);
				logger.info("处理了一个oid，还剩"+bean.getOid_number());
				if(bean.getOid_number()<=0){
					removeBean(commands[1]);
				}
			}
		}else{
			logger.info("从recoverbean容器中获得的bean是空指针"+command);
		}
	}
	private void punishOID( RecoverBean bean,String task_postion) {
		 if(bean.getFile_number()<=0&&bean.getVm_number()<=0){
			 logger.info("File恢复完毕和快照恢复完毕");
			 if(bean.isOidIsHave()){
					 oidIterator(bean, task_postion);
			 }else{
					 removeBean(task_postion);
			 }
		 }
	}
	private void removeBean(String task_postion) {
		//logger.info("OID恢复完毕(可能有OID数据，可能无)，且移除了bean从容器中");
		ConsumerUtil.RECOVER.remove(task_postion);
		try {
			logger.info("recover(L)$recover#"+task_postion+"#0"+"恢复操作结束,且从容器中移除了OID"+ConsumerUtil.send(KafkTopicConfig.TOPOC_RECOVER,"recover#"+task_postion+"#0"));
		} catch (KafkaSendException e) {
			logger.error(e.getMessage());
		}
	}

	private void publishingTask(String command, String[] commands){
		//taskid, positionid
		String ids[] = commands[1].split("\\,");
		RecoverBean bean = null;
		try {
			bean = dao.loadDataRecover(Integer.parseInt(ids[0]), ids[1]);
			if(bean==null){
				logger.info("recover$文件IP数:0；快照IP数:0；OIDIP数:0");
				removeBean(commands[1]);
			}else{
				logger.info("recover$文件IP数:"+bean.getFile_number()+"；快照IP数:"+bean.getVm_number()+"；OIDIP数:"+bean.getOid_number());
				//key:taskid,positionid
				ConsumerUtil.RECOVER.put(commands[1], bean);
				if(bean.isFile_VMNoHave()){
						oidIterator(bean, commands[1]);
				}else{
					file_vm(bean.getFileRecovers(),commands[1]);
					file_vm(bean.getVmRecovers(), commands[1]);
				}
			}
		}catch (LoadExcetpion e) {
			e.printStackTrace();
		}
	}
	private <T> void file_vm(List<T> list,String taskPostion){
		if(list!=null){
			for(T t:list){
				if(t instanceof FileRecover){
					FileRecover fileRecover = (FileRecover)t;
					FileBackup tmp =fileRecover.getFileBackup();
					ConsumerUtil.GATHER_INTER_FORDUBBO.recover(tmp.url(), tmp.getRecover_command(), tmp.getDevice_type(),taskPostion,tmp.getHardware_type(),fileRecover.getBackup_name());
				}
				if(t instanceof VMRecover){
					VMRecover vmRecover = (VMRecover)t;
					VMBackupClient client = vmRecover.getVmBackupClient();
					ConsumerUtil.GATHER_INTER_FORDUBBO.revertSnapshot(client.getVmBackupServer().url(),vmRecover.getSnapshot_name(),client.getUuid(),client.getClient_ip(),taskPostion);
				}
			}
		}
	}
	private void oidIterator(RecoverBean bean, String task_postion) {
		 while(bean.getDataTables().size()>0){
			Iterator<DataTable> ite_data = bean.getDataTables().iterator();
			while(ite_data.hasNext()){
				DataTable dataTable = ite_data.next();
				if(ConsumerUtil.ping(dataTable.getIp(),3, 1)){
					ConsumerUtil.GATHER_INTER_FORDUBBO.setDeviceMsgs(dataTable.getIp(),dataTable.getOid_values(),task_postion);
					ite_data.remove();
				}
			}
			try {
				Thread.sleep(1000*5);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		 }
	}
	@Override
	public String setTopic() {
		return KafkTopicConfig.TOPOC_RECOVER;
	}
	@Override
	public String loggerInfo(String msg,String command) {
		return "------------"+msg+"-------------恢复任务:从topic["+setTopic()+"]获取一条命令["+command+"]-------------------------";
	}

}
