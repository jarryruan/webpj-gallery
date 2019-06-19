# 高级 Web Project


## 项目信息

+ [查看接口文档](./docs/Interface.md)


## 项目部署与运行
安装项目依赖
```
npm install
```

以docker方式启动
```
docker-compose up
```

以docker后台方式启动
```
docker-compose up -d
```

终止docker容器
```
docker-compose down
```


编译前端静态文件(webpack)
```
npm start
```

开启测试服务器(webpack-dev-server)
```
npm run server
```
*服务器地址：[http://localhost:8080/gallery/](http://localhost:8080/gallery/)*


开启WebSocket服务器（热部署）
```
npm run socket-dev
```

开启WebSocket服务器
```
npm run socket
```