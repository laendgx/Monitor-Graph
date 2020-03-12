package com.boco.test;

import java.io.File;
import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.boco.domain.JkptBaseOrgRoad;
import com.boco.domain.JkptBaseRoad;
import com.boco.domain.JkptCommParamDic;
import com.boco.service.CommonService;
import com.boco.utils.ConfigReaderUtils;

public class CommonServiceTest {
	@Test
	public void getRoadInfoByOrgid() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CommonService service = ac.getBean(CommonService.class, "commonService");
		List<JkptBaseOrgRoad> list = service.getRoadInfoByOrgid(20300, 0);
		System.out.println(list.size());
	}
	
	@Test
	public void getRouteLinesInfoByOrgid() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CommonService service = ac.getBean(CommonService.class,"commonService");
		List<JkptBaseRoad> list = service.getRouteLinesInfoByOrgid(20300, 0);
		System.out.println(list.size());
	}
	
	@Test
	public void getDicByGroupType() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CommonService service = ac.getBean(CommonService.class,"commonService");
		List<JkptCommParamDic> list = service.getDicByGroupType("CmsType", 0);
		
		System.out.println(list.size());
	}
	
	@Test
	public void test3(){
		System.out.println(ConfigReaderUtils.getCollSocketIoAddr());
	}
	
	@Test
	public void test4(){
		System.out.println(ConfigReaderUtils.getCmsIconRelativeAddr());
	}
	
	@Test
	public void test5(){
		System.out.println(File.separator);
	}
}
