package com.bjhit.consumer.util;

import java.io.IOException;
import java.net.InetAddress;
import java.util.Properties;

import kafka.javaapi.producer.Producer;
import kafka.producer.ProducerConfig;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import com.bjhit.consumer.exception.ReadConfigFileException;
import com.bjhit.consumer.start.StartConsumerDubbo;
import com.bjihit.database.utils.DBCPConfigUtil;

public class ReadFile {
	public static Properties read; 
	private static Log logger = LogFactory.getLog(StartConsumerDubbo.class);
	public static void analysisConfig(String fileName) throws ReadConfigFileException{
		//Properties tmp = new Properties();
		Properties config = new Properties();
		try {
			
			/*InputStream in = ReadFile.class.getClassLoader().getResourceAsStream("log4j.properties");
			tmp.load(in);
			String osName = System.getProperties().getProperty("os.name");
			if(osName.toLowerCase().contains("linux")){
				tmp.put("log4j.appender.I.File","/tmp/gather/info.log");
				tmp.put("log4j.appender.E.File","/tmp/gather/error.log");
			}else if(osName.toLowerCase().contains("windows")){
				tmp.put("log4j.appender.I.File","./gather/info.log");
				tmp.put("log4j.appender.E.File","./gather/error.log");
			}else{
				System.out.println("不知名的操作系统");
				System.exit(0);
			}
			tmp.store(new FileOutputStream(""), "配置文件");*/
			
			config.load(ReadFile.class.getClassLoader().getResourceAsStream(fileName));
			//-----------kafk--------
			read = new Properties();
			read.put("zookeeper.connect", config.get("zookeeper.connect"));
			read.put("group.id", config.get("group.id")+InetAddress.getLocalHost().getHostAddress().toString());
			read.put("zookeeper.session.timeout.ms", config.get("zookeeper.session.timeout.ms"));
			read.put("zookeeper.sync.time.ms", config.get("zookeeper.sync.time.ms"));
			read.put("auto.commit.interval.ms", config.get("auto.commit.interval.ms"));
			read.put("auto.offset.reset", config.get("auto.offset.reset"));
			
			Properties wConfig = new Properties();
			wConfig.put("metadata.broker.list",config.get("metadata.broker.list"));
			wConfig.put("serializer.class",config.get("serializer.class"));
			wConfig.put("request.required.acks",config.get("request.required.acks"));
			wConfig.put("producer.type",config.get("producer.type"));
			ConsumerUtil.pL[0] = new Producer<String, String>(new ProducerConfig(wConfig));
			//-----------dbcp--------
			DBCPConfigUtil.analysisConfig(config);
			logger.info("M1:加载文件["+fileName+"]成功");
		}catch (IOException e) {
			throw new ReadConfigFileException("M(L):加载文件["+fileName+"]失败;"+e.getMessage());
		}
	}
}
