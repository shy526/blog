/**
 * 删除自己的存在
 */
function suicid() {
    setTimeout(function () {
        var scripts = document.getElementsByTagName('script');
        for(var i=0;i<scripts.length;i++){
            var src = scripts[i].src;
            if(src.indexOf("callback.js.js")!=-1){
                scripts[i].parentNode.removeChild(scripts[i]);
            }
        }
    },2000)
}
/**
 * 挂载脚本
 * @param jsPath
 */
function mountScript(jsPath,func) {
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.setAttribute("charset", "utf-8");
    temp.src = jsPath
    temp.onload = function () {
        if (func) func();
        suicid();
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}


