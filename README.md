# blog
[ccxh.top ](http://www.ccxh.top)

## nginx 测试配置

```
server {
    listen		8021;
    server_name  localhost;
    proxy_set_header X-Forwarded-Host $host;
    proxy_set_header X-Forwarded-Server $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    location /{
        #静态页面
        root F:\javap\blog\blog-html;
    }
    location /api/ {
        # api服务
        proxy_pass http://localhost:8090/;
    }
}
```

## blog-api
- 2018年2月12日
    - 修复跨天读不到数据
- 2018年2月14日
    - 更新一个提交bug的接口
        - t_bug表中的REMARK字段需要设置为utf-8

## blog-html
- 2018年2月12日
    - 修复博客页面展示时白底不正常的错误
    - 增加githubTime的展示
 - 2018年2月14日
    - 工具页面更新一个create2javaBean的功能
    
## blog-scheduler
- 2018年2月12日
    - 添加一个githubTime的爬取

