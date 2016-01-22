package me.websocketchat;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * 统计在线人数
 * Created by Buce on 2016/1/21.
 */
@ServerEndpoint(value="/counter")
public class Counter {

    private static final Map<String,Object> connections = new HashMap<>();
    private String sessionName;
    private Session session;

    @OnOpen
    public void start(Session session){
        this.session = session;
        System.out.println("count-session "+session.getId()+" open.");
        sessionName = UUID.randomUUID().toString();
        connections.put(sessionName,this);
        String str ="";
        for (String key : WebSocketChat.getNames().keySet()){
            str += WebSocketChat.getNames().get(key)+"|";
        }
        System.out.println(str);
        send(str);
    }

    @OnMessage
    public void process(Session session, String message){
        System.out.println("count-session " + session.getId() + " msg.");
        System.out.println(message);

        sendAll(message);
    }

    @OnClose
    public void end(Session session){
        System.out.println("count-session " + session.getId() + " close.");
        connections.remove(sessionName);
    }

    @OnError
    public void error(Session session, java.lang.Throwable throwable){
        System.err.println("count-session " + session.getId() + " error:" + throwable);
    }

    public void send(String msg){
        sendAll( msg);
    }

    public static void sendAll(String msg){
        for (String key : connections.keySet()) {
            Counter client = null ;
            try {
                client = (Counter) connections.get(key);
                synchronized (client) {
                    if ("".equals(msg)){
                        msg = "error";
                    }
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

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

}
