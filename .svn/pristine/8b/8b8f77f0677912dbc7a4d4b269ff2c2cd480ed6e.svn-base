package com.boco.dao.login;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.boco.dao.DaoSupport;
import com.boco.domain.JkptBaseUser;
/**
 * 登录持久层
 * @author 孙冠义
 *
 */
@Repository("loginDao")
public class LoginDao {
	@Resource(name="daoSupport")
	private DaoSupport dao;
	
	/**
	 * 根据登录id获取用户信息
	 * @param loginid
	 * @return
	 * @throws Exception
	 */
	public JkptBaseUser getUserInfoByLoginId(String loginid) throws Exception{
		Map<String,String> map = new HashMap<String,String>();
		map.put("loginid", loginid);
		
		JkptBaseUser user = (JkptBaseUser) dao.findForObject("UserMapper.getUserInfoByLoginId", map);
		return user;
	}
}
