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
## blog

- 2018年2月15日
    - 为了更方便的部署项目新加两个简单脚本
        1. update.sh
            - 拉取项目 重新编译打包
        2. start.sh 
            - 部署项目
     - 修复一个打包后找不到类的问题
        - 误操作了blog下的pom.xml文件导致
        
## blog-api

- 2018年2月12日
    - 修复跨天读不到数据
- 2018年2月14日
    - 更新一个提交bug的接口
        - t_bug表中的REMARK字段需要设置为utf-8
- 2018年4月6日 
    - 添加websocket支持
- 2018年4月7日
    - 聊天室清除工作
- 2018年4月30日
    - 更改博客展示的方式
        - 从跳转github更改的本站访问
        - 通过github-Mardown-css/auto-menu,重写调整展示方式
        - 部分实现细节
            1. 数据库展示基本信息
            2. 目录页跳转展示页携带ID
            3. 获取Id,通过jsonp调用接口
            4. 服务端获取url,请求目标页,jsoup解析出相关页面
            5.  github-Mardown-css,aut-menu 渲染展示
- 2018年5月9日
    - 抽离websocket服务
    - blog按时时间倒序排序

## blog-html

- 2018年2月12日
    - 修复博客页面展示时白底不正常的错误
    - 增加githubTime的展示
- 2018年2月14日
    - 工具页面更新一个create2javaBean的功能
    - 工具页面添加一个http状态码并前端支持导出功能
- 2018年2月15日
    - 弥补echarts加载慢的问题 选用国外静态库
        - 加载不稳定(待解决)    
- 2018年2月22日
    - 修复一个bug(工具页sql2bean无法正常识别sql主键)
    - 添加工具页添加一个新的功能(cron表达式的最近运行时间)
        - 未完成开发
- 2018年2月28日
    - cron表达式解析运行时间(基本开发完毕)
        - 后续准备开发页面
- 2018年3月24日
    - cron 表达式解析功能 正式启用
        - 已知bug 解析中cron 解析可运行的值的数组 没有去重
    -  remark: 怎么久没更新,实在是被工作拖的,生活节奏有点乱
- 2018年4月7日
    - sql2bean的一些bug处理
    - 添加了项目页(未完善)
- 2018年4月30日
    - 改版
      
        
## blog-scheduler

- 2018年2月12日
    - 添加一个githubTime的爬取
- 2018年2月14日
    - 优化爬虫的爬取逻辑
- 2018年2月28日
    - github添加证书后导致无法爬取的BUG(sll证书问题)
        - 自定义了Downloader组件
- 2018年5月9日
    - 针对github时间做出爬取
    


