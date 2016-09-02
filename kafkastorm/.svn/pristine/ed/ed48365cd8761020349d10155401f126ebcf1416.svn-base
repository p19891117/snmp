package bjhit.storm;

public class sceneList {
	private long scn_latest = 0;
	@SuppressWarnings("unused")
	private int scn_level = 0;
	public Boolean setValue(long dataTime,int level,long preWindow,long postWindow){
		if(scn_latest == 0||(dataTime - scn_latest)>postWindow 
				|| (scn_latest - dataTime)>preWindow || (level>this.scn_level))
		{
			if(dataTime>this.scn_latest){
				this.scn_latest = dataTime;
				this.scn_level = level;
			}
			return true;
		}
		return false;
	}

}
