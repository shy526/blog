package top.ccxh.api.websocket;

import com.alibaba.fastjson.JSON;

import javax.websocket.Session;
import java.io.IOException;
import java.util.Enumeration;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Future;

/**
 * 聊天室模版类
 * @author honey
 */
public  class BaseChatRoom {
    private String url;
    private  final ConcurrentHashMap<Session,String> usernames=new ConcurrentHashMap();
    public BaseChatRoom(String url){
        this.url=url;
    }
    /**
     * 整个聊天室广播
     * @param object
     */
    public void broadcast(Object object){
        Enumeration<Session> keys = usernames.keys();
        while (keys.hasMoreElements()){
            sedmessage(keys.nextElement(),object);
        }
    }

    /**
     * 推送一条消息
     * @param session
     * @param object
     */
    public void sedmessage(Session session,Object object){
        if (session.isOpen()){
            session.getAsyncRemote().sendText(JSON.toJSONString(object));
        }else {
            removeUser(session);
        }
    }

    /**
     * 获取聊天室人数
     * @return
     */
    public Integer getCount(){
        return usernames.size();
    }

    /**
     *
     * @param username
     * @param session
     */
    public void  addUser(String username,Session session){
        usernames.put(session,username);
    }
    public void removeUser(Session session){
        try {
            session.close();
        } catch (IOException e) {

        }finally {
            usernames.remove(session);
        }
    }
    /**
     * 返回id
     * @return
     */
    public String getUrl(){
        return this.url;
    }
}
