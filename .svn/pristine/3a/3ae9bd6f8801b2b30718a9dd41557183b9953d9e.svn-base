package com.boco.test;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.boco.domain.DeviceVarValueInfo;
import com.boco.domain.JkptTxxtDevice;
import com.boco.domain.JkptTxxtDeviceCms;
import com.boco.domain.JkptTxxtFixedCommand;
import com.boco.domain.cms.IssueLogQueryConBean;
import com.boco.domain.cms.JkptTxxtFixedGraph;
import com.boco.domain.cms.JkptTxxtIssueLog;
import com.boco.service.CmsService;

public class CmsServiceTest {
	@Test
	public void getCmsBasicInfos() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CmsService service = ac.getBean(CmsService.class, "cmsService");
		List<JkptTxxtDeviceCms> list = service.getCmsBasicInfos(20300);
		
		System.out.println(list.size());
	}
	
	@Test
	public void getCmsDeviceVarValueInfos() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CmsService service = ac.getBean(CmsService.class,"cmsService");
		List<DeviceVarValueInfo> list = service.getCmsDeviceVarValueInfos();
		System.out.println(list.size());
	}
	
	@Test
	public void insertCmsFixedCommand() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CmsService service = ac.getBean(CmsService.class,"cmsService");
		
		JkptTxxtFixedCommand command = new JkptTxxtFixedCommand();
		String msgcontent = "{\"displayWidth\":320,\"displayHeight\":32,\"dispScrType\":1,\"timeDelay\":12,\"transition\":3,\"param\":23,\"wordList\":[{\"wordXXX\":16,\"wordYYY\":0,\"fontColor\":\"FFFF00\",\"fontBackColor\":\"00FF00\",\"fontShadowColor\":\"000000\",\"wordSpace\":0,\"fontSize_HH\":32,\"fontSize_WW\":32,\"wordContent\":\"千忙万忙出事故最忙\"}]}";
		
		command.setCommand(msgcontent);
		command.setCommandName("千忙万忙出事故最忙");
		command.setCommandType(2221);
		command.setFixValue(0);
		command.setGroupId("1");
		command.setGuid(java.util.UUID.randomUUID().toString());
		List<JkptTxxtFixedCommand> list = new ArrayList<JkptTxxtFixedCommand>();
		list.add(command);
		service.insertCmsFixedCommands(list);
	}
	
	@Test
	public void getCmsFixedCommands() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CmsService service = ac.getBean(CmsService.class,"cmsService");
		
		List<JkptTxxtFixedCommand> list = service.getCmsFixedCommands(0, "3","9");
		System.out.println(list);
	}
	
	@Test
	public void updateDeviceIntouchInfo() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CmsService service = ac.getBean(CmsService.class, "cmsService");
		JkptTxxtDevice device = new JkptTxxtDevice();
		device.setOrgId(20300);
		device.setDeviceId(22210001);
		device.setSymbolStyle("BMP_CMS_H_B_1");
		device.setScreenX(102);
		device.setScreenY(403);
		
		List<JkptTxxtDevice> list = new ArrayList<JkptTxxtDevice>();
		list.add(device);
		service.updateDeviceIntouchInfos(list);
	}
	
	@Test
	public void getTxxtIssueLogs() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CmsService service = ac.getBean(CmsService.class, "cmsService");
		
		IssueLogQueryConBean bean = new IssueLogQueryConBean();
		bean.setOrgid(20300);
		bean.setDevicetypeid(2124);
		bean.setKeywords("文明");
		
		List<JkptTxxtIssueLog> list = service.getTxxtIssueLogs(bean);
		if (list != null){
			for(JkptTxxtIssueLog log : list){
				System.out.println(log.getIssueWordContent());
			}
		}
	}
	
	@Test
	public void test6(){
		Integer ij =212401;
		Integer xy = ij / 100;
		System.out.println(xy);
	}
	
	@Test
	public void getTxxtFixedGraphs() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CmsService service = ac.getBean(CmsService.class, "cmsService");
		
//		List<JkptTxxtFixedGraph> list = service.getTxxtFixedGraphs();
//		System.out.println(list.size());
	}
	
	@Test
	public void getFixecGraphNameByIsn() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CmsService service = ac.getBean(CmsService.class, "cmsService");
		
		String graphNameByIsn = service.getFixecGraphNameByIsn("A01");
		System.out.println(graphNameByIsn);
		
		graphNameByIsn = service.getFixecGraphNameByIsn("A02");
		System.out.println(graphNameByIsn);
		
		graphNameByIsn = service.getFixecGraphNameByIsn("A05");
		System.out.println(graphNameByIsn);
	}

	@Test
	public void test7(){
		String guid = java.util.UUID.randomUUID().toString();
		System.out.println(guid);
		System.out.println(guid.length());
	}
	
	@Test
	public void test8(){
		String str = "A01.PNG";
		String[] arr = str.split("\\.");
		System.out.println(arr.length);
		
		str = "A01PNG";
		arr = str.split("\\.");
		System.out.println(arr.length);
	}
	
	@Test
	public void updateFixedCommand() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CmsService service = ac.getBean(CmsService.class,"cmsService");
		
		JkptTxxtFixedCommand command = new JkptTxxtFixedCommand();
		String msgcontent = "{\"displayWidth\":320,\"displayHeight\":32,\"dispScrType\":1,\"timeDelay\":12,\"transition\":3,\"param\":23,\"wordList\":[{\"wordXXX\":16,\"wordYYY\":0,\"fontColor\":\"FFFF00\",\"fontBackColor\":\"00FF00\",\"fontShadowColor\":\"000000\",\"wordSpace\":0,\"fontSize_HH\":32,\"fontSize_WW\":32,\"wordContent\":\"千忙万忙出事故最忙\"}]}";
		command.setCommandId(42);
		command.setCommand(msgcontent);
		command.setCommandName("千忙万忙出事故最忙42");
		command.setCommandType(2221);
		command.setFixValue(0);
		command.setGroupId("1");
		command.setGuid(java.util.UUID.randomUUID().toString());
		
		JkptTxxtFixedCommand command1 = new JkptTxxtFixedCommand();
		command1.setCommandId(43);
		command1.setCommand(msgcontent);
		command1.setCommandName("千忙万忙出事故最忙43");
		command1.setGuid(java.util.UUID.randomUUID().toString());
		
		List<JkptTxxtFixedCommand> list = new ArrayList<JkptTxxtFixedCommand>();
		list.add(command);
		list.add(command1);
		service.updateCmsFixedCommands(list);
	}
	
	@Test
	public void deleteCmsFixedCommands() throws Exception{
		String cfg = "classpath*:spring/ApplicationContext.xml";
		ApplicationContext ac = new ClassPathXmlApplicationContext(cfg);
		CmsService service = ac.getBean(CmsService.class,"cmsService");
		
		List<Integer> list = new ArrayList<Integer>();
		list.add(42);
		list.add(43);
		service.deleteCmsFixedCommands(list);
	}
}
