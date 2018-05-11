$(function () {
    $.ajax({
        type: "post",
        url: "api/github/blog/ccxh",
        success: function (result) {
            if (result.ok) {
                var data = result.data;
                data.forEach(function (value) {
                    $(".blog-content").append(
                        "<article >" +
                        "<h3>"+value.title+"</h3>" +
                        "<p>"+tagDispose(value.tag)+"</p>" +
                        "<p><a href='"+"mardown_page.html"+"?id="+value.id+"' target=\"_blank\">点击阅读</a></p>" +
                        "</article>"+ "<div class='line'></div>"
                    );
                })
                console.log(result)
            }
        }
    });

    $.ajax({
        type:"post",
        url:"api/project/all",
        success:function (result) {
            if(result.ok){
                var datas=result.data
                datas.forEach(function (data) {
                    $(".project").append(
                        "<article>\n" +
                        "<h2>"+data.projectname+"</h2>\n" +
                        "<p>"+data.projecttitle+"</p>\n" +
                        "<a href='"+data.projecturl+"' target='_blank'>点击查看</a>\n" +
                        "</article>\n" +
                        "<div class=\"line\"></div>"
                    );
                });
            }
        }
    });
    countCcxh(0)
})
function tagDispose(value){
    var tags = value.split(",");
    var html="";
    for (var i=0;i<tags.length;i++){
        html+="<span>"+tags[i]+"&nbsp; &nbsp;</span>"
    }
    return html;
}