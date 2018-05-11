
function countCcxh(type,extend) {
    $.ajax({
        type:"post",
        url: "/api/count/access",
        data:{
            type:type,
            extend: extend
        }
    })
}