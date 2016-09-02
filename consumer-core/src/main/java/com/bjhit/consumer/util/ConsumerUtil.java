package com.bjhit.consumer.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Hashtable;
import java.util.Map;
import java.util.Set;
import java.util.Timer;
import java.util.TreeSet;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.bjhit.consumer.bean.KafkTopicConfig;
import com.bjhit.consumer.exception.KafkaSendException;
import com.bjhit.consumer.exception.ObjectHaveFromContainer;
import com.bjhit.consumer.thread.Execute;
import com.bjhit.database.bean.RecoverBean;

public class ConsumerUtil {
	/**
	 * 给变频用的
	 */
	private static final Set<String> rates = new TreeSet<String>();
	public static boolean addForRate(String rateCommand){
		return rates.add(rateCommand);
	}
	public static void deleteForRate(String rateCommand){
		rates.remove(rateCommand);
	}
	private static final byte signal_Success = 0;
	private static final byte signal_Fail = 1;
	/**
	 * kafka producer
	 */
	@SuppressWarnings("unchecked")
	public static final Producer<String, String>[] pL = new Producer[1];
	public static String send(String topic,String msg) throws KafkaSendException{
		synchronized (pL) {
			try {
				pL[0].send(new KeyedMessage<String, String>(topic, msg));
				return "并且发送信号到topic["+topic+"]成功"+msg;
			} catch (Exception e) {
				throw new KafkaSendException("并且发送信号到topic["+topic+"]失败$"+e.getMessage());
			}
		}
	}
	public static String send_success(String operation,int task) throws KafkaSendException{
		return send(KafkTopicConfig.TOPIC_GCOMMAND, task+symbol_j+operation+signal_Success);
	}
	public static String send_fail(String operation,int task) throws KafkaSendException{
		return send(KafkTopicConfig.TOPIC_GCOMMAND, task+symbol_j+operation+signal_Fail);
	}
	/**
	 * 从dubbo框架中获得bean实例
	 */
	public static final ClassPathXmlApplicationContext CONTEXT = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
	public static final com.bjhit.provider.GatherInterForDubbo GATHER_INTER_FORDUBBO = (com.bjhit.provider.GatherInterForDubbo) CONTEXT.getBean("GatherInterForDubbo");
	public static final Map<String,RecoverBean> RECOVER = new Hashtable<String,RecoverBean>();
	public static final Timer TIMER = new Timer();
	public static final String symbol_j = "#";
	/**
	 *ComplixyBean集合
	 */
	private static final Map<String,Execute> CBMAP = new Hashtable<String,Execute>();
	public static Execute searcher(String msgError,String task) throws ObjectHaveFromContainer{
		if(CBMAP.containsKey(task)){
				return CBMAP.get(task);
		}else{
			throw new ObjectHaveFromContainer(msgError+";原因是任务["+task+"]在内存中不存在");
		}
	}
	public static String delete(String task){
		if(CBMAP.remove(task)==null){
			return "没有这个任务的线程对象";
		}else{
			return "存在这个任务的线程对象并移除";
		}
	}
	public static void add(Execute bean) throws ObjectHaveFromContainer{
		if(CBMAP.containsKey(String.valueOf(bean.getTask()))){
			throw new ObjectHaveFromContainer("task["+bean.getTask()+"]在内存中已经存在这个任务");
		}else{
			CBMAP.put(String.valueOf(bean.getTask()), bean);
		}
	}
	
	public static boolean ping(String ip ,int times,int timeout){
		boolean flag = false;
		BufferedReader buffIn = null;
	   Runtime r = Runtime.getRuntime();
	   String command = "ping " +ip+" -c "+times+" -i "+timeout;
	   Process p;
		try {
			p = r.exec(command);
			if(p!=null){
				buffIn = new BufferedReader(new InputStreamReader(p.getInputStream()));
				  // 逐行检查输出,计算类似出现=23ms TTL=62字样的次数 
				int connectedCount = 0;
				String line = null;
				while ((line = buffIn.readLine()) != null) {
					if((line.contains("ttl=")&&line.contains("time="))||(line.contains("TTL=")&&line.contains("time="))){
						connectedCount = connectedCount + 1;
					}
	        	} 
				flag = (connectedCount==times);
			}
		} catch (IOException e) {
		}finally {
		    try {
		    	buffIn.close();
		    } catch (IOException e) {
	    	}
		}   
		return flag;
	}
}
