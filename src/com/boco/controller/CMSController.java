package com.boco.controller;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.boco.domain.DeviceVarValueInfo;
import com.boco.domain.JkptBaseOrgRoad;
import com.boco.domain.JkptBaseRoad;
import com.boco.domain.JkptBaseUser;
import com.boco.domain.JkptCommParamDic;
import com.boco.domain.JkptTxxtDevice;
import com.boco.domain.JkptTxxtDeviceCms;
import com.boco.domain.JkptTxxtFixedCommand;
import com.boco.domain.cms.IssueLogQueryConBean;
import com.boco.domain.cms.JkptTxxtIssueLog;
import com.boco.domain.comm.CommResult;
import com.boco.domain.forebean.CmsIconsBean;
import com.boco.domain.forebean.SearchConditionBean;
import com.boco.domain.login.CenterQuestParam;
import com.boco.service.CmsService;
import com.boco.service.CommonService;
import com.boco.utils.ConfigReaderUtils;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;


@Controller
@RequestMapping("/cms")
public class CMSController {
	@Resource(name="commonService")
	private CommonService commonService;
	
	@Resource(name="cmsService")
	private CmsService cmsService;
	
	/**
	 * 采集端socketio服务端地址
	 */
	private String collSocketIoAddr = ConfigReaderUtils.getCollSocketIoAddr();
	/**
	 * js版本号
	 */
	private String jsVersion = ConfigReaderUtils.getJsVersion();
	
	@RequestMapping("/edit")
	public String edit(ModelMap model){
		model.addAttribute("collSocketIoAddr", collSocketIoAddr);		
		model.addAttribute("jsVersion", jsVersion);
		return "Cms/CmsEdit";
	}
	
	@RequestMapping("/browse")
	public String browse(ModelMap model){
		model.addAttribute("collSocketIoAddr", collSocketIoAddr);
		model.addAttribute("jsVersion", jsVersion);
		return "Cms/CmsBrowse";
	}
	
	@RequestMapping("/socket")
	public String socket(CenterQuestParam param,ModelMap model, HttpSession session){
		// 加入登录后，机构编号从session中的用户信息中获取
		String userId = "";
		if (param == null || param.getUserId() == null){
			try{
				JkptBaseUser user = (JkptBaseUser) session.getAttribute("admin");
				userId = user.getUserId();
			} catch(Exception e){
				e.printStackTrace();
			}
		} else {
			userId = param.getUserId();
		}
		model.addAttribute("collSocketIoAddr", collSocketIoAddr);
		model.addAttribute("jsVersion", jsVersion);
		model.addAttribute("userId", userId);
		
		return "Websocket";
	}
	
	@RequestMapping("/configuration")
	public String Configuration(CenterQuestParam param,ModelMap model, HttpSession session){
		String userId = "";
		if (param == null || param.getUserId() == null){
			try{
				JkptBaseUser user = (JkptBaseUser) session.getAttribute("admin");
				userId = user.getUserId();
			} catch(Exception e){
				e.printStackTrace();
			}
		} else {
			userId = param.getUserId();
		}
		model.addAttribute("userId", userId);
		model.addAttribute("collSocketIoAddr", collSocketIoAddr);
		model.addAttribute("jsVersion", jsVersion);
		return "Configuration/configuration";
	}
	
	@RequestMapping("/polling")
	public String Polling(CenterQuestParam param,HttpServletRequest request, ModelMap model, HttpSession session) throws Exception{	
		String userId = "";
		if (param == null || param.getUserId() == null){
			try{
				JkptBaseUser user = (JkptBaseUser) session.getAttribute("admin");
				userId = user.getUserId();
			} catch(Exception e){
				e.printStackTrace();
			}
		} else {
			userId = param.getUserId();
		}
		
		model.addAttribute("userId", userId);
		model.addAttribute("collSocketIoAddr", collSocketIoAddr);
		model.addAttribute("jsVersion", jsVersion);
		return "Polling/polling";
	}
	
	@RequestMapping("/stations")
	public String Stations(CenterQuestParam param,HttpServletRequest request, ModelMap model, HttpSession session) throws Exception{	
		String userId = "";
		if (param == null || param.getUserId() == null){
			try{
				JkptBaseUser user = (JkptBaseUser) session.getAttribute("admin");
				userId = user.getUserId();
			} catch(Exception e){
				e.printStackTrace();
			}
		} else {
			userId = param.getUserId();
		}
		
		model.addAttribute("userId", userId);
		model.addAttribute("collSocketIoAddr", collSocketIoAddr);
		model.addAttribute("jsVersion", jsVersion);
		return "Stations/stations";
	}
	
	@RequestMapping("/weather")
	public String Weather(CenterQuestParam param,HttpServletRequest request, ModelMap model, HttpSession session) throws Exception{	
		String userId = "";
		if (param == null || param.getUserId() == null){
			try{
				JkptBaseUser user = (JkptBaseUser) session.getAttribute("admin");
				userId = user.getUserId();
			} catch(Exception e){
				e.printStackTrace();
			}
		} else {
			userId = param.getUserId();
		}
		
		model.addAttribute("userId", userId);
		model.addAttribute("collSocketIoAddr", collSocketIoAddr);
		model.addAttribute("jsVersion", jsVersion);
		return "Weather/weather";
	}
	
	@RequestMapping("/issue")
	public String Issue(HttpServletRequest request, ModelMap model) throws Exception{	
		model.addAttribute("collSocketIoAddr", collSocketIoAddr);
		model.addAttribute("jsVersion", jsVersion);
		return "Issue/issue";
	}
	
	/**
	 * 获取过滤条件信息
	 * @return
	 */
	@RequestMapping(value="/getSearchCondition",method=RequestMethod.POST)
	public @ResponseBody SearchConditionBean getSearchCondition(
			HttpSession session) {
		SearchConditionBean bean = new SearchConditionBean();
		
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date1 = new Date();
		// 加入登录后，机构编号从session中的用户信息中获取
		//JkptBaseUser user = (JkptBaseUser) session.getAttribute("admin");		
		int orgid = cmsService.getCurrOrgid();	
		try {
			// 路线信息
			List<JkptBaseRoad> routeLinesList = commonService
					.getRouteLinesInfoByOrgid(orgid, 0);
			bean.setRouteLinesList(routeLinesList);
			// 路段信息
			List<JkptBaseOrgRoad> roadInfoList = commonService
					.getRoadInfoByOrgid(orgid, 0);
			bean.setRoadInfoList(roadInfoList);
			// 位置
			List<JkptCommParamDic> devicePositionList = commonService
					.getDicByGroupType("DevicePosition", 0);
			bean.setDevicePositionList(devicePositionList);
			// 方向
			List<JkptCommParamDic> deviceDirectList = commonService
					.getDicByGroupType("DeviceDirect", 0);
			bean.setDeviceDirectList(deviceDirectList);
			// 情报板类型
			List<JkptCommParamDic> cmsTypeList = commonService
					.getDicByGroupType("CmsType", 0);
			bean.setCmsTypeList(cmsTypeList);
			// 情报板尺寸
			List<JkptCommParamDic> cmsSizeList = commonService
					.getDicByGroupType("CmsSize", 0);
			bean.setCmsSizeList(cmsSizeList);
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		Date date2 = new Date();
		long count = date2.getTime() - date1.getTime();
		System.out.println("--------------------------getSearchCondition-------" + count);
		return bean;
	}
	
	//获取情报板基础信息
	@RequestMapping(value="getCmsBasicInfos", method=RequestMethod.POST)
	public @ResponseBody List<JkptTxxtDeviceCms> getCmsBasicInfos(HttpSession session){
		//JkptBaseUser user = (JkptBaseUser) session.getAttribute("admin");		
		Integer orgid = cmsService.getCurrOrgid();
		
		List<JkptTxxtDeviceCms> list = null;
		try {
			list = cmsService.getCmsBasicInfos(orgid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	//获取情报板的设备变量信息
	@RequestMapping(value="/getCmsDeviceVarValueInfos",method=RequestMethod.POST)
	public @ResponseBody List<DeviceVarValueInfo> getCmsDeviceVarValueInfos(){
		List<DeviceVarValueInfo> list = null;
		try{
			list = cmsService.getCmsDeviceVarValueInfos();
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 查询播放表
	 * 输入参数：情报板类型；播放表类型
	 * @param map
	 * @return
	 */
	@RequestMapping(value="/getCmsFixedCommands", method=RequestMethod.POST)
	public @ResponseBody List<JkptTxxtFixedCommand> getCmsFixedCommands(@RequestBody Map map){
		try{
			Integer index = (Integer) map.get("index");
			String groupId = (String) map.get("groupId");
			String keywords = (String)map.get("keywords");
			List<JkptTxxtFixedCommand> list = cmsService.getCmsFixedCommands(index, groupId,keywords);
			return list;
		}catch(Exception ex){
			ex.printStackTrace();
			return null;
		}
	}
	
	/**
	 * 将播放表插入到数据库
	 * @param command
	 * @return
	 */
	@RequestMapping(value="/insertCmsFixedCommand",method=RequestMethod.POST)
	public @ResponseBody CommResult insertCmsFixedCommand(@RequestBody String myDomain){
		CommResult result = new CommResult();
		try{
			ObjectMapper objectMapper = new ObjectMapper();  
			JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, JkptTxxtFixedCommand.class);  
			List<JkptTxxtFixedCommand> list = objectMapper.readValue(myDomain, javaType);
			cmsService.insertCmsFixedCommands(list);
			result.setResultCode("100");
		}catch(Exception ex){
			ex.printStackTrace();
			result.setResultCode("101");
		}
		
		return result;
	}
	
	/**
	 * 批量删除固定播放表
	 * @param myDomain
	 * @return
	 */
	@RequestMapping(value="/deleteCmsFixedCommands",method=RequestMethod.POST)
	public @ResponseBody CommResult deleteCmsFixedCommands(@RequestBody String myDomain){
		CommResult result = new CommResult();
		try{
			ObjectMapper objectMapper = new ObjectMapper();
			JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, Integer.class);
			List<Integer> list = objectMapper.readValue(myDomain, javaType);
			cmsService.deleteCmsFixedCommands(list);
			result.setResultCode("100");
		}catch(Exception e){
			e.printStackTrace();
			result.setResultCode("101");
		}
		return result;
	}
	
	/**
	 * 批量更新固定播放表
	 * @param myDomain
	 * @return
	 */
	@RequestMapping(value="/updateCmsFixedCommands",method=RequestMethod.POST)
	public @ResponseBody CommResult updateCmsFixedCommands(@RequestBody String myDomain){
		CommResult result = new CommResult();
		try{
			ObjectMapper objectMapper = new ObjectMapper();
			JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, JkptTxxtFixedCommand.class);
			List<JkptTxxtFixedCommand> list = objectMapper.readValue(myDomain, javaType);
			cmsService.updateCmsFixedCommands(list);
			result.setResultCode("100");
		}catch(Exception e){
			e.printStackTrace();
			result.setResultCode("101");
		}
		return result;
	}
	
	/**
	 * 按照关键字查询发布日志
	 * @param bean
	 * @return
	 */
	@RequestMapping("/getIssueLogs")
	public @ResponseBody List<JkptTxxtIssueLog> getIssueLogs(@RequestBody IssueLogQueryConBean bean){
		List<JkptTxxtIssueLog> list = null;
		try {
			list = cmsService.getTxxtIssueLogs(bean);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	/**
	 * 获取情报板的所有图标
	 * @return
	 */
	@RequestMapping(value="/getCmsIcons", method=RequestMethod.POST)
	public @ResponseBody CmsIconsBean getCmsIcons(HttpServletRequest request){
		CmsIconsBean bean = cmsService.getCmsIcons(request);
		return bean;
	}
	
	/* ↓↓↓↓ angular用模板 ↓↓↓↓ */
	@RequestMapping("/tbrowse")
	public String Tbrowse(ModelMap model){
		return "Cms/template/browse";
	}

	@RequestMapping("/tedit")
	public String Tedit(ModelMap model){
		return "Cms/template/addEdit";
	}

	@RequestMapping("/cmsTpl")
	public String CmsTpl(ModelMap model){
		return "Cms/template/cmsTpl";
	}

	@RequestMapping("/cmsEdit")
	public String CmsEdit(ModelMap model){
		return "Cms/template/cmsEdit";
	}

	@RequestMapping("/pollingFrame")
	public String PollingFrame(ModelMap model){
		return "Polling/template/pollingFrame";
	}

	@RequestMapping("/pollingAside")
	public String PollingAside(ModelMap model){
		return "Polling/template/pollingAside";
	}

	@RequestMapping("/polArea")
	public String PolArea(ModelMap model){
		return "Polling/template/polArea";
	}

	@RequestMapping("/eagle")
	public String Eagle(ModelMap model){
		return "Configuration/template/eagle";
	}

	@RequestMapping("/cmsCompile")
	public String CmsCompile(ModelMap model){
		return "Configuration/template/cmsCompile";
	}

	@RequestMapping("/cmsList")
	public String CmsList(ModelMap model){
		return "Configuration/template/cmsList";
	}

	@RequestMapping("/cfgCmsTpl")
	public String CfgCmsTpl(ModelMap model){
		return "Configuration/template/cmsTpl";
	}

	@RequestMapping("/multiTextarea")
	public String MultiTextarea(ModelMap model){
		return "Configuration/template/multiTextarea";
	}

	@RequestMapping("/cfgCmsEdit")
	public String CfgCmsEdit(ModelMap model){
		return "Configuration/template/cmsEdit";
	}

	@RequestMapping("/cmsEditTpl")
	public String CmsEditTpl(ModelMap model){
		return "Configuration/template/cmsEditTpl";
	}

	@RequestMapping("/cmsModel")
	public String CmsModel(ModelMap model){
		return "Configuration/template/cmsModel";
	}

	@RequestMapping("/poCompile")
	public String PoCompile(ModelMap model){
		return "Polling/template/cmsCompile";
	}

	@RequestMapping("/poEdit")
	public String PoEdit(ModelMap model){
		return "Polling/template/cmsEdit";
	}

	@RequestMapping("/poEditTpl")
	public String poEditTpl(ModelMap model){
		return "Polling/template/cmsEditTpl";
	}

	@RequestMapping("/poTpl")
	public String poTpl(ModelMap model){
		return "Polling/template/cmsTpl";
	}

	@RequestMapping("/poList")
	public String PoList(ModelMap model){
		return "Polling/template/cmsList";
	}

	@RequestMapping("/poModel")
	public String PoModel(ModelMap model){
		return "Polling/template/cmsModel";
	}

	@RequestMapping("/poManage")
	public String PoManage(ModelMap model){
		return "Polling/template/modelManage";
	}

	@RequestMapping("/poLastSend")
	public String PoLastSend(ModelMap model){
		return "Polling/template/lastSend";
	}

	@RequestMapping("/poModelEdit")
	public String PoModelEdit(ModelMap model){
		return "Polling/template/cmsEdit";
	}

	@RequestMapping("/poDetails")
	public String PoDetails(ModelMap model){
		return "Polling/template/cmsDetails";
	}
	
	
}
