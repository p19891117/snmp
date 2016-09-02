/**
 * 
 * @title TaskConfig.java
 * @package com.bjhit.dao.model
 * @copyright(c) 2009-2014 HEETIAN.com All rights reserved.
 * @project netscence
 * @author hekun
 * @date 2015年4月2日
 * @version V1.0 
 */
package com.bjhit.dao.model;

/**
 * 
 * @author hekun
 *
 */
public class TaskConfig {
	private String id;
	
	private String taskid;
	
	private String confid;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTaskid() {
		return taskid;
	}

	public void setTaskid(String taskid) {
		this.taskid = taskid;
	}

	public String getConfid() {
		return confid;
	}

	public void setConfid(String confid) {
		this.confid = confid;
	}
	
}
