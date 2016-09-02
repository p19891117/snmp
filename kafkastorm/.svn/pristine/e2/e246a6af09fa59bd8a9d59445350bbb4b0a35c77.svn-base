package bjhit.storm;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.Map.Entry;

public class ForMateToJson {
	public static Map<String, HashMap<String, String>> toNormalFormate(Map<String, String> tmp) {
		Map<String, HashMap<String, String>> oidValues = new  HashMap<String, HashMap<String, String>>();
		Set<Entry<String, String>> entrys = tmp.entrySet();
		for(Entry<String,String> entry:entrys){
			String oidSub = entry.getKey();
			String value = entry.getValue();
			//x,y  x变换为一行   y变换为一列
			String oidChar[] = oidSub.split("\\.");
			String last = oidChar[oidChar.length-1];
			HashMap<String,String> tree = oidValues.get(last);
			if(tree!=null){
				tree.put(oidSub,value);
			}else{
				HashMap<String,String> maptmp = new HashMap<String,String>();				
				maptmp.put(oidSub, value);
				oidValues.put(last, maptmp);
			}
		}
		return oidValues;
	}
}
