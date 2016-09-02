package com.bjhit.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @Description 文件操作工具类
 * @author lp
 * @date 2014年9月29日
 */

public class FileUtil {
    private static String file_separator = File.separator;

    /**
     * 获取文件
     * @param filepath 文件路径（为空则默认在项目的src目录下）
     * @param filename 文件名称
     * @return
     */
    public static File getFile(String filepath, String filename) {
        if("".equals(filepath)){
            filepath = System.getProperty("user.dir") + file_separator + "src";
        }
        String filepathName = filepath + file_separator + filename;
        return new File(filepathName);
    }
    
    /**
     * 创建文件
     * @param filepath 路径（为空则默认在项目src目录下）
     * @param filename 文件名称
     * @return
     */
    public static File createFile(String filepath, String filename){
        if("".equals(filepath)){
            filepath = System.getProperty("user.dir") + file_separator + "src";
        }
        //判断文件夹是否存在，不存在则创建文件夹
        File fileDir = new File(filepath);
        if(!fileDir.exists() && fileDir.isDirectory()){
            fileDir.mkdir();
        }
        
        //判断文件是否存在，不存在则创建文件
        String filepathName = filepath + file_separator + filename;
        File file = new File(filepathName);
        if(!file.exists()){
            try {
                file.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return file;
    }
    
    /**
     * 写文件内容
     * @param content 写入内容
     * @param filename 文件名（路径默认在项目src下面）
     * @param append 是否追加
     */
    public static void writeFile(String content, String filename, boolean append){
        File file = createFile("", filename);
        BufferedOutputStream bos = null;
        try {
            bos = new BufferedOutputStream(new FileOutputStream(file, append));
            bos.write(content.getBytes());
            bos.flush();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if(bos != null){
                try {
                    bos.close();
                    bos = null;
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
