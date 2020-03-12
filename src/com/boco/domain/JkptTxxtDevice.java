package com.boco.domain;

import java.io.Serializable;

public class JkptTxxtDevice implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9200109571503101337L;
	/**
	 * 机构编码				
	 */
	private Integer orgId;	
	/**
	 * 机构名称
	 */
	private String orgName;
	/**
	 * 设备编号				
	 */
	private Integer deviceId;	
	/**
	 * 设备简称				
	 */
	private String deviceAbb;	
	/**
	 * 设备类型编号				
	 */
	private Integer deviceTypeId;	
	/**
	 * 设备属性编码				
	 */
	private String deviceAttrId;	
	/**
	 * 设备名称				
	 */
	private String deviceName;	
	/**
	 * 设备桩号				
	 */
	private String devicePegNo;	
	/**
	 * 设备地址				
	 */
	private String deviceAddress;	
	/**
	 * 设备位置，对应字典jkpt_comm_paramdic				
	 */
	private String devicePosition;	
	/**
	 * 设备位置名称
	 */
	private String devicePositionDesc;
	/**
	 * 设备预制点编码				
	 */
	private Integer devicePrefadId;	
	/**
	 * 图形文件编号				
	 */
	private Integer graphFileId;	
	/**
	 * 备注				
	 */
	private String memo;	
	/**
	 * 地图点坐标				
	 */
	private Integer screenX;	
	/**
	 * 路段编号				
	 */
	private String roadId;	
	/**
	 * 路段名称
	 */
	private String roadName;
	/**
	 * 地图点坐标				
	 */
	private Integer screenY;
	/**
	 * 图标样式				
	 */
	private String symbolStyle;	
	/**
	 * 针对风机这个编号为风机组或通风控制柜				
	 */
	private Integer deviceGroupId;	
	/**
	 * 设备图层编码				
	 */
	private Integer deviceLayerId;	
	/**
	 * 字符型的机构代码，7个字节，不够7个字节的话，前边补0				
	 */
	private String vorgId;	
	/**
	 * 路线编号				
	 */
	private String routeLineId;	
	/**
	 * 路线名称
	 */
	private String routeLineName;
	/**
	 * 设备方向，对应字典jkpt_comm_paramdic				
	 */
	private String deviceDirect;
	/**
	 * 设备方向名称
	 */
	private String deviceDirectDesc;
	
	/**
	 * @return the 机构编码
	 */
	public Integer getOrgId() {
		return orgId;
	}
	/**
	 * @param 机构编码 the orgId to set
	 */
	public void setOrgId(Integer orgId) {
		this.orgId = orgId;
	}
	/**
	 * @return the 机构名称
	 */
	public String getOrgName() {
		return orgName;
	}
	/**
	 * @param 机构名称 the orgName to set
	 */
	public void setOrgName(String orgName) {
		this.orgName = orgName;
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
	 * @return the 设备简称
	 */
	public String getDeviceAbb() {
		return deviceAbb;
	}
	/**
	 * @param 设备简称 the deviceAbb to set
	 */
	public void setDeviceAbb(String deviceAbb) {
		this.deviceAbb = deviceAbb;
	}
	/**
	 * @return the 设备类型编号
	 */
	public Integer getDeviceTypeId() {
		return deviceTypeId;
	}
	/**
	 * @param 设备类型编号 the deviceTypeId to set
	 */
	public void setDeviceTypeId(Integer deviceTypeId) {
		this.deviceTypeId = deviceTypeId;
	}
	/**
	 * @return the 设备属性编码
	 */
	public String getDeviceAttrId() {
		return deviceAttrId;
	}
	/**
	 * @param 设备属性编码 the deviceAttrId to set
	 */
	public void setDeviceAttrId(String deviceAttrId) {
		this.deviceAttrId = deviceAttrId;
	}
	/**
	 * @return the 设备名称
	 */
	public String getDeviceName() {
		return deviceName;
	}
	/**
	 * @param 设备名称 the deviceName to set
	 */
	public void setDeviceName(String deviceName) {
		this.deviceName = deviceName;
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
	/**
	 * @return the 设备地址
	 */
	public String getDeviceAddress() {
		return deviceAddress;
	}
	/**
	 * @param 设备地址 the deviceAddress to set
	 */
	public void setDeviceAddress(String deviceAddress) {
		this.deviceAddress = deviceAddress;
	}
	/**
	 * @return the 设备位置，对应字典jkpt_comm_paramdic
	 */
	public String getDevicePosition() {
		return devicePosition;
	}
	/**
	 * @param 设备位置，对应字典jkpt_comm_paramdic the devicePosition to set
	 */
	public void setDevicePosition(String devicePosition) {
		this.devicePosition = devicePosition;
	}
	/**
	 * @return the 设备位置名称
	 */
	public String getDevicePositionDesc() {
		return devicePositionDesc;
	}
	/**
	 * @param 设备位置名称 the devicePositionDesc to set
	 */
	public void setDevicePositionDesc(String devicePositionDesc) {
		this.devicePositionDesc = devicePositionDesc;
	}
	/**
	 * @return the 设备预制点编码
	 */
	public Integer getDevicePrefadId() {
		return devicePrefadId;
	}
	/**
	 * @param 设备预制点编码 the devicePrefadId to set
	 */
	public void setDevicePrefadId(Integer devicePrefadId) {
		this.devicePrefadId = devicePrefadId;
	}
	/**
	 * @return the 图形文件编号
	 */
	public Integer getGraphFileId() {
		return graphFileId;
	}
	/**
	 * @param 图形文件编号 the graphFileId to set
	 */
	public void setGraphFileId(Integer graphFileId) {
		this.graphFileId = graphFileId;
	}
	/**
	 * @return the 备注
	 */
	public String getMemo() {
		return memo;
	}
	/**
	 * @param 备注 the memo to set
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}
	/**
	 * @return the 地图点坐标
	 */
	public Integer getScreenX() {
		return screenX;
	}
	/**
	 * @param 地图点坐标 the screenX to set
	 */
	public void setScreenX(Integer screenX) {
		this.screenX = screenX;
	}
	/**
	 * @return the 路段编号
	 */
	public String getRoadId() {
		return roadId;
	}
	/**
	 * @param 路段编号 the roadId to set
	 */
	public void setRoadId(String roadId) {
		this.roadId = roadId;
	}
	/**
	 * @return the 路段名称
	 */
	public String getRoadName() {
		return roadName;
	}
	/**
	 * @param 路段名称 the roadName to set
	 */
	public void setRoadName(String roadName) {
		this.roadName = roadName;
	}
	/**
	 * @return the 地图点坐标
	 */
	public Integer getScreenY() {
		return screenY;
	}
	/**
	 * @param 地图点坐标 the screenY to set
	 */
	public void setScreenY(Integer screenY) {
		this.screenY = screenY;
	}
	/**
	 * @return the 图标样式
	 */
	public String getSymbolStyle() {
		return symbolStyle;
	}
	/**
	 * @param 图标样式 the symbolStyle to set
	 */
	public void setSymbolStyle(String symbolStyle) {
		this.symbolStyle = symbolStyle;
	}
	/**
	 * @return the 针对风机这个编号为风机组或通风控制柜
	 */
	public Integer getDeviceGroupId() {
		return deviceGroupId;
	}
	/**
	 * @param 针对风机这个编号为风机组或通风控制柜 the deviceGroupId to set
	 */
	public void setDeviceGroupId(Integer deviceGroupId) {
		this.deviceGroupId = deviceGroupId;
	}
	/**
	 * @return the 设备图层编码
	 */
	public Integer getDeviceLayerId() {
		return deviceLayerId;
	}
	/**
	 * @param 设备图层编码 the deviceLayerId to set
	 */
	public void setDeviceLayerId(Integer deviceLayerId) {
		this.deviceLayerId = deviceLayerId;
	}
	/**
	 * @return the 字符型的机构代码，7个字节，不够7个字节的话，前边补0
	 */
	public String getVorgId() {
		return vorgId;
	}
	/**
	 * @param 字符型的机构代码，7个字节，不够7个字节的话，前边补0 the vorgId to set
	 */
	public void setVorgId(String vorgId) {
		this.vorgId = vorgId;
	}
	/**
	 * @return the 路线编号
	 */
	public String getRouteLineId() {
		return routeLineId;
	}
	/**
	 * @param 路线编号 the routeLineId to set
	 */
	public void setRouteLineId(String routeLineId) {
		this.routeLineId = routeLineId;
	}
	/**
	 * @return the 路线名称
	 */
	public String getRouteLineName() {
		return routeLineName;
	}
	/**
	 * @param 路线名称 the routeLineName to set
	 */
	public void setRouteLineName(String routeLineName) {
		this.routeLineName = routeLineName;
	}
	/**
	 * @return the 设备方向，对应字典jkpt_comm_paramdic
	 */
	public String getDeviceDirect() {
		return deviceDirect;
	}
	/**
	 * @param 设备方向，对应字典jkpt_comm_paramdic the deviceDirect to set
	 */
	public void setDeviceDirect(String deviceDirect) {
		this.deviceDirect = deviceDirect;
	}
	/**
	 * @return the 设备方向名称
	 */
	public String getDeviceDirectDesc() {
		return deviceDirectDesc;
	}
	/**
	 * @param 设备方向名称 the deviceDirectDesc to set
	 */
	public void setDeviceDirectDesc(String deviceDirectDesc) {
		this.deviceDirectDesc = deviceDirectDesc;
	}
}
