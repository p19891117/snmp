package com.bjhit.consumer.exception;

public class KafkaThreadCreate extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public KafkaThreadCreate() {
	}

	public KafkaThreadCreate(String msg) {
		super(msg);
	}
}
