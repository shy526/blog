/**
 * 统计
 * @param type 类型
 * @param extend 扩展字段
 */
function countCcxh(type,extend) {
    $.ajax({
        type:"post",
        url: "/api/count/access",
        data:{
            type:type,
            extend: extend
        }
    });
}