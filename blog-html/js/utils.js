/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
function formatDate(date, fmt) {
    date = date == undefined ? new Date() : date;
    date = typeof date == 'number' ? new Date(date) : date;
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    var obj =
        {
            'y': date.getFullYear(), // 年份，注意必须用getFullYear
            'M': date.getMonth() + 1, // 月份，注意是从0-11
            'd': date.getDate(), // 日期
            'q': Math.floor((date.getMonth() + 3) / 3), // 季度
            'w': date.getDay(), // 星期，注意是0-6
            'H': date.getHours(), // 24小时制
            'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
            'm': date.getMinutes(), // 分钟
            's': date.getSeconds(), // 秒
            'S': date.getMilliseconds() // 毫秒
        };
    var week = ['天', '一', '二', '三', '四', '五', '六'];
    for(var i in obj)
    {
        fmt = fmt.replace(new RegExp(i+'+', 'g'), function(m)
        {
            var val = obj[i] + '';
            if(i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
            for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
            return m.length == 1 ? val : val.substring(val.length - m.length);
        });
    }
    return fmt;
}

function popover() {
    var snadeId=Math.random();
    var shade="<div class=\"sweet-overlay\" tabindex=\"-1\" id=\"seww"+snadeId+"\" " +
        "style=\"opacity: 2.19; display: block; background-color: rgba(0,0,0,.4);    background-color: rgba(0,0,0,.4);\n" +
        "    position: fixed;\n" +
        "    left: 0;\n" +
        "    right: 0;\n" +
        "    top: 0;\n" +
        "    bottom: 0;\"></div>"
    var html="<div class=\"modal fade bs-example-modal-lg in\"  tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"false\" style=\"display: block;\">\n" +
    "    <div class=\"modal-dialog add-modal add-modallengg\">\n" +
    "        <div class=\"modal-content\" style=\"margin-top: 0px;\">\n" +
    "            <div class=\"modal-header modal-headernimadan\">\n" +
    "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">\n" +
    "                    <i class=\"icon-close\"></i>\n" +
    "                </button>\n" +
    "                <h4 class=\"modal-title\">提交bug <span style=\"float: right;cursor: pointer;padding-right: 10px\" class=\"XdisplayNone\">X</span></h4>\n" +
    "            </div>\n" +
    "            <div class=\"delivery-popup modal-body\">\n" +
    "            <div>\n" +
    "                \n" +
    "            </div>\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n";
    $("html").append($(shade));
    console.log("gg ")

}