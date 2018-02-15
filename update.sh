#!/bin/bash
echo "拉取更新"
echo "--------------------------------------------"
git pull
echo "清理"
mvn clean
echo "重新打包"
mvn install