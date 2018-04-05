package top.ccxh.api.websocket.message;

public enum MessageType {
    message(1),login(2), broadcast(3);
    private int type;
    MessageType(int type){
        this.type=type;
    }

    public int getType() {
        return type;
    }

}
