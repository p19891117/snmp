package com.bjhit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bjhit.dao.mapper.GlobalConfigMapper;
import com.bjhit.dao.model.DeviceType;
import com.bjhit.dao.model.Factory;
import com.bjhit.dao.model.GatherItem;
import com.bjhit.dao.model.GatherItemDetail;
import com.bjhit.dao.model.TableOID;
import com.bjhit.dao.model.TableOIDSub;
import com.bjhit.util.Pager;


@Transactional
@Service("global_configService")
public class GlobaConfigServiceImpl {
	@Autowired
	private GlobalConfigMapper global_configMapper;
	
	
	public Pager  getGlobal_configList(GatherItem gatherItem, Pager pager) {
        //总记录数
		pager.setTotalCount(global_configMapper.getGatherItemCount(gatherItem));
		pager.setItems(global_configMapper.getGlobal_configList(gatherItem));
		return pager;
	}

	
	public void add(GatherItem gatherItem) {
		// TODO Auto-generated method stub
		global_configMapper.addGlobalConfig(gatherItem);
	}
	public void addGlobalConfigByExcel(GatherItem gatherItem) {
		// TODO Auto-generated method stub
		global_configMapper.addGlobalConfigByExcel(gatherItem);
	}
	public void deleteGlobalConfigByExcel(String gather_id) {
		// TODO Auto-generated method stub
		global_configMapper.deleteGlobalConfigByExcel(gather_id);
	}
	public void backGlobalConfigDetailByExcel() {
		// TODO Auto-generated method stub
		global_configMapper.backGlobalConfigDetailByExcel();
	}
	public void backGlobalConfigByExcel() {
		// TODO Auto-generated method stub
		global_configMapper.backGlobalConfigByExcel();
	}
	public void deleteGlobalConfigDetailByExcel(String scn_id) {
		// TODO Auto-generated method stub
		global_configMapper.deleteGlobalConfigDetailByExcel(scn_id);
	}
	public void addGlobalConfigDetailByExcel(GatherItemDetail gatherItemDetail) {
		// TODO Auto-generated method stub
		global_configMapper.addGlobalConfigDetailByExcel(gatherItemDetail);
	}

	
	public void delete(String id) {
		// TODO Auto-generated method stub
		global_configMapper.deleteGlobalConfig(id);
	}

	
	public GatherItem getGlobalConfig(String id) {
		// TODO Auto-generated method stub
		return global_configMapper.getGlobalConfig(id);
	}

	
	public void editGlobalConfig(GatherItem gatherItem) {
		// TODO Auto-generated method stub
		global_configMapper.editGlobalConfig(gatherItem);
	}
	
	
	public List<GatherItem> getGlobalconfigListForExcel() {
		// TODO Auto-generated method stub
		return global_configMapper.getGlobalconfigListForExcel();
	}
	public List<GatherItemDetail> getGlobalconfigDetailListForExcel() {
		// TODO Auto-generated method stub
		return global_configMapper.getGlobalconfigDetailListForExcel();
	}

	public List<DeviceType> getDev_list() {
		// TODO Auto-generated method stub
		return global_configMapper.getDev_list();
	}

	
	public List<Factory> getFactory_list() {
		// TODO Auto-generated method stub
		return global_configMapper.getFactory_list();
	}

    @SuppressWarnings("rawtypes")
    
    public List<Map> getConfListByType() {
        List<DeviceType> dev_list = global_configMapper.getDev_list();
        //存放设备类型 和 对应的全局oid配置
        List<Map> dev_conf_list = new ArrayList<Map>();
        
        for (DeviceType deviceType : dev_list) {
            List<GatherItem> conf_list = global_configMapper.getConfListByDevType(deviceType.getId());
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("dev_type", deviceType);
            map.put("config", conf_list);
            dev_conf_list.add(map);
        }
        return dev_conf_list;
    }

	
	public List getGlobal_configDetailList(String gather_id) {
		return global_configMapper.getGlobal_configDetailList(gather_id);
	}

	
	public void add(GatherItemDetail gatherItemDetail) {
		global_configMapper.addGlobalConfigDetail(gatherItemDetail);
	}

	
	public void editGlobalConfigDetail(GatherItemDetail gatherItemDetail) {
		global_configMapper.editGlobalConfigDetail(gatherItemDetail);
	}

	
	public GatherItemDetail getGatherItemDetail(String id) {
		return global_configMapper.getGatherItemDetail(id);
	}
	
	public void deleteGatherItemDetail(String id) {
		global_configMapper.deleteGatherItemDetail(id);
	}
	public List<TableOID> oidsetlist(){
		return global_configMapper.oidsetlist();
	}

	public List<TableOIDSub> oidSubList(int id) {
		return global_configMapper.oidSubList(id);
	}

	public void deleteOidSet(int id) {
		global_configMapper.deleteOidSet(id);
	}


	public void addOidSet(String oid) {
		global_configMapper.addOidSet(oid);
	}


	public TableOID findTableOidByID(int id) {
		return global_configMapper.findTableOidByID(id);
	}


	public void editOidSet(TableOID oid) {
		global_configMapper.editOidSet(oid);
	}


	public void addOidSub(TableOIDSub oidsub) {
		global_configMapper.addOidSub(oidsub);
	}


	public void deleteOidSub(int id) {
		global_configMapper.deleteOidSub(id);		
	}


	public TableOIDSub findTableSubOidByID(int id) {
		return global_configMapper.findTableSubOidByID(id);				
	}


	public void editOidSub(TableOIDSub sub) {
		global_configMapper.editOidSub(sub);			
	}
}
