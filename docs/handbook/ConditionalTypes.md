---
title: GitLab-CI配置流水线部署
author: gongcy
date: '2021-12-12'
---

## 简介
### 基本概念
#### GitLab-CI
GitLab-CI 即为 GitLab Continuous Integration，也就是GitLab自带的持续集成工具。
其思想就是每次用户push代码到GitLab上时触发执行gitlab-ci.yml 脚本，脚本的内容包括了测试，编译，部署等一系列自定义的内容。
#### GitLab-Runner


## 安装
```bash
$ curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-ci-multi-runner/script.rpm.sh | sudo bash

$ sudo yum install gitlab-ci-multi-runner
```

详细可参考[GitLab runner官网安装教程](https://docs.gitlab.com/runner/install/)

## 注册
向GitLab-CI注册一个Runner需要两样东西：GitLab-CI的url和注册token。可以在项目代码仓库中找到

找到token之后，运行下面这条命令注册Runner
```bash
$ sudo gitlab-ci-multi-runner register
```
按照提示输入URL
```
Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com )
https://gitlab.com
```
输入token
```
Enter the token you obtained to register the Runner:
Please enter the gitlab-ci token for this runner
xxx
```
输入描述（此描述后续可在界面上修改）
```
Enter a description for the Runner, you can change this later in GitLab's UI:
Please enter the gitlab-ci description for this runner
[hostame] my-runner
```
输入与这个runner相关的tag，gitlab-ci.yml可通过此tag触发该runner构建流水线任务（此处也可后续在界面修改）
```
Enter the tags associated with the Runner, you can change this later in GitLab's UI:
Please enter the gitlab-ci tags for this runner (comma separated):
my-tag,another-tag
```
是否允许没有tag的任务执行
```
Choose whether the Runner should pick up jobs that do not have tags, you can change this later in GitLab's UI (defaults to false):
Whether to run untagged jobs [true/false]:
[false]: true
```
是否对当前项目锁定Runner
```
Choose whether to lock the Runner to the current project, you can change this later in GitLab's UI. Useful when the Runner is specific (defaults to true):
Whether to lock Runner to current project [true/false]:
[true]: true
```
选择Runner的执行器
```
Enter the Runner executor:
Please enter the executor: ssh, docker+machine, docker-ssh+machine, kubernetes, docker, parallels, virtualbox, docker-ssh, shell:
shell
```
如果上一步选择了docker，这一步需要填写
```
If you chose Docker as your executor, you'll be asked for the default image to be used for projects that do not define one in .gitlab-ci.yml:
Please enter the Docker image (eg. ruby:2.1):
alpine:latest
```
详细可参考[官方文档](https://docs.gitlab.com/runner/register/index.html)

注册完成之后，GitLab-CI就会多出一条Runner记录,GitLab-CI会为这个Runner生成一个唯一的token，以后Runner就通过这个token与GitLab-CI进行通信。
然后点击页面右侧Shared Runners中的按钮，使按钮状态变为Disabled Shared Runners。

```bash
$ sudo gitlab-ci-multi-runner list/verify
```

## 配置
###### gitlab-ci.yml
这个是在git项目的根目录下的一个文件，记录了一系列的阶段和执行规则,包含一系列的执行脚本和指定的runner名称。GitLab-CI在push后会解析它，根据里面的内容调用runner来运行。

详细可参考[官方文档](https://docs.gitlab.com/ee/ci/yaml/)

## 启动
`sudo gitlab-ci-multi-runner start` 后台启动
`sudo gitlab-ci-multi-runner run` 前台启动
`sudo gitlab-ci-multi-runner status` 查看状态
`sudo gitlab-runner -debug run` 前台启动（调试模式，会在console输出log）