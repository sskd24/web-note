# 一.分支命令
## 1. 查看本地和远程分支
**$ git branch -a**

**$ git branch**
```git
SSKD@SSKD74_labtop MINGW64 /e/前端/SSKD_GitHUb/github_笔记网站 (main)
$ git branch -a 
* main
  remotes/origin/master

SSKD@SSKD74_labtop MINGW64 /e/前端/SSKD_GitHUb/github_笔记网站 (main)
$ git branch
* main
```
## 2. 查看本地和远程分支对应
**git branch -vv**
```git
SSKD@SSKD74_labtop MINGW64 /e/前端/SSKD_GitHUb/github_笔记网站/web-note (main)
$ git branch -vv
* main dfad477 [origin/main] Update cmd命令行.md
```
## 3. 删除远程分支
**$ git push origin --delete [branchname]**
```git
SSKD@SSKD74_labtop MINGW64 /e/前端/SSKD_GitHUb/github_笔记网站 (main)
$ git branch -a 
* main
  remotes/origin/master

SSKD@SSKD74_labtop MINGW64 /e/前端/SSKD_GitHUb/github_笔记网站 (main)
$ git push origin --delete master
To https://github.com/sskd24/web-note.git
 - [deleted]         master

SSKD@SSKD74_labtop MINGW64 /e/前端/SSKD_GitHUb/github_笔记网站 (main)
$ git branch -a
* main
```
## 4. 重新关联本地和远程分支
**$ git branch --set-upstream-to=origin/main main**
```git
//把本地main关联远程master，改为main关联远程main

SSKD@SSKD74_labtop MINGW64 /e/前端/SSKD_GitHUb/github_笔记网站 (main)
$ git branch -vv
* main b6d7497 [origin/master: gone] 修改md图片

SSKD@SSKD74_labtop MINGW64 /e/前端/SSKD_GitHUb/github_笔记网站 (main)
$ git branch --set-upstream-to=origin/main main
branch 'main' set up to track 'origin/main'.

SSKD@SSKD74_labtop MINGW64 /e/前端/SSKD_GitHUb/github_笔记网站 (main)
$ git branch -vv
* main b6d7497 [origin/main: ahead 1, behind 5] 修改md图片
```
# 二.ssh相关问题
全面概述Gitee和GitHub生成/添加SSH公钥：https://www.cnblogs.com/Can-daydayup/p/13063280.html

# 三.sourcetree相关
sourcetree教程：https://zhuanlan.zhihu.com/p/533052453?utm_campaign=&utm_medium=social&utm_oi=1118947110606753792&utm_psn=1540345613912231936&utm_source=com.microsoft.emmx#tocbar-468rms