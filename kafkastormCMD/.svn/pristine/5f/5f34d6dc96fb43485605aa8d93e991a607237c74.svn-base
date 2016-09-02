package bjhit.command;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import kafka.consumer.Consumer;
import kafka.consumer.ConsumerConfig;
import kafka.consumer.ConsumerIterator;
import kafka.consumer.KafkaStream;
import kafka.consumer.ConsumerTimeoutException;
import kafka.javaapi.consumer.ConsumerConnector;
import kafka.message.MessageAndMetadata;

import backtype.storm.spout.SpoutOutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.topology.base.BaseRichSpout;
import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Values;

public class cmdspout extends BaseRichSpout{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private SpoutOutputCollector collector;
	

	private ConsumerIterator<byte[], byte[]> it;
	private ConsumerConnector consumer ;
	private String topic;
	private String group;
	private Map<String, Integer> StreamCountMap;
	private Map<String, List<KafkaStream<byte[], byte[]>>> consumerMap;
	private KafkaStream<byte[], byte[]> streami;
	
	//log
	private final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private FileOutputStream ff;
	//
    public cmdspout(String Goup,String Topic){
    
    	group = Goup;
    	topic = Topic;
    }
	@Override
	public void declareOutputFields(OutputFieldsDeclarer declarer) {
	    declarer.declareStream("cmd",new Fields("taskid","cmd"));
	  }

	@Override
	public void nextTuple() {
		// TODO Auto-generated method stub
		byte[] messageBytes = null;
		try{
			MessageAndMetadata<byte[], byte[]> message = it.next();
			messageBytes = message.message();
		}catch(ConsumerTimeoutException ce)
		{
			
		}
		if(messageBytes!=null)
		{
			consumer.commitOffsets();
			String cmdString = new String(messageBytes);
			String[] cmdbuffer = cmdString.split("#");
			//过滤非法命令
			if(cmdbuffer.length == 2)
			{
				//正确命令往下游bolt转发
				collector.emit("cmd", new Values(cmdbuffer[0],cmdbuffer[1]));
				//
				try{
			   	     ff.write(("tasknum:"+cmdbuffer[0]+" cmd:"+cmdbuffer[1]+" time:"+df.format(new Date())+"\n").getBytes());
			   	     }catch(Exception m)
			   	     {
			   	      m.printStackTrace();
			   	     }
			}
		}
		
	}

	@Override
	public void open(Map arg0, TopologyContext topc, SpoutOutputCollector sc) {
		// TODO Auto-generated method stub
		collector = sc;
		consumer = Consumer.createJavaConsumerConnector(createConsumerConfig(group));
		StreamCountMap = new HashMap<String, Integer>();
		StreamCountMap.put(topic, new Integer(1));
	    consumerMap = consumer.createMessageStreams(StreamCountMap);
	    streami =  consumerMap.get(topic).get(0);
	    it = streami.iterator();
	    
	    //log initialize
	    File file = new File("/data/cmd"+topc.getStormId()+"_"+topc.getThisTaskId());
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
	
	private  ConsumerConfig createConsumerConfig(String str)
	   {
	    Properties props = new Properties();
	    props.put("zookeeper.connect", "zk1:2181,zk2:2181,zk3:2181");
	    props.put("group.id", str);
	    props.put("fetch.wait.max.ms", "2000");
	    //props.put("auto.offset.reset", "largest");
	    props.put("auto.commit.enable","false");
	    props.put("socket.timeout.ms","3000");
	    props.put("zookeeper.session.timeout.ms", "3000");
	    props.put("zookeeper.sync.time.ms", "3500");
	    //props.put("auto.commit.interval.ms", "1000");
	    props.put("queued.max.message.chunks","8");
	    props.put("fetch.message.max.bytes","1572864");
	    props.put("auto.offset.reset","smallest");
	    props.put("consumer.timeout.ms","10000");
	    return new ConsumerConfig(props);

	   }
	
	//private 

}
