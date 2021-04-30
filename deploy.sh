#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'doc.feitui.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git branch -M main
git push -f git@github.com:Liamliu/feitui.git main:gh_pages

cd -