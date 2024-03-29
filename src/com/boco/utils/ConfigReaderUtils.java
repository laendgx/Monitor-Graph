package com.boco.utils;

import java.io.InputStreamReader;
import java.util.Properties;

public class ConfigReaderUtils {
	/**
	 * 采集系统的socketio Server地址
	 */
	private static String collSocketIoAddr;
	/**
	 * 采集系统告警socketio Server地址
	 */
	private static String collAlertSocketIoAddr;
	/**
	 * 可变情报板图标的相对地址
	 */
	private static String cmsIconRelativeAddr;
	/**
	 * js版本号
	 */
	private static String jsVersion;
	/**
	 * 主页默认的url
	 */
	private static String defaultUrl;
	static{
		try{
		Properties prop = new Properties();
		prop.load(new InputStreamReader(ConfigReaderUtils.class.getClassLoader().getResourceAsStream("moni-config.properties"), "UTF-8"));
		collSocketIoAddr = prop.getProperty("collSocketIoAddr");
		collAlertSocketIoAddr = prop.getProperty("collAlertSocketIoAddr",collSocketIoAddr);
		cmsIconRelativeAddr = prop.getProperty("cmsIconRelativeAddr");
		jsVersion = prop.getProperty("jsVersion");
		defaultUrl = prop.getProperty("defaultUrl");
		} catch(Exception ex){
			ex.printStackTrace();
		}
	}

	/**
	 * @return the 采集系统的socketioServer地址
	 */
	public static String getCollSocketIoAddr() {
		return collSocketIoAddr;
	}

	/**
	 * @return the 可变情报板图标的相对地址
	 */
	public static String getCmsIconRelativeAddr() {
		return cmsIconRelativeAddr;
	}

	/**
	 * @return the js版本号
	 */
	public static String getJsVersion() {
		return jsVersion;
	}

	/**
	 * @return the 主页默认的url
	 */
	public static String getDefaultUrl() {
		return defaultUrl;
	}

	/**
	 * @return the 采集系统告警socketioServer地址
	 */
	public static String getCollAlertSocketIoAddr() {
		return collAlertSocketIoAddr;
	}
	
}
