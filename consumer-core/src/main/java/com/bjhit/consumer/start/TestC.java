package com.bjhit.consumer.start;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.bjhit.consumer.exception.ReadConfigFileException;
import com.bjhit.consumer.util.ConsumerUtil;
import com.bjhit.consumer.util.ReadFile;


public class TestC {
	public static void main(String[] args) throws ReadConfigFileException {
		ReadFile.analysisConfig("cConfig.properties");
		
		/*ReadFile.analysisConfig("cConfig.properties");
		DBCPConfigUtil.analysisConfig(ReadFile.config);
		ConsumeDao d = FactoryDao.newInstance().consumeDao();
		try {
			System.out.println(d.queryData(44));
		} catch (ObjectNotFromDatavase e) {
			e.printStackTrace();
		}*/
	}
	public static void testDubbo() {
		ClassPathXmlApplicationContext context = ConsumerUtil.CONTEXT;
		context.start();
		List<String> a = new ArrayList<>();
		a.add("1.3.6.1.2.1.25.2.3.1.6.4");
		a.add("1.3.6.1.2.1.25.2.3.1.6.1");
		a.add("1.3.6.1.2.1.25.2.3.1.6.5");
		a.add("1.3.6.1.2.1.25.2.3.1.6.6");
		a.add("1.3.6.1.2.1.25.2.3.1.6.7");
		a.add("1.3.6.1.2.1.25.2.3.1.6.8");
		a.add("1.3.6.1.2.1.25.2.3.1.5.1");
		a.add("1.3.6.1.2.1.25.2.3.1.5.4");
		a.add("1.3.6.1.2.1.25.2.3.1.5.5");
		a.add("1.3.6.1.2.1.25.2.3.1.5.6");
		while(true){
			try{
				ConsumerUtil.GATHER_INTER_FORDUBBO.gatherDeviceMsgs("192.168.2.76", a, 1L,1,22);
				Thread.sleep(5000);
			}catch(Exception e){
				System.out.println("超时");
			}
		}
	}
}
class R implements Runnable{
	private static Log logger = LogFactory.getLog(R.class);
	@Override
	public void run() {
		for(int i=0;i<500000;i++){
			logger.info("Thread:"+Thread.currentThread().getName()+" hello:"+new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
		}
		logger.info("--------------------------------一次结束-----------------------------");
	}
	
}
