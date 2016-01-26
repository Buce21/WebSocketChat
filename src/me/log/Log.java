package me.log;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

/**
 * Created by Administrator on 2016/1/26.
 */
public class Log {
    private Logger logger;
    private static Log log;

    private Log(){
        //获得当前目录路径
        String filePath=this.getClass().getResource("/").getPath();
        //找到log4j.properties配置文件所在的目录(已经创建好)
        filePath=filePath.substring(1).replace("bin", "src");
        //获得日志类loger的实例
        logger=Logger.getLogger(this.getClass());
        //loger所需的配置文件路径
        PropertyConfigurator.configure(filePath+"log4j.properties");
    }

    public static Log getLoger()
    {
        if(log!=null)
            return log;
        else
            return new Log();
    }

    public Logger getLogger() {
        return logger;
    }
}
