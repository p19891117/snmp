package com.bjhit.jws;

import java.util.concurrent.TimeUnit;

import javax.jws.WebService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.bjhit.service.KafkaProducerService;
import com.bjhit.service.KafkaProperties;
import com.bjhit.service.TaskServiceImpl;
import com.bjhit.util.Constant;

@WebService(endpointInterface="com.bjhit.jws.ChildTaskService")
public class ChildTaskServiceImpl implements ChildTaskService {
    @Autowired
    private TaskServiceImpl taskService;
    @Autowired
    private KafkaProducerService kafkaProducerService;
    private static Logger logger = Logger.getLogger(ChildTaskServiceImpl.class); // 类名
    
    @Override
    public int handleTask(String taskid, String handleType) {
        logger.info(taskid + "任务执行命令：" + handleType);
        //kafka  发送kafka任务号
        if("1".equals(handleType)){
            kafkaProducerService.createOrWriteTopic(taskid);
            try { 
                logger.info(taskid + "任务等待3秒发送启动命令。。。");
                TimeUnit.MILLISECONDS.sleep(3000); 
            } catch (InterruptedException e) {
                e.printStackTrace();  
            }
        }
        //kafka
        kafkaProducerService.createOrWriteTopic(KafkaProperties.web_command, taskid + "#0" + handleType);
        /**
         * 获取线程中kafka消息值
         */
        Object lock = new Object();
        Constant.kafka_lock.put(taskid, lock);
        synchronized (lock) {
            try {
                logger.info(taskid + " wait " + Constant.FINDCOMMAND_TIMEOUT + " second !");
                lock.wait(Constant.FINDCOMMAND_TIMEOUT * 1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        String value = null;
        synchronized (Constant.kafka_value_lock) {
            Constant.kafka_lock.remove(taskid); //移除全局锁
            value = Constant.kafka_value.get(taskid);
        
            if(value != null){
                Constant.kafka_value.remove(taskid); //移除全局值
            }else{
                logger.info(taskid + " task notified timeout!");
            }
        }
        taskService.updateTaskById(taskid, value);
        return 1;
    }

}
