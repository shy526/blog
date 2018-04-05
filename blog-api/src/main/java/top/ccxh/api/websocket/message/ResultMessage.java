package top.ccxh.api.websocket.message;

import java.io.Serializable;

public class ResultMessage implements Serializable ,WebSocketMessage {
    /**
     * 消息类型
     */
    private Integer type;
    /**
     * 消息json
     */
    private String date;
    /**
     * 消息源
     */
    private String source;

    /**
     * 目标
     */
    private String target;
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    @Override
    public String toString() {
        return "ResultMessage{" +
                "type=" + type +
                ", date='" + date + '\'' +
                ", source='" + source + '\'' +
                ", target='" + target + '\'' +
                '}';
    }
}
