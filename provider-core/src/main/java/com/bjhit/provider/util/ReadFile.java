package com.bjhit.provider.util;

import java.io.IOException;
import java.util.Properties;

import kafka.javaapi.producer.Producer;
import kafka.producer.ProducerConfig;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.snmp4j.mp.SnmpConstants;

import com.bjhit.provider.exception.ReadConfigFileException;
import com.bjihit.database.utils.DBCPConfigUtil;

public class ReadFile {
	private static Log logger = LogFactory.getLog(ReadFile.class);
	/**
	 * 端口
	 */
	public static int SNMP_PORT = 161; 
	/**
	 * 共同体
	 */
	public static String SNMP_COMMUNITY = "public"; 
	/**
	 * 版本协议
	 */
	public static Integer SNMP_VERSION = SnmpConstants.version2c; 
	/**
	 * snmp的target超时时1间
	 */
	public static Integer SNMP_COMMUNITYTARGET_TIMEOUT = 500; 
	/**
	 * snmp的target重连次数
	 */
	public static Integer SNMP_COMMUNITYTARGET_RETRIES = 1; 
	/**
	 * pdu大小
	 */
	public static Integer SNMP_COMMUNITYTARGET_MAXSIZERESPONSEPDU = 65535;
	/**
	 * udp超时时间
	 */
	public static Integer SNMP_DEFAULTUDPTRANSPORTMAPPING_SOCKETTIMEOUT = 1000;
	/**
	 * 线程池的线程数量
	 *  
	 *  
	 */
	public static Integer TreadPOOL_SIZE = 20;
	/**
	 * 是否打开test表进行数据校验测试
	 * @param fileName
	 * @throws ReadConfigFileException
	 */
	public static String IS_TEST = "false";
	public static void analysisConfig(String fileName) throws ReadConfigFileException{
		Properties config = new Properties();
		//Properties tmp = new Properties();
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
			//-------------thread pool-----------
			TreadPOOL_SIZE = thread_size(config);
			//-----------dubbo--------
			SNMP_PORT=snmp_port(config);
			SNMP_COMMUNITY=snmp_community(config);
			SNMP_VERSION=snmp_version(config);
			SNMP_COMMUNITYTARGET_RETRIES=snmp_retry(config);
			SNMP_COMMUNITYTARGET_TIMEOUT=snmp_timeout(config);
			SNMP_COMMUNITYTARGET_MAXSIZERESPONSEPDU=snmp_max_size_pdu(config);
			SNMP_DEFAULTUDPTRANSPORTMAPPING_SOCKETTIMEOUT=udp_timeout(config);
			IS_TEST = config.getProperty("IS_TEST");
			//-----------kafk--------
			Properties kafka_producer = new Properties();
			kafka_producer.put("metadata.broker.list",config.get("metadata.broker.list"));
			kafka_producer.put("serializer.class",config.get("serializer.class"));
			kafka_producer.put("request.required.acks",config.get("request.required.acks"));
			kafka_producer.put("producer.type",config.get("producer.type"));
			ProducerConfig config_producer = new ProducerConfig(kafka_producer);
			//-----------dbcp--------
			DBCPConfigUtil.analysisConfig(config);
			logger.info("M1:加载配置文件成功");
			//------------线程池---------
			initPool(config_producer);
			logger.info("M2:启动线程池并初始化kafka生产数为："+TreadPOOL_SIZE);
		}catch (IOException e) {
			throw new ReadConfigFileException("Main1L:加载文件$"+fileName+"失败;"+e.getMessage());
		}
	}
	public static void initPool(ProducerConfig config){
		for(int i=0;i<TreadPOOL_SIZE;i++){
			ProviderUtil.producers.add(new Producer<String, String>(config));
		}
	}
	public static int thread_size(Properties config){
		return Integer.parseInt(config.getProperty("TreadPOOL_SIZE"));
	}
	public static int snmp_port(Properties config){
		return Integer.parseInt(config.getProperty("SNMP_PORT"));
	}
	public static String snmp_community(Properties config){
			return config.getProperty("SNMP_COMMUNITY");
		}
	public static int snmp_version(Properties config){
		int x = -1;
		switch(config.getProperty("SNMP_VERSION")){
		case "1":
			x = SnmpConstants.version1;
			break;
		case "2":
			x = SnmpConstants.version2c;
			break;
		case "3":
			x = SnmpConstants.version3;
			break;
		}
		return x;
	}
	public static int snmp_retry(Properties config){
		return Integer.parseInt(config.getProperty("SNMP_COMMUNITYTARGET_RETRIES"));
	}
	public static int snmp_timeout(Properties config){
		return Integer.parseInt(config.getProperty("SNMP_COMMUNITYTARGET_TIMEOUT"));
	}
	public static int snmp_max_size_pdu(Properties config){
		return Integer.parseInt(config.getProperty("SNMP_COMMUNITYTARGET_MAXSIZERESPONSEPDU"));
	}
	public static int udp_timeout(Properties config){
		return Integer.parseInt(config.getProperty("SNMP_DEFAULTUDPTRANSPORTMAPPING_SOCKETTIMEOUT"));
	}
}
