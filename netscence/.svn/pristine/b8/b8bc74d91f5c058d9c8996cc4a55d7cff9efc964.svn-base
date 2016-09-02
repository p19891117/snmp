package com.bjhit.service;

import java.util.Properties;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;
import kafka.producer.ProducerConfig;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.springframework.stereotype.Service;

/**
 * @Description TODO
 * @author lp
 * @date 2014年10月23日
 */
@Service
public class KafkaProducerService {

    /**
     * 生成试验任务列表topic
     * @param value
     */
    public void createOrWriteTopic(String value){
        createOrWriteTopic(KafkaProperties.task_list_topic, value);
    }
    
    /**
     * 生成消息
     * @param topicName
     * @param value
     */
    public void createOrWriteTopic(String topicName, String value){
        Properties props = new Properties();
        //192.168.2.88:9092,192.168.2.111:9092,192.168.2.112:9092
        props.put("metadata.broker.list", KafkaProperties.kafkaServerURL);// 设置broker列表
        props.put("serializer.class", KafkaProperties.serializerClass);// 设置序列化方法
        //props.put("partitioner.class", "com.bjhit.controller.example.SimplePartitioner");// 设置分组函数
        //props.put("producer.num.retries", "10");
        props.put("request.required.acks", KafkaProperties.request_required_acks);// 设置ack,要求broker leader
                                                // ack以保证消息传输成功
        ProducerConfig config = new ProducerConfig(props);
        Producer<String, String> producer = new Producer<String, String>(config);// 声明并定义生产者
        
        //如果topic不存在，会创建topic，默认：replication-factor=1,partions=0
        KeyedMessage<String, String> data = new KeyedMessage<String, String>(topicName, "key-1", value); // 构造传输的消息
        producer.send(data);// 默认同步发送
        Logger logger = Logger.getLogger(KafkaProducerService.class); //类名
        //PropertyConfigurator.configure("log4j.properties");
        logger.info("#####kafka produce topic : " + topicName + " = " + value);
        producer.close();
    }
    
}
