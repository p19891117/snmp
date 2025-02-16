package com.bjhit.util;

import java.util.HashMap;
import java.util.Map;

/**
 * @Description 系統常量类
 * @author lp
 * @date 2014年7月17日
 */

public class Constant {

	/**
	 * 实验场景编号序列
	 */
	public static String SEQ_TASK_ID = "SEQ_TASK_ID";
	/**
	 * 时间轴：时间间隔（分钟）
	 */
	public static int TIMELINE_DIV_MINUTES = 30;
	/**
	 * 时间轴：刻度距离（px）
	 */
	public static int TIMELINE_DIV_WIDTH = 300;
	
	/**
	 * xml文件中topo设备类型和系统对应
	 */
	@SuppressWarnings("serial")
	public static final Map<String, String> MAP_TOPO_DEVCATEGORY = new HashMap<String, String>(){
		{
			put("Computer","1");
			put("Server","1");
			put("Switch","3");
			put("Router","2");
			put("Gateway","4");
			put("Vm","1");
		}
	};
	
	public static Map<String, Object> kafka_lock = new HashMap<String, Object>();
	public static Map<String, String> kafka_value = new HashMap<String, String>();
	public static Object kafka_value_lock = new Object();
	
	public static Map<String, Object> kafka_lock_taskresult = new HashMap<String, Object>();
    public static Map<String, String> kafka_value_taskresult = new HashMap<String, String>();
    public static Object kafka_value_lock_taskresult = new Object();
    
    public static Map<String, Object> kafka_lock_recover = new HashMap<String, Object>();
    public static Map<String, String> kafka_value_recover = new HashMap<String, String>();
    public static Object kafka_value_lock_recover = new Object();
    
	/**
	 * kafka获取topic值延迟时间
	 */
	public static final int FINDCOMMAND_TIMEOUT = 30;
	public static final int TASKLOAD_TIMEOUT = 30;
	
	public static final String jws_url = "http://192.168.1.89:8081/netcap?wsdl";
	
}
