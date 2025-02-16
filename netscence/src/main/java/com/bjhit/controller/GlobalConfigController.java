package com.bjhit.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import jxl.Cell;
import jxl.LabelCell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.format.UnderlineStyle;
import jxl.write.Boolean;
import jxl.write.DateFormat;
import jxl.write.DateTime;
import jxl.write.Label;
import jxl.write.Number;
import jxl.write.NumberFormat;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.bjhit.dao.model.GatherItem;
import com.bjhit.dao.model.GatherItemDetail;
import com.bjhit.dao.model.GlobalConfig;
import com.bjhit.dao.model.TableOID;
import com.bjhit.dao.model.TableOIDSub;
import com.bjhit.service.GlobaConfigServiceImpl;
import com.bjhit.util.ExcelOperTools;
import com.bjhit.util.Pager;


@Controller
@RequestMapping("/Global_configctrl")
public class GlobalConfigController {

	@Autowired
	private GlobaConfigServiceImpl globalConfigService;
	
	@RequestMapping("/listGlobalConfig")
	public String listGlobalConfig(@ModelAttribute GatherItem gatherItem, Model model, HttpServletRequest request) {
		int start = request.getParameter("page") == null ? 1 : Integer.valueOf(request.getParameter("page"));
    	Pager pager=new Pager();
		pager.setCurrentPage(start);
		gatherItem.setStart((start-1)*pager.getPageSize());
		gatherItem.setMax(pager.getPageSize());
    	Pager p=globalConfigService.getGlobal_configList(gatherItem,pager);
    	model.addAttribute("gatherItem", gatherItem);
		model.addAttribute("globalConfiglist", p.getItems());
        model.addAttribute("pager",p.getPagerStr());
		model.addAttribute("dev_list",globalConfigService.getDev_list());
		model.addAttribute("factory_list",globalConfigService.getFactory_list());
		return "globalConfig/globalConfig_list";
	}
	
	@RequestMapping("/addGlobalConfig")
	public String  addGlobalConfig(GatherItem gatherItem ){
		
		globalConfigService.add(gatherItem);
		
		return "redirect:listGlobalConfig";
	}
	
	@RequestMapping("/deleteGlobalConfig")
	public String deleteGlobalConfig(String id){
		
		globalConfigService.delete(id);
		return "redirect:listGlobalConfig";
	}
	
	@RequestMapping("/updateGlobalConfig") 
	public void updateGloalConfig(@RequestParam("id") String id, PrintWriter printWriter){
		GatherItem gatherItem = globalConfigService.getGlobalConfig(id);
		JSONObject jo = new JSONObject(gatherItem);
		printWriter.write(jo.toString());
		printWriter.flush();
		printWriter.close();
	}
	
	@RequestMapping("/editGlobalConfig")
	public String editGlobalConfig(GatherItem gatherItem){
		globalConfigService.editGlobalConfig(gatherItem);
		return "redirect:listGlobalConfig";
	}

	@RequestMapping("/listGlobalConfigDetail")
	public String listGlobalConfigDetail(
			@RequestParam("gather_id") String gather_id,
			@RequestParam("complex_flag") String complex_flag,
			@ModelAttribute GatherItemDetail gatherItemDetail, Model model) {
		model.addAttribute("globalConfigDetaillist",
				globalConfigService.getGlobal_configDetailList(gather_id));
		model.addAttribute("dev_list", globalConfigService.getDev_list());
		model.addAttribute("factory_list",
				globalConfigService.getFactory_list());
		model.addAttribute("complex_flag",complex_flag);
		model.addAttribute("gather_id",gather_id);

		return "globalConfig/globalConfig_detaillist";
	}
	
	@RequestMapping("/addGlobalConfigDetail")
	public String  addGlobalConfigDetail(GatherItemDetail gatherItemDetail ){
		globalConfigService.add(gatherItemDetail);
		return "redirect:listGlobalConfigDetail?gather_id="+gatherItemDetail.getGather_id()+"&complex_flag="+gatherItemDetail.getComplex_flag();
	}
	@RequestMapping("/updateGlobalConfigDetail")
	public String updateGlobalConfigDetail(GatherItemDetail gatherItemDetail){
		globalConfigService.editGlobalConfigDetail(gatherItemDetail);
		return "redirect:listGlobalConfigDetail?gather_id="+gatherItemDetail.getGather_id()+"&complex_flag="+gatherItemDetail.getComplex_flag();
	}
	
	@RequestMapping("/getGatherItemDetail") 
	public void getGatherItemDetail(@RequestParam("id") String id, PrintWriter printWriter){
		GatherItemDetail gatherItemDetail = globalConfigService.getGatherItemDetail(id);
		JSONObject jo = new JSONObject(gatherItemDetail);
		printWriter.write(jo.toString());
		printWriter.flush();
		printWriter.close();
	}
	@RequestMapping("/deleteGatherItemDetail")
	public String deleteGatherItemDetail(String id, String gather_id){
		
		globalConfigService.deleteGatherItemDetail(id);
		return "redirect:listGlobalConfigDetail?gather_id="+gather_id+"&complex_flag=1";
	}
	@RequestMapping("/impGatherItemByExcel")
	public String  impGatherItemByExcel(MultipartFile conffile,MultipartFile conffile1, HttpServletRequest request){

		String imp_type = request.getParameter("imp_type");
		MultipartFile conffileTemp;
		if("1".equals(imp_type)){
			conffileTemp = conffile;
        }else{
        	conffileTemp = conffile1;
        }
		// 文件保存路径  
        String filePath = request.getSession().getServletContext().getRealPath("/") + "uploaditem/"  
                + conffileTemp.getOriginalFilename();  
        Date date = new Date();
		String dateStr = new SimpleDateFormat("yyyyMMddhhmmss").format(date);
        // 转存文件  
        File file = new File(filePath);
        if(file.exists()){
        	 File newf   =   new   File(dateStr); 
        	 file.renameTo(newf); 
        }
        try {
        	conffileTemp.transferTo(file);
        } catch (IllegalStateException | IOException e) {
            e.printStackTrace();
        }  
        if("1".equals(imp_type)){
        	globalConfigService.backGlobalConfigByExcel();//先备份到gather_item_back表
        	this.readGatherItemExcel(filePath);
        }else{
        	globalConfigService.backGlobalConfigDetailByExcel();//先备份到gather_item_detail_back表
        	this.readGatherItemDetailExcel(filePath);
        }
		
		return "redirect:listGlobalConfig";
	}
	
	public  void readGatherItemExcel(String filePath) {
		try {
			InputStream is = new FileInputStream(filePath);
			Workbook rwb = Workbook.getWorkbook(is);
			Sheet st = rwb.getSheet("FatherItem 1");
			int rs = st.getColumns();
			int rows = st.getRows();
			GatherItem gatherItem ; 
			//备份到gather_item_back
			for (int k = 0; k < rows; k++) {// 行
				gatherItem = new GatherItem();
				for (int i = 0; i < rs; i++) {// 列

					Cell c00 = st.getCell(i, k);
					String strc00 = c00.getContents();
					//LabelCell labelc00 = (LabelCell) c00;
					//strc00 = labelc00.getString();
					
					System.out.println("----->" + strc00);
					if(i == 0){
						gatherItem.setGather_id(strc00);
					}else if(i == 1){
						gatherItem.setGather_name(strc00);
					}else if(i == 2){
						gatherItem.setDev_type(strc00);
					}else if(i == 3){
						gatherItem.setDev_firm(strc00);
					}else if(i == 4){
						gatherItem.setDev_model(strc00);
					}else if(i == 5){
						gatherItem.setSys_type(strc00);
					}else if(i == 6){
						gatherItem.setNote(strc00);
					}else if(i == 7){
						gatherItem.setState(strc00);
					}else if(i == 8){
						gatherItem.setComplex_flag(strc00);
					}else if(i == 9){
						gatherItem.setScence_flag(strc00);
					}else if(i == 10){
						gatherItem.setShow_type(strc00);
					}
					
				}
				if(null != gatherItem.getGather_id()){
					globalConfigService.deleteGlobalConfigByExcel(gatherItem.getGather_id());
					globalConfigService.addGlobalConfigByExcel(gatherItem);
				}
			}
			// 关闭
			rwb.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}public  void readGatherItemDetailExcel(String filePath) {
		try {
			
			InputStream is = new FileInputStream(filePath);
			Workbook rwb = Workbook.getWorkbook(is);
			Sheet st = rwb.getSheet("ChildItem 1");
			int rs = st.getColumns();
			int rows = st.getRows();
			GatherItemDetail gatherItemDetail ; 
			//备份到gather_item_detail_back
			for (int k = 0; k < rows; k++) {// 行
				gatherItemDetail = new GatherItemDetail();
				for (int i = 0; i < rs; i++) {// 列

					Cell c00 = st.getCell(i, k);
					String strc00 = c00.getContents();
					//LabelCell labelc00 = (LabelCell) c00;
					//strc00 = labelc00.getString();
					
					System.out.println("----->" + strc00);
					if(i == 0){
						gatherItemDetail.setScn_id(strc00);
					}else if(i == 1){
						gatherItemDetail.setGather_id(strc00);
					}else if(i == 2){
						gatherItemDetail.setOid_name_cn(strc00);
					}else if(i == 3){
						gatherItemDetail.setOid_name_en(strc00);
					}else if(i == 4){
						gatherItemDetail.setOid(strc00);
					}else if(i == 5){
						gatherItemDetail.setChild_oid(strc00);
					}else if(i == 6){
						gatherItemDetail.setOid_flag(strc00);
					}else if(i == 7){
						gatherItemDetail.setGather_flag(strc00);
					}else if(i == 8){
						gatherItemDetail.setOid_value_type(strc00);
					}else if(i == 9){
						gatherItemDetail.setRead(strc00);
					}else if(i == 10){
						gatherItemDetail.setWrite(strc00);
					}else if(i == 11){
						gatherItemDetail.setState(strc00);
					}else if(i == 12){
						gatherItemDetail.setOperTime(strc00);
					}else if(i == 13){
						gatherItemDetail.setNote(strc00);
					}
					
				}
				if(null != gatherItemDetail.getScn_id()){
					globalConfigService.deleteGlobalConfigDetailByExcel(gatherItemDetail.getScn_id());
					globalConfigService.addGlobalConfigDetailByExcel(gatherItemDetail);
				}
			}
			// 关闭
			rwb.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@RequestMapping("/expByExcel")
	public void  expByExcel(HttpServletRequest request,PrintWriter printWriter){
		String exp_type = request.getParameter("exp_type");
		Date date = new Date();
		String dateStr = new SimpleDateFormat("yyyyMMddhhmmss").format(date);
		String strReturn = "";
		String spStr = File.separator;
		// 文件保存路径  
		String filePath = "";
		if("1".equals(exp_type)){
			filePath = request.getSession().getServletContext().getRealPath("/") + "uploaditem"+spStr+"FatherItem_"+dateStr+".xls"; 
		}else{
			filePath = request.getSession().getServletContext().getRealPath("/") + "uploaditem"+spStr+"ChildItem_"+dateStr+".xls"; 
		}
        File fileWrite = new File(filePath);  
        try {
			fileWrite.createNewFile();
	        OutputStream os = new FileOutputStream(fileWrite);  
	        if("1".equals(exp_type)){
		        List<GatherItem> gtList = globalConfigService.getGlobalconfigListForExcel();
		        writeGatherItemExcel(os,gtList);
		        strReturn = "uploaditem/FatherItem_"+dateStr+".xls";
	        }else{
	        	List<GatherItemDetail> gtList = globalConfigService.getGlobalconfigDetailListForExcel();
	        	writeGatherItemDetailExcel(os,gtList);
		        strReturn = "uploaditem/ChildItem_"+dateStr+".xls";
	        }
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
        printWriter.write(strReturn);
		printWriter.flush();
		printWriter.close();
		
	}
	
	 public static void writeGatherItemExcel(OutputStream os, List<GatherItem> gtList)  
	    {  
	        try  
	        {  
	            WritableWorkbook wwb = Workbook.createWorkbook(os);  
	            //创建Excel工作表 指定名称和位置  
	            WritableSheet ws = wwb.createSheet("FatherItem 1",0);  
	            Label label = null;
	            //**************往工作表中添加数据******
	            	for(int j =0; j<gtList.size();j++){
	            		GatherItem gt = gtList.get(j); 
	    	            for(int i = 0; i<11 ; i++){ 
	    	            	if(i == 0){
	    	            		label = new Label(i,j,gt.getGather_id()); 
	    					}else if(i == 1){
	    						label = new Label(i,j,gt.getGather_name());
	    					}else if(i == 2){
	    						label = new Label(i,j,gt.getDev_type());
	    					}else if(i == 3){
	    						label = new Label(i,j,gt.getDev_firm());
	    					}else if(i == 4){
	    						label = new Label(i,j,gt.getDev_model());
	    					}else if(i == 5){
	    						label = new Label(i,j,gt.getSys_type());
	    					}else if(i == 6){
	    						label = new Label(i,j,gt.getNote());
	    					}else if(i == 7){
	    						label = new Label(i,j,gt.getState());
	    					}else if(i == 8){
	    						label = new Label(i,j,gt.getComplex_flag());
	    					}else if(i == 9){
	    						label = new Label(i,j,gt.getScence_flag());
	    					}else if(i == 10){
	    						label = new Label(i,j,gt.getShow_type());
	    					}
	    	            	
	    	            	if(null != label){
	    	            		ws.addCell(label);  
	    	            	}
	            	} 
	            }
	            //写入工作表  
	            wwb.write();  
	            wwb.close();  
	        }  
	        catch(Exception e)  
	        {  
	            e.printStackTrace();  
	        }  
	    }  

	 public static void writeGatherItemDetailExcel(OutputStream os, List<GatherItemDetail> gtList)  
	    {  
	        try  
	        {  
	            WritableWorkbook wwb = Workbook.createWorkbook(os);  
	            //创建Excel工作表 指定名称和位置  
	            WritableSheet ws = wwb.createSheet("ChildItem 1",0);  
	            Label label = null;
	            //**************往工作表中添加数据******
	            	for(int j =0; j<gtList.size();j++){
	            		GatherItemDetail gt = gtList.get(j); 
	    	            for(int i = 0; i<14 ; i++){ 
	    	            	if(i == 0){
	    	            		label = new Label(i,j,gt.getScn_id()); 
	    					}else if(i == 1){
	    						label = new Label(i,j,gt.getGather_id());
	    					}else if(i == 2){
	    						label = new Label(i,j,gt.getOid_name_cn());
	    					}else if(i == 3){
	    						label = new Label(i,j,gt.getOid_name_en());
	    					}else if(i == 4){
	    						label = new Label(i,j,gt.getOid());
	    					}else if(i == 5){
	    						label = new Label(i,j,gt.getChild_oid());
	    					}else if(i == 6){
	    						label = new Label(i,j,gt.getOid_flag());
	    					}else if(i == 7){
	    						label = new Label(i,j,gt.getGather_flag());
	    					}else if(i == 8){
	    						label = new Label(i,j,gt.getOid_value_type());
	    					}else if(i == 9){
	    						label = new Label(i,j,gt.getRead());
	    					}else if(i == 10){
	    						label = new Label(i,j,gt.getWrite());
	    					}else if(i == 11){
	    						label = new Label(i,j,gt.getState());
	    					}
	    					else if(i == 12){
	    						label = new Label(i,j,gt.getOperTime());
	    					}
	    					else if(i == 13){
	    						label = new Label(i,j,gt.getNote());
	    					}
	    	            	
	    	            	
	    	            	if(null != label){
	    	            		ws.addCell(label);  
	    	            	}
	            	} 
	            }
	            //写入工作表  
	            wwb.write();  
	            wwb.close();  
	        }  
	        catch(Exception e)  
	        {  
	            e.printStackTrace();  
	        }  
	    }  
	  
	 @RequestMapping("/oidsetlist")
		public String oidsetlist(Model model){
			model.addAttribute("oidsetlist",globalConfigService.oidsetlist());
			return "globalConfig/oidSet";
		}
		@RequestMapping("/oidSubList")
		public String oidSubList(@RequestParam("id") int id,Model model){
			model.addAttribute("table_oid_id",id);
			model.addAttribute("oidSubList",globalConfigService.oidSubList(id));
			return "globalConfig/oidSubList";
		}
		@RequestMapping("/deleteOidSet")
		public String deleteOidSet(@RequestParam("id") int id){
			globalConfigService.deleteOidSet(id);
			return "redirect:oidsetlist";
		}
		@RequestMapping("/addOidSet")
		public String addOidSet(){
			return "globalConfig/addOidSet";
		}
		@RequestMapping("/addOidSetResult")
		public String addOidSetResult(@RequestParam("oid") String oid){
			globalConfigService.addOidSet(oid);
			return "redirect:oidsetlist";
		}
		
		@RequestMapping("/editOidSet")
		public String editOidSet(@RequestParam("id") int id,Model model){
			model.addAttribute("oidset",globalConfigService.findTableOidByID(id));
			return "globalConfig/editOidSet";
		}
		@RequestMapping("/editOidSetResult")
		public String editOidSetResult(TableOID oid){
			globalConfigService.editOidSet(oid);
			return "redirect:oidsetlist";
		}
		@RequestMapping("/addOidSub")
		public String addOidSub(@RequestParam("table_oid_id") int table_oid_id,Model model){
			model.addAttribute("table_oid_id",table_oid_id);
			return "globalConfig/addOidSub";
		}
		@RequestMapping("/addOidSubResult")
		public String addOidSubResult(TableOIDSub oidsub){
			globalConfigService.addOidSub(oidsub);
			return "redirect:oidSubList?id="+oidsub.getTable_oid_id();
		}
		@RequestMapping("/deleteOidSub")
		public String deleteOidSub(@RequestParam("id") int id,@RequestParam("table_oid_id") int table_oid_id){
			globalConfigService.deleteOidSub(id);
			return "redirect:oidSubList?id="+table_oid_id;
		}
		@RequestMapping("/editOidSub")
		public String editOidSub(@RequestParam("id") int id,Model model){
			model.addAttribute("oidsub",globalConfigService.findTableSubOidByID(id));
			return "globalConfig/editOidSub";
		}
		@RequestMapping("/editOidSubResult")
		public String editOidSubResult(TableOIDSub sub){
			globalConfigService.editOidSub(sub);
			return "redirect:oidSubList?id="+sub.getTable_oid_id();
		}
}
