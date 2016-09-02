package bjhit.storm;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Queue;
import java.util.UUID;
import java.util.concurrent.ConcurrentLinkedQueue;

import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.mysql.jdbc.Connection;
//import java.sql.*;

import backtype.storm.task.OutputCollector;
import backtype.storm.task.TopologyContext;
import backtype.storm.topology.IRichBolt;
import backtype.storm.topology.OutputFieldsDeclarer;
import backtype.storm.tuple.Tuple;

public class storeDB implements IRichBolt {
	private static final long serialVersionUID = 1L;
	private OutputCollector collector;
	private Queue<Tuple> tupleQueue = new ConcurrentLinkedQueue<Tuple>();// 缓存要存储数据的队列
	private int count;
	private long lastTime;
	private Connection conn = null;
	private String scTaskID;
	private File file;
	private Map<String,String> DBConn =null;
	private final SimpleDateFormat df = new SimpleDateFormat(
			"yyyy-MM-dd HH:mm:ss");
	FileOutputStream ff;
	int n;

	public storeDB(String sctaskID, int n) {
		count = n; // 批量处理的Tuple记录条数
		this.scTaskID = sctaskID;
		// conn = getConnection(); //通过DBManager获取数据库连接
		lastTime = System.currentTimeMillis(); // 上次批量处理的时间戳
	}

	@Override
	public void prepare(Map stormConf, TopologyContext context,
			OutputCollector collector) {
		n = 0;
		this.collector = collector;
		file = new File("/data/store" + context.getStormId() + "_"
				+ context.getThisTaskId());
		if (!file.exists()) {
			try {
				file.createNewFile();
			} catch (Exception ee) {
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
					DBConn.put("connString","jdbc:mysql://192.168.10.17:3306/netscence");
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
		//连接数据库
		conn = getConnection();
	}

	@Override
	public void execute(Tuple tuple) {
		// ack
		collector.ack(tuple);
		try {
			ff.write((df.format(new Date()) + " excute\n").getBytes());
			ff.write((tuple.getString(1) + " \n").getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		n++;
		try {
			ff.write(("this excuting number is " + n + "\n").getBytes());
		} catch (Exception m) {
			m.printStackTrace();
		}
		tupleQueue.add(tuple);
		long currentTime = System.currentTimeMillis();
		// 每count条tuple批量提交一次，或者每个1秒钟提交一次
		if (conn == null) {
			try {
				ff.write("connection is null\n".getBytes());
			} catch (Exception m) {
				m.printStackTrace();
			}

		} else {
			try {
				if (!conn.isValid(10)) {
					conn = this.getConnection();
				}
			} catch (SQLException e2) {
				// TODO Auto-generated catch block
				e2.printStackTrace();
			}
			try {
				if (tupleQueue.size() >= count
						|| currentTime >= lastTime + 1000) {
					try {
						ff.write(("the size of queue is " + tupleQueue.size() + "\n")
								.getBytes());
					} catch (Exception m) {
						m.printStackTrace();
					}
					if (tupleQueue.size() >= count) {
						try {
							ff.write(("the reason for batch commit is count\n")
									.getBytes());
						} catch (Exception m) {
							m.printStackTrace();
						}
					} else {
						try {
							ff.write(("the reason for batch commit is timeout\n")
									.getBytes());
						} catch (Exception m) {
							m.printStackTrace();
						}
					}
					Statement stmt = conn.createStatement();
					conn.setAutoCommit(false);
					while (!tupleQueue.isEmpty()) {
						// for (int i = 0; i < tupleQueue.size(); i++) {
						Tuple tup1 = (Tuple) tupleQueue.poll();
						String dataTag = tup1.getString(0);
						String sql = "";
						if (dataTag.equals("0")) {
							String sqlt = tup1.getString(1);
							String[] tmp = sqlt.split("#[$]#");

							String[] jsonsTemp = sqlt.split("#[$]#");
							/**
							 * 处理
							 */

							if(jsonsTemp[5].startsWith(("{"))&&jsonsTemp[5].endsWith(("}"))){
								Map<String, String> rrtmp1 = new Gson().fromJson(jsonsTemp[5],new TypeToken<Map<String, String>>() {}.getType());
								Map<String, HashMap<String,String>> rr = ForMateToJson.toNormalFormate(rrtmp1);
								jsonsTemp[5] = new Gson().toJson(rr);
							}
							if (jsonsTemp[5].equals("PDU NULL")
									|| jsonsTemp[5].equals("Null")
									|| jsonsTemp[5].equals("noSuchInstance")
									|| jsonsTemp[5].equals("DATA NOT RETURN")) {

							} else {
								/**
								 * 处理
								 */
								String ss[] = jsonsTemp[3].split(",");
								for (String gatherid : ss) {
									String[] tmp1 = (jsonsTemp[0] + "#$#"
											+ jsonsTemp[1] + "#$#" + jsonsTemp[2]
											+ "#$#" + gatherid + "#$#"
											+ jsonsTemp[4] + "#$#" + jsonsTemp[5]
											+ "#$#" + jsonsTemp[6]).split("#[$]#");

									sql = getSQL(tup1, tmp1); // 生成sql语句

									stmt.addBatch(sql); // 加入sql
								}
							}
						} else {

							sql = getSQL(tup1,null); // 生成sql语句

							stmt.addBatch(sql); // 加入sql

						}

						// collector.ack(tup1); //进行ack
						ff.write(("ack for batch "
								+ tup1.getString(1).split("#[$]#")[0] + "\n")
								.getBytes());

						try {

							ff.write("connection is ok\n".getBytes());
							ff.write(tup1.getString(1).getBytes());
							ff.write(("\n" + sql).getBytes());
							ff.write("\n".getBytes());
						} catch (Exception m) {
							m.printStackTrace();
						}
					}
					try {
						ff.write("begin commit\n".getBytes());
					} catch (Exception m) {
						m.printStackTrace();
					}

					stmt.executeBatch(); // 批量提交sql
					conn.commit();
					stmt.close();
					// lastTime = currentTime;
					try {
						ff.write("commit\n".getBytes());
					} catch (Exception m) {
						m.printStackTrace();
					}
					conn.setAutoCommit(true);
					System.out
							.println("batch insert data into database, total records: "
									+ count);
					lastTime = currentTime;
				}

			} catch (Exception e) {
				try {
					ff.write("\n".getBytes());
					ff.write(e.toString().getBytes());
					ff.write("\n".getBytes());
					conn.rollback();
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		}
	}

	@Override
	public void cleanup() {
	}

	@Override
	public void declareOutputFields(OutputFieldsDeclarer declarer) {
	}

	@Override
	public Map<String, Object> getComponentConfiguration() {
		// TODO Auto-generated method stub
		return null;
	}

	public Connection getConnection() {

		Connection con = null; // 创建用于连接数据库的Connection对象

		try {
			Class.forName("com.mysql.jdbc.Driver");// 加载Mysql数据驱动

			con = (Connection) DriverManager.getConnection(
					DBConn.get("connString"), DBConn.get("user"), DBConn.get("password"));// 创建数据连接
			ff.write("DB connection succeed\n".getBytes());

		} catch (Exception e) {
			try {
				ff.write("Initialization  failed\n".getBytes());
			} catch (Exception m) {
				m.printStackTrace();
			}
			System.out.println("DB connection failed" + e.getMessage());
		}

		return con; // 返回所建立的数据库连接

	}

	// 生成sql语句
	public String getSQL(Tuple t, String tmp1[]) {
		String dataTag = t.getString(0);
		String sql = t.getString(1);
		String[] tmp = sql.split("#[$]#");
		StringBuilder mm = new StringBuilder(" VALUES('");
		mm.append(this.getUUID());

		String nowTime = df.format(new Date());
		// 如果是采集的原数据
			if (dataTag.equals("0")) {

				sql = "INSERT INTO data_table(id,taskNum,batch,batchtime,ip,scn_id,oid,value,gatherTime,storm_time)"; // 插入数据的sql语句
				tmp1[1] = tmp1[1].substring(0, tmp1[1].lastIndexOf(":"));
				tmp1[6] = tmp1[6].substring(0, tmp1[6].lastIndexOf(":"));
				mm.append("','");
				mm.append(this.scTaskID);
				mm.append("',");
				mm.append(tmp1[0]);
				mm.append(",'");
				mm.append(tmp1[1]);
				mm.append("','");
				mm.append(tmp1[2]);
				mm.append("',");
				mm.append(tmp1[3]);
				mm.append(",'");
				mm.append(tmp1[4]);
				mm.append("','");
				mm.append(tmp1[5]);
				mm.append("','");
				mm.append(tmp1[6]);
				mm.append("','");
				mm.append(nowTime);
				mm.append("')");

			} else if (dataTag.equals("1"))// 如果是计算的复合类数据
			{
				sql = "INSERT INTO complex_data(id,taskNum,batch,batchTime,ip,gather_id,calc_value,gatherTime)";
				tmp[1] = tmp[1].substring(0, tmp[1].lastIndexOf(":"));
				tmp[5] = tmp[5].substring(0, tmp[5].lastIndexOf(":"));
				mm.append("','");
				mm.append(this.scTaskID);
				mm.append("',");
				mm.append(tmp[0]);
				mm.append(",'");
				mm.append(tmp[1]);
				mm.append("','");
				mm.append(tmp[2]);
				mm.append("',");
				mm.append(tmp[3]);
				mm.append(",'");
				mm.append(tmp[4]);
				mm.append("','");
				mm.append(tmp[5]);
				mm.append("')");
			} else {// 如果是场景发现信息
				sql = "INSERT INTO scene_information(scn_id,task_id,sceTime,ip,strategy_id,scetri_condition,sce_flag,storm_time,batch)";
				tmp[0] = tmp[0].substring(0, tmp[0].lastIndexOf(":"));
				mm.append("',");
				mm.append(this.scTaskID);
				mm.append(",'");
				mm.append(tmp[0]);
				mm.append("','");
				mm.append(tmp[1]);
				mm.append("',");
				mm.append(tmp[2]);
				mm.append(",'");
				mm.append(tmp[3]);
				mm.append("','");
				mm.append(tmp[4]);
				mm.append("','");
				mm.append(nowTime);
				mm.append("',");
				mm.append(tmp[5]);
				mm.append(")");
		}
		mm.insert(0, sql);
		return mm.toString();
	}
	

	public String getUUID() {
		return UUID.randomUUID().toString();
	}
}
