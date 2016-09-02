package bjhit.storm;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class tupledata {

	public long batchTime;//当前数据的批时间，单位为毫秒
	public BigDecimal value;//当前数据的值，转换为BigDecimal类型
	private final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public tupledata(String time,String value){
		try {
			batchTime = df.parse(time).getTime();
			this.value = new BigDecimal(value);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
