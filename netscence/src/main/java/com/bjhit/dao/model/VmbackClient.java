/**
 * 
 * @title VmbackClient.java
 * @package com.bjhit.dao.model
 * @copyright(c) 2009-2014 HEETIAN.com All rights reserved.
 * @project netscence
 * @author hekun
 * @date 2015年3月25日
 * @version V1.0 
 */
package com.bjhit.dao.model;

/**
 * 
 * @author hekun
 *
 */
public class VmbackClient {
	
	private int clientId ;
	
	private int serverId;
	
	private String uuid;
	
	private String clientIp;
	
	private int start;
	
	private int max;


	public int getClientId() {
		return clientId;
	}

	public void setClientId(int clientId) {
		this.clientId = clientId;
	}

	public int getServerId() {
		return serverId;
	}

	public void setServerId(int serverId) {
		this.serverId = serverId;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getMax() {
		return max;
	}

	public void setMax(int max) {
		this.max = max;
	}

	public String getClientIp() {
		return clientIp;
	}

	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}
	
	
}
