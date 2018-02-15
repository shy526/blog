#!/bin/bash
BLOG_API_PID=`ps -ef | grep blog-api.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
BLOG_SCHEDULER_PID=`ps -ef | grep blog-scheduler-1.0-SNAPSHOT.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
echo "--------------------------"
echo "------获取叛徒代号中------"
echo "--------------------------"
echo "blog-api.jar pid : "$BLOG_API_PID
echo "blog-scheduler-1.0-SNAPSHOT.jar pid : "$BLOG_SCHEDULER_PID
echo "--------------------------"
echo "--------叛徒清理中--------"
echo "--------------------------"
kill -9 $BLOG_API_PID
if [ $? -eq 0 ]
then
    echo "成功刺杀blog-api.jar"
else
    echo "刺杀blog-api.jar失败"
fi

kill -9 $BLOG_SCHEDULER_PID
if [ $? -eq 0 ]
then
    echo "成功刺杀grep blog-scheduler-1.0-SNAPSHOT.jar"
else
    echo "刺杀grep blog-scheduler-1.0-SNAPSHOT.jar失败"
fi
echo "--------------------------"
echo "-------正在烧毁尸体-------"
echo "--------------------------"
rm -rf /home/project/blog-api/blog-api.jar
if [ $? -eq 0 ]
then
    echo "烧毁+1"
else
    echo "烧毁失败"
fi
rm -rf /home/project/blog-scheduler/blog-scheduler-1.0-SNAPSHOT.jar
if [ $? -eq 0 ]
then
    echo "烧毁+1"
else
    echo "烧毁失败"
fi

echo "--------------------------"
echo "-------物色新的种子-------"
echo "--------------------------"
cp /home/blog/blog/blog-api/target/blog-api.jar /home/project/blog-api/
if [ $? -eq 0 ]
then
    echo "种子+1"
else
    echo "种子-1"
fi
cp /home/blog/blog/blog-scheduler/target/blog-scheduler-1.0-SNAPSHOT.jar /home/project/blog-scheduler/
if [ $? -eq 0 ]
then
    echo "种子+1"
else
    echo "种子-1"
fi

echo "--------------------------"
echo "-------培养新的刺客-------"
echo "--------------------------"
nohup java -jar /home/project/blog-api/blog-api.jar > /home/project/blog-api/logs/spring.out &
if [ $? -eq 0 ]
then
    echo "培养blog-api.jar成功"
else
    echo "培养blog-api.jar失败"
fi

nohup java -jar /home/project/blog-scheduler/blog-scheduler-1.0-SNAPSHOT.jar > /home/project/blog-scheduler/logs/spring.out &
if [ $? -eq 0 ]
then
    echo "培养blog-scheduler-1.0-SNAPSHOT.jar成功"
else
    echo "培养blog-scheduler-1.0-SNAPSHOT.jar失败"
fi

echo "--------------------------"
echo "---------分配代号中-------"
echo "--------------------------"

BLOG_API_PID=`ps -ef | grep blog-api.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
BLOG_SCHEDULER_PID=`ps -ef | grep blog-scheduler-1.0-SNAPSHOT.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
echo "blog-api.jar pid : "$BLOG_API_PID
echo "blog-scheduler-1.0-SNAPSHOT.jar pid : "$BLOG_SCHEDULER_PID

echo "--------------------------"
echo "--------拆除训练中心------"
echo "--------------------------"
rm -rf /home/project/blog-html/*
if [ $? -eq 0 ]
then
    echo "拆除成功"
else
    echo "拆除失败"
fi
echo "--------------------------"
echo "-----建立新的训练中心-----"
echo "--------------------------"
cp /home/blog/blog/blog-html/* /home/project/blog-html/
if [ $? -eq 0 ]
then
    echo "建立成功"
else
    echo "建立失败"
fi