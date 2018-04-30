var load={
    steyle1 : "<div class='load'><div class=\"load-container load4\">\n" +
    "      <div class=\"loader\">Loading...</div>\n" +
    "      <a href=\"index.html\">&lt; 返回首页 &gt;</a></div></div>",
    addLoad: function add(el){
        $(el).append(load.steyle1)
    },
    deleteLoad:function () {
        $(".load").remove();
    }
}