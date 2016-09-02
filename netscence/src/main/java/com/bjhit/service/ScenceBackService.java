package com.bjhit.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bjhit.dao.mapper.SceneBackMapper;
import com.bjhit.dao.model.BackupInfoVo;
import com.bjhit.dao.model.SceneInfo;
import com.bjhit.dao.model.Task;
import com.bjhit.util.Constant;

@Service
public class ScenceBackService {
    @Autowired
    private SceneBackMapper sceneBackMapper;
    
    @Autowired
    private TaskServiceImpl taskService;
    @Autowired
    private KafkaProducerService kafkaProducerService;
    private static Logger logger = Logger.getLogger(ScenceBackService.class); // 类名

    public List<BackupInfoVo> getBackupByTaskid(String id, String scnid) {
        return sceneBackMapper.getBackupByTaskid(id, scnid);
    }
    
    public int handleTask(String id, String type){
        int result = 0;
        String taskStartResult = null;
        Task task = taskService.getTaskById(new Integer(id));
        
        if(task.getStatus() == 2 && "".equals("1")){
            
        }else if(task.getStatus() == 3 && "".equals("2")){
            
        }else if(task.getStatus() == 4 && "".equals("3")){
            
        }else if(task.getStatus() == 2 && "".equals("4")){
            
        }else {
            //kafka  发送kafka任务号
            if("1".equals(type)){
                kafkaProducerService.createOrWriteTopic(id);
                /**
                 * 获取线程中kafka消息值
                 */
                
                Object lock = new Object();
                Constant.kafka_lock_taskresult.put(id, lock);
                synchronized (lock) {
                    try {
                        logger.info(id + " wait " + Constant.TASKLOAD_TIMEOUT + " second !");
                        lock.wait(Constant.TASKLOAD_TIMEOUT * 1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                synchronized (Constant.kafka_value_lock_taskresult) {
                    Constant.kafka_lock_taskresult.remove(id); //移除全局锁
                    taskStartResult = Constant.kafka_value_taskresult.get(id);
                
                    if(taskStartResult != null){
                        Constant.kafka_value_taskresult.remove(id); //移除全局值
                    }else{
                        logger.info(id + " task notified timeout!");
                    }
                }
            }
            if("1".equals(type) && !"1".equals(taskStartResult)){
               
            }else{
                //kafka
                kafkaProducerService.createOrWriteTopic(KafkaProperties.web_command, id + "#0" + type);
                /**
                 * 获取线程中kafka消息值
                 */
                Object lock = new Object();
                Constant.kafka_lock.put(id, lock);
                synchronized (lock) {
                    try {
                        logger.info(id + " wait " + Constant.FINDCOMMAND_TIMEOUT + " second !");
                        lock.wait(Constant.FINDCOMMAND_TIMEOUT * 1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                String value = null;
                synchronized (Constant.kafka_value_lock) {
                    Constant.kafka_lock.remove(id); //移除全局锁
                    value = Constant.kafka_value.get(id);
                
                    if(value != null){
                        Constant.kafka_value.remove(id); //移除全局值
                    }else{
                        logger.info(id + " task notified timeout!");
                    }
                }
                String result_s = taskService.updateTaskById(id, value);
                if(result_s.indexOf("成功") > 0){
                    result = 1;
                }
            }
        }
        return result;
    }

    public List<SceneInfo> getSceneInfoByscnid(String scenceId) {
        return sceneBackMapper.getSceneInfoByscnid(scenceId);
    }
}
