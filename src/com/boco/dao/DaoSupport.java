package com.boco.dao;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository("daoSupport")
public class DaoSupport implements DAO {
	
	@Resource(name="sqlSessionTemplate")
	private SqlSessionTemplate sqlSessionTemplate;

	public Object delete(String str, Object obj) throws Exception {
		// TODO Auto-generated method stub		
		return sqlSessionTemplate.delete(str, obj);
	}

	public Object findForList(String str, Object obj) throws Exception {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.selectList(str, obj);
	}

	public Object findForObject(String str, Object obj) throws Exception {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.selectOne(str, obj);
	}

	public Object save(String str, Object obj) throws Exception {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.insert(str,obj);
	}

	public Object update(String str, Object obj) throws Exception {
		// TODO Auto-generated method stub
		return sqlSessionTemplate.update(str, obj);
	}

}
