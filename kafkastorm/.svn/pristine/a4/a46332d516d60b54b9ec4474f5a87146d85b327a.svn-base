package bjhit.storm;

import java.math.BigDecimal;

public class regulationClass {

	public String gatherid =null;
	public int[] regularID = new int[2];
	public BigDecimal[] value = new BigDecimal[2];
	public int amplitudeWindow ;
	public String ip = null;
	public int[] used = new int[2];
	
	public regulationClass(){
		used[0] = 0;
		used[1] = 0;
	}
	public void setGatherid(String id){
		this.gatherid = id;
	}
	public void setIP(String ip){
		this.ip = ip;
	}
	public void setAW(int aw){
		this.amplitudeWindow = aw;
	}
	public void setregularid(int rid,int index ){
		regularID[index-1] = rid;
		used[index-1] = 1;
	}
	public void setValue(BigDecimal v,int index){
		value[index-1] = v;
	}
	public void str(){
		
	}
}
