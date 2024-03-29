package com.boco.domain;

import java.io.Serializable;
/**
 * 路线实体
 * @author 孙冠义
 *
 */
public class JkptBaseRoad implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6074331692957016997L;

	/**
	 * 路线编号
	 */
	private String routeLineID;
	/**
	 * 路线名称
	 */
	private String roadName;	
	/**
	 * 行政等级（包括国高）编号
	 */
	private String adminId;	
	/**
	 * 行政等级名称
	 */
	private String adminName;	
	/**
	 * 起点桩号
	 */
	private Double startStakeId;	
	/**
	 * 止点桩号
	 */
	private Double endStakeId;	
	/**
	 * 起点名称
	 */
	private String startName;	
	/**
	 * 止点名称
	 */
	private String endName;	
	
	/**
	 * 双向车道数
	 */
	private Integer roadNum;	
	/**
	 * 路线总里程
	 */
	private Double length;	
	/**
	 * 路线涵洞总数
	 */
	private Integer culvertNum;	
	/**
	 * 路线桥梁总数
	 */
	private Integer bridgeNum;	
	/**
	 * 路线危桥总数
	 */
	private Integer bdangerNum;	
	
	/**
	 * 路线永久桥总数
	 */
	private Integer bpermNum;	
	/**
	 * 路线半永久桥总数
	 */
	private Integer bhpermNum;	
	/**
	 * 路线临时桥总数
	 */
	private Integer btempNum;	
	/**
	 * 互通式立交桥总数
	 */
	private Integer binterNum;	
	/**
	 * 路线特大桥总数
	 */
	private Integer bverylNum;	
	/**
	 * 路线大桥总数
	 */
	private Integer blargeNum;	
	/**
	 * 路线中桥总数
	 */
	private Integer bmiddleNum;	
	/**
	 * 路线小桥总数
	 */
	private Integer bsmallNum;	
	/**
	 * 路线隧道总数
	 */
	private Integer tunnelNum;	
	/**
	 * 路线特长隧道总数
	 */
	private Integer tverylNum;	
	/**
	 * 路线长隧道总数
	 */
	private Integer tlongNum;		
	/**
	 * 路线中隧道总数
	 */
	private Integer tmiddleNum;	
	/**
	 * 路线短隧道总数
	 */
	private Integer tsmallNum;	
	/**
	 * 路线收费站总数
	 */
	private Integer stationNum;		
	/**
	 * 路线服务区总数
	 */
	private Integer serviceNum;	
	/**
	 * 路线停车场总数
	 */
	private Integer parkNum;	
	/**
	 * 路线入口总数
	 */
	private Integer entryNum;	
	/**
	 * 路线出口总数
	 */
	private Integer exitNum;	
	/**
	 * 写入时间
	 */
	private String writeTime;	
	/**
	 * 备注
	 */
	private String remark;	
	/**
	 * 记录状态,删除标记 1为删除 缺省时为0
	 */
	private Integer status;	
	/**
	 * 所属区域
	 */
	private String ownerArea;	
	/**
	 * 在gis中的道路id
	 */
	private String gisRoadId;
	
	/**
	 * @return the 路线编号
	 */
	public String getRouteLineID() {
		return routeLineID;
	}
	/**
	 * @param 路线编号 the routeLineID to set
	 */
	public void setRouteLineID(String routeLineID) {
		this.routeLineID = routeLineID;
	}
	/**
	 * @return the 路线名称
	 */
	public String getRoadName() {
		return roadName;
	}
	/**
	 * @param 路线名称 the roadName to set
	 */
	public void setRoadName(String roadName) {
		this.roadName = roadName;
	}
	/**
	 * @return the 行政等级（包括国高）编号
	 */
	public String getAdminId() {
		return adminId;
	}
	/**
	 * @param 行政等级（包括国高）编号 the adminId to set
	 */
	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}
	/**
	 * @return the 行政等级名称
	 */
	public String getAdminName() {
		return adminName;
	}
	/**
	 * @param 行政等级名称 the adminName to set
	 */
	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
	/**
	 * @return the 起点桩号
	 */
	public Double getStartStakeId() {
		return startStakeId;
	}
	/**
	 * @param 起点桩号 the startStakeId to set
	 */
	public void setStartStakeId(Double startStakeId) {
		this.startStakeId = startStakeId;
	}
	/**
	 * @return the 止点桩号
	 */
	public Double getEndStakeId() {
		return endStakeId;
	}
	/**
	 * @param 止点桩号 the endStakeId to set
	 */
	public void setEndStakeId(Double endStakeId) {
		this.endStakeId = endStakeId;
	}
	/**
	 * @return the 起点名称
	 */
	public String getStartName() {
		return startName;
	}
	/**
	 * @param 起点名称 the startName to set
	 */
	public void setStartName(String startName) {
		this.startName = startName;
	}
	/**
	 * @return the 止点名称
	 */
	public String getEndName() {
		return endName;
	}
	/**
	 * @param 止点名称 the endName to set
	 */
	public void setEndName(String endName) {
		this.endName = endName;
	}
	/**
	 * @return the 双向车道数
	 */
	public Integer getRoadNum() {
		return roadNum;
	}
	/**
	 * @param 双向车道数 the roadNum to set
	 */
	public void setRoadNum(Integer roadNum) {
		this.roadNum = roadNum;
	}
	/**
	 * @return the 路线总里程
	 */
	public Double getLength() {
		return length;
	}
	/**
	 * @param 路线总里程 the length to set
	 */
	public void setLength(Double length) {
		this.length = length;
	}
	/**
	 * @return the 路线涵洞总数
	 */
	public Integer getCulvertNum() {
		return culvertNum;
	}
	/**
	 * @param 路线涵洞总数 the culvertNum to set
	 */
	public void setCulvertNum(Integer culvertNum) {
		this.culvertNum = culvertNum;
	}
	/**
	 * @return the 路线桥梁总数
	 */
	public Integer getBridgeNum() {
		return bridgeNum;
	}
	/**
	 * @param 路线桥梁总数 the bridgeNum to set
	 */
	public void setBridgeNum(Integer bridgeNum) {
		this.bridgeNum = bridgeNum;
	}
	/**
	 * @return the 路线危桥总数
	 */
	public Integer getBdangerNum() {
		return bdangerNum;
	}
	/**
	 * @param 路线危桥总数 the bdangerNum to set
	 */
	public void setBdangerNum(Integer bdangerNum) {
		this.bdangerNum = bdangerNum;
	}
	/**
	 * @return the 路线永久桥总数
	 */
	public Integer getBpermNum() {
		return bpermNum;
	}
	/**
	 * @param 路线永久桥总数 the bpermNum to set
	 */
	public void setBpermNum(Integer bpermNum) {
		this.bpermNum = bpermNum;
	}
	/**
	 * @return the 路线半永久桥总数
	 */
	public Integer getBhpermNum() {
		return bhpermNum;
	}
	/**
	 * @param 路线半永久桥总数 the bhpermNum to set
	 */
	public void setBhpermNum(Integer bhpermNum) {
		this.bhpermNum = bhpermNum;
	}
	/**
	 * @return the 路线临时桥总数
	 */
	public Integer getBtempNum() {
		return btempNum;
	}
	/**
	 * @param 路线临时桥总数 the btempNum to set
	 */
	public void setBtempNum(Integer btempNum) {
		this.btempNum = btempNum;
	}
	/**
	 * @return the 互通式立交桥总数
	 */
	public Integer getBinterNum() {
		return binterNum;
	}
	/**
	 * @param 互通式立交桥总数 the binterNum to set
	 */
	public void setBinterNum(Integer binterNum) {
		this.binterNum = binterNum;
	}
	/**
	 * @return the 路线特大桥总数
	 */
	public Integer getBverylNum() {
		return bverylNum;
	}
	/**
	 * @param 路线特大桥总数 the bverylNum to set
	 */
	public void setBverylNum(Integer bverylNum) {
		this.bverylNum = bverylNum;
	}
	/**
	 * @return the 路线大桥总数
	 */
	public Integer getBlargeNum() {
		return blargeNum;
	}
	/**
	 * @param 路线大桥总数 the blargeNum to set
	 */
	public void setBlargeNum(Integer blargeNum) {
		this.blargeNum = blargeNum;
	}
	/**
	 * @return the 路线中桥总数
	 */
	public Integer getBmiddleNum() {
		return bmiddleNum;
	}
	/**
	 * @param 路线中桥总数 the bmiddleNum to set
	 */
	public void setBmiddleNum(Integer bmiddleNum) {
		this.bmiddleNum = bmiddleNum;
	}
	/**
	 * @return the 路线小桥总数
	 */
	public Integer getBsmallNum() {
		return bsmallNum;
	}
	/**
	 * @param 路线小桥总数 the bsmallNum to set
	 */
	public void setBsmallNum(Integer bsmallNum) {
		this.bsmallNum = bsmallNum;
	}
	/**
	 * @return the 路线隧道总数
	 */
	public Integer getTunnelNum() {
		return tunnelNum;
	}
	/**
	 * @param 路线隧道总数 the tunnelNum to set
	 */
	public void setTunnelNum(Integer tunnelNum) {
		this.tunnelNum = tunnelNum;
	}
	/**
	 * @return the 路线特长隧道总数
	 */
	public Integer getTverylNum() {
		return tverylNum;
	}
	/**
	 * @param 路线特长隧道总数 the tverylNum to set
	 */
	public void setTverylNum(Integer tverylNum) {
		this.tverylNum = tverylNum;
	}
	/**
	 * @return the 路线长隧道总数
	 */
	public Integer getTlongNum() {
		return tlongNum;
	}
	/**
	 * @param 路线长隧道总数 the tlongNum to set
	 */
	public void setTlongNum(Integer tlongNum) {
		this.tlongNum = tlongNum;
	}
	/**
	 * @return the 路线中隧道总数
	 */
	public Integer getTmiddleNum() {
		return tmiddleNum;
	}
	/**
	 * @param 路线中隧道总数 the tmiddleNum to set
	 */
	public void setTmiddleNum(Integer tmiddleNum) {
		this.tmiddleNum = tmiddleNum;
	}
	/**
	 * @return the 路线短隧道总数
	 */
	public Integer getTsmallNum() {
		return tsmallNum;
	}
	/**
	 * @param 路线短隧道总数 the tsmallNum to set
	 */
	public void setTsmallNum(Integer tsmallNum) {
		this.tsmallNum = tsmallNum;
	}
	/**
	 * @return the 路线收费站总数
	 */
	public Integer getStationNum() {
		return stationNum;
	}
	/**
	 * @param 路线收费站总数 the stationNum to set
	 */
	public void setStationNum(Integer stationNum) {
		this.stationNum = stationNum;
	}
	/**
	 * @return the 路线服务区总数
	 */
	public Integer getServiceNum() {
		return serviceNum;
	}
	/**
	 * @param 路线服务区总数 the serviceNum to set
	 */
	public void setServiceNum(Integer serviceNum) {
		this.serviceNum = serviceNum;
	}
	/**
	 * @return the 路线停车场总数
	 */
	public Integer getParkNum() {
		return parkNum;
	}
	/**
	 * @param 路线停车场总数 the parkNum to set
	 */
	public void setParkNum(Integer parkNum) {
		this.parkNum = parkNum;
	}
	/**
	 * @return the 路线入口总数
	 */
	public Integer getEntryNum() {
		return entryNum;
	}
	/**
	 * @param 路线入口总数 the entryNum to set
	 */
	public void setEntryNum(Integer entryNum) {
		this.entryNum = entryNum;
	}
	/**
	 * @return the 路线出口总数
	 */
	public Integer getExitNum() {
		return exitNum;
	}
	/**
	 * @param 路线出口总数 the exitNum to set
	 */
	public void setExitNum(Integer exitNum) {
		this.exitNum = exitNum;
	}
	/**
	 * @return the 写入时间
	 */
	public String getWriteTime() {
		return writeTime;
	}
	/**
	 * @param 写入时间 the writeTime to set
	 */
	public void setWriteTime(String writeTime) {
		this.writeTime = writeTime;
	}
	/**
	 * @return the 备注
	 */
	public String getRemark() {
		return remark;
	}
	/**
	 * @param 备注 the remark to set
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}
	/**
	 * @return the 记录状态删除标记1为删除缺省时为0
	 */
	public Integer getStatus() {
		return status;
	}
	/**
	 * @param 记录状态删除标记1为删除缺省时为0 the status to set
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}
	/**
	 * @return the 所属区域
	 */
	public String getOwnerArea() {
		return ownerArea;
	}
	/**
	 * @param 所属区域 the ownerArea to set
	 */
	public void setOwnerArea(String ownerArea) {
		this.ownerArea = ownerArea;
	}
	/**
	 * @return the 在gis中的道路id
	 */
	public String getGisRoadId() {
		return gisRoadId;
	}
	/**
	 * @param 在gis中的道路id the gisRoadId to set
	 */
	public void setGisRoadId(String gisRoadId) {
		this.gisRoadId = gisRoadId;
	}	

	
}
