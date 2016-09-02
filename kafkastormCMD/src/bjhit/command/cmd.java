package bjhit.command;

import backtype.storm.Config;
import backtype.storm.LocalCluster;
import backtype.storm.StormSubmitter;
import backtype.storm.generated.AlreadyAliveException;
import backtype.storm.generated.InvalidTopologyException;
import backtype.storm.topology.TopologyBuilder;
import backtype.storm.tuple.Fields;
import bjhit.command.cmdspout;
import bjhit.command.parseCmd;

public class cmd {

	/**
	 * @param args
	 */
		public static void main(String[] args1) {
			// TODO Auto-generated method stub
			TopologyBuilder builder = new TopologyBuilder();

		    builder.setSpout("cmdspout", new cmdspout(args1[0],args1[1]), 1);
		    builder.setBolt("cmdparse",new parseCmd(args1[2], args1[3],args1[4]),1).fieldsGrouping("cmdspout","cmd", new Fields("taskid","cmd"));
		    Config conf = new Config();
		    conf.setDebug(true);
		    //conf.setNumWorkers(6);


		    if (args1 != null && args1.length > 0) {
		      conf.setNumWorkers(2);
		      //conf.put(Config.TOPOLOGY_EXECUTOR_SEND_BUFFER_SIZE, 16384);
		     // conf.put(Config.TOPOLOGY_RECEIVER_BUFFER_SIZE, 8);
		      try {
				StormSubmitter.submitTopology(args1[5], conf, builder.createTopology());
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

