$(function () {
    $("#cron1 input").on('input propertychange', function () {
        var text = "";
        $("#cron1 input").each(function (val) {
            var val2 = $("#cron1 input").eq(val).val();
            text += val2 + " "
        })
        $("#cronb").val(text);
    });
    $("#yc").click(function () {
        var t=false;
        $("#cron1 input").each(function (val) {
            var val2 = $("#cron1 input").eq(val).val();
            if (!val2) {
                t= true;
            }
        })
        if (t){
            $("#modal").iziModal({
                title: "cron 中的值不能为空",
                headerColor: '#BD5B5B',
                width: 600,
                onClosed:function () {
                    $('#modal').iziModal('destroy');
                }
            });
            $('#modal').iziModal('open');
            return;
        }
        var num = $("#num").val();
        var cron = $("#cronb").val()
        if (num) {
            $(".cron-run-time").empty()
            var date = new Date()
            for (var i = 0; i < num; i++) {
                var date = cron2Runtime.analysis(cron, date);
                var html = "<p>第<span style='color: #ef5b5b'>" + (i + 1) + "</span>次,运行时间为:  " + formatDate(date) + "</p>"
                $(".cron-run-time").append(html)
            }
        } else {
            $("#modal").iziModal({
                title: "确任你的运行次数",
                headerColor: '#BD5B5B',
                width: 600,
                onClosed:function () {
                    $('#modal').iziModal('destroy');
                }
            });
            $('#modal').iziModal('open');
        }
    })
    countCcxh(0);
})