package com.bjhit.provider.exception;

public class ReadConfigFileException extends Exception {
	private static final long serialVersionUID = 1L;
	public ReadConfigFileException(){}
	public ReadConfigFileException(String msg){
		super(msg);
	}
}