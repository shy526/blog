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
            result={"status":200,"msg":"OK","data":[{"id":2168,"type":"bug","title":"Dubbo在jdk1.8环境中搭建问题","tag":"Dubbo,java,","createTime":1518184502000,"url":"https://github.com/sunjiaqing/note/blob/master/Dubbo%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E5%9C%A8jdk1.8%E7%8E%AF%E5%A2%83%E4%B8%AD%E6%90%AD%E5%BB%BA%E9%97%AE%E9%A2%98.md","githubName":"sunjiaqing"},{"id":2169,"type":"Quartz","title":"Quartz的简单使用","tag":"定时任务","createTime":1518184502000,"url":"https://github.com/sunjiaqing/note/blob/master/Quartz.md","githubName":"sunjiaqing"},{"id":2170,"type":"RabbitMQ","title":"RabbitMQ的配置与介绍","tag":"RabbitMQ","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/RabbitMQ.md","githubName":"sunjiaqing"},{"id":2171,"type":"Docker","title":"Docker的简单使用","tag":"Docker","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/Docker.md","githubName":"sunjiaqing"},{"id":2172,"type":"Dubbo","title":"Dubbo配置与使用","tag":"Dubbo,Dubbox","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/Dubbo.md","githubName":"sunjiaqing"},{"id":2173,"type":"Redire","title":"Redis的配置与简单使用","tag":"redis,nosql,java","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/Redis.md","githubName":"sunjiaqing"},{"id":2174,"type":"bug","title":"restfull中文问题","tag":"java,web,restfull","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/restful%E4%B8%AD%E6%96%87%E9%97%AE%E9%A2%98.md","githubName":"sunjiaqing"},{"id":2175,"type":"项目管理","title":"Idea中配置ivy","tag":"ivy","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/ivy.md","githubName":"sunjiaqing"},{"id":2176,"type":"Zookeeper","title":"Zookeepe1er的配置与简单使用","tag":"大数据,zookeeper,RDD","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/Zookeeper.md","githubName":"sunjiaqing"},{"id":2177,"type":"json","title":"jackson的使用","tag":"序列化,json,java","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/jackson.md","githubName":"sunjiaqing"},{"id":2178,"type":"编程语言","title":"Scala基础","tag":"编程语言,Scala","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/%E8%AF%AD%E8%A8%80/Scala%E5%9F%BA%E7%A1%80.md","githubName":"sunjiaqing"},{"id":2179,"type":"编程语言","title":"Scala的安装和配置","tag":"编程语言,Scala","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/%E8%AF%AD%E8%A8%80/Scala%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AE.md","githubName":"sunjiaqing"},{"id":2180,"type":"spring小记","title":"@Scheduled的使用","tag":"java,springboot,spring,调度","createTime":1518184503000,"url":"https://github.com/sunjiaqing/note/blob/master/spring%E7%AC%94%E8%AE%B0/Spring%E8%B0%83%E5%BA%A6%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95.md","githubName":"sunjiaqing"},{"id":2181,"type":"Spark","title":"Spark安装","tag":"大数据,Spark,java","createTime":1518184504000,"url":"https://github.com/sunjiaqing/note/blob/master/%E5%A4%A7%E6%95%B0%E6%8D%AE/spark/spark%E5%AE%89%E8%A3%85.md","githubName":"sunjiaqing"},{"id":2182,"type":"Spark学习","title":"RDD编程","tag":"大数据,spark,RDD","createTime":1518184504000,"url":"https://github.com/sunjiaqing/note/blob/master/%E5%A4%A7%E6%95%B0%E6%8D%AE/spark/RDD.md","githubName":"sunjiaqing"},{"id":2183,"type":"Spark","title":"Spark概念","tag":"大数据,Spark,java","createTime":1518184504000,"url":"https://github.com/sunjiaqing/note/blob/master/%E5%A4%A7%E6%95%B0%E6%8D%AE/spark/spark%E6%A6%82%E5%BF%B5.md","githubName":"sunjiaqing"},{"id":2184,"type":"Hadoop","title":"Hadoop安装(单机模式)","tag":"大数据,Hadoop,java","createTime":1518184504000,"url":"https://github.com/sunjiaqing/note/blob/master/%E5%A4%A7%E6%95%B0%E6%8D%AE/hadoop/Hadoop%E5%AE%89%E8%A3%85day00.md","githubName":"sunjiaqing"},{"id":2185,"type":"Hadoop","title":"MapReduce概念和例子","tag":"大数据,Hadoop,java","createTime":1518184504000,"url":"https://github.com/sunjiaqing/note/blob/master/%E5%A4%A7%E6%95%B0%E6%8D%AE/hadoop/hadoop-MapReduce%20day01.md","githubName":"sunjiaqing"},{"id":2186,"type":"Hadoop","title":"命令行接口","tag":"大数据,Hadoop,java","createTime":1518184504000,"url":"https://github.com/sunjiaqing/note/blob/master/%E5%A4%A7%E6%95%B0%E6%8D%AE/hadoop/HDFS%20%E5%91%BD%E4%BB%A4%E8%A1%8C%E6%8E%A5%E5%8F%A3%20day03.md","githubName":"sunjiaqing"},{"id":2187,"type":"Hadoop","title":"Hadoop伪分布式配置","tag":"大数据,Hadoop,java","createTime":1518184505000,"url":"https://github.com/sunjiaqing/note/blob/master/%E5%A4%A7%E6%95%B0%E6%8D%AE/hadoop/hadoop%20%E4%BC%AA%E5%88%86%E5%B8%83%E5%BC%8F%E9%85%8D%E7%BD%AE%20day02.md","githubName":"sunjiaqing"},{"id":2188,"type":"Hadoop","title":"Hadoop文件系统","tag":"大数据,Hadoop,java","createTime":1518184505000,"url":"https://github.com/sunjiaqing/note/blob/master/%E5%A4%A7%E6%95%B0%E6%8D%AE/hadoop/hadoop%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%20day05.md","githubName":"sunjiaqing"},{"id":2189,"type":"Hadoop","title":"hdfs概念","tag":"大数据,Hadoop,java","createTime":1518184505000,"url":"https://github.com/sunjiaqing/note/blob/master/%E5%A4%A7%E6%95%B0%E6%8D%AE/hadoop/hdfs%20day04.md","githubName":"sunjiaqing"},{"id":2190,"type":"Hadoop","title":"输入输出剖析","tag":"大数据,Hadoop,java","createTime":1518184505000,"url":"https://github.com/sunjiaqing/note/blob/master/%E5%A4%A7%E6%95%B0%E6%8D%AE/hadoop/hadoop%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA%E6%96%87%E4%BB%B6%E5%89%96%E6%9E%90%20day-06.md","githubName":"sunjiaqing"}],"ok":true};
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
