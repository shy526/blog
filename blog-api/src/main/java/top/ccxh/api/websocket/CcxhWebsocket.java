package top.ccxh.api.websocket;

import com.alibaba.fastjson.JSON;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import top.ccxh.api.websocket.message.MessageType;
import top.ccxh.api.websocket.message.ResultMessage;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * @author honey
 */
@Component
//该注解表示该类被声明为一个webSocket终端
@ServerEndpoint("/websocket")
public class CcxhWebsocket {
    private static final Logger logger= LoggerFactory.getLogger(CcxhWebsocket.class);
    private final static ConcurrentHashMap<String,BaseChatRoom> chartoom=new ConcurrentHashMap<>();
    @OnOpen
    public void onOpen( Session session){

        String queryString=geturl(session);
        BaseChatRoom baseChatRoom = chartoom.get(queryString);
        if (baseChatRoom == null) {
            baseChatRoom=new BaseChatRoom(queryString);
            chartoom.put(queryString,baseChatRoom);
        }
        baseChatRoom.addUser(session.getId(),session);
        logger.info("聊天室URL:{},加入一位成员:{},共有:{}",queryString,session.getId(),baseChatRoom.getCount());
        ResultMessage resultMessage=new ResultMessage();
        resultMessage.setSource("System");
        resultMessage.setType(MessageType.login.getType());
        resultMessage.setDate(session.getId());
        baseChatRoom.sedmessage(session,resultMessage);
    }

    @OnMessage
    public void onMessage(String message,Session session) throws IOException {
        ResultMessage resultMessage = JSON.parseObject(message, ResultMessage.class);
        if (resultMessage.getType()==MessageType.message.getType()){
            if (resultMessage.getTarget().lastIndexOf("?")!=-1){
                resultMessage.setTarget(resultMessage.getTarget().substring(0,resultMessage.getTarget().lastIndexOf("?")));
            }
            BaseChatRoom baseChatRoom = chartoom.get(resultMessage.getTarget());
            if (baseChatRoom == null) {
                logger.info("非法连接");
                session.close();
            }else {
                //修改为广播
                resultMessage.setType(MessageType.broadcast.getType());
                logger.info("广播消息:{}",resultMessage);
                baseChatRoom.broadcast(resultMessage);
            }

        }
    }
    @OnClose
    public void onClose(Session session) {
        String queryString=geturl(session);
        BaseChatRoom baseChatRoom = chartoom.get(queryString);
        if (baseChatRoom!=null){
            baseChatRoom.removeUser(session);
            if(baseChatRoom.getCount()<=0){
                chartoom.remove(queryString);
                logger.info("id:{},退出房间", session.getId());
                logger.info("删除聊天室:{}", baseChatRoom.getUrl());
            }
        }else {
            try {
                session.close();
            } catch (IOException e) {

            }finally {
                session=null;
                logger.info("id:{},非法连接", session.getId());
            }

        }

    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

    private String geturl(Session session){
        String queryString = session.getQueryString();
        //去掉参数
        if (queryString.lastIndexOf("?")==-1){
            queryString = queryString.substring(4);
        }else {
            queryString = queryString.substring(4,queryString.lastIndexOf("?"));
        }
        return queryString;
    }
}
