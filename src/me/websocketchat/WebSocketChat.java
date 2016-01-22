package me.websocketchat;

/**
 * Created by Buce on 2016/1/20.
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
    private static final Map<String,String> names = new HashMap<>();
    static Integer connectNum = 0;
    private Counter counter = new Counter();


    @OnOpen
    public void start(Session session){
        System.out.println("session "+session.getId()+" open.");
        ++connectNum;
        sendCount();
    }

    @OnMessage
    public void process(Session session, String message){
        System.out.println("process---"+message);
        if (message.indexOf("进入了聊天室") != -1) {
            this.session = session;
            int beginIndex = message.indexOf("【");
            int endIndex = message.indexOf("】");
            nickName = message.substring(beginIndex + 1,endIndex) + UUID.randomUUID();
            System.out.println( message.substring(beginIndex + 1,endIndex));
            names.put(nickName , message.substring(beginIndex + 1,endIndex));
            connections.put(nickName, this);
            sendCount();
        }
        sendAll(message);
    }

    @OnClose
    public void end(Session session){
        System.out.println("session " + session.getId() + " close.");
        --connectNum;
        names.remove(nickName);
        connections.remove(nickName);
        sendCount();
    }

    @OnError
    public void error(Session session, java.lang.Throwable throwable){

        try {
            session.getBasicRemote().sendText("<div class='alert alert-danger'  style='  margin-bottom:10px;' role='alert'>" + "未知错误，请重新连接！" +"</div>");
        } catch (IOException e) {
            e.printStackTrace();
        }

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
    public void sendCount(){
        String str ="";
        for (String key : names.keySet()){
            str+=names.get(key)+"|";
        }
        System.out.println(str);
        counter.send(str);
    }

    public static Map<String, String> getNames() {
        return names;
    }
}
