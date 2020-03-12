package com.boco.domain.sysManager;

import java.io.Serializable;
import java.util.List;

/**
 * 功能菜单实体
 * 
 * @author Administrator
 *
 */
public class BaseFuncTree implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4687771773209834074L;

	/**
	 * 菜单id
	 */
	private String id;

	/**
	 * 标题
	 */
	private String title;

	/**
	 * 链接
	 */
	private String url;

	/**
	 * 排序
	 */
	private int ordering;

	/**
	 * 父节点id
	 */
	private String parentId;

	/**
	 * 状态
	 */
	private int status = 1;

	/**
	 * 菜单图片的索引
	 */
	private String memo;
	
	/**
	 * 对应权限id(jkpt_sys_right.id)
	 */
	private Integer funId;

	/**
	 * 扩展
	 */
	private List<BaseFuncTree> children;

	/**
	 * 获取 菜单id
	 * 
	 * @return id 菜单id
	 */
	public String getId() {
		return id;
	}

	/**
	 * 设置 菜单id
	 * 
	 * @param id
	 *            菜单id
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * 获取 标题
	 * 
	 * @return title 标题
	 */
	public String getTitle() {
		return title;
	}

	/**
	 * 设置 标题
	 * 
	 * @param title
	 *            标题
	 */
	public void setTitle(String title) {
		this.title = title;
	}

	/**
	 * 获取 链接
	 * 
	 * @return url 链接
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * 设置 链接
	 * 
	 * @param url
	 *            链接
	 */
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * 获取 排序
	 * 
	 * @return ordering 排序
	 */
	public int getOrdering() {
		return ordering;
	}

	/**
	 * 设置 排序
	 * 
	 * @param ordering
	 *            排序
	 */
	public void setOrdering(int ordering) {
		this.ordering = ordering;
	}

	/**
	 * 获取 父节点id
	 * 
	 * @return parentId 父节点id
	 */
	public String getParentId() {
		return parentId;
	}

	/**
	 * 设置 父节点id
	 * 
	 * @param parentId
	 *            父节点id
	 */
	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	/**
	 * 获取 状态
	 * 
	 * @return status 状态
	 */
	public int getStatus() {
		return status;
	}

	/**
	 * 设置 状态
	 * 
	 * @param status
	 *            状态
	 */
	public void setStatus(int status) {
		this.status = status;
	}

	/**
	 * 获取 菜单图片的索引
	 * 
	 * @return memo 菜单图片的索引
	 */
	public String getMemo() {
		return memo;
	}

	/**
	 * 设置 菜单图片的索引
	 * 
	 * @param memo
	 *            菜单图片的索引
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}

	/**
	 * 获取 扩展
	 * 
	 * @return children 扩展
	 */
	public List<BaseFuncTree> getChildren() {
		return children;
	}

	/**
	 * 设置 扩展
	 * 
	 * @param children
	 *            扩展
	 */
	public void setChildren(List<BaseFuncTree> children) {
		this.children = children;
	}

	/**
	 * @return the 对应权限id(jkpt_sys_right.id)
	 */
	public Integer getFunId() {
		return funId;
	}

	/**
	 * @param 对应权限id(jkpt_sys_right.id) the funId to set
	 */
	public void setFunId(Integer funId) {
		this.funId = funId;
	}

}
