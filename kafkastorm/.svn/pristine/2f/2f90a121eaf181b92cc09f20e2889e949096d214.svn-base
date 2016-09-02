package bjhit.storm;

import bjhit.storm.associatedData;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Constructor;
import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;
import org.apache.log4j.Logger;
import org.apache.log4j.ConsoleAppender;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;
import org.apache.log4j.RollingFileAppender;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.mysql.jdbc.Connection;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Fields;
import backtype.storm.tuple.Tuple;
import backtype.storm.tuple.Values;

public class computeBolt implements IRichBolt{
	
	private static final long serialVersionUID = 1L;
	private final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss:SSS");
    private OutputCollector collector =null;//bolt发射器
    private  Connection conn = null;//数据库连接
    private FileOutputStream ff;
    private Map<String,HashMap<String,associatedData>> confANDdata =null;//记录当前任务正在计算的复合类数据，其map路径为map<ip,hashMap<gatherid,复合类数据计算类>>
    private Map<String,HashMap<String,ArrayList<String>>> oidforasso = null;//记录当前数据所能计算的复合数据,其map路径为map<ip，hashMap<oid,gatherid数组>>
    private String taskid = null;//任务编号
		private File file;
		private int step = 0;
    private Map<String,String> DBConn =null;
    private Map<String,String> classMap =new HashMap<String,String>(32);//gatherid和复合类数据计算类对应表
    public Logger loggerC = null;
    public computeBolt(String task){
    	taskid = task;//任务编号
    	
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

	private static final String SYMBAL = "#$#";
	@Override
	public void execute(Tuple arg0) {
		// TODO Auto-generated method stub
		
		collector.ack(arg0);
		ArrayList<String> al = null;
		String[] temp = null;
		String[] jsonsTemp = arg0.getString(1).split("#[$]#");
		
		for(String gatherid:jsonsTemp[3].split(",")){
		     String[] jsons = (jsonsTemp[0]+SYMBAL+jsonsTemp[1]+SYMBAL+jsonsTemp[2]+SYMBAL+gatherid+SYMBAL+jsonsTemp[4]+SYMBAL+jsonsTemp[5]+SYMBAL+jsonsTemp[6]).split("#[$]#");
		//String[] jsons = arg0.getString(1).split("#");
		
		//test
		//写日志
		try {
			ff.write(("the message gatherTime is "+jsons[6]+"\nthe batchTime is "+jsons[1]).getBytes());
			ff.write(("\nthe time arriving compute bolt is "+df.format(new Date())+" E\n").getBytes());
			ff.write(("the message is "+arg0.getString(1)+" \n").getBytes());
			loggerC.info("the message gatherTime is "+jsons[6]+" the batchTime is "+jsons[1]);
			loggerC.info("the time arriving compute bolt is "+df.format(new Date()));
			loggerC.info("the message is "+arg0.getString(1));
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
			loggerC.error(e1.toString());
		}
		//test end
		//过滤非法数据
        if(jsons[5].equals("PDU NULL")||jsons[5].equals("Null")||jsons[5].equals("noSuchInstance")||jsons[5].equals("DATA NOT RETURN")){
			
		}else{
			if(oidforasso!=null){
				//判断当前数据是否用来计算复合类数据
				if(oidforasso.containsKey(jsons[2])){//首先判断IP
					al = oidforasso.get(jsons[2]).get(jsons[4]);//根据IP和oid获取gatherid列表
			     }
				//判断对于当前数据是否存在需要计算的复合类数据
		        if(al != null){//存在
				  try{
					  //获取当前数据可计算的复合类数据
					  for(int i=0;i<(al.size());i++)
					  {
						  //whether it is just the data according to gatherID which located in the third place
						  //当前数据的gatherid与oidforasso中的oid是否一致，一致则计算
						  if(!jsons[3].equals(al.get(i))){
						  }
						  else{//一致则计算
							  //从confANDdata，获取可计算复合类数据的复合数据计算类
							  associatedData asso  = confANDdata.get(jsons[2]).get(al.get(i));
							  //基于当前数据对复合类数据计算类进行设置
							  asso.setData(jsons[0],jsons[1],jsons[2],jsons[3],jsons[4],jsons[5],jsons[6]);
							  //获取计算结果
							  temp = asso.getcalData();
							  /*Class<? extends associatedData> cls = asso.getClass();
							  Method m1;
							  try {
								  m1 = cls.getDeclaredMethod("getcalData");
								  Method m7 = cls.getDeclaredMethod("setData", String.class,String.class,String.class,String.class,String.class,String.class,String.class);
								  try {
									  m7.invoke(asso, jsons[0],jsons[1],jsons[2],jsons[3],jsons[4],jsons[5],jsons[6]);
									  temp =(String[])m1.invoke(asso);
								  } catch (IllegalArgumentException e) {
									  // TODO Auto-generated catch block
									  e.printStackTrace();
								  } catch (IllegalAccessException e) {
									  // TODO Auto-generated catch block
									  e.printStackTrace();
								  } catch (InvocationTargetException e) {
									  // TODO Auto-generated catch block
									  e.printStackTrace();
								  }
		        
							  } catch (SecurityException e) {
								  // TODO Auto-generated catch block
								  e.printStackTrace();
							  } catch (NoSuchMethodException e) {
								  // TODO Auto-generated catch block
								  e.printStackTrace();
							  } */
			
	        	              //日志记录
							  if(temp != null){
								  try {
									  this.collector.emit("storeData",arg0,new Values("1",temp[0]));
									  this.collector.emit("findData",arg0,new Values(jsons[2],temp[1]));
									  ff.write(("\nthe time leaving bolt is "+df.format(new Date())).getBytes());
									  ff.write("\n".getBytes());
									  ff.write(asso.calValue.getBytes());
									  ff.write("\n".getBytes());
									  ff.write(temp[0].getBytes());
									  ff.write("\n".getBytes());
									  ff.write(temp[1].getBytes());
									  ff.write("\n".getBytes());
									  //
									  loggerC.info("the time leaving bolt is "+df.format(new Date()));
									  loggerC.info(asso.calValue);
									  loggerC.info(temp[0]);
									  loggerC.info(temp[1]);
								  } catch (IOException e) {
									  // TODO Auto-generated catch block
									  e.printStackTrace();
									  loggerC.error(e.toString());
								  }
							  }
							  break;
						  }
						  //
					  }
				  }
				  catch(Exception m){
					  m.printStackTrace();
					  loggerC.error(m.toString());
				  }
		        }
			}
			}
			}
		}

	@Override
	public void prepare(Map arg0, TopologyContext arg1, OutputCollector arg2) {
		// TODO Auto-generated method stub
		this.collector = arg2;
		//日志初始化
		//1.log4j
		loggerC = Logger.getLogger("computeBolt"+arg1.getThisTaskId());
		RollingFileAppender fappender = null;
		ConsoleAppender cappender = null;

		try {
			cappender = new ConsoleAppender(new PatternLayout());
			fappender = new RollingFileAppender(new PatternLayout(),"/data/logCompute_"+arg1.getStormId()+"_"+arg1.getThisTaskId(),true);
			fappender.setMaxBackupIndex(3);
			fappender.setMaxFileSize("10MB");
			loggerC.setLevel(org.apache.log4j.Level.INFO);
		} catch(Exception e) 
		{
			System.out.println(e.toString());
		}
		loggerC.addAppender(cappender);
		loggerC.addAppender(fappender);
		//2.file
		file = new File("/data/compute"+arg1.getStormId()+"_"+arg1.getThisTaskId());
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
		//连接zk
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
					DBConn.put("connString","jdbc:mysql://192.168.10.17:3306/netscence");
				}
			}
			//设置classMap
			if(client.checkExists().forPath("/scnFind/classMap")!=null){
				//System.out.println("exist");
				//System.out.println(new String(client.getData().forPath("/scnFind")));
				Gson gson = new Gson();
				classMap = gson.fromJson(new String(client.getData().forPath("/scnFind/classMap")),new TypeToken<Map<String, String>>() {

					/**
					 * 
					 */
					private static final long serialVersionUID = 1L;}.getType() );
				
			}
		}catch(Exception e)
		{
			try {
				ff.write(e.toString().getBytes());
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		}
		//class map，声明复合类计算gatherid和相应计算类的关系
		/*classMap.put("60","bjhit.storm.cpuUsedPercent" );
		//classMap.put("61","bjhit.storm.sendRcvErrorPP" );//--
		classMap.put("62","bjhit.storm.memTotal" );
		classMap.put("63","bjhit.storm.memUsed" );
		classMap.put("64", "bjhit.storm.memUsedPercent");
		classMap.put("65","bjhit.storm.vmemUsedPercent" );
		classMap.put("66","bjhit.storm.vmemTotal" );
		classMap.put("67","bjhit.storm.vmemUsed" );
		classMap.put("68","bjhit.storm.diskTotal" );
		classMap.put("69","bjhit.storm.diskUsed" );
		classMap.put("70","bjhit.storm.diskUsedPercent" );
		classMap.put("71","bjhit.storm.sendRcvInterface" );
		classMap.put("72","bjhit.storm.broadcastPercent" );
		classMap.put("73","bjhit.storm.sendICMPErrorPP" );//--
		classMap.put("74","bjhit.storm.rcvICMPErrorPP" );//--
		classMap.put("100","bjhit.storm.IfInDiscardP" );//
		classMap.put("101","bjhit.storm.IfOutDiscardP" );
		classMap.put("102","bjhit.storm.IfInErrorP" );
		classMap.put("103","bjhit.storm.IfOutErrorP" );
		classMap.put("104","bjhit.storm.IfInFlow" );
		classMap.put("105","bjhit.storm.IfOutFlow" );
		classMap.put("106","bjhit.storm.IfUtilizP" );

		classMap.put("145","bjhit.storm.sendRcvInterface" );
		classMap.put("150", "bjhit.storm.memUsedPercent");
		classMap.put("151","bjhit.storm.vmemUsedPercent" );
		classMap.put("152","bjhit.storm.diskUsedPercent" );
		classMap.put("153","bjhit.storm.IfInDiscardP" );//
		classMap.put("154","bjhit.storm.IfOutDiscardP" );
		classMap.put("155","bjhit.storm.IfInErrorP" );
		classMap.put("156","bjhit.storm.IfOutErrorP" );
		classMap.put("157","bjhit.storm.IfInFlow" );
		classMap.put("158","bjhit.storm.IfOutFlow" );
		classMap.put("159","bjhit.storm.IfUtilizP" );
		classMap.put("167","bjhit.storm.cpuUsedPercent" );
		
		
		
		//classMap.put("222","bjhit.storm.vmemUsedPercent" ); 
		classMap.put("190","bjhit.storm.IfInDiscardP" );//
		classMap.put("191","bjhit.storm.IfOutDiscardP" );
		classMap.put("192","bjhit.storm.IfInErrorP" );
		classMap.put("193","bjhit.storm.IfOutErrorP" );
		classMap.put("194","bjhit.storm.IfInFlow" );
		classMap.put("195","bjhit.storm.IfOutFlow" );
		classMap.put("196","bjhit.storm.IfUtilizP" ); */
		
		
		
		//
		
        //get connection
        conn = this.getConnection();
        getConf();
        //get associatedMap
	}

	@Override
	public void declareOutputFields(OutputFieldsDeclarer arg0) {
		// TODO Auto-generated method stub
		//声明拓扑中的流及其域
		System.out.println((step++)+"declareOutputFields");
		arg0.declareStream("storeData",new Fields("tag","data"));
		arg0.declareStream("findData",new Fields("ip","data"));
	}

	@Override
	public Map<String, Object> getComponentConfiguration() {
		// TODO Auto-generated method stub
		System.out.println(step+"getComponentConfiguration");
		return null;
	}
	//连接数据库
	public  Connection getConnection() {
        
        Connection con = null;    //创建用于连接数据库的Connection对象
        loggerC.info("mysql connecting");

        try {
                Class.forName("com.mysql.jdbc.Driver");// 加载Mysql数据驱动

            
                con = (Connection) DriverManager.getConnection(
                    DBConn.get("connString"), DBConn.get("user"), DBConn.get("password"));// 创建数据连接

                ff.write((DBConn.get("connString")+" "+DBConn.get("user")+" "+DBConn.get("password")+"\n").getBytes());
                ff.write("DB connection succeed\n".getBytes());
        } catch (Exception e) {
        	try{
       	     ff.write("Initialization failed\n".getBytes());
       	     loggerC.error("mysql connect initialize fail");
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
			String sql = "SELECT tp.ip, gd.child_oid, gd.oid_flag, g.gather_id FROM t_topo_dev AS tp," +
					" t_task_config AS tt, gather_item AS g, gather_item_detail AS gd " +
					"WHERE tp.dev_catgory = g.dev_type AND tp.task_id = tt.task_id " +
					"AND tt.config_id = g.gather_id AND g.complex_flag = '1' " +
					"AND g.gather_id = gd.gather_id AND tt.task_id = "+taskid;
			result = stmt.executeQuery(sql);
			//获取当前任务的复合类计算列表
			while (result.next()){  
			    //String name = result.getString("name"); 
			    String ip = result.getString(1);
			    String oid = result.getString(2);
			    String oid1 = oid;
			    String flag = result.getString(3);
			    String gatherid = String.valueOf(result.getInt(4));
			    //日志
			    ff.write("\n".getBytes());
			    ff.write((ip+" "+oid+" "+flag).getBytes());
			    ff.write("\n".getBytes());
			    //日志结束
			    //判断是否利用json串计算（是否子oid）
			    if(flag.equals("2"))//是
			    	//获得父oid
		    		oid = oid.substring(0,oid.lastIndexOf("."));
			    //oidforasso，confANDdata是否未初始化
			    if(oidforasso == null){
			    	//初始化
			    	oidforasso = new HashMap<String,HashMap<String,ArrayList<String>>>();
			    	confANDdata = new HashMap<String,HashMap<String,associatedData>>();
			    	//构造"当前数据所能计算的复合数据"数据结构
			    	//声明gatherid数组
			    	ArrayList<String> a = new ArrayList<String>();
			    	//将当前gatherid加入数组
			    	a.add(gatherid);
			    	//加入oid和gatherid关系，即此oid可用来计算gatherid所代表的复合类数据
			    	HashMap<String,ArrayList<String>> m = new HashMap<String,ArrayList<String>>();
			    	m.put(oid, a);
			        oidforasso.put(ip, m);
			    	
			        //构造“当前任务正在计算的复合类数据”数据结构，即confANDdata
			    	//reflactor
			        //根据classMap,获取计算当前复合数据需要的复合数据类
			    	Class cls = Class.forName(classMap.get(gatherid));
			    	//执行构造函数，获取该类实例
			    	Class partypes[] = new Class[1];  
		            partypes[0] = String.class;
		            Constructor ct = cls.getConstructor(partypes); 
		            Object arglist[] = new Object[1]; 
		            arglist[0] = gatherid; 
		            Object obj = ct.newInstance(arglist); 
		            
		            //设置计算此复合类数据所需要的分量个数，每次加1
		            Method m1 = cls.getDeclaredMethod("setOidInNeed");
		            //设置计算此复合类数据的计算分量
			        Method m2 = cls.getDeclaredMethod("setOidList", String.class);
			        m1.invoke(obj); 
			        m2.invoke(obj, oid1);
			    	//构造confANDdata
			    	HashMap<String,associatedData> hh = new HashMap<String,associatedData>();
			    	hh.put(gatherid, (associatedData)obj);
			    	confANDdata.put(ip, hh);
			    	//this.oidforasso
			    }
			    //若oidforasso、confANDdata已经初始化
			    else{
			    	//判断此IP的映射关系在oidforasso、confANDdata是否存在
			    	if( !oidforasso.containsKey(ip) ){//不存在
			    		//构造oidforasso
			    		ArrayList<String> a = new ArrayList<String>();
				    	a.add(gatherid);
				    	HashMap<String,ArrayList<String>> m = new HashMap<String,ArrayList<String>>();
				    	m.put(oid, a);
				    	oidforasso.put(ip, m);
				    	
				    	//构造confANDdata
				    	//reflactor
				    	Class cls = Class.forName(classMap.get(gatherid));
				    	Class partypes[] = new Class[1];  
			            partypes[0] = String.class;
			            Constructor ct = cls.getConstructor(partypes); 
			            Object arglist[] = new Object[1]; 
			            arglist[0] = gatherid; 
			            Object obj = ct.newInstance(arglist); 
			            
			            //设置
			            Method m1 = cls.getDeclaredMethod("setOidInNeed"); 
				        Method m2 = cls.getDeclaredMethod("setOidList", String.class);
				        m1.invoke(obj); 
				        m2.invoke(obj, oid1);
				    	
				    	HashMap<String,associatedData> hh = new HashMap<String,associatedData>();
				    	hh.put(gatherid, (associatedData)obj);
				    	confANDdata.put(ip, hh);
			    	}
			    	//此IP的映射关系在oidforasso、confANDdata已存在
			    	else{
			    		//判断和该oid相关的映射关系是否已存在
			    		if(!oidforasso.get(ip).containsKey(oid)){//不存在
			    			//创建oid和gatherid的映射关系，构造oidforasso
			    			ArrayList<String> a = new ArrayList<String>();
					    	a.add(gatherid);
					    	oidforasso.get(ip).put(oid, a);
					    	
					    	//构造confANDdata
					    	//reflactor
					    	Class cls = Class.forName(classMap.get(gatherid));
					    	Class partypes[] = new Class[1];  
				            partypes[0] = String.class;
				            Constructor ct = cls.getConstructor(partypes); 
				            Object arglist[] = new Object[1]; 
				            arglist[0] = gatherid; 
				            Object obj = ct.newInstance(arglist); 
				            
				            //设置
				            Method m1 = cls.getDeclaredMethod("setOidInNeed"); 
					        Method m2 = cls.getDeclaredMethod("setOidList", String.class);
					        m1.invoke(obj); 
					        m2.invoke(obj, oid1);
					    	
					    	confANDdata.get(ip).put(gatherid, (associatedData)obj);
			    		}
			    		//若此oid的映射关系已存在，判断是否存在此oid和当前gatherid的映射关系，即数组中是否存在该gatherid
			    		else{
			    			if(!oidforasso.get(ip).get(oid).contains(gatherid))
			    			{//不存在，在数组中加入即可构造oidforasso
			    				oidforasso.get(ip).get(oid).add(gatherid);
			    				
			    				//构造confANDdata
			    				//reflactor
						    	Class cls = Class.forName(classMap.get(gatherid));
						    	Class partypes[] = new Class[1];  
					            partypes[0] = String.class;
					            Constructor ct = cls.getConstructor(partypes); 
					            Object arglist[] = new Object[1]; 
					            arglist[0] = gatherid; 
					            Object obj = ct.newInstance(arglist); 
					            
					            //设置
					            Method m1 = cls.getDeclaredMethod("setOidInNeed"); 
						        Method m2 = cls.getDeclaredMethod("setOidList", String.class);
						        m1.invoke(obj); 
						        m2.invoke(obj, oid1);
						    	
						    	confANDdata.get(ip).put(gatherid, (associatedData)obj);
			    			}//若assoforasso中已存在此oid和当前gatherid的映射关系，则只需设置confANDdata中相应变量即可
			    			else{
			    				Object obj = confANDdata.get(ip).get(gatherid);
			    				Class cls = Class.forName(classMap.get(gatherid));
			    				//计算该复合类数据所需的分量个数，每次加1
			    				Method m1 = cls.getDeclaredMethod("setOidInNeed"); 
			    				//设置计算此复合类数据的计算分量
						        Method m2 = cls.getDeclaredMethod("setOidList", String.class);
						        m1.invoke(obj); 
						        m2.invoke(obj, oid1);
			    			}
			    		}
			    	}
			    }
			}
			result.close();  
            conn.close(); // 关闭数据库 
            //日志记录
            loggerC.info("oidforasso");
            ff.write("oidforasso\n".getBytes());
            if(oidforasso!=null){
		    			System.out.println("tangzheng");
		    			System.out.println(oidforasso);
		    			System.out.println(confANDdata);
		    			for(Entry<String,HashMap<String,ArrayList<String>>> e:oidforasso.entrySet()){
		    				if(e.getValue()!=null){
		    					for(Entry<String,ArrayList<String>> ee:e.getValue().entrySet()){
		    						if(ee.getValue()!=null){
		    							for(String s:ee.getValue()){
		    								ff.write((e.getKey()+" "+ee.getKey()+" "+s+"\n").getBytes());
		    								loggerC.info((e.getKey()+" "+ee.getKey()+" "+s));
		    							}
		    						}
		    					}
		    				}
		    			}
		    		}
            
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			try {
				if(stmt == null){
					ff.write("创建statement出错\n".getBytes());
					loggerC.info("创建statement出错");
				}
					ff.write(e.toString().getBytes());
					ff.write("\n".getBytes());
					loggerC.info(e.toString());
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			e.printStackTrace();
		}
    }
}
