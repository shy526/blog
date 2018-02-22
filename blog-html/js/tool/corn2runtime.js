var cron2Runtime = {
    option: {
        fields: null,
        cron: null
    },
    allowItem: {
        seconds: new Array(),
        minutes: new Array(),
        hours: new Array(),
        daysOfMonth:new Array(),
        months:new Array(),
        daysOfWeek:new Array()
    }
    ,
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
                    for (var i = range.min; i <= range.max; i +=parseInt(itmes[1]) ) {
                        //计算出所有被允许的时间
                        array.push(i);
                    }

                }else {
                    return false;
                }
            }
        }else {
            range=cron2Runtime.pareseMaxMin(item, min, max);
            for (var i = range.min; i <= range.max; i ++) {
                //计算出所有被允许的时间
                array.push(i)
            }

        }
        if (!range){
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
            result.min =  parseInt(min)
            result.max =  parseInt(max - 1);
            return result;
        }
        if (item.indexOf("-") != -1) {
            var itmes = item.split("-");
            result.min = parseInt(itmes[0]);
            result.max = parseInt(itmes[1]);
        } else {
            result.max = parseInt(item) ;
            result.min = parseInt(item) ;
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
    pareseDay:function (array, item, min, max) {
        if (item.indexOf("?")!=-1) {
            item = "*";
        }
        cron2Runtime.pareseAllow(array,item,min,max);
    }
}