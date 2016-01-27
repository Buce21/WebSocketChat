package me.websocketchat;

import me.util.GetAddressByIpUtil;
import org.apache.log4j.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Administrator on 2016/1/21.
 */
@WebServlet(name = "RedirectServlet" ,urlPatterns = "/intoChat")
public class RedirectServlet extends HttpServlet{
    private Logger logger = Logger.getLogger(RedirectServlet.class.getName());
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.getRequestDispatcher("WEB-INF/websocketclient.html").forward(request,response);
        String IP =  request.getRemoteAddr();
        logger.debug("IP: " + IP + "  地址: "
                + GetAddressByIpUtil.GetAddressByIp(IP));

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.doGet(request, response);
    }
}
