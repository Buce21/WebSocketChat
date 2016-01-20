package me.websocketchat;

/**
 * Created by Administrator on 2016/1/20.
 */

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@ServerEndpoint(value="/chat")
public class WebSocketChat {

    private Session session;
    private String nickName;
    private static final Map<String,Object> connections = new HashMap<>();

    @OnOpen
    public void start(Session session){
        System.out.println("session "+session.getId()+" open.");
    }

    @OnMessage
    public void process(Session session, String message){
        System.out.println(message);
        if (message.indexOf("login:") == 0) {
            this.session = session;
            String[] arrayString = message.split(":");
            nickName = arrayString[1] + UUID.randomUUID();
            connections.put(nickName, this);
        }
        sendAll(message);
    }

    @OnClose
    public void end(Session session){
        System.out.println("session " + session.getId() + " close.");
        connections.remove(nickName);
    }

    @OnError
    public void error(Session session, java.lang.Throwable throwable){
        System.err.println("session " + session.getId() + " error:" + throwable);
    }

    public static void sendAll(String msg){
        for (String key : connections.keySet()) {
            WebSocketChat client = null ;
            try {
                client = (WebSocketChat) connections.get(key);
                synchronized (client) {
                    client.session.getBasicRemote().sendText(msg);
                }
            } catch (IOException e) {
                connections.remove(client);
                try {
                    client.session.close();
                } catch (IOException e1) {
                    //ignore
                }
            }
        }
    }

}
