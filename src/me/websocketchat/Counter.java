package me.websocketchat;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.UUID;

/**
 * Created by Buce on 2016/1/21.
 */
@ServerEndpoint(value="/counter")
public class Counter {

    @OnOpen
    public void start(Session session){
        //System.out.println("session "+session.getId()+" open.");
    }

    @OnMessage
    public void process(Session session, String message){
        WebSocketChat.sendAll(message);
    }

    @OnClose
    public void end(Session session){
        //System.out.println("session " + session.getId() + " close.");
    }

    @OnError
    public void error(Session session, java.lang.Throwable throwable){
        //System.err.println("session " + session.getId() + " error:" + throwable);
    }



}
