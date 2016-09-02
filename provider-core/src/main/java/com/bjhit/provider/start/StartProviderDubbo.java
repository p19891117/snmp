package com.bjhit.provider.start;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.bjhit.database.ProviderDao;
import com.bjhit.database.ProviderFactoryDao;
import com.bjhit.provider.util.ReadFile;

public class StartProviderDubbo {
	private static Log logger = LogFactory.getLog(StartProviderDubbo.class);
	public static void main(String[] args) {
		// 加载配置文件
		try {
			ReadFile.analysisConfig("pConfig.properties");
			ProviderDao dao = ProviderFactoryDao.newInstance().getDao();
			dao.connection();
			logger.info("M3:启动DBCP数据源成功");
			// 启动dubbo框架
			ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] { "applicationContext.xml" });
			context.start();
			logger.info("M4(L):启动dubbo服务成功");
			// 为保证服务一直开着，利用线程阻塞保证服务开启
			Class<Object> lock = Object.class;
			synchronized (lock) {
				while(true){
					try {
						lock.wait();
					} catch (InterruptedException e) {
					}
				}
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
	}
}
