package com.bjhit.provider.bean;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.SocketException;

import kafka.producer.KeyedMessage;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.net.telnet.TelnetClient;

import com.bjhit.database.ProviderDao;
import com.bjhit.database.ProviderFactoryDao;
import com.bjhit.database.bean.Ttask;
import com.bjhit.provider.util.ProviderUtil;

public class FileRecoverTaskBean implements Runnable {
	private static Log logger = LogFactory.getLog(FileRecoverTaskBean.class);
	private static final ProviderDao dao = ProviderFactoryDao.newInstance().getDao();
	private String[] url;
	private String command = "tftp 192.168.10.42 get "; 
	private String deviceType;
	private String task;
	private String files;
	private int hardware_type;
	public FileRecoverTaskBean(String[] url, String command, String deviceType,String task,int hardware_type,String files) {
		this.url = url;
		this.command = command;
		this.deviceType = deviceType;
		this.task = task;
		this.files = files;
		this.hardware_type = hardware_type;
	}
	@Override
	public void run() {
		InputStream in = null;
		PrintStream out = null;
		TelnetClient telnet = null;
		String tasks[] = this.task.split("\\,");
		telnet = new TelnetClient();
		String msg = "";
		try {
			telnet.connect(url[0],Integer.parseInt(url[3]));
			in = telnet.getInputStream();
			out = new PrintStream(telnet.getOutputStream());
			if(Ttask.ROUTER_DEV.equals(String.valueOf(this.hardware_type))){
				if("H3C".equals(deviceType)){
					msg = send(msg, in, out, tasks );
				}
			}
			if(Ttask.FIREWALL_DEV.equals(String.valueOf(this.hardware_type))){
				msg = send(msg, in, out,tasks);
			}
			if(Ttask.SWITCH_DEV.equals(String.valueOf(this.hardware_type))){
				msg = send(msg, in, out,tasks);
			}
			//task , ip  , info
		}catch (Exception e) {
			if(e instanceof SocketException){
				msg = msg + ";telnet服务连接不上错误";
			}else{
				msg = msg + ";出现io异常导致恢复失败";
			}
		}finally{
			ProviderUtil.close(telnet, in, out);
			dao.addBackupInfo(url[0], Integer.parseInt(tasks[0]),tasks[1], msg,"2");
			ProviderUtil.producer().send(new KeyedMessage<String,String>("recover",url[0],"file"+"#"+this.task));
			logger.info("file不管恢复成功与失败，都发送了+1信号");
		}
	}
	private String send(String msg, InputStream in, PrintStream out,String tasks[] )throws IOException {
		ProviderUtil.readUntil("Username:",in); 
		ProviderUtil.write(url[1],out);
		ProviderUtil.readUntil("Password:",in);
		ProviderUtil.write(url[2],out);
		ProviderUtil.readUntil(">" + "",in);
		String filesarray[] = this.files.split("\\$");
		for(String file:filesarray){
			String recover_command = this.command + " " + file + " "+file.split("\\#")[0]+"_test";
			try{
				ProviderUtil.write(recover_command,out);
				ProviderUtil.readUntil("[Y/N]:",in);
				ProviderUtil.write("Y",out);
				ProviderUtil.readUntil(">" + "",in);
				msg = msg+file.split("\\#")[0]+"成功,";
			}catch(IOException e){
				msg = msg+file.split("\\#")[0]+"io异常失败,";
				continue;
			}
		}
		ProviderUtil.write("reboot",out);
		ProviderUtil.readUntil("[Y/N]:",in);
		ProviderUtil.write("Y",out);
		return msg;
	}
}
