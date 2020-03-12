package com.boco.domain.forebean;

import java.io.Serializable;
/**
 * 播放表中的图标信息实体
 * @author 孙冠义
 *
 */
public class CmsIconInfo implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 3702343507512657751L;
	/**
	 * 播放表图标文件名
	 */
	private String iconFileName;
	/**
	 * 播放表图标描述
	 */
	private String iconFileDesc;
	/**
	 * @return the 播放表图标文件名
	 */
	public String getIconFileName() {
		return iconFileName;
	}
	/**
	 * @param 播放表图标文件名 the iconFileName to set
	 */
	public void setIconFileName(String iconFileName) {
		this.iconFileName = iconFileName;
	}
	/**
	 * @return the 播放表图标描述
	 */
	public String getIconFileDesc() {
		return iconFileDesc;
	}
	/**
	 * @param 播放表图标描述 the iconFileDesc to set
	 */
	public void setIconFileDesc(String iconFileDesc) {
		this.iconFileDesc = iconFileDesc;
	}
	
}
