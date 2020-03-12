package com.boco.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.boco.dao.DaoSupport;
import com.boco.domain.DeviceVarValueInfo;
import com.boco.domain.JkptTxxtDevice;
import com.boco.domain.JkptTxxtDeviceCms;
import com.boco.domain.JkptTxxtFixedCommand;
import com.boco.domain.cms.IssueLogQueryConBean;
import com.boco.domain.cms.JkptTxxtFixedGraph;
import com.boco.domain.cms.JkptTxxtIssueLog;
import com.boco.domain.forebean.CmsIconInfo;
import com.boco.domain.forebean.CmsIconsBean;
import com.boco.utils.ConfigReaderUtils;
import com.boco.utils.FileOperatorUtils;
import com.boco.utils.FixedGraphSingleTon;
/**
 * 可变情报板服务类
 * @author 孙冠义
 *
 */
@Service("cmsService")
public class CmsService {
	@Resource(name="daoSupport")
	private DaoSupport dao;
	
	@Resource(name="commonService")
	private CommonService commonService;
	
	/**
	 * 当前机构
	 */
	private volatile Integer currOrgid = null;
	/**
	 * 插入固定播放表命令
	 * @param command
	 * @throws Exception
	 */
	private void insertCmsFixedCommand(JkptTxxtFixedCommand command) throws Exception{
		dao.save("CmsMapper.insertCmsFixedCommand", command);
	}
	
	/**
	 * 批量插入固定播放表命令
	 * @param list
	 * @throws Exception
	 */
	public void insertCmsFixedCommands(List<JkptTxxtFixedCommand> list) throws Exception{
		if (list != null && list.size() > 0){
			for(JkptTxxtFixedCommand command : list){
				this.insertCmsFixedCommand(command);
			}
		}
	}
	
	/**
	 * 查询情报板固定播放表
	 * @param commandType
	 * @param groupId
	 * @throws Exception 
	 */
	public List<JkptTxxtFixedCommand> getCmsFixedCommands(Integer index, String groupId, String keywords) throws Exception{
		if (index == null){
			index = 0;
		}
		Integer begin = index * 30;
		Integer end = (index + 1) * 30;
		
		Map map = new HashMap();
		map.put("begin", begin);
		map.put("end", end);
		map.put("groupId", groupId);
		map.put("keywords", keywords);
		
		List<JkptTxxtFixedCommand> list = (List<JkptTxxtFixedCommand>) dao.findForList("CmsMapper.getCmsFixedCommands", map);
		return list;
	}
	
	/**
	 * 获取指定机构的可变情报板详细信息
	 * @param orgid
	 * @return
	 * @throws Exception 
	 */
	public List<JkptTxxtDeviceCms> getCmsBasicInfos(Integer orgid) throws Exception{
		Map<String,Integer> map = new HashMap<String,Integer>();
		map.put("orgid", orgid);
		
		List<JkptTxxtDeviceCms> list = (List<JkptTxxtDeviceCms>) dao.findForList("CmsMapper.getCmsBasicInfos", map);
		return list;
	}
	
	/**
	 * 获取情报板的设备变量信息
	 * @return
	 * @throws Exception
	 */
	public List<DeviceVarValueInfo> getCmsDeviceVarValueInfos() throws Exception{
		List<DeviceVarValueInfo> list = (List<DeviceVarValueInfo>) dao.findForList("CmsMapper.getCmsDeviceVarValueInfos", null);
		return list;
	}
	
	/**
	 * 获取情报板的所有显示图标的名字
	 * @param request
	 * @return
	 */
	public CmsIconsBean getCmsIcons(HttpServletRequest request){
		String path = "/" + ConfigReaderUtils.getCmsIconRelativeAddr();
		//System.out.println("path=" + path);
		String realPath = request.getSession().getServletContext().getRealPath(path);
		//System.out.println("realPath=" + realPath);
		
		List<String> list = FileOperatorUtils.getFile(realPath);
		
		//图标信息实体列表
		List<CmsIconInfo> iconInfoList = new ArrayList<CmsIconInfo>();
		for(String str : list){			
			
			String desc = this.getFixecGraphNameByIsn(str.split("\\.")[0]);
			CmsIconInfo iconInfo = new CmsIconInfo();
			iconInfo.setIconFileDesc(desc);
			iconInfo.setIconFileName(str);
			iconInfoList.add(iconInfo);
		}
				
		CmsIconsBean bean = new CmsIconsBean();
		bean.setAbsoluteAddr(path);
		bean.setIconNameList(list);
		bean.setIconInfoList(iconInfoList);
		return bean;
	}
	
	/**
	 * 更新设备组态信息
	 * @param device
	 * @throws Exception 
	 */
	private void updateDeviceIntouchInfo(JkptTxxtDevice device) throws Exception{
		dao.update("CommMapper.updateDeviceIntouchInfo", device);
	}
	
	/**
	 * 批量更新设备组态信息
	 * @param list
	 * @throws Exception
	 */
	public void updateDeviceIntouchInfos(List<JkptTxxtDevice> list) throws Exception{
		for(JkptTxxtDevice device : list){
			this.updateDeviceIntouchInfo(device);
		}
	}
	
	/**
	 * 根据关键字查询情报板发布记录
	 * @param orgid
	 * @param devicetypeid
	 * @param keywords
	 * @return
	 * @throws Exception
	 */
	public List<JkptTxxtIssueLog> getTxxtIssueLogs(IssueLogQueryConBean bean) throws Exception{				
		List<JkptTxxtIssueLog> list = (List<JkptTxxtIssueLog>) dao.findForList("CmsMapper.getTxxtIssueLogs", bean);
		return list;
	}
	
	/**
	 * 获取情报板固定图标
	 * @return
	 * @throws Exception
	 */
	private List<JkptTxxtFixedGraph> getTxxtFixedGraphs() throws Exception{
		List<JkptTxxtFixedGraph> list = (List<JkptTxxtFixedGraph>) dao.findForList("CmsMapper.getTxxtFixedGraphs", null);
		return list;
	}
	
	/**
	 * 通过图标的编号获取图标名称
	 * @param isn
	 * @return
	 * @throws Exception 
	 */
	public String getFixecGraphNameByIsn(String isn){
		Map<String, JkptTxxtFixedGraph> graphMap = FixedGraphSingleTon.getInstance().getGraphMap();
		if (graphMap == null || graphMap.size() == 0){
			List<JkptTxxtFixedGraph> list = null;
			try{
				list = this.getTxxtFixedGraphs();
			}catch(Exception e){
				
			}
			
			Map<String, JkptTxxtFixedGraph> map = new HashMap<String, JkptTxxtFixedGraph>();
			if (list != null && list.size() > 0){
				for(JkptTxxtFixedGraph graph : list){
					if (!map.containsKey(graph.getFixedgraphisn())){
						map.put(graph.getFixedgraphisn(), graph);
					}
				}
			}
			
			FixedGraphSingleTon.getInstance().setGraphMap(map);
		}
		
		graphMap = FixedGraphSingleTon.getInstance().getGraphMap();
		
		String result = "";
		if (graphMap.containsKey(isn)){
			JkptTxxtFixedGraph graph = graphMap.get(isn);
			result = graph.getFixedgraphdesc();
		}
		return result;
	}
	
	/**
	 * 批量删除固定播放表
	 * @param list
	 * @throws Exception 
	 */
	public void deleteCmsFixedCommands(List<Integer> list) throws Exception{
		dao.delete("CmsMapper.deleteCmsFixedCommands", list);
	}
	
	/**
	 * 批量更新固定播放表
	 * @param list
	 * @throws Exception 
	 */
	public void updateCmsFixedCommands(List<JkptTxxtFixedCommand> list) throws Exception{
		dao.update("CmsMapper.updateCmsFixedCommands", list);
	}

	/**
	 * @return the 当前机构
	 */
	public Integer getCurrOrgid() {
		if (currOrgid == null){
			try{
				currOrgid = commonService.getCurrentOrgid();
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		return currOrgid;
	}
	
	
}
