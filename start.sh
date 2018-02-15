#!/bin/bash
BLOG_API_PID=`ps -ef | grep blog-api.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
BLOG_SCHEDULER_PID=`ps -ef | grep blog-scheduler-1.0-SNAPSHOT.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
echo "blog-api.jar pid : "$BLOG_API_PID
echo "blog-scheduler-1.0-SNAPSHOT.jar pid : "$BLOG_SCHEDULER_PID
echo "--------------------------"
echo "---准备杀死blog-api.jar---"
echo "--------------------------"
kill -9 $BLOG_API_PID
if [ $? -eq 0 ]
then
    echo "执行成功"
else
    echo "执行失败"
fi

kill -9 $BLOG_API_PID
kill -9 $BLOG_SCHEDULER_PID
if [ $? -eq 0 ]
then
    echo "执行成功"
else
    echo "执行失败"
fi

echo "--------------------------"
echo "-------正在重新启动-------"
echo "--------------------------"
nohup java -jar /home/project/blog-api/blog-api.jar > /home/project/blog-api/logs/spring.out &
if [ $? -eq 0 ]
then
    echo "执行成功"
else
    echo "执行失败"
fi

nohup java -jar /home/project/blog-scheduler/blog-scheduler-1.0-SNAPSHOT.jar > /home/project/blog-scheduler/logs/spring.out &
if [ $? -eq 0 ]
then
    echo "执行成功"
else
    echo "执行失败"
fi

echo "--------------------------"
echo "---------查询pid中--------"
echo "--------------------------"

BLOG_API_PID=`ps -ef | grep blog-api.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
BLOG_SCHEDULER_PID=`ps -ef | grep blog-scheduler-1.0-SNAPSHOT.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
echo "blog-api.jar pid : "$BLOG_API_PID
echo "blog-scheduler-1.0-SNAPSHOT.jar pid : "$BLOG_SCHEDULER_PID