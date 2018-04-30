load.addLoad("html");
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
var id = getQueryString("id");
if(id){
    mountScript("http://ccxh.top/api/github/blog/call/body?id="+id);
}
function callBack(value) {
    if(value.ok){
        load.deleteLoad();
        window.document.body.innerHTML+=value.json;
        $(function () {
            $("body").append("<div class=\"autoMenu\" id=\"autoMenu\" data-autoMenu></div>");
            $("#autoMenu").autoMenu({
                levelOne : 'h1', //一级标题
                levelTwo : 'h2',  //二级标题（暂不支持更多级）
                width : 200, //容器宽度
                height : 400, //容器高度
                padding: 20, //内部间距
                offTop : 100 //滚动切换导航时离顶部的距离
            });
        })
    }else {
        $("body").append("<div id=\"modal\">\n" +
            "</div>");
        $("#modal").iziModal({
            title: "加载错误",
            subtitle: '请稍后再试,正在为你跳转首页.',
            headerColor: '#BD5B5B',
            width: 600
        });
        $('#modal').iziModal('open');
        setTimeout(function () {
            window.location.href="index.html"
        },7000)
    }
}
