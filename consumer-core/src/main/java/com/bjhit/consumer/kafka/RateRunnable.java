package com.bjhit.consumer.kafka;

import java.util.List;
import java.util.Map;

import kafka.consumer.KafkaStream;

import com.bjhit.consumer.bean.KafkTopicConfig;
import com.bjhit.consumer.exception.ObjectHaveFromContainer;
import com.bjhit.consumer.thread.Execute;
import com.bjhit.consumer.thread.Execute.OPERATION;
import com.bjhit.consumer.util.ConsumerUtil;

public class RateRunnable extends AbstractRunnable {
	public RateRunnable(Map<String, List<KafkaStream<byte[], byte[]>>> kafkStreams) {
		super(kafkStreams);
	}
	/**
	 * 变频操作
	 * @param frequency 变频命令 格式  任务编号#频率
	 */
	@Override
	public void doThing(String command) {
		//task#rate
		try{
			String[] frequencyComplixy = command.split("\\#");
			Execute excute = ConsumerUtil.searcher("rate(L)["+command+"]任务变频失败",frequencyComplixy[0]);
			excute.operation(OPERATION.DUMPRATE, Integer.parseInt(frequencyComplixy[1]));
		}catch (ObjectHaveFromContainer e) {
			logger.error(e.getMessage());
		}
	}
	@Override
	public String setTopic() {
		return KafkTopicConfig.TOPIC_RATE;
	}
	@Override
	public String loggerInfo(String msg,String command) {
		return "------------"+msg+"-------------变频:从topic["+setTopic()+"]获取一条命令["+command+"]-------------------------";
	}

}
