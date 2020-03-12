package com.boco.utils;

import java.util.HashMap;
import java.util.Map;

import com.boco.domain.cms.JkptTxxtFixedGraph;

/**
 * 可变情报板播放表中的固定图标单例类
 * @author 孙冠义
 *
 */
public class FixedGraphSingleTon {
	//图标map,key为fixedgraphisn
	private Map<String,JkptTxxtFixedGraph> graphMap;
	
	private FixedGraphSingleTon(){
		graphMap = new HashMap<String, JkptTxxtFixedGraph>();
	}
	
	private static FixedGraphSingleTon single;
	
	public static FixedGraphSingleTon getInstance(){
		if (single == null){
			synchronized(FixedGraphSingleTon.class){
				if (single == null){
					single = new FixedGraphSingleTon();
				}				
			}
		}
		return single;
	}

	/**
	 * @return the graphMap
	 */
	public Map<String, JkptTxxtFixedGraph> getGraphMap() {
		return graphMap;
	}

	/**
	 * @param graphMap the graphMap to set
	 */
	public void setGraphMap(Map<String, JkptTxxtFixedGraph> graphMap) {
		this.graphMap = graphMap;
	}	
	
}
