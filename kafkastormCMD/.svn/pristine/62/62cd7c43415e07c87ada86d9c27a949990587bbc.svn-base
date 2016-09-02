package bjhit.command;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Map;
import java.util.Properties;

import kafka.javaapi.producer.Producer;
import kafka.producer.ProducerConfig;
import kafka.producer.KeyedMessage;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Tuple;

public class parseCmd implements IRichBolt{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private FileOutputStream ff;
    private Producer<Integer, String> producer;
    private String topic;
    private String para;
    private Properties props;
    private String cmdPrefix = "/bin/bash";
    private String javajar;
    
    public parseCmd(String Topic,String jar,String Topica){
    	topic = Topic;
    	javajar = jar;
    	para = Topica;
    }
	@Override
	public void cleanup() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void execute(Tuple arg0) {
		// TODO Auto-generated method stub
		//?ack
		String taskid = arg0.getString(0);
		String cmd   = arg0.getString(1);
		//得到采集数据存储所在topic
		String needtopic = "gatherData"+taskid;
		String stormcmd = "";
		String pdata = "";
		String errorcmd="";
		//过滤非法数据
		if((taskid != null) && (cmd != null)){
			if(cmd.equals("010"))      
			{
				//启动命令
				stormcmd = "storm jar "+javajar+" "+para+" "+needtopic+" "+taskid;
				errorcmd = taskid+"#011";
			}
			else if(cmd.equals("020")){
				//暂停命令
				stormcmd = "storm deactivate "+taskid;
				errorcmd = taskid+"#021";
			}
			else if(cmd.equals("030")){
				//终止命令
				stormcmd = "storm kill "+taskid;
				errorcmd = taskid+"#031";
			}
			else if(cmd.equals("040")){
				//重新启动命令
				stormcmd = "storm activate "+taskid;
				errorcmd = taskid+"#041";
			}
			else{
				//采集端启动失败，storm直接转发命令
				pdata = taskid+"#"+cmd;
			}
			if(!stormcmd.equals("")){
				
				//
				try{
			   	     ff.write((stormcmd+"\n").getBytes());
			   	     }catch(Exception m)
			   	     {
			   	      m.printStackTrace();
			   	     }
				//
				try {
					//执行既定的storm命令
					Process p = Runtime.getRuntime().exec(new String[]{cmdPrefix,"-c",stormcmd});
					InputStreamReader in = new InputStreamReader(p.getErrorStream());
					InputStream is = p.getInputStream();   
		            // 用一个读输出流类去读   
		            InputStreamReader isr = new InputStreamReader(is);   
		            // 用缓冲器读行   
		            BufferedReader br1 = new BufferedReader(in);
		            BufferedReader br = new BufferedReader(isr);
		            String line1 = null;   
		            while ((line1 = br1.readLine()) != null && br1 != null) {   
		                ff.write((line1+"\n").getBytes());   
		            }  
		            String line = null;   
		            while ((line = br.readLine()) != null && br != null) {   
		                ff.write((line+"\n").getBytes());   
		            }   
		            //执行关闭操作 
		            is.close();   
		            isr.close();   
		            br.close(); 
		            br1.close();
		            int c = p.waitFor();
		            //命令执行情况
					if(c == 0){
						//命令执行成功
						producer.send(new KeyedMessage<Integer, String>(topic, taskid+"#"+cmd));
						try{
					   	     ff.write((p.toString()+"\n").getBytes());
					   	     }catch(Exception m)
					   	     {
					   	      m.printStackTrace();
					   	     }
					}
					else{
						//命令执行失败
						producer.send(new KeyedMessage<Integer, String>(topic, errorcmd));
					}
					
				} catch (Exception e) {
					// TODO Auto-generated catch block
					try {
						ff.write(e.toString().getBytes());
					} catch (IOException e1) {
						// TODO Auto-generated catch block
						e1.printStackTrace();
					}
					producer.send(new KeyedMessage<Integer, String>(topic, errorcmd));
					e.printStackTrace();
				} 
			}
			//
			producer.send(new KeyedMessage<Integer, String>(topic, pdata));
			
		}
		
		
	}

	@Override
	public void prepare(Map arg0, TopologyContext arg1, OutputCollector arg2) {
		// TODO Auto-generated method stub
		
		//
		props = new Properties();
		props.put("serializer.class", "kafka.serializer.StringEncoder");
	    props.put("metadata.broker.list", "kafka1:9092,kafka2:9092,kafka3:9092");
	    props.put("request.required.acks", "-1");
	    producer = new Producer<Integer, String>(new ProducerConfig(props));
		//log
		File file = new File("/data/parsecmd"+arg1.getStormId()+"_"+arg1.getThisTaskId());
        if(!file.exists())
        {
          try{
             file.createNewFile();
             }catch(Exception ee)
             {
             ee.printStackTrace();
             }
        }
        try {
			ff = new FileOutputStream(file);
		} catch (FileNotFoundException e) {
			
			e.printStackTrace();
		}
	}

	@Override
	public void declareOutputFields(OutputFieldsDeclarer arg0) {
		// TODO Auto-generated method stub
		//arg0.declareStream(arg0, arg1)
	}

	@Override
	public Map<String, Object> getComponentConfiguration() {
		// TODO Auto-generated method stub
		return null;
	}

}
