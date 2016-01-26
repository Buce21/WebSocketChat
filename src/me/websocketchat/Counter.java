package me.websocketchat;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.logging.Logger;

/**
 * 统计在线人数
 * Created by Buce on 2016/1/21.
 */
@ServerEndpoint(value="/counter")
public class Counter {

    private static final Map<String,Object> connections = new HashMap<>();
    private String sessionName;
    private Session session;
    private Logger logger = Logger.getLogger("Counter");

    @OnOpen
    public void start(Session session){
        logger.info("count-session "+session.getId()+" open.");
        this.session = session;
        sessionName = UUID.randomUUID().toString();
        connections.put(sessionName,this);
        String str ="";
        for (String key : WebSocketChat.getNames().keySet()){
            str += WebSocketChat.getNames().get(key)+"|";
        }
        send(str);
    }

    @OnMessage
    public void process(Session session, String message){
        logger.info("count-session "+session.getId()+" process.");
        logger.info(message);
        sendAll(message);
    }

    @OnClose
    public void end(Session session){
        logger.info("count-session "+session.getId()+" close.");
        connections.remove(sessionName);
    }

    @OnError
    public void error(Session session, java.lang.Throwable throwable){
        logger.info("count-session " + session.getId() + " error:" + throwable);
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
