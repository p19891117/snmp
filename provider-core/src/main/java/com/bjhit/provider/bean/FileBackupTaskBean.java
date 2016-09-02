package com.bjhit.provider.bean;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintStream;
import java.net.SocketException;
import java.sql.Timestamp;

import org.apache.commons.net.telnet.TelnetClient;

import com.bjhit.database.ProviderDao;
import com.bjhit.database.ProviderFactoryDao;
import com.bjhit.database.bean.Ttask;
import com.bjhit.provider.util.ProviderUtil;

public class FileBackupTaskBean implements Runnable{
	private static final ProviderDao dao = ProviderFactoryDao.newInstance().getDao();
	/**
	 *url  url[0]=ip,url[1]=username,url[2]=passwd,url[3]=port;
	 */
	private String[] url;
	private String command ="tftp 192.168.10.42 put "; 
	private String deviceType;
	private int primary_key;
	private int task;
	private int hardware_type;
	private String backup_files;
	public FileBackupTaskBean(String[] url, String command, String deviceType,int primary_key,int task,int hardware_type,String backup_files) {
		this.url = url;
		this.command = command;
		this.deviceType = deviceType;
		this.primary_key = primary_key;
		this.task = task;
		this.hardware_type = hardware_type;
		this.backup_files = backup_files;
	}
	@Override
	public void run() {
		InputStream in = null;
		PrintStream out = null;
		TelnetClient telnet = new TelnetClient();
		String msg = "";
		String success = "0";
		try {
			telnet.connect(url[0],Integer.parseInt(url[3]));
			in = telnet.getInputStream();
			out = new PrintStream(telnet.getOutputStream());
			if(Ttask.ROUTER_DEV.equals(String.valueOf(this.hardware_type))){
				if("H3C".equals(deviceType)){
					msg = send(in, out);
				}
			}
			if(Ttask.FIREWALL_DEV.equals(String.valueOf(this.hardware_type))){
				msg = send(in, out);
			}
			if(Ttask.SWITCH_DEV.equals(String.valueOf(this.hardware_type))){
				msg = send(in, out);
			}
			success = "1";
		}catch (Exception e) {
			if(e instanceof SocketException){
				msg = "因连接异常备份失败;"+e.getMessage();
			}else{
				msg = "因异常备份失败；"+e.getMessage();
			}
		} finally{
			ProviderUtil.close(telnet,in,out);
			dao.addFilebackup(this.primary_key, msg,this.task,new Timestamp(System.currentTimeMillis()),success);
		}
	}
	private String send(InputStream in, PrintStream out) throws IOException {
		ProviderUtil.readUntil("Username:",in); 
		ProviderUtil.write(this.url[1],out);
		ProviderUtil.readUntil("Password:",in);
		ProviderUtil.write(this.url[2],out);
		ProviderUtil.readUntil(">" + "",in);
		String files[] = this.backup_files.split("\\$");
		String back_name = null;
		for(int i=0;i<files.length;i++){
			String tmp = files[i]+"#"+this.task+"#"+System.currentTimeMillis()+"#"+this.url[0];
			String backupCommand = this.command+" "+files[i]+" "+tmp;
			ProviderUtil.write(backupCommand ,out);
			ProviderUtil.readUntil(">" + "",in);
			if(i==0){
				back_name = tmp;
			}else{
				back_name = back_name+"$"+tmp;
			}
		}
		return back_name;
	}
}
