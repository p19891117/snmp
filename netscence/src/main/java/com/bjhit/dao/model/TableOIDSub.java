package com.bjhit.dao.model;

public class TableOIDSub {
	private int id;
	private int table_oid_id;
	private String sub_oid;
	private String oid_value_type;
	private String read;
	private String write;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getTable_oid_id() {
		return table_oid_id;
	}
	public void setTable_oid_id(int table_oid_id) {
		this.table_oid_id = table_oid_id;
	}
	public String getSub_oid() {
		return sub_oid;
	}
	public void setSub_oid(String sub_oid) {
		this.sub_oid = sub_oid;
	}
	public String getOid_value_type() {
		return oid_value_type;
	}
	public void setOid_value_type(String oid_value_type) {
		this.oid_value_type = oid_value_type;
	}
	public String getRead() {
		return read;
	}
	public void setRead(String read) {
		this.read = read;
	}
	public String getWrite() {
		return write;
	}
	public void setWrite(String write) {
		this.write = write;
	}
}
