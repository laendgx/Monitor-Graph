package com.boco.dao.alert;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.boco.dao.DaoSupport;
import com.boco.domain.comm.JkptTxxtAlertDictionary;
/**
 * 告警管理
 * @author 孙冠义
 *
 */
@Repository("alertDao")
public class AlertDao {
	@Resource(name="daoSupport")
	private DaoSupport dao;
	
	/**
	 * 获取所有的告警字典
	 * @return
	 * @throws Exception
	 */
	public List<JkptTxxtAlertDictionary> getAllAlertDictionary() throws Exception{
		List<JkptTxxtAlertDictionary> list = (List<JkptTxxtAlertDictionary>) dao.findForList("AlertMapper.getAllAlertDictionary", null);
		return list;
	}
}
