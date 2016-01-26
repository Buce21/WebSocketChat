package me.websocketchat;

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
@WebServlet(name = "RedirectChat" ,urlPatterns = "/intoChat")
public class RedirectServlet extends HttpServlet{
    private Logger logger = Logger.getLogger(RedirectServlet.class);
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.getRequestDispatcher("WEB-INF/websocketclient.html").forward(request,response);
        logger.debug("IP: " + request.getRemoteAddr());

    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        this.doGet(request, response);
    }
}
