package com.bjhit.consumer.kafka;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kafka.consumer.ConsumerIterator;
import kafka.consumer.KafkaStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.bjhit.consumer.bean.KafkTopicConfig;
import com.bjhit.consumer.util.ConsumerUtil;
import com.bjhit.database.ConsumeDao;
import com.bjhit.database.FactoryDao;

public abstract class AbstractRunnable implements Runnable {
	/**
	 * 日志
	 */
	protected static Log logger = LogFactory.getLog(AbstractRunnable.class);
	/**
	 * topic value
	 */
	private String topic;
	/**
	 * 恢复操作所需要的容器
	 */
	protected static Map<String,Integer> RECOVER = new HashMap<String,Integer>();
	/**
	 * 数据库dao
	 */ 
	protected static ConsumeDao dao;
	private static byte isInit = 0;
	private Map<String, List<KafkaStream<byte[], byte[]>>> kafkStreams;
	protected AbstractRunnable(Map<String, List<KafkaStream<byte[], byte[]>>> kafkStreams) {
		super();
		this.topic = setTopic();
		this.kafkStreams = kafkStreams;
		if(isInit==0){
			dao = FactoryDao.newInstance().consumeDao();
			isInit = 1;
		}
	}
	@Override
	public void run() {
		List<KafkaStream<byte[], byte[]>> tmp = this.kafkStreams.get(this.topic);
		for(KafkaStream<byte[], byte[]> stream:tmp){
			ConsumerIterator<byte[], byte[]> it = stream.iterator();// 获得消费迭代器
			while (it.hasNext()) {
				try {
					String msg = new String(it.next().message());
					if(checkMsg(msg)==2){
						logger.info(loggerInfo("开始",msg));
						doThing(msg);
						logger.info(loggerInfo("结束",msg));
					}
					if(checkMsg(msg)==1){
						doThing(msg);
					}
				} catch (Exception e) {
					logger.info("kafka接受命令源头捕获的异常信息："+e.getMessage());
				}
			}
		}
	}
	//0不执行，1执行，2执行并打印
	private byte checkMsg(String msg){
		byte flag = 2;
		if(setTopic().equals(KafkTopicConfig.TOPOC_RECOVER)){
			String msgs[] = msg.split("\\#");
			if(msgs.length==3){
				if(msgs[2].equals("0")){
					flag = 0;
				}
			}
			if(msgs.length==2){
				flag = 1;
			}
		}else if(setTopic().equals(KafkTopicConfig.TOPIC_RATE)){
			flag = (byte) (ConsumerUtil.addForRate(msg)==true?2:0);
		}else if(setTopic().equals(KafkTopicConfig.TOPIC_WCOMMAND)){
			
		}else if(setTopic().equals(KafkTopicConfig.TOPIC_TASK)){
			
		}else{
			flag = 0;
		}
		return flag;
	}
	public abstract void doThing(String command);
	public abstract String setTopic();
	public abstract String loggerInfo(String msg,String command);
}
