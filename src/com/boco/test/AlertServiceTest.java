package com.boco.test;

import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.boco.domain.comm.JkptTxxtAlertDictionary;
import com.boco.service.AlertService;

public class AlertServiceTest {
	@Test
	public void getAllAlertDictionary() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		AlertService bean = ac.getBean("alertService", AlertService.class);
		
		List<JkptTxxtAlertDictionary> list = bean.getAllAlertDictionary();
		System.out.println(list);
	}
}
