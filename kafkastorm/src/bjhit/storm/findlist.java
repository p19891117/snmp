package bjhit.storm;

import java.math.BigDecimal;
import java.util.TreeMap;

public class findlist {

	public BigDecimal minimum;//当前振幅窗口内数据最小值
	public BigDecimal maximum;//当前振幅窗口内数据最大值
	int maxindex = 0;//当前振幅窗口内数据最大值在list中的位置
	int minindex = 0;//当前振幅窗口内数据最小值在list中的位置
	public TreeMap<Integer,tupledata> list;//存储当前振幅窗口内的数据
	public findlist(){
		minimum = new BigDecimal(0);
		maximum = new BigDecimal(0);
		list = new TreeMap<Integer,tupledata>();
	}
}
