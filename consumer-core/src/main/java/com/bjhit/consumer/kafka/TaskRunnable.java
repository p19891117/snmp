package com.bjhit.consumer.kafka;

import java.util.List;
import java.util.Map;

import kafka.consumer.KafkaStream;

import com.bjhit.consumer.bean.KafkTopicConfig;
import com.bjhit.consumer.exception.KafkaSendException;
import com.bjhit.consumer.exception.ObjectHaveFromContainer;
import com.bjhit.consumer.thread.Execute;
import com.bjhit.consumer.util.ConsumerUtil;
import com.bjhit.database.exception.LoadExcetpion;

public class TaskRunnable extends AbstractRunnable {
	public TaskRunnable(Map<String, List<KafkaStream<byte[], byte[]>>> kafkStreams) {
		super(kafkStreams);
	}
	/**
	 * 任务创建，根据任务编号，搜索队列,若存在ComplixyBean对象，则不加载数据，否则加载数据，并创建ComplixyBean对象添加到队列中
	 * @param taskNumber 任务编号
	 */
	@Override
	public void doThing(String command) {
		//task
		String isSuccess = "#1";
		String resultMSG = "";
		try {
			new Execute(dao.loadDataBackup(Integer.parseInt(command)),"taskThread:"+command);
			resultMSG = "task1["+command+"] 创建任务成功，加载到数据、初始化线程并添加到缓存中";
		} catch (ObjectHaveFromContainer | LoadExcetpion e) {
			isSuccess = "#0";
			resultMSG = "task1$"+" 创建任务失败，错误信息："+e.getMessage();
		}finally{
			try {
				logger.info("task1["+command+isSuccess+"]"+resultMSG+ConsumerUtil.send(KafkTopicConfig.LOAD_DATA, command+isSuccess));
			} catch (KafkaSendException e) {
				ConsumerUtil.delete(command);
				logger.error("task1["+command+"]"+e.getMessage());
			}
		}
	}
	@Override
	public String setTopic() {
		return KafkTopicConfig.TOPIC_TASK;
	}
	@Override
	public String loggerInfo(String msg,String command) {
		return "------------"+msg+"-------------创建任务:从topic["+setTopic()+"]获取一条命令["+command+"]-------------------------";
	}
}
