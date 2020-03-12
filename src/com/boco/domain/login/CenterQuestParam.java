package com.boco.domain.login;

import java.io.Serializable;

/**
 * 中心访问参数实体
 * @author 孙冠义
 *
 */	
public class CenterQuestParam implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1733564285846123936L;
	/**
	 * 用户id
	 */
	private String userId;
	/**
	 * 机构id
	 */
	private String orgid;
	/**
	 * @return the 用户id
	 */
	public String getUserId() {
		return userId;
	}
	/**
	 * @param 用户id the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * @return the 机构id
	 */
	public String getOrgid() {
		return orgid;
	}
	/**
	 * @param 机构id the orgid to set
	 */
	public void setOrgid(String orgid) {
		this.orgid = orgid;
	}		
}
