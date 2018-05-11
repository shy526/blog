$(function () {
    $("#get_bean").click(function () {
        var option={
            //Pasika,camel,up,low
            nameRule: $("#name_reul").val(),
            comments: $("#inlineCheckbox3").get(0).checked,
            getset:$("#inlineCheckbox1").get(0).checked,
            toStrong:$("#inlineCheckbox2").get(0).checked,
            classname: $("#classNmae").val(),
            annotation:$("#annotation").val()
        };
        var text = $("textarea").val().trim();
        if (!text){
            $("#modal").iziModal({
                title: "错误提示",
                subtitle: '转换的sql还没有填写',
                headerColor: '#BD5B5B',
                width: 600,
                onClosed:function () {
                    $('#modal').iziModal('destroy');
                }
            });
            $('#modal').iziModal('open');
            return
        }
        try {
            var bean = java2Bean(text,option);
            $(".bean").empty();
            $(".bean").append(" <pre class=\"brush:java; toolbar:false\">\n" +
                bean +
                "</pre>")
            SyntaxHighlighter.highlight();
            $(".bean").append("<textarea  class='copy_copy' style='width: 1px;height:1px'>"+bean+"</textarea>");
            $(".copy_copy").get(0).select();
            document.execCommand("Copy");
            $(".copy_copy").remove();
            $("#modal").iziModal({
                title: "copy成功",
                headerColor: '#5bdb72',
                width: 600,
                onClosed:function () {
                    $('#modal').iziModal('destroy');
                }
            });
            $('#modal').iziModal('open');
        }catch (err){
            $("#modal").iziModal({
                title: "错误提示",
                subtitle: '转换错误,请提交你的bug',
                headerColor: '#BD5B5B',
                width: 600,
                onClosed:function () {
                    $('#modal').iziModal('destroy');
                }
            });
            $('#modal').iziModal('open');
        }


    })
    countCcxh(0)
})