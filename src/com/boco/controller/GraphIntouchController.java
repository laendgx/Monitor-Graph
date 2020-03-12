package com.boco.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.boco.domain.JkptTxxtDevice;
import com.boco.domain.comm.CommResult;
import com.boco.service.CmsService;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
@RequestMapping("/GraphIntouch")
public class GraphIntouchController {
	@Resource(name="cmsService")
	private CmsService cmsService;
	
	@RequestMapping(value="/updateDeviceIntouchInfo",method=RequestMethod.POST)
	public @ResponseBody CommResult updateDeviceIntouchInfo(@RequestBody String myDomain){
		CommResult result = new CommResult();		
		try{
			ObjectMapper objectMapper = new ObjectMapper();  
			JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, JkptTxxtDevice.class);  
			List<JkptTxxtDevice> list = objectMapper.readValue(myDomain, javaType);
			cmsService.updateDeviceIntouchInfos(list);
			result.setResultCode("100");
		}catch(Exception ex){
			ex.printStackTrace();
			result.setResultCode("101");
		}
		return result;
	}
}
