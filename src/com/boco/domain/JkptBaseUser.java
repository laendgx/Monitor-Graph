package com.boco.domain;

import java.io.Serializable;

/**
 * 用户实体
 * @author 孙冠义
 *
 */
public class JkptBaseUser implements Serializable {

	/**
	 * 
	 */
	public static final long serialVersionUID = 3432135003577954324L;
	/**
	 * 用户编号-公司编号
	 */
	public String usercode;	
	/**
	 * 用户姓名
	 */
	public String userName;	
	/**
	 * 性别：1-男，2-女，0-空
	 */
	public String sex;	
	/**
	 * 民族
	 */
	public String nation;	
	/**
	 * 手机号码
	 */
	public String contact;	
	/**
	 * 所属机构：关联机构表(jkpt_base_org)
	 */
	public String orgId;	
	/**
	 * 所属机构名称
	 */
	public String orgName;
	/**
	 * 角色名称：关联角色表(jkpt_base_role)
	 */
	public Integer roleId;	
	/**
	 * 用户密码
	 */
	public String password;	
	/**
	 * 用户唯一标示  无实际意义 规则序列号+@itc
	 */
	public String userId;	
	/**
	 * 1 可用  0 停用
	 */
	public Integer status;	
	/**
	 * 登录编号
	 */
	public String loginId;	
	/**
	 * 职务关联jkpt_base_duties.id
	 */
	public Integer dutiesId;
	/**
	 * @return the 用户编号-公司编号
	 */
	public String getUsercode() {
		return usercode;
	}
	/**
	 * @param 用户编号-公司编号 the usercode to set
	 */
	public void setUsercode(String usercode) {
		this.usercode = usercode;
	}
	/**
	 * @return the 用户姓名
	 */
	public String getUserName() {
		return userName;
	}
	/**
	 * @param 用户姓名 the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}
	/**
	 * @return the 性别：1-男，2-女，0-空
	 */
	public String getSex() {
		return sex;
	}
	/**
	 * @param 性别：1-男，2-女，0-空 the sex to set
	 */
	public void setSex(String sex) {
		this.sex = sex;
	}
	/**
	 * @return the 民族
	 */
	public String getNation() {
		return nation;
	}
	/**
	 * @param 民族 the nation to set
	 */
	public void setNation(String nation) {
		this.nation = nation;
	}
	/**
	 * @return the 手机号码
	 */
	public String getContact() {
		return contact;
	}
	/**
	 * @param 手机号码 the contact to set
	 */
	public void setContact(String contact) {
		this.contact = contact;
	}
	/**
	 * @return the 所属机构：关联机构表(jkpt_base_org)
	 */
	public String getOrgId() {
		return orgId;
	}
	/**
	 * @param 所属机构：关联机构表(jkpt_base_org) the orgId to set
	 */
	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}
	/**
	 * @return the 角色名称：关联角色表(jkpt_base_role)
	 */
	public Integer getRoleId() {
		return roleId;
	}
	/**
	 * @param 角色名称：关联角色表(jkpt_base_role) the roleId to set
	 */
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	/**
	 * @return the 用户密码
	 */
	public String getPassword() {
		return password;
	}
	/**
	 * @param 用户密码 the password to set
	 */
	public void setPassword(String password) {
		this.password = password;
	}
	/**
	 * @return the 用户唯一标示无实际意义规则序列号+@itc
	 */
	public String getUserId() {
		return userId;
	}
	/**
	 * @param 用户唯一标示无实际意义规则序列号+@itc the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}
	/**
	 * @return the 1可用0停用
	 */
	public Integer getStatus() {
		return status;
	}
	/**
	 * @param 1可用0停用 the status to set
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * @return the 登录编号
	 */
	public String getLoginId() {
		return loginId;
	}
	/**
	 * @param 登录编号 the loginId to set
	 */
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	/**
	 * @return the 职务关联jkpt_base_duties.id
	 */
	public Integer getDutiesId() {
		return dutiesId;
	}
	/**
	 * @param 职务关联jkpt_base_duties.id the dutiesId to set
	 */
	public void setDutiesId(Integer dutiesId) {
		this.dutiesId = dutiesId;
	}
	/**
	 * @return the 所属机构名称
	 */
	public String getOrgName() {
		return orgName;
	}
	/**
	 * @param 所属机构名称 the orgName to set
	 */
	public void setOrgName(String orgName) {
		this.orgName = orgName;
	}
	
	

}
