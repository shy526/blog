/**
 * 博客属性数组
 */
var blogs;

/**
 * blogItem 渲染
 * @param blog 博客属性
 * 以下属性用作生成赛选条件
 * @param tagList 标签list
 * @param typeList typList
 */
function blogApply(blog,tagList,typeList) {
    //添加所有type
    if(typeList){
        typeList.push(blog.type)
    }
    var html=" <a href=\""+blog.url+"\" target='_blank' >\n" +
        "    <div class='post-module'>\n" +
        "        <div class='post-content'>\n" +
        "        <div class='category'>"+blog.type+"</div>\n" +
        "        <h1 class='title'>"+blog.title+"</h1>\n";
    var tags=blog.tag.split(",");
    var tagHtml="";
    var classs=["default","primary","success","info","warning","danger"]
    for(var y=0;y<tags.length;y++){
        if(tags[y]!=""){
            //添加所有标签
            if(tagList){
                tagList.push(tags[y]);
            }
            /*添加一个随机数*/
            tagHtml+="\n<span class=\"label label-"+randomData({min:0,data:classs})+"\">"+tags[y]+"</span>\n";
        }
    }
    html+="<h2 class='sub_title'>"+tagHtml+"</h2>\n" +
        "    <div class='post-meta'>\n" +
        "        <span class='timestamp'>来源:"+blog.githubName+"</span>\n" +
        "        <span class='timestamp'>来源:"+formatDate(new Date(blog.githubTime),"yyyy-MM-dd HH:mm:ss")+"</span>\n" +
        "    </div>\n" +
        "    </div>\n" +
        "    </div>\n" +
        " </a>"
    $("#blogs").append($(html))
}
/**
 * 数组去重
 * */
function arrays(arr){
    result = [],
        len = arr.length;
    arr.forEach(function(v, i ,arr){    //这里利用map，filter方法也可以实现
        var bool = arr.indexOf(v,i+1);    //从传入参数的下一个索引值开始寻找是否存在重复
        if(bool === -1){
            result.push(v);
        }
    })
    return result;
};

/**
 * 随机返回一个数组的值
 * 当max不存在时时,取数组.length-1
 * @param {Object} option{max,min,data}
 */
function randomData(option){
    if(!option.max){
        option.max=option.data.length-1;
    }
    var i=parseInt(Math.random()*(option.max-option.min)+option.min);
    return option.data[i]
}

/**
 * 生成下拉列表框
 */
function selectSc(option) {
    $("#selects").append("<div style=\"padding-bottom: 58px;\">\n" +
        "<div class=\"col-md-2\">\n" +
        "<select class=\"select1\"><option value=\"-1\">所有类型</option></select>\n" +
        "</div>\n" +
        "<div class=\"col-md-1\">\n" +
        "<span class=\"label label-danger\" style=\"font-size: 18px;    line-height: 42px;\"> and</span>\n" +
        "</div>\n" +
        "<div class=\"col-md-2\">\n" +
        "<select class=\"select2\"><option value=\"-1\">所有标签</option></select>\n" +
        "</div>");
    var type = arrays(option.type);
    var html="";
    type.forEach(function (value) {
        html+="<option value=\" "+value+" \">"+value+"</option>";
    })

    $(".select1").append($(html));
    $('.select1').comboSelect();
    $('.select1').change(function(event){
        $("#preloader_4").show();
        var selectedIndex = event.target.selectedIndex;
        $(".select1").attr("tabindex",selectedIndex);
        if (selectedIndex==-1){
            selectedIndex=0;
        }
        /*type下拉框单击事件*/
        $("#blogs").empty();
        var tabindex = $(".select2").attr("tabindex");
        if(tabindex==-1){
            var tabindex =0;
            $(".select2").attr("tabindex","0");
        }
        var flg=true;
        blogs.forEach(function (value) {
            var indexValue = event.target.value.trim();
            if (value.type.indexOf(indexValue)!=-1&&tabindex==0||
                value.type.indexOf(indexValue)!=-1&&value.tag.indexOf($(".select2 option").eq(tabindex).text().trim())!=-1||
                selectedIndex==0&&	value.tag.indexOf($(".select2 option").eq(tabindex).text().trim())!=-1||
                tabindex==0&&selectedIndex==0){
                blogApply(value);
                flg=false;
            }
        });
        $("#preloader_4").hide();
        if(flg){
            $("#blogs").append("<p>找不相关的数据</p>")
        }
    })
    html="";
    var tag = arrays(option.tag);
    tag.forEach(function (value) {
        html+="<option value=\" "+value+" \">"+value+"</option>";
    })
    $(".select2").append($(html));
    $('.select2').comboSelect();
    $('.select2').change(function(event){
        $("#preloader_4").show();
        var selectedIndex = event.target.selectedIndex;
        $(".select2").attr("tabindex",selectedIndex);
        if (selectedIndex==-1){
            selectedIndex=0;
        }
        $("#blogs").empty();
        var tabindex = $(".select1").attr("tabindex");
        if(tabindex==-1){
            var tabindex =0;
            $(".select1").attr("tabindex","0");
        }
        var flg=true;
        blogs.forEach(function (value) {
            var indexValue = event.target.value.trim();
            if (value.tag.indexOf(indexValue)!=-1&&tabindex==0||
                value.tag.indexOf(indexValue)!=-1&&value.type.indexOf($(".select1 option").eq(tabindex).text().trim())!=-1||
                selectedIndex==0&&value.type.indexOf($(".select1 option").eq(tabindex).text().trim())!=-1||
                tabindex==0&&selectedIndex==0){
                blogApply(value);
                flg=false;
            }
        });
        $("#preloader_4").hide();
        if(flg){
            $("#blogs").append("<p>找不相关的数据</p>")
        }

    })
}
$(".all").load('navigation_menu.html');
$(function() {

    $(".back").click(function() {
        window.location.href = "index.html"
    });
    $.ajax({
        type: "post",
        url: "api/github/blog/ccxh",
        success: function(result) {
            if(result.ok) {
                blogs=result.data;
                var tagList=new Array();
                var typeList=new Array();
                blogs.forEach(function (value) {
                    blogApply(value,tagList,typeList);
                })
                //生成标签
                selectSc({type:typeList,tag:tagList});
            }
        },
        beforeSend:function () {
            $("#preloader_4").show();
        },
        complete:function (XMLHttpRequest, textStatus) {
            console.log(textStatus)
            if("success"!=textStatus){
                alert("请求失败,请联系管理员");
            }
            $("#preloader_4").hide();
        }
    });
})
