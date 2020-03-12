package com.boco.domain;

import java.io.Serializable;

/**
 * 图形软件在web段缓存的实时数据实体
 * @author 孙冠义
 *
 */
public class DeviceVarValueInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3791877409724134168L;
	/**
	 * 机构编号
	 */
	private Integer orgId;
	/**
	 * 设备编号
	 */
    private Integer deviceId;
    /**
     * 设备变量编号
     */
    private Integer deviceVarId;   
    /**
     * 设备类型
     */
    private Integer deviceTypeId;
    /**
     * 设备桩号
     */
    private String devicePegNo;
    /**
     *  设备变量类型id    
     */
    private Integer typeId;    
    /**
     *  设备变量类型描述    
     */
    private String typeDesc;   
    /**
     *  用于区分车道    
     */
    private String other;
    /**
     * 设备变量值
     */
    private String varValue;    
    /**
     *  设备变量值描述   
     */
    private String varValueDesc;    
    /**
     *  变量描述，后期解析获取    
     */
    private String deviceVarDesc;
    
    /**
     *  变量单位，后期解析获取    
     */
    private String unit;
    
    /**
     *  变量父级类型，后期解析获取    
     */
    private Integer superiorTypeId;
    
    /**
     *  采集时间    
     */
    private String statTime;
    
    /**
     *  设置和获取是否刷新设备状态        
     */
    private String isRefresh;

	/**
	 * @return the 机构编号
	 */
	public Integer getOrgId() {
		return orgId;
	}

	/**
	 * @param 机构编号 the orgId to set
	 */
	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}

	/**
	 * @return the 设备编号
	 */
	public Integer getDeviceId() {
		return deviceId;
	}

	/**
	 * @param 设备编号 the deviceId to set
	 */
	public void setDeviceId(Integer deviceId) {
		this.deviceId = deviceId;
	}

	/**
	 * @return the 设备变量编号
	 */
	public Integer getDeviceVarId() {
		return deviceVarId;
	}

	/**
	 * @param 设备变量编号 the deviceVarId to set
	 */
	public void setDeviceVarId(Integer deviceVarId) {
		this.deviceVarId = deviceVarId;
	}

	/**
	 * @return the 设备变量类型id
	 */
	public Integer getTypeId() {
		return typeId;
	}

	/**
	 * @param 设备变量类型id the typeId to set
	 */
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	/**
	 * @return the 设备变量类型描述
	 */
	public String getTypeDesc() {
		return typeDesc;
	}

	/**
	 * @param 设备变量类型描述 the typeDesc to set
	 */
	public void setTypeDesc(String typeDesc) {
		this.typeDesc = typeDesc;
	}
	/**
	 * @return the 用于区分车道
	 */
	public String getOther() {
		return other;
	}

	/**
	 * @param 用于区分车道 the other to set
	 */
	public void setOther(String other) {
		this.other = other;
	}

	/**
	 * @return the 设备变量值
	 */
	public String getVarValue() {
		return varValue;
	}

	/**
	 * @param 设备变量值 the varValue to set
	 */
	public void setVarValue(String varValue) {
		this.varValue = varValue;
	}

	/**
	 * @return the 设备变量值描述
	 */
	public String getVarValueDesc() {
		return varValueDesc;
	}

	/**
	 * @param 设备变量值描述 the varValueDesc to set
	 */
	public void setVarValueDesc(String varValueDesc) {
		this.varValueDesc = varValueDesc;
	}

	/**
	 * @return the 变量描述，后期解析获取
	 */
	public String getDeviceVarDesc() {
		return deviceVarDesc;
	}

	/**
	 * @param 变量描述，后期解析获取 the deviceVarDesc to set
	 */
	public void setDeviceVarDesc(String deviceVarDesc) {
		this.deviceVarDesc = deviceVarDesc;
	}

	/**
	 * @return the 变量单位，后期解析获取
	 */
	public String getUnit() {
		return unit;
	}

	/**
	 * @param 变量单位，后期解析获取 the unit to set
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}

	/**
	 * @return the 变量父级类型，后期解析获取
	 */
	public Integer getSuperiorTypeId() {
		return superiorTypeId;
	}

	/**
	 * @param 变量父级类型，后期解析获取 the superiorTypeId to set
	 */
	public void setSuperiorTypeId(Integer superiorTypeId) {
		this.superiorTypeId = superiorTypeId;
	}

	/**
	 * @return the 采集时间
	 */
	public String getStatTime() {
		return statTime;
	}

	/**
	 * @param 采集时间 the statTime to set
	 */
	public void setStatTime(String statTime) {
		this.statTime = statTime;
	}

	/**
	 * @return the 设置和获取是否刷新设备状态
	 */
	public String getIsRefresh() {
		return isRefresh;
	}

	/**
	 * @param 设置和获取是否刷新设备状态 the isRefresh to set
	 */
	public void setIsRefresh(String isRefresh) {
		this.isRefresh = isRefresh;
	}

	/**
	 * @return the 设备类型
	 */
	public Integer getDeviceTypeId() {
		return deviceTypeId;
	}

	/**
	 * @param 设备类型 the deviceTypeId to set
	 */
	public void setDeviceTypeId(Integer deviceTypeId) {
		this.deviceTypeId = deviceTypeId;
	}

	/**
	 * @return the 设备桩号
	 */
	public String getDevicePegNo() {
		return devicePegNo;
	}

	/**
	 * @param 设备桩号 the devicePegNo to set
	 */
	public void setDevicePegNo(String devicePegNo) {
		this.devicePegNo = devicePegNo;
	}
    
    
}
