var cron2Runtime = {
    option:{
        fields:null,
        cron:null
    },
    allowItem:{
        seconds:new Array(),
        minutes:new Array(),
        hours:new Array(),
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

        cron2Runtime.option.cron=cron;
        cron2Runtime.option.fields=cronParams;
        if (!cronParams instanceof Array || cronParams.length != 6) {
            return "时间表达式格式不正确"
        }
    },
    /**
     * 解析
     * @param date
     */
    parese: function (cronItem,array,min,max) {
        //按逗号切分
        var items = cronItem.split(",");
        if(items instanceof Array){
            for (var i=0;i<items.length;i++){
                if (!cron2Runtime.pareseAllow(array,items[i],min,max)){
                    return;
                }
            }
        }else{
            if (!cron2Runtime.pareseAllow(array,items,min,max)){
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
    pareseAllow:function (array, item, min, max) {
        //查看是否有/
        if(item.indexOf("/")!=-1){
            var itmes = item.split("/");
            if(itmes.length==2){
                var range = cron2Runtime.pareseMaxMin(itmes[0],min,max);
                if(range){
                        //不含有- 时
                    if(itmes[0].indexOf("-")==-1){
                        range.max=max-1;
                    }
                    //累加步长
                    for (var i = range.min(); i <= range.max; i += itmes[0]) {
                        //计算出所有被允许的时间
                        array.push(1);
                    }
                    return true;
                }
                return false;
            }
        }
    },
    /**
     * 分析最大值和最小值
     * @param item
     * @param min
     * @param max
     * @returns {{min: number, max: number}}
     */
    pareseMaxMin:function (item, min, max) {
        var result={min:-1,max:-2}
        if(item.indexOf("*")!=-1){
            result.min=min
            result.max=max-1;
            return result;
        }
        if(item.indexOf("-")!=-1){
            var itmes = item.split("-");
            result.min=itmes[0];
            result.max=itmes[1];
        }else{
            result.max=item;
            result.min=item
        }
        if(result.min>result.max){
            return  ;
        }
        if (result.min >= max || result.max >= max) {
            return ;
        }
        if (result.min < min || result.max < min) {
            return ;
        }
        return result;
    }

}