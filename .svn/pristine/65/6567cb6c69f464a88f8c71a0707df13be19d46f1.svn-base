package com.boco.utils;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class FileOperatorUtils {
	public static List<String> getFile(String path){ 
		List<String> list = new ArrayList<String>();
		
		File file = new File(path);
		File[] array = file.listFiles();

		for (int i = 0; i < array.length; i++) {
			if (array[i].isFile()) {
				String fileName = array[i].getName();
				String suffix = fileName.substring(fileName.lastIndexOf(".") + 1);  
				if (suffix.toLowerCase().equals("png")){
					list.add(fileName);
				}
			} else if (array[i].isDirectory()) {
				list.addAll(getFile(array[i].getPath()));
			}
		}
		return list;
	}
}
