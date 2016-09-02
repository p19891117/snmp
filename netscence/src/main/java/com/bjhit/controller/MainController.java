package com.bjhit.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("/")
public class MainController {
	
	/**
	 * 跳转到首页
	 * @return
	 */
	@RequestMapping("/")
	public String toMain(){
		return "main/main";
	}
}
