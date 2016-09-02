package com.bjhit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import kafka.consumer.ConsumerConfig;
import kafka.consumer.ConsumerIterator;
import kafka.consumer.KafkaStream;
import kafka.javaapi.consumer.ConsumerConnector;
import org.apache.log4j.Logger;
import com.bjhit.util.Constant;

/**
 * 监听kafka线程
 * @author Lenovo
 *
 */
public class KafkaConsumerTasklistResult extends Thread {
    private ConsumerConnector consumer;
    private String topic = KafkaProperties.tasklist_result;
    private static Logger logger = Logger.getLogger(KafkaConsumerTasklistResult.class); // 类名

    private ConsumerConfig createConsumerConfig() {
        Properties props = new Properties();
        props.put("zookeeper.connect", KafkaProperties.zkConnect);
        props.put("zookeeper.session.timeout.ms", "5000");
        //String groupid = "tasklistResultGroup" + System.getProperty("user.name");
        String groupid = System.getProperty("user.name");
        if (groupid == null || "".equals(groupid)) {
            groupid = KafkaProperties.groupId;
        }
        props.put("group.id", groupid);
        props.put("zookeeper.connection.timeout.ms", KafkaProperties.connectionTimeOut + "");
        props.put("zookeeper.sync.time.ms", "2000");
        props.put("auto.commit.interval.ms", KafkaProperties.reconnectInterval
                + "");
        props.put("auto.offset.reset", "smallest");
        return new ConsumerConfig(props);
    }

    public void run() {
        logger.info("step1#####starting kafka listener success!!!");
        consumer = kafka.consumer.Consumer.createJavaConsumerConnector(createConsumerConfig());
        Map<String, Integer> topicCountMap = new HashMap<String, Integer>();
        topicCountMap.put(topic, 1);
        Map<String, List<KafkaStream<byte[], byte[]>>> consumerMap = consumer.createMessageStreams(topicCountMap);
        List<KafkaStream<byte[], byte[]>> streams = consumerMap.get(topic);

        for (KafkaStream stream : streams) {
            ConsumerIterator<byte[], byte[]> it = stream.iterator();
            while (it.hasNext()) {
                try{
                    String value = new String(it.next().message());
                    logger.info("#####comsumer kafka topic : " + topic + " = " + value);
                    //数据格式样式：taskid#0x1/0x0
                    String[] arr = value.split("#");
                    if(arr.length == 2){
                        String taskid = arr[0];
                        Object lock = null;
                        synchronized (Constant.kafka_value_lock_taskresult) {
                            Constant.kafka_value_taskresult.put(taskid, arr[1]);
                            lock = Constant.kafka_lock_taskresult.get(taskid);
                        }
                        
                        if(lock != null){
                            synchronized (lock) {
                                lock.notify();
                            }
                        }else{
                            logger.info("#####get kafka " + value + " , but the lock has destory!");
                        }
                    }
                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }
    }
}
