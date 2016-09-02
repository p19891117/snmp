package com.bjhit.consumer.bean;


public class KafkTopicConfig {
	/**
	 * 	试验场景列表topic，采集端和场景发现端都要监听
	 */
	public static final String TOPIC_TASK = "taskList";
	/**
	 * web端发送命令topic，采集端监听
	 */
	public static final String TOPIC_WCOMMAND = "webCommand";
	/**
	 * 采集端发送命令topic，场景发现端监听
	 */
	public static final String TOPIC_GCOMMAND = "gatherCommand";
	/**
	 * 场景发现端发送命令topic，web端监听
	 */
	public static final String TOPIC_FCOMMAND = "findCommand";
	/**
	 * 场景发现端发送 采集频率变化topic， 采集端监听
	 */
	public static final String TOPIC_RATE = "findRate";
	/**
	 * 采集端发送 采集数据topic， 场景发现端要监听
	 */
	public static final String TOPIC_DATA = "gatherData";
	/**
	 * 加在数据是否成功taskListResult
	 */
	public static final String LOAD_DATA = "taskListResult";
	/**
	 * 场景恢复topic
	 * 1、文件恢复    Web：file#taskid     采集：file#taskid#0/1   1:成功；0：失败     
	 *2、Vm恢复      Web：vm#taskid       采集：vm#taskid#0/1
	 *3、Oid set   Web：oid#taskid      采集：oid#taskid#0/1
	 */
	public static final String TOPOC_RECOVER = "recover";

}
