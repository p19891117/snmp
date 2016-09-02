package bjhit.storm;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Queue;
import java.util.Random;
import java.util.SortedMap;
import java.util.TreeMap;

import kafka.consumer.Consumer;
import kafka.consumer.ConsumerConfig;
import kafka.consumer.ConsumerIterator;
import kafka.consumer.KafkaStream;
import kafka.javaapi.consumer.ConsumerConnector;
import kafka.message.MessageAndMetadata;
import backtype.storm.spout.SpoutOutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.topology.base.BaseRichSpout;
import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Values;
public class kafkaspout extends BaseRichSpout {
  /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");
	String group;
	SpoutOutputCollector _collector;
	ConsumerConnector consumer =null;//kafka消费者
	String topic ;
	String tmp;
	int k = 0;
	String uuu;  
	int y = 0;
	String yyy;
	int w = 0;
	String www;
  
	int x = 0;
	String xxx;

	int z =0 ;
	String zzz;
	int g =0 ;
	int gg = 0;
	String ggg;

	FileOutputStream fos;
	FileOutputStream fosack;
	FileOutputStream fosfail;
	FileOutputStream foscon;
	FileOutputStream fosz;
	FileOutputStream fosg;
    //kafka迭代器
	ConsumerIterator<byte[], byte[]> it = null;
  //存储从kafka获得的数据
  protected final SortedMap<KafkaMessageId, byte[]> _inProgress = new TreeMap<KafkaMessageId, byte[]>();
  //存储从kafka获得数据的分区和偏移
  protected final Queue<KafkaMessageId> _queue = new LinkedList<KafkaMessageId>();
  //队列长度
  protected int _bufSize;
    

  Map<String, Integer> topicCountMap = null;
  Map<String, List<KafkaStream<byte[], byte[]>>> consumerMap=null;
  KafkaStream<byte[], byte[]> streami=null;
  
  SimpleDateFormat dateformat1;
  String si ="StreamI now SIZE:";
  public kafkaspout(String Topic,String Group)
  {
	  topic=Topic;
	  group=Group;
  }
  
  @Override
  public void open(Map conf, TopologyContext context, SpoutOutputCollector collector) {
    _collector = collector;
    _bufSize = 10;

    
    File ff = new File("/data/spoutsend"+context.getStormId()+"_"+context.getThisTaskId());
    File ff1 = new File("/data/spoutack"+context.getStormId()+"_"+context.getThisTaskId());
    File ff2 = new File("/data/spoutfail"+context.getStormId()+"_"+context.getThisTaskId());
    File ff3 = new File("/data/spoutconsumertang"+context.getStormId()+"_"+context.getThisTaskId());
    File ff4 = new File("/data/spoutnull"+context.getStormId()+"_"+context.getThisTaskId());
    File ff5 = new File("/data/spouttuple"+context.getStormId()+"_"+context.getThisTaskId());



      if(!ff.exists())
       {
       try{
         ff.createNewFile();
        }catch(Exception ee)
        {
         ee.printStackTrace();
        }
       }
       
       if(!ff4.exists())
       {
       try{
         ff4.createNewFile();
        }catch(Exception ee)
        {
         ee.printStackTrace();
        }
       }

       if(!ff1.exists())
       {
       try{
         ff1.createNewFile();
        }catch(Exception ee)
        {
         ee.printStackTrace();
        }
       }
  
      if(!ff2.exists())
       {
       try{
         ff2.createNewFile();
        }catch(Exception ee)
        {
         ee.printStackTrace();
        }
       }
       
      
      if(!ff3.exists())
       {
       try{
         ff3.createNewFile();
        }catch(Exception ee)
        {
         ee.printStackTrace();
        }
       } 

        if(!ff5.exists())
       {
       try{
         ff5.createNewFile();
        }catch(Exception ee)
        {
         ee.printStackTrace();
        }
       }
      try
        {
          fos = new FileOutputStream(ff);
          fosack = new FileOutputStream(ff1);
          fosfail = new FileOutputStream(ff2);
          foscon = new FileOutputStream(ff3);
          fosz = new FileOutputStream(ff4);
          fosg = new FileOutputStream(ff5);
        }catch(Exception e)
        {
          e.printStackTrace();
       }
    tmp = "prepare started by topic as "+topic+"\n";
     try{
     fos.write(tmp.getBytes());
     }catch(Exception m)
     {
      m.printStackTrace();
     } 
     //初始化kafka消费者
     try{
    	 consumer = Consumer.createJavaConsumerConnector(createConsumerConfig(group));
    	 topicCountMap = new HashMap<String, Integer>();
    	 topicCountMap.put(topic, new Integer(1));
    	 consumerMap = consumer.createMessageStreams(topicCountMap);
    	 streami =  consumerMap.get(topic).get(0);
    	 it = streami.iterator();
     }catch (Exception e){
    	 e.printStackTrace();
     }
   
    dateformat1=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");
    
}
  
  
   private static ConsumerConfig createConsumerConfig(String g)
   {
	//kafka消费者配置
    Properties props = new Properties();
    props.put("zookeeper.connect", "zk1:2181,zk2:2181,zk3:2181");
    props.put("group.id", g);
    props.put("fetch.wait.max.ms", "2000");
    //props.put("auto.offset.reset", "largest");
    props.put("auto.commit.enable","false");
    props.put("socket.timeout.ms","3000");
    props.put("zookeeper.session.timeout.ms", "3000");
    props.put("zookeeper.sync.time.ms", "3500");
    //props.put("auto.commit.interval.ms", "1000");
    //props.put("queued.max.message.chunks","8");
    props.put("fetch.message.max.bytes","1572864");
    //props.put("auto.offset.reset","largest");
    props.put("consumer.timeout.ms","10000");
    return new ConsumerConfig(props);

   }


  //kafka中获取数据
  @SuppressWarnings("finally")
protected boolean fillBuffer() {
        if (!_inProgress.isEmpty() || !_queue.isEmpty()) {
          throw new IllegalStateException("cannot fill buffer when buffer or pending messages are non-empty");
        }
        int size = 0;
        try {
        	fos.write("\nfillBuffering".getBytes());
			fos.write(this.consumer.toString().getBytes());
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
        // We'll iterate the stream in a try-clause; kafka stream will poll its client channel for the next message,
        // throwing a ConsumerTimeoutException when the configured timeout is exceeded.
        try {
            //int size = 0;
            while (size < _bufSize && it.hasNext()) {
                final MessageAndMetadata<byte[], byte[]> message = it.next();
                final KafkaMessageId id = new KafkaMessageId(message.partition(), message.offset());
                _inProgress.put(id, message.message());
                _queue.add(id);
                size++;
                x++;
                xxx = x+"\n";
                try{
                     foscon.write(xxx.getBytes());foscon.write(message.message());
                     foscon.write(("\n"+df.format(new Date())+"\n").getBytes());
                    }catch(Exception m)
                  {
                     m.printStackTrace();
                  }
            }
        }
        catch (Exception e) {
            // ignore, storm will call nextTuple again at some point in the near future
            // timeout does *not* mean that no messages were read (state is checked below)
             String t = "catch\n";
              try{
                     foscon.write(t.getBytes());
                    }catch(Exception m)
                  {
                     m.printStackTrace();
                  }
               //return true;
        }
        finally{

        // if (_inProgress.size() > 0) {
        if (size > 0 ) {
            //_queue.addAll(_inProgress.keySet());
            String re = "true\n";
              try{
                     foscon.write(re.getBytes());
                    }catch(Exception m)
                  {
                     m.printStackTrace();
                  }
            return true;
        }
        else {
             String qw = "false\n";
              try{
                     foscon.write(qw.getBytes());
                    }catch(Exception m)
                  {
                     m.printStackTrace();
                  }
            // no messages appended to buffer
            return false;
        }
        }
//        return true;
    }


  @Override
  public void nextTuple(){
     //判断当前缓存队列是否发送完毕且完成ack，不是则继续从队列中获取数据发送，是则利用fillBuffer从kafka获得新数据
     if (!_queue.isEmpty() || (_inProgress.isEmpty() && fillBuffer())) {
            final KafkaMessageId nextId = _queue.poll();
            z = _queue.size();	
            zzz = z+"\n";
            try{
               fosz.write(zzz.getBytes());
               }catch(Exception m)
               {
               m.printStackTrace();
               }
            if (nextId != null) {
                k++;
                uuu = ""+k+"\n";
                final byte[] message = _inProgress.get(nextId);
                // the next id from buffer should correspond to a message in the pending map
                if (message == null) {
                    throw new IllegalStateException("no pending message for next id " + nextId);
                }
                // message should be considered a single object from Values' point of view
                String computeandfind = new String(message);
                String[] messages = computeandfind.split("#[$]#");
                //判断是否分隔符出现错误
               	if(messages.length != 7)
                {
                	gg++;
                	try{
                		fosg.write("格式不正确的数据\n".getBytes());
                		fosg.write((String.valueOf(gg)+"\n").getBytes());
                		fosg.write(message);
                		fosg.write("\n".getBytes());
                       }catch(Exception m)
                     {
                        m.printStackTrace();
                     }
                	return;
                }
                //long转换成日期格式
                Date dateofmsg = new Date(Long.valueOf(messages[1]));
                messages[1] = df.format(dateofmsg);
                Date dateofmsg1 = new Date(Long.valueOf(messages[messages.length-1]));
                messages[messages.length-1] = df.format(dateofmsg1);
                computeandfind = "";
                for(int i = 0;i<messages.length-1;i++)
                	computeandfind = computeandfind + messages[i]+"#$#";
                computeandfind += messages[messages.length - 1];
                //
                _collector.emit("hellodata",new Values("0",computeandfind), nextId);//发往StoreDB
                _collector.emit("computedata",new Values(messages[2],computeandfind));//发往ComputeBolt
                if(messages[5].trim().matches("[0-9]+")||messages[5].trim().matches("[0-9]+.[0-9]+")){//过滤非有理数类数据
                	if(messages[3].equals("73")||messages[3].equals("74")){//过滤73,74
                	}
                	else{
                	_collector.emit("finddata",new Values(messages[2],computeandfind));//发往regularMatchBolt
                	}
                }//发往RegularMatchBolt
                try{
                     fos.write(uuu.getBytes());
                     fos.write(message);
                     fos.write(("\n"+"currentTime is:"+df.format(new Date())).getBytes());
                     fos.write("\n".getBytes());
                    }catch(Exception m)
                  {
                     m.printStackTrace();
                  }
                //LOG.debug("emitted kafka message id {} ({} bytes payload)", nextId, message.length);
            }
        }
  }

  @Override
  public void ack(Object o) {
         if (o instanceof KafkaMessageId) {
            final KafkaMessageId id = (KafkaMessageId) o;
            // message corresponding to o is no longer pending
            _inProgress.remove(id);
            y++;
            yyy = df.format(new Date())+" "+y+" "+id.getOffset()+"\n";
            
             try{
                fosack.write(yyy.getBytes());
                }catch(Exception m)
                {
                m.printStackTrace();
                }
         
            //LOG.debug("kafka message {} acknowledged", id);
            if (_inProgress.isEmpty()) {
                // commit offsets to zookeeper when pending is now empty
                // (buffer will be filled on next call to nextTuple())
            //    LOG.debug("all pending messages acknowledged, committing client offsets");
                consumer.commitOffsets();
            }

        }
  }

  @Override
  public void fail(Object o) {
      if (o instanceof KafkaMessageId) {
            final KafkaMessageId id = (KafkaMessageId) o;
            // delegate decision of replaying the message to failure policy
            _queue.add(id);
            w++;
            www = df.format(new Date())+" "+w+" "+id.getPartition()+" "+id.getOffset()+"\n";
            try{
                fosfail.write(www.getBytes());
                }catch(Exception m)
                {
                m.printStackTrace();
               }
            
         }
  }

  @Override
  public void declareOutputFields(OutputFieldsDeclarer declarer) {
    declarer.declareStream("hellodata",new Fields("tag","data"));
    declarer.declareStream("computedata",new Fields("ip","data"));
    declarer.declareStream("finddata",new Fields("ip","data"));
  }

}


