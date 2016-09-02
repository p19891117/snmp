package com.bjhit.service;

/**
 * @Description TODO
 * @author lp
 * @date 2014年10月24日
 */

public interface KafkaProperties {
    final static String zkConnect = "192.168.10.201:2181,192.168.10.203:2181,192.168.10.204:2181";
    //final static String zkConnect = "192.168.2.88:2181";
    final static String groupId = "group_bjhit";
    /**
     * 试验场景id，topic名称
     */
    final static String task_list_topic = "taskList";
    /**
     * web发送命令，topic名称
     */
    final static String web_command = "webCommand";
    /**
     * 采集发送命令，topic名称
     */
    final static String gather_command = "gatherCommand";
    /**
     * 场景发现发送命令，topic名称
     */
    final static String find_command = "findCommand";
    /**
     * 启动任务：加载任务返回结果，topic名称
     */
    final static String tasklist_result = "taskListResult";
    /**
     * 恢复kafka命令web
     */
    final static String recover_topic = "recover";
    /**
     * 变频
     */
    final static String find_rate = "findRate";
    final static String kafkaServerURL = "192.168.10.201:9092,192.168.10.202:9092,192.168.10.203:9092";
    //final static String kafkaServerURL = "192.168.2.88:9092";
    final static int kafkaProducerBufferSize = 64 * 1024;
    final static int connectionTimeOut = 10000;
    final static int reconnectInterval = 10000;
    final static String serializerClass = "kafka.serializer.StringEncoder";
    final static String request_required_acks = "1"; 
}
