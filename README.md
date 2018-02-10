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

