package bjhit.storm;

import bjhit.storm.kafkaspout;
import bjhit.storm.storeDB;

import backtype.storm.Config;
import backtype.storm.LocalCluster;
import backtype.storm.StormSubmitter;
import backtype.storm.generated.AlreadyAliveException;
import backtype.storm.generated.InvalidTopologyException;
import backtype.storm.topology.TopologyBuilder;
import backtype.storm.tuple.Fields;

public class sceneFind {

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		TopologyBuilder builder = new TopologyBuilder();

	    builder.setSpout("spout", new kafkaspout(args[3],args[0]), 2);
	    builder.setBolt("compute",new computeBolt(args[4]),4).fieldsGrouping("spout", "computedata", new Fields("ip"));
	    builder.setBolt("find",new regularMatchBolt(args[4],args[2]),4).fieldsGrouping("spout", "finddata", new Fields("ip")).fieldsGrouping("compute", "findData", new Fields("ip"));
	    builder.setBolt("store",new storeDB(args[4], Integer.parseInt(args[1])),6).shuffleGrouping("spout", "hellodata").shuffleGrouping("compute", "storeData").shuffleGrouping("find");
	    Config conf = new Config();
	    conf.setDebug(true);
	    //conf.setNumWorkers(6);


	    if (args != null && args.length > 0) {
	      conf.setNumWorkers(4);
	      //conf.put(Config.TOPOLOGY_EXECUTOR_SEND_BUFFER_SIZE, 16384);
	      //conf.put(Config.TOPOLOGY_RECEIVER_BUFFER_SIZE, 16);
	      try {
			StormSubmitter.submitTopology(args[4], conf, builder.createTopology());
		} catch (AlreadyAliveException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvalidTopologyException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    }
	    else {
	      conf.setMaxTaskParallelism(3);

	      LocalCluster cluster = new LocalCluster();
	      cluster.submitTopology("word-count", conf, builder.createTopology());

	      try {
			Thread.sleep(10000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	      cluster.shutdown();
	    }

	}

}

