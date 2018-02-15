#!/bin/bash
ID=`ps -ef | grep "$NAME" | grep -v "$0" | grep -v "grep" | awk '{print $2}'`
echo $ID
echo "-----------------------"
echo "--------准备杀死-------"
echo "-----------------------"