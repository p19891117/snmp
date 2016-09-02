package com.bjhit.consumer.start;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kafka.consumer.Consumer;
import kafka.consumer.ConsumerConfig;
import kafka.consumer.KafkaStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.bjhit.consumer.bean.KafkTopicConfig;
import com.bjhit.consumer.exception.KafkaThreadCreate;
import com.bjhit.consumer.exception.ReadConfigFileException;
import com.bjhit.consumer.kafka.AbstractRunnable;
import com.bjhit.consumer.util.ConsumerUtil;
import com.bjhit.consumer.util.ReadFile;
import com.bjhit.database.ProviderDao;
import com.bjhit.database.ProviderFactoryDao;
public class StartConsumerDubbo {
	private static Log logger = LogFactory.getLog(StartConsumerDubbo.class);
	public static void main(String[] args) {
		try {
			ReadFile.analysisConfig("cConfig.properties");
			//启动DBCP框架
			ProviderDao dao = ProviderFactoryDao.newInstance().getDao();
			dao.connection();
			logger.info("M2:启动DBCP数据源成功");
			//启动KAFKA框架
			kafkaThreadCreate();
			//启动DUBBO框架
			ClassPathXmlApplicationContext context = ConsumerUtil.CONTEXT;
			context.start();
			logger.info("M7(L):启动dubbo服务成功");
		} catch (ReadConfigFileException|KafkaThreadCreate e) {
			e.printStackTrace();
			logger.error("M"+e.getMessage());
			System.exit(0);
		}
	}
	
	private static void kafkaThreadCreate() throws KafkaThreadCreate {
		String topics[] = {KafkTopicConfig.TOPIC_TASK,KafkTopicConfig.TOPIC_WCOMMAND,KafkTopicConfig.TOPIC_RATE,KafkTopicConfig.TOPOC_RECOVER};
		// 设置topic和流数量
		Map<String, Integer> topicMap = new HashMap<String, Integer>();
		for(String topic:topics){
			topicMap.put(topic, 1);
		}
		// 创建流
		Map<String, List<KafkaStream<byte[], byte[]>>> kafkStreamMap =  Consumer.createJavaConsumerConnector(new ConsumerConfig(ReadFile.read)).createMessageStreams(topicMap);
		String classNames[] = {"TaskRunnable","OperationRunnable","RateRunnable","RecoverRunnable"};
		for(int i=0;i<topics.length;i++){
			try {
				Thread tmp = new Thread((AbstractRunnable) Class.forName("com.bjhit.consumer.kafka."+classNames[i]).getDeclaredConstructor(Map.class).newInstance(kafkStreamMap));
				tmp.setName(classNames[i]);
				tmp.start();
				logger.info("M"+(i+3)+"：开启kafka消费线程，topic$"+topics[i]);
			} catch (Exception e) {
				throw new KafkaThreadCreate(i+"(L) create kafka listen thread fail$"+e.getMessage());
			}
		}
	}
}