package com.boco.domain.forebean;

import java.io.Serializable;
import java.util.List;
/**
 * 可变情报板图标名称及路径实体
 * @author 孙冠义
 *
 */
public class CmsIconsBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -6097486106959621743L;
	
	/**
	 * 图标文件的绝对地址
	 */
	private String absoluteAddr;
	/**
	 * 图标文件列表
	 */
	private List<String> iconNameList;
	/**
	 * 图标文件信息实体列表
	 */
	private List<CmsIconInfo> iconInfoList;
	/**
	 * @return the 图标文件的绝对地址
	 */
	public String getAbsoluteAddr() {
		return absoluteAddr;
	}
	/**
	 * @param 图标文件的绝对地址 the absoluteAddr to set
	 */
	public void setAbsoluteAddr(String absoluteAddr) {
		this.absoluteAddr = absoluteAddr;
	}
	/**
	 * @return the 图标文件列表
	 */
	public List<String> getIconNameList() {
		return iconNameList;
	}
	/**
	 * @param 图标文件列表 the iconNameList to set
	 */
	public void setIconNameList(List<String> iconNameList) {
		this.iconNameList = iconNameList;
	}
	/**
	 * @return the 图标文件信息实体列表
	 */
	public List<CmsIconInfo> getIconInfoList() {
		return iconInfoList;
	}
	/**
	 * @param 图标文件信息实体列表 the iconInfoList to set
	 */
	public void setIconInfoList(List<CmsIconInfo> iconInfoList) {
		this.iconInfoList = iconInfoList;
	}
	
}
