var cron2Runtime = {
    option: {
        fields: null,
        cron: null
    },
    /**
     * 可执行的时间分析
     */
    allowItem: {
        seconds: new Array(),
        minutes: new Array(),
        hours: new Array(),
        daysOfMonth: new Array(),
        months: new Array(),
        daysOfWeek: new Array()
    },
    analysis:function (cron, date) {
        cron2Runtime.checkCron(cron)
        var next = cron2Runtime.next(date);
        cron2Runtime.allowItem= {seconds: new Array(), minutes: new Array(), hours: new Array(), daysOfMonth: new Array(), months: new Array(), daysOfWeek: new Array()};
        cron2Runtime.option={
            fields: null,
            cron: null
        };
        return next;
    },
    /**
     * 验证cron表达式是否真确
     * @param crontime
     */
    checkCron: function (cron) {
        if (!cron) {
            return "时间表达式不能为空"
        }
        var cronParams = cron.split(" ");
        if (!cronParams instanceof Array || cronParams.length != 6) {
            return "时间表达式格式不正确"
        }
        //秒
        cron2Runtime.parese(cron2Runtime.allowItem.seconds, cronParams[0], 0, 60);
        //分钟
        cron2Runtime.parese(cron2Runtime.allowItem.minutes, cronParams[1], 0, 60);
        //小时
        cron2Runtime.parese(cron2Runtime.allowItem.hours, cronParams[2], 0, 24);
        //日期
        cron2Runtime.pareseDay(cron2Runtime.allowItem.daysOfMonth, cronParams[3], 1, 32);
        // 月分
        cron2Runtime.pareseDay(cron2Runtime.allowItem.months, cronParams[4], 1, 13);
        //星期
        cron2Runtime.pareseDay(cron2Runtime.allowItem.daysOfWeek, cronParams[5], 1, 8);

        console.log(cron2Runtime.allowItem);
        cron2Runtime.option.cron = cron;
        cron2Runtime.option.fields = cronParams;

    },
    /**
     * 解析
     * @param date
     */
    parese: function (array, cronItem, min, max) {
        //按逗号切分
        var items = cronItem.split(",");
        if (items instanceof Array) {
            for (var i = 0; i < items.length; i++) {
                if (!cron2Runtime.pareseAllow(array, items[i], min, max)) {
                    return;
                }
            }
        } else {
            if (!cron2Runtime.pareseAllow(array, items, min, max)) {
                return;
            }
        }
    },
    /**
     *  分析允许被存放的值
     * @param array
     * @param item
     * @param min
     * @param max
     * @returns {boolean}
     */
    pareseAllow: function (array, item, min, max) {
        var range;
        //查看是否有/
        if (item.indexOf("/") != -1) {
            var itmes = item.split("/");
            if (itmes.length == 2) {
                range = cron2Runtime.pareseMaxMin(itmes[0], min, max);
                if (range) {
                    //不含有- 时
                    if (itmes[0].indexOf("-") == -1) {
                        range.max = max - 1;
                    }
                    //累加步长
                    for (var i = range.min; i <= range.max; i += parseInt(itmes[1])) {
                        //计算出所有被允许的时间
                        array.push(i);
                    }

                } else {
                    return false;
                }
            }
        } else {
            range = cron2Runtime.pareseMaxMin(item, min, max);
            for (var i = range.min; i <= range.max; i++) {
                //计算出所有被允许的时间
                array.push(i)
            }

        }
        if (!range) {
            return false;
        }

        return true;
    },
    /**
     * 分析最大值和最小值
     * @param item
     * @param min
     * @param max
     * @returns {{min: number, max: number}}
     */
    pareseMaxMin: function (item, min, max) {
        var result = {min: -1, max: -2}
        if (item.indexOf("*") != -1) {
            result.min = parseInt(min)
            result.max = parseInt(max - 1);
            return result;
        }
        if (item.indexOf("-") != -1) {
            var itmes = item.split("-");
            result.min = parseInt(itmes[0]);
            result.max = parseInt(itmes[1]);
        } else {
            result.max = parseInt(item);
            result.min = parseInt(item);
        }
        if (result.min > result.max) {
            return;
        }
        if (result.min >= max || result.max >= max) {
            return;
        }
        if (result.min < min || result.max < min) {
            return;
        }
        return result;
    },
    pareseDay: function (array, item, min, max) {
        if (item.indexOf("?") != -1) {
            item = "*";
        }
        cron2Runtime.pareseAllow(array, item, min, max);
    },
    next: function (date) {
        console.log("现在要推算的:"+cron2Runtime.dateFtt("yyyy-MM-dd hh:mm:ss",date))
        date=new Date(date.getTime()+1000);
        console.log("现在要推算的+1000:"+cron2Runtime.dateFtt("yyyy-MM-dd hh:mm:ss",date))
        var allowItem = cron2Runtime.allowItem;
        //获取日(1-31)
        var day = date.getDate();
        //获取月份(0-11,0代表1月，+1 匹配 cron
        var month = date.getMonth() + 1;
        //获取星期?(0-6,0代表星期天) +1 匹配cron
        var week = date.getDay() + 1;
        //nianfen
        var year =date.getFullYear();
        var yearMonthDay = cron2Runtime.findNextDay(day, month, year);
        var temp = new Date(yearMonthDay.year + "/" + yearMonthDay.month + "/" + yearMonthDay.day);
        if (temp.getTime()>date.getTime()){
            temp.setSeconds(allowItem.seconds[0])
            temp.setMinutes(allowItem.minutes[0])
            temp.setHours(allowItem.hours[0])
        }else {
            //获取秒数(0-59)
            var seconds = date.getSeconds();
            var updateSeconds = cron2Runtime.findNext(allowItem.seconds, seconds);
            //获取分钟数(0-59)
            var minutes = date.getMinutes();
            var updateMinutes = cron2Runtime.findNext(allowItem.minutes, minutes + updateSeconds.increment);
            //获取小时数(0-23)
            var hours = date.getHours();
            var updateHours = cron2Runtime.findNext(allowItem.hours, hours + updateMinutes.increment);
            //说明数据跨天
            if( updateHours.increment!=0){
                //加一天增量
                temp.setDate(temp.getDate()+updateHours.increment)
                temp.setSeconds(updateSeconds.value)
                temp.setMinutes(updateMinutes.value)
                temp.setHours(updateHours.value)
                //時間跨天之後重新推算
                console.log("重新推算:"+cron2Runtime.dateFtt("yyyy-MM-dd hh:mm:ss",temp))
                temp=new Date(temp.getTime()-1000);
                console.log("重新推算+1000:"+cron2Runtime.dateFtt("yyyy-MM-dd hh:mm:ss",temp))
                return cron2Runtime.next(temp)
            }
            temp.setSeconds(updateSeconds.value)
            temp.setMinutes(updateMinutes.value)
            temp.setHours(updateHours.value)
        }
        return temp;
    },
    findNext: function (array, value) {
        //TODO:后期优化
        var newValue = -1;
        for (var i = 0; i < array.length; i++) {
            //x选出大于等于当前值的数
            if (array[i] >= value) {
                newValue = array[i];
                break;
            }
        }
        if (newValue != -1) {
            return {value: newValue, increment: 0};
        } else {
            //这一时间内没有符合标准的
            return {value: array[0], increment: 1};
        }
    },
    findNextDay: function (day, month, year) {
        var updateMonth = cron2Runtime.findNext(cron2Runtime.allowItem.months, month);
        year += updateMonth.increment;
        if (updateMonth.value != month) {
            var maxDay = cron2Runtime.getDaysInMonth(year, month);
            for (var i = 0; i < cron2Runtime.allowItem.daysOfMonth.length; i++) {
                if (cron2Runtime.allowItem.daysOfMonth[i] <= maxDay) {
                    day = cron2Runtime.allowItem.daysOfMonth[i]
                    break;
                }

            }
        }
        //说明是当前月
        var updateDay = cron2Runtime.findNext(cron2Runtime.allowItem.daysOfMonth, day);
        var maxDay = cron2Runtime.getDaysInMonth(year, month);
        //超出最大天的情况或者出现增量的情况下冲重新寻找
        if (updateDay.value > maxDay || updateDay.increment != 0) {
            return cron2Runtime.findNextDay(updateDay.value, updateMonth.value + 1, year);
        }
        //获取推算日期的星期
        var newWeek = cron2Runtime.getWeek(year, updateMonth.value, updateDay.value);
        var updateWeek = cron2Runtime.findNext(cron2Runtime.allowItem.daysOfWeek, newWeek);
        if (updateWeek.value != newWeek) {
            //算出符合星期数的天数
            var number = Math.abs(updateWeek.value - newWeek);
            return cron2Runtime.findNextDay(updateDay.value + newWeek, updateMonth.value, year);
        }
        return {year: year, month: updateMonth.value, day: day}
    },
    getDaysInMonth: function (year, month) {
        var temp = new Date(year, month,0);
        return temp.getDate();
    },
    getWeek: function (year, month, day) {
        var temp = new Date(year ,month , day);
        return temp.getDay() + 1;
    },
    dateFtt:function (fmt,date) { //author: meizz
        var o = {
            "M+" : date.getMonth()+1,                 //月份
            "d+" : date.getDate(),                    //日
            "h+" : date.getHours(),                   //小时
            "m+" : date.getMinutes(),                 //分
            "s+" : date.getSeconds(),                 //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
            fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
            if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
    }
}