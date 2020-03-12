package com.boco.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.boco.dao.alert.AlertDao;
import com.boco.domain.comm.JkptTxxtAlertDictionary;
/**
 * 告警服务类
 * @author 孙冠义
 *
 */
@Service("alertService")
public class AlertService {
	@Resource(name="alertDao")
	private AlertDao alertDao;
	
	/**
	 * 获取所有的告警字典
	 * @return
	 * @throws Exception
	 */
	public List<JkptTxxtAlertDictionary> getAllAlertDictionary() throws Exception{
		return alertDao.getAllAlertDictionary();
	}
}
