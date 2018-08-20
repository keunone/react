## 框架简介
本项目是基于 [dva](https://github.com/dvajs/dva) 框架搭建的一个后台管理网站
## 相关资料
[dva介绍PPT](http://slides.com/sorrycc/dva#/8/2)   
[dva文档](https://dvajs.com/guide/getting-started.html#%E5%AE%89%E8%A3%85-dva-cli)   
[dva基础概念](https://github.com/dvajs/dva/blob/master/docs/Concepts_zh-CN.md)  
[dva知识梳理](https://github.com/dvajs/dva-knowledgemap)  
[dva API](https://github.com/dvajs/dva/blob/f9e07c0ad7a1beb91a56b125e2acb8eb989914de/docs/API_zh-CN.md)  
[antd 文档](https://github.com/ant-design/ant-design/blob/HEAD/README-zh_CN.md)   
[例子](https://dvajs.com/guide/examples-and-boilerplates.html)：   
[1、antd admin](https://github.com/zuiidea/antd-admin)   
[2、小型库存管理系统](https://dvajs.com/guide/examples-and-boilerplates.html#%E5%AE%98%E6%96%B9)
## 运行项目
1. npm run setup
2. npm start
## 目录结构说明
```bash
├── /dist/             # 项目输出目录
├── /src/              # 项目源码目录
│ ├── /public/         # 公共文件，编译时copy至dist目录
│ ├── /components/     # 公用组件
│ ├── /routes/         # 页面级组件
│ │ └── app            # 路由入口
│ │   └── index.js     # jsx文件
│ │   └── model.js     # 数据模型
│ │   └── action.js    # action
│ ├── /services/       # 数据接口
│ ├── /themes/         # 项目样式
│ ├── /mock/           # 数据mock
│ ├── /utils/          # 工具函数
│ │ ├── index.js       # 供外部访问接口文件
│ │ ├── request.js     # 异步请求函数
│ ├── route.js         # 路由配置
│ ├── index.ejs        # 入口文件
│ └── index.html     
├── package.json       # 项目信息
├── .editorconfig      # 编辑器格式配置
├── tslint.json        # tslint检查规则配置
├── tsconfig.json      # tslint配置
├── .roadhogrc.js      # roadhogrc配置
├── .roadhogrc.mock.js # mock入口
├── theme.config.js    # antd less变量覆盖文件
└── webpack.config.js  # webpack配置拓展文件
```

##功能

### 计划中的
  1. 懒加载
  2. svg引入
  3. progress显示 
  4. 路由权限判断 - 待实现 

### 可能要考虑的
  1. 面包屑导航 - 待实现 
  2. seo优化 - 待实现
  3. 国际化 - 待实现




