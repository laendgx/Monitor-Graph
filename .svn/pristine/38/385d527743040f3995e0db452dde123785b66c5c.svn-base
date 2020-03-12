package com.boco.dao.user;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.boco.dao.DaoSupport;
import com.boco.domain.sysManager.BaseFuncTree;

@Repository("userDao")
public class UserDao {
	@Resource(name="daoSupport")
	private DaoSupport dao;
	
	//根据用户id获取用户的权限
	public List<BaseFuncTree> getFuncTree(String userId) throws Exception{
		List<BaseFuncTree> list = (List<BaseFuncTree>) dao.findForList("UserMapper.getFuncTree", userId);
		return list;
	}
}
