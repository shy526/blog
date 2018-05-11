/**
 * 初始化websocket
 * @param url
 * @returns {*}
 */
function websocketInit(node,func) {
    var websocket = null;
        if ('WebSocket' in window) {
            websocket = new WebSocket("ws://localhost:8090/websocket?url=t");
        } else {
            console.error("Not support websocket");
        }
    // //接收到消息的回调方法
    websocket.onmessage = function (event) {
            if (func) func(event.data);
    }
    //连接发生错误的回调方法
    websocket.onerror = function () {

        console.log("WebSocket连接发生错误");
    };
    //连接成功建立的回调方法
    websocket.onopen = function () {

        console.log("WebSocket连接成功");
    }
    //连接关闭
    websocket.onclose = function () {
        console.log("WebSocket连接成功");
    }
    return websocket;
}

