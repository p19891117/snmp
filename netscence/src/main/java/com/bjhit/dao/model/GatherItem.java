package com.bjhit.dao.model;

public class GatherItem {
	
	
	private String gather_id; 
	private String gather_name;
	private String dev_type;
	private String dev_firm;
	private String dev_model;
	private String sys_type;
	private String note;
	private String state;
	private String complex_flag;
	private int start;
	private String oid;
	private String scence_flag;
	private String show_type;
	
    public String getScence_flag() {
		return scence_flag;
	}
	public void setScence_flag(String scence_flag) {
		this.scence_flag = scence_flag;
	}
	public String getShow_type() {
		return show_type;
	}
	public void setShow_type(String show_type) {
		this.show_type = show_type;
	}
	public String getOid() {
        return oid;
    }
    public void setOid(String oid) {
        this.oid = oid;
    }
    public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getMax() {
		return max;
	}
	public void setMax(int max) {
		this.max = max;
	}
	private int max;
	public String getGather_id() {
		return gather_id;
	}
	public void setGather_id(String gather_id) {
		this.gather_id = gather_id;
	}
	public String getGather_name() {
		return gather_name;
	}
	public void setGather_name(String gather_name) {
		this.gather_name = gather_name;
	}
	public String getDev_type() {
		return dev_type;
	}
	public void setDev_type(String dev_type) {
		this.dev_type = dev_type;
	}
	public String getDev_firm() {
		return dev_firm;
	}
	public void setDev_firm(String dev_firm) {
		this.dev_firm = dev_firm;
	}
	public String getDev_model() {
		return dev_model;
	}
	public void setDev_model(String dev_model) {
		this.dev_model = dev_model;
	}
	public String getSys_type() {
		return sys_type;
	}
	public void setSys_type(String sys_type) {
		this.sys_type = sys_type;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getComplex_flag() {
		return complex_flag;
	}
	public void setComplex_flag(String complex_flag) {
		this.complex_flag = complex_flag;
	}
	
}
