package bjhit.storm;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.Map.Entry;

import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;
import kafka.producer.ProducerConfig;



import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.mysql.jdbc.Connection;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Tuple;
import backtype.storm.tuple.Values;

public class regularMatchBolt implements IRichBolt{

	/**
	 * 
	 */
		private static final long serialVersionUID = 1L;
		private Producer<Integer, String> producer;//kafka生产者
    private String topic;//存储采集周期改变的topic，即findRate
    private Properties props;//kafka配置
    private final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");
		private OutputCollector collector =null;//bolt发射器
    private  Connection conn = null;//数据库连接
    private FileOutputStream ff;
    private String taskid = null;
    private int normalRate;
    private int warningRate;
    private int erroRate;
    private int amplitudeWindow;
    private int usedAW;//程序中使用的振幅窗口
    private int preW;//前置时间窗口
    private int postW;//后置时间窗口
    private Map<String,HashMap<String,regulationClass>> threshold = null;//存储阈值规则，其映射路线为map<ip，hashMap<gatherid,阈值规则类>>
    private Map<String,HashMap<String,regulationClass>> amplitude = null;//存储振幅规则，其映射路线为map<ip，hashMap<gatherid,振幅规则类>>
    private Map<String,HashMap<String,findlist>> flist = null;//存储振幅窗口内的数据（实际是振幅窗口+2*正在使用的采集周期），其映射路线为map<ip，hashMap<gatherid,振幅窗口内数据列表>>
    private Map<String,sceneList> scnList  = null;//存储发现的最新场景，其映射路线为map<ip，场景基本信息类>

    private File file;
    private Map<String,String> DBConn =null;
    
    public regularMatchBolt(String task,String topic){
    	this.taskid = task;
    	this.topic = topic;
    }
	@Override
	public void cleanup() {
		// TODO Auto-generated method stub
		try {
			ff.close();
			file.delete();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@Override
	public void execute(Tuple arg0) {
		// TODO Auto-generated method stub
		
		this.collector.ack(arg0);
		String sqldata ="";
		String[] finddata = arg0.getString(1).split("#[$]#");
		try {
			ff.write(("the gatherTime is "+finddata[6]+"\n").getBytes());
			ff.write(("the batchTime is "+finddata[0]+"\n").getBytes());
			ff.write(("For find the arriving time is "+df.format(new Date())+" E\n").getBytes());
			ff.write((arg0.getString(1)+" \n").getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        //过滤非法数据
		if(finddata[5].equals("PDU NULL")||finddata[5].equals("Null")||finddata[5].equals("noSuchInstance")||finddata[5].equals("DATA NOT RETURN")){
			
		}else{
			
			findlist fltemp = null;
			Iterator<Integer> it = null;
			tupledata td = null;
			BigDecimal min = new BigDecimal(0);//记录flist中最小值
			BigDecimal max = new BigDecimal(0);//记录flist中最大值
			int mini = -1;//记录flist中最小值索引（treemap前序遍历中位置）
			int maxi = -1;//记录flist中最大值索引（treemap前序遍历中位置）
			long cut = System.currentTimeMillis();
		    //基于振幅发现场景
			  
			if(this.amplitude.containsKey(finddata[2])){//判断该数据的IP字段的所代表的IP是否在振幅规则列表中
				try {
					ff.write("amplitude\n".getBytes());
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
				if(this.amplitude.get(finddata[2]).containsKey(finddata[3])){//判断该数据的gather id字段的所代表的gid是否在振幅规则列表中
					if(this.flist.get(finddata[2]).get(finddata[3]) != null){
						try {
							ff.write(finddata[5].getBytes());
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						tupledata tdatavalue = new tupledata(finddata[1],finddata[5]);//基于符合条件的数据生成tupledata对象
						fltemp = this.flist.get(finddata[2]).get(finddata[3]);
						fltemp.list.put(Integer.valueOf(finddata[0]), tdatavalue);//将新生成的tupledata对象加入到flist中
						it = fltemp.list.keySet().iterator();
					//遍历flist，删除过期数据，基于可用数据寻找最大值和最小值
					while (it.hasNext()) {
						int index = it.next();
						td = fltemp.list.get(Integer.valueOf(index));
						if((td.batchTime+this.usedAW)<cut){//删除过期数据
							fltemp.list.remove(Integer.valueOf(index));
						}
						else{
							if(max.compareTo(td.value) == -1){//寻找最大数据，并记下该值所在treemap中位置
								max = td.value;//最大值
								maxi = index;//位置
							}
							else if(min.compareTo(td.value) == 1){//寻找最小数据，并记下该值所在treemap中位置
								min = td.value;//最小值
								mini = index;//位置
							}
						}
					}
					fltemp.maximum = max;//将最大值写入flist中
					fltemp.maxindex = maxi;//最大值位置写入flist中
					fltemp.minimum = min;//最小值写入flist中
					fltemp.minindex = mini;//最小值位置写入flist中
					//计算振幅，根据规则发现场景
					if(fltemp.minimum.compareTo(BigDecimal.ZERO)!=0){//最小值为0时取消计算
						//同用户设置的振幅规则做比较，判断是否触发场景发现规则
						if(fltemp.maximum.divide(fltemp.minimum, 2, RoundingMode.HALF_DOWN).compareTo(this.amplitude.get(finddata[2]).get(finddata[3]).value[0]) == 1){
							int deindex = fltemp.maxindex;
							if(fltemp.minindex > deindex){//获得触发场景数据在flist中的位置
								deindex = fltemp.minindex;
							}
							it = fltemp.list.keySet().iterator();
							while (it.hasNext()) {//删除该位置之前的数据
								int index = it.next();
								if(index < deindex){
									fltemp.list.remove(Integer.valueOf(index));
								}
								else{
									break;
								}
							}
							//producer 改变采集周期
							//如果最新场景列表中不包含此IP，首先在列表中加入该设备IP
						    if(!scnList.containsKey(finddata[2])){
						    	sceneList tc = new sceneList();
						    	scnList.put(finddata[2], tc);
						    }
						    //将数据的batchtime转换为毫秒
						    long dataTime = 0;
							try {
								dataTime = df.parse(finddata[1]).getTime();
							} catch (ParseException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
							//判断该场景是否位于已发现场景的后置窗口，不是则向kafka写入新的采集周期
						    if(scnList.get(finddata[2]).setValue(dataTime, 1, preW*1000, postW*1000)){
							producer.send(new KeyedMessage<Integer, String>(topic, taskid+"#"+this.warningRate));  
							sqldata = finddata[1]+"#$#"+finddata[2]+"#$#"+this.amplitude.get(finddata[2]).get(finddata[3]).regularID[0]+"#$#"+this.amplitude.get(finddata[2]).get(finddata[3]).gatherid+",采集项值:大于系统设定的振幅峰值 "+this.amplitude.get(finddata[2]).get(finddata[3]).value+"#$#"+"0"+"#$#"+finddata[0];
							this.collector.emit(arg0, new Values("2",sqldata));
						    }
						//
						}
					//0
					}
				}
			}
		}
		//基于阈值发现场景
		if(this.threshold.containsKey(finddata[2])){
			if(this.threshold.get(finddata[2]).containsKey(finddata[3])){//判断是否存在有关当前数据的阈值触发规则
				try {
					ff.write(("threshold:"+finddata[2]+" "+finddata[3]+" "+finddata[5]+"\n").getBytes());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				//取出当前数据对应的阈值触发规则类
				regulationClass rc = this.threshold.get(finddata[2]).get(finddata[3]);
				//当前数据的值转化为BigDecimal类型
				BigDecimal bd = new BigDecimal(finddata[5]);
				try {
					ff.write((rc.ip+" "+String.valueOf(rc.used[0])+" "+rc.gatherid+" "+rc.value[0]+" "+rc.value[1]+"\n").getBytes());
					ff.write(bd.toString().getBytes());
					ff.write("\n".getBytes());
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				//规则类的used数组，记录该规则类启用了哪些比较类型，0位置记录大于，1位置记录小于
				//判断规则类的比较类型“大于”是否被启用，为1代表被启用
				if(rc.used[0] == 1){
					try {
						ff.write("big\n".getBytes());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					//当前数据的值大于顶部阈值时，触发场景
					if(bd.compareTo(rc.value[0])==1){
						try {
							ff.write("bigTrue\n".getBytes());
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
						
						//如果最新场景列表中不包含此IP，首先在列表中加入该设备IP
					    if(!scnList.containsKey(finddata[2])){
					    	sceneList tc = new sceneList();
					    	scnList.put(finddata[2], tc);
					    }
					    //判断此场景是否应写入数据库
					    long dataTime = 0;
						try {
							dataTime = df.parse(finddata[1]).getTime();
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					    if(scnList.get(finddata[2]).setValue(dataTime, 2, preW*1000, postW*1000)){
					    	//将改变的采集周期写入kafka
					    	producer.send(new KeyedMessage<Integer, String>(topic, taskid+"#"+this.erroRate));
					    	sqldata = finddata[1]+"#$#"+finddata[2]+"#$#"+rc.regularID[0]+"#$#"+rc.gatherid+",实际采集值为"+finddata[5]+":超过系统设定的阀值"+rc.value[0]+"#$#"+"1"+"#$#"+finddata[0];
					    	this.collector.emit(arg0, new Values("2",sqldata));
					    }
						try {
							ff.write(sqldata.getBytes());
							ff.write("\n".getBytes());
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
				//判断规则类的比较类型“小于”是否被启用，为1代表被启用
				if(rc.used[1] == 1){
					//当前数据的值小于底部阈值时，触发场景
					if(bd.compareTo(rc.value[1])==-1){
						//如果最新场景列表中不包含此IP，首先在列表中加入该设备IP
					    if(!scnList.containsKey(finddata[2])){
					    	sceneList tc = new sceneList();
					    	scnList.put(finddata[2], tc);
					    }
					    //判断此场景是否应写入数据库
					    long dataTime = 0;
						try {
							dataTime = df.parse(finddata[1]).getTime();
						} catch (ParseException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					    if(scnList.get(finddata[2]).setValue(dataTime, 2, preW*1000, postW*1000)){
					    	//将改变的采集周期写入kafka
					    	producer.send(new KeyedMessage<Integer, String>(topic, taskid+"#"+this.erroRate));
					    	sqldata = finddata[1]+"#$#"+finddata[2]+"#$#"+rc.regularID[1]+"#$#"+rc.gatherid+",实际采集值为 "+finddata[5]+":小于系统设定的阀值"+rc.value[1]+"#$#"+"1"+"#$#"+finddata[0];
					    	this.collector.emit(arg0, new Values("2",sqldata));
					    }
					}
				}
			}
		}
		}
		
	}

	@Override
	public void prepare(Map arg0, TopologyContext arg1, OutputCollector arg2) {
		// TODO Auto-generated method stub
		threshold = new HashMap<String,HashMap<String,regulationClass>>();//存储阈值类
		amplitude = new HashMap<String,HashMap<String,regulationClass>>();//存储振幅类
		flist = new HashMap<String,HashMap<String,findlist>>();//对于振幅发现，存储数据
		scnList = new HashMap<String,sceneList>();//存储各机器最新发现的场景
		this.collector = arg2;
		file = new File("/data/scnFind"+arg1.getStormId()+"_"+arg1.getThisTaskId());
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
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
      //连接zk，设置数据库连接字符串
	    ExponentialBackoffRetry retryPolicy = new ExponentialBackoffRetry(1000, 3);
		CuratorFramework client = null;
		try{
			client = CuratorFrameworkFactory.builder().connectString("zk1:2181,zk2:2181,zk3:2181")
			.retryPolicy(retryPolicy)
			.connectionTimeoutMs(2000)
			.sessionTimeoutMs(2000)
			.build();
			client.start();
			//设置mysql连接
			if(client.checkExists().forPath("/scnFind/mysql")!=null){
				//System.out.println("exist");
				//System.out.println(new String(client.getData().forPath("/scnFind")));
				Gson gson = new Gson();
				DBConn = gson.fromJson(new String(client.getData().forPath("/scnFind/mysql")),new TypeToken<Map<String, String>>() {

					/**
					 * 
					 */
					private static final long serialVersionUID = 1L;}.getType() );
				if(DBConn == null){
					DBConn.put("user","root");
					DBConn.put("password","tiger");
					DBConn.put("connString","jdbc:mysql://192.168.10.235:3306/netscence");
				}
				ff.write(("USER:"+DBConn.get("user")+"\n").getBytes());
				ff.write(("PAWD:"+DBConn.get("password")+"\n").getBytes());
				ff.write(("CONN:"+DBConn.get("connString")+"\n").getBytes());
				
			}
		}catch(Exception e){
				try {
					ff.write(e.toString().getBytes());
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
        //get connection，获得数据库连接
        conn = this.getConnection();
        //从数据库中读出场景发现规则，构建threshold、amplitude、flist数据结构
        this.getConf();
        //实际使用的振幅窗口
		usedAW = this.amplitudeWindow+2*normalRate;
		try {
			ff.write(String.valueOf(usedAW).getBytes());
			ff.write("\nproducer set\n".getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        //kafka config，kafka生产者相关配置
		props = new Properties();
		props.put("serializer.class", "kafka.serializer.StringEncoder");
	    props.put("metadata.broker.list", "kafka1:9092,kafka2:9092,kafka3:9092");
	    props.put("request.required.acks", "-1");
	    producer = new Producer<Integer, String>(new ProducerConfig(props));
	    
	}

	@Override
	public void declareOutputFields(OutputFieldsDeclarer arg0) {
		// TODO Auto-generated method stub
		//声明默认流的域
		arg0.declare(new Fields("tag","scenceinfo")); 
	}

	@Override
	public Map<String, Object> getComponentConfiguration() {
		// TODO Auto-generated method stub
		System.out.println("TZTZTZTZ");
		return null;
	}

	public  Connection getConnection() {
        
        Connection con = null;    //创建用于连接数据库的Connection对象

        try {
                Class.forName("com.mysql.jdbc.Driver");// 加载Mysql数据驱动

            
                con = (Connection) DriverManager.getConnection(
                    DBConn.get("connString"), DBConn.get("user"), DBConn.get("password"));// 创建数据连接
                ff.write((DBConn.get("connString")+" "+DBConn.get("user")+" "+DBConn.get("password")+"\n").getBytes());
                ff.write("DB connection succeed\n".getBytes());
            
        } catch (Exception e) {
        	try{
       	     ff.write("Initialization  failed\n".getBytes());
       	     }catch(Exception m)
       	     {
       	      m.printStackTrace();
       	     }
                System.out.println("DB connection failed" + e.getMessage());
        }
        
        return con;    //返回所建立的数据库连接

    }
	
	public void getConf(){
		Statement stmt = null;
    	ResultSet result = null;
    	try {
			stmt = conn.createStatement();
			String sql = "SELECT warningRate,exceptRate,swingTime,normalRate,beforWin,afterWin FROM t_task  WHERE id = "+taskid;
			String sql1 ="SELECT gather_id,compare_type,regular_type,value,ip,id FROM t_scence_find_config  WHERE task_id = "+taskid;
			//获得任务的基本信息，各类采集周期，前值和后置窗口，振幅窗口等
			result = stmt.executeQuery(sql);
			while (result.next()){  
				warningRate = result.getInt(1);
				erroRate = result.getInt(2);
				amplitudeWindow = result.getInt(3);
				normalRate = result.getInt(4);
				preW = result.getInt(5);
				postW = result.getInt(6);
				
			}
			//获得当前任务的场景发现规则
			result = stmt.executeQuery(sql1);
			while(result.next()){
				int gid = result.getInt(1);
				int comp = result.getInt(2);
				int regul = result.getInt(3);
				BigDecimal v = result.getBigDecimal(4);
				String ip = result.getString(5);
				int id = result.getInt(6);
				ff.write((this.taskid+" "+gid+" "+comp+" "+regul+" "+v+" "+ip+" "+id+"\n").getBytes());
				//如果为阈值规则，则建立threshold数据结构
				if(regul == 1){
					//判断当前IP是否已加入threshold
					if(this.threshold.containsKey(ip)){
						//判断当前gatherid是否已加入threshold
						if(this.threshold.get(ip).containsKey(gid)){
							//如果当前gatherid对应的规则类已创建，则只需将当前gatherid对应的规则设置到规则类中即可
							this.threshold.get(ip).get(gid).setregularid(id, comp);//设置规则编号
							this.threshold.get(ip).get(gid).setValue(v, comp);//设置规则对应的阈值
						}
						else{//如果当前gatherid对应的规则类未创建，需创建一个规则类，并对规则类做相应设置
							regulationClass r = new regulationClass();
							//r.setAW(this.amplitudeWindow);
							r.setGatherid(String.valueOf(gid));//设置gatherid
							r.setIP(ip);//设置IP
							r.setregularid(id, comp);//设置规则编号
							r.setValue(v, comp);//设置规则对用的阈值
							this.threshold.get(ip).put(String.valueOf(gid), r);//加入到当前ip对用的map中
						}
					}
					//如果当前ip的map未加入到threshold
					else{
						//生成当前规则对应的规则类
						regulationClass r = new regulationClass();
						//r.setAW(this.amplitudeWindow);
						r.setGatherid(String.valueOf(gid));
						r.setIP(ip);
						r.setregularid(id, comp);
						r.setValue(v, comp);
						//生成map
						HashMap<String,regulationClass> sr = new HashMap<String,regulationClass>();
						sr.put(String.valueOf(gid), r);
						//加入到threshold中
						this.threshold.put(ip, sr);
						
					}
				}
				//如果为振幅规则，则建立amplitude数据结构
				else{
					//判断当前IP是否已加入amplitude中
					if(this.amplitude.containsKey(ip)){
						//如果当前gatherid对应的规则类已创建，则只需将当前gatherid对应的规则设置到规则类中即可
						if(this.amplitude.get(ip).containsKey(gid)){
							this.amplitude.get(ip).get(gid).setregularid(id, comp);//设置规则编号
							this.amplitude.get(ip).get(gid).setValue(v, comp);//设置规则对应的振幅值
						}
						else{
							//如果当前gatherid对应的规则类未创建，1.需创建一个规则类，并对规则类做相应设置，2.设置flist
							regulationClass r = new regulationClass();
							r.setAW(this.amplitudeWindow);
							r.setGatherid(String.valueOf(gid));
							r.setIP(ip);
							r.setregularid(id, comp);
							r.setValue(v, comp);
							findlist fl = new findlist();
							this.flist.get(ip).put(String.valueOf(gid), fl);
							this.amplitude.get(ip).put(String.valueOf(gid), r);
						}
					}
					//如果当前ip的map未加入到threshold
					else{
						//生成当前规则对应的规则类
						regulationClass r = new regulationClass();
						r.setAW(this.amplitudeWindow);
						r.setGatherid(String.valueOf(gid));
						r.setIP(ip);
						r.setregularid(id, comp);
						r.setValue(v, comp);
						//生成map
						HashMap<String,regulationClass> sr = new HashMap<String,regulationClass>();
						sr.put(String.valueOf(gid), r);
						this.amplitude.put(ip, sr);
						//设置flist
						findlist fl = new findlist();
						HashMap<String,findlist> sf = new HashMap<String,findlist>();
						sf.put(String.valueOf(gid), fl);
						this.flist.put(ip, sf);
						
					}
				}
			}
			
			result.close();  
            conn.close(); 
            
            if(threshold!=null){
		    	System.out.println("tangzheng");
		    	System.out.println(threshold);
		    	System.out.println(amplitude);
		    	for(Entry<String,HashMap<String,regulationClass>> e:threshold.entrySet()){
		    		if(e.getValue()!=null){
		    			for(Entry<String,regulationClass> ee:e.getValue().entrySet()){
		    				if(ee.getValue()!=null){
		    					regulationClass r = (regulationClass)ee.getValue();
		    					ff.write(("\n"+r.ip+" "+r.value[0]+" "+r.value[1]+"\n").getBytes());
		    				}
		    			}
		    		}
		    	}
		    }
    	}catch(Exception e){
    		try {
				ff.write(e.toString().getBytes());
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
	}
	
}

	