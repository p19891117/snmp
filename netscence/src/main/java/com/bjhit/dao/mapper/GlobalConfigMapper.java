package com.bjhit.dao.mapper;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.bjhit.dao.model.DeviceType;
import com.bjhit.dao.model.Factory;
import com.bjhit.dao.model.GatherItem;
import com.bjhit.dao.model.GatherItemDetail;
import com.bjhit.dao.model.TableOID;
import com.bjhit.dao.model.TableOIDSub;
import com.bjhit.dao.model.Task;
import com.bjhit.util.Pager;


@Repository
public interface GlobalConfigMapper {
	public List<GatherItem>  getGlobal_configList(GatherItem gatherItem);
	
	public void addGlobalConfig(GatherItem gatherItem);
	public void addGlobalConfigByExcel(GatherItem gatherItem);
	public void addGlobalConfigDetailByExcel(GatherItemDetail gatherItemDetail); 
	public List<GatherItem> getGlobalconfigListForExcel();
	public List<GatherItemDetail> getGlobalconfigDetailListForExcel() ;
	public void deleteGlobalConfigByExcel(String gather_id);
	public void backGlobalConfigDetailByExcel();
	public void backGlobalConfigByExcel(); 
	public void deleteGlobalConfigDetailByExcel(String scn_id);

	public void deleteGlobalConfig(String id);

	public GatherItem getGlobalConfig(String id);

	public void editGlobalConfig(GatherItem gatherItem);

	public List<DeviceType> getDev_list();

	public List<Factory> getFactory_list();
	
	public List getGlobal_configDetailList(String gather_id);
	
	public void addGlobalConfigDetail(GatherItemDetail gatherItemDetail);

	public void editGlobalConfigDetail(GatherItemDetail gatherItemDetail);

	public GatherItemDetail getGatherItemDetail(String id);
	
	public void deleteGatherItemDetail(String id);

    public int getGatherItemCount(GatherItem gatherItem);
	
    	/**
	 * 获取不同设备类型对应的采集项配置
	 * @param devType
	 * @return
	 */
    public List<GatherItem> getConfListByDevType(String devType);
	
    public List<TableOID> oidsetlist();

	public List<TableOIDSub> oidSubList(int id);

	public void deleteOidSet(int id);

	public void addOidSet(String oid);

	public TableOID findTableOidByID(int id);

	public void editOidSet(TableOID tableOid);

	public void addOidSub(TableOIDSub oidsub);

	public void deleteOidSub(int id);

	public TableOIDSub findTableSubOidByID(int id);

	public void editOidSub(TableOIDSub sub);
	
	

}
