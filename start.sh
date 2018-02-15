#!/bin/bash
BLOG_API_PID=`ps -ef | grep blog-api.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
BLOG_SCHEDULER_PID=`ps -ef | grep blog-scheduler-1.0-SNAPSHOT.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
echo "blog-api.jar pid : "$BLOG_API_PID
echo " blog-scheduler-1.0-SNAPSHOT.jar : "$BLOG_SCHEDULER_PID
echo "-----------------------"
echo "--------准备杀死-------"
echo "-----------------------"