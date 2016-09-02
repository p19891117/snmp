/**
 * 
 * @title Vmback.java
 * @package com.bjhit.dao.model
 * @copyright(c) 2009-2014 HEETIAN.com All rights reserved.
 * @project netscence
 * @author hekun
 * @date 2015年3月25日
 * @version V1.0 
 */
package com.bjhit.dao.model;

import java.util.List;

/**
 * 
 * @author hekun
 *
 */
public class VmbackServer {
	
	private Integer serverId ;
	private String serverIp; 
    private String username; 
    private String passwd;
    private int start;
    private List<VmbackClient> vmbackClientList;
    private int max;
    
	public Integer getServerId() {
		return serverId;
	}
	public void setServerId(Integer serverId) {
		this.serverId = serverId;
	}
	public String getServerIp() {
		return serverIp;
	}
	public void setServerIp(String serverIp) {
		this.serverIp = serverIp;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public List<VmbackClient> getVmbackClientList() {
		return vmbackClientList;
	}
	public void setVmbackClientList(List<VmbackClient> vmbackClientList) {
		this.vmbackClientList = vmbackClientList;
	}
	public int getMax() {
		return max;
	}
	public void setMax(int max) {
		this.max = max;
	} 
    
}
