package com.bjhit.consumer.kafka;

import java.util.List;
import java.util.Map;

import kafka.consumer.KafkaStream;

import com.bjhit.consumer.bean.KafkTopicConfig;
import com.bjhit.consumer.exception.KafkaSendException;
import com.bjhit.consumer.exception.ObjectHaveFromContainer;
import com.bjhit.consumer.thread.Execute.OPERATION;
import com.bjhit.consumer.util.ConsumerUtil;

public class OperationRunnable extends AbstractRunnable {
	public OperationRunnable(Map<String, List<KafkaStream<byte[], byte[]>>> kafkStreams) {
		super(kafkStreams);
		
	}
	/**
	 * 控制操作
	 * @param command  command format：task#operation(01:start;02:stop;03:over;04:continue)   
	 */
	@Override
	public void doThing(String command) {
		//task#oper
		String[] comms = command.split("\\#");
		try {
			switch (comms[1]) {
			case "01":
				ConsumerUtil.searcher("operation(L)["+command+"]开启任务失败",comms[0]).operation(OPERATION.START);
				break;
			case "02":
				ConsumerUtil.searcher("operation(L)["+command+"]暂停任务失败",comms[0]).operation(OPERATION.STOP);
				break;
			case "03":
				ConsumerUtil.searcher("operation(L)["+command+"]终止任务失败",comms[0]).operation(OPERATION.OVER);
				break;
			case "04":
				ConsumerUtil.searcher("operation(L)["+command+"]重新开启任务失败",comms[0]).operation(OPERATION.RESTART);
				break;
			}
		} catch (ObjectHaveFromContainer  e) {
			try {
				logger.info(e.getMessage()+ConsumerUtil.send_fail(comms[1], Integer.parseInt(comms[0])));
			}catch (KafkaSendException e1) {
				logger.error(e.getMessage());
			}
		}
	}
	@Override
	public String setTopic() { 
		return KafkTopicConfig.TOPIC_WCOMMAND;
	}
	@Override
	public String loggerInfo(String msg,String command) {
		return "------------"+msg+"-------------操作任务:从topic["+setTopic()+"]获取一条命令["+command+"]-------------------------";
	}

}
