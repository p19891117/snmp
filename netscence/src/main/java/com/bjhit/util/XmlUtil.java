package com.bjhit.util;

import java.io.File;
import java.net.MalformedURLException;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

/**
 * @Description xml操作工具类
 * @author lp
 * @date 2014年9月29日
 */

public class XmlUtil {
    /**
     * 从文件读取XML，输入文件，返回XML文档
     * @param file
     * @return
     * @throws MalformedURLException
     * @throws DocumentException
     */
    public static Document read(File file) throws MalformedURLException,
            DocumentException {
        SAXReader reader = new SAXReader();
        Document document = reader.read(file);
        return document;
    }
    
    /**
     * 得到Root节点
     * @param doc
     * @return
     */
    public static Element getRootElement(Document doc) {
        return doc.getRootElement();
    }
    
}
