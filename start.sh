#!/bin/bash
BLOG-API-PID=`ps -ef | grep blog-api.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
BLOG-SCHEDULER-PID=`ps -ef | grep blog-scheduler-1.0-SNAPSHOT.jar  | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
echo "blog-api.jar pid : " $BLOG-API-PID
echo " blog-scheduler-1.0-SNAPSHOT.jar : " $BLOG-SCHEDULER-PID
echo "-----------------------"
echo "--------准备杀死-------"
echo "-----------------------"