package me.websocketchat;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

/**
 * Created by Buce on 2016/1/22.
 */
@ServerEndpoint(value = "/test")
public class Test {
    @OnOpen
    public void start(Session session){
        System.out.println("test-session "+session.getId()+" open.");
    }

    @OnMessage
    public void process(Session session, String message){
        System.out.println("test-session " + session.getId() + " msg.");
    }

    @OnClose
    public void end(Session session){
        System.out.println("test-session " + session.getId() + " close.");
    }

    @OnError
    public void error(Session session, java.lang.Throwable throwable){
        System.err.println("test-session " + session.getId() + " error:" + throwable);
    }


}
