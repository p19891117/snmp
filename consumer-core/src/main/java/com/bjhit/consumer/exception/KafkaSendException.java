package com.bjhit.consumer.exception;

public class KafkaSendException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public KafkaSendException() {
	}

	public KafkaSendException(String msg) {
		super(msg);
	}
}
