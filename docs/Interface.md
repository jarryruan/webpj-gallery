# 虚拟3D画展 接口文档


<!-- TOC -->

- [虚拟3D画展 接口文档](#虚拟3d画展-接口文档)
    - [常规后端部分](#常规后端部分)
        - [注意事项](#注意事项)
            - [请求与响应格式](#请求与响应格式)
            - [后端返回值规范](#后端返回值规范)
        - [用户登录](#用户登录)
        - [用户登出](#用户登出)
        - [取当前登录的用户](#取当前登录的用户)
        - [用户注册](#用户注册)
        - [获取图画列表](#获取图画列表)
        - [获取某图画的NPC介绍数据](#获取某图画的npc介绍数据)
        - [获取某图画的评论列表](#获取某图画的评论列表)
        - [对某图画发表评论](#对某图画发表评论)
    - [WebSocket 后端部分](#websocket-后端部分)
        - [由客户端发送](#由客户端发送)
            - [用户行走](#用户行走)
            - [发送弹幕](#发送弹幕)
            - [用户退出](#用户退出)
        - [由服务端发送](#由服务端发送)

<!-- /TOC -->


## 常规后端部分

### 注意事项

#### 请求与响应格式
除了GET请求的参数直接附加到url尾部之外，其余的参数、返回值均采用**JSON格式**与**UTF8编码**，即前端的请求头与后端的返回头中始终包含以下内容

```JSON
{"Content-Type": "application/json;charset=UTF-8"}
```


#### 后端返回值规范
为了前端能够方便地得知后端数据处理结果，后端的所有返回值属性中至少包含一下两种情形之一：

```JSON
    {
        "result": true,
        //操作成功

        "msessage": "",

        ...
    }
```
或失败时返回如下值

```JSON
    {
        "result": false,
        //操作失败

        "msessage": "错误原因..."
    }
```



### 用户登录
+ 备注：登陆成功后，请将用户数据保存在session中，后续其他接口就自动以该用户的身份操作（前端不再提供用户名）
+ URL : `/api/users/self`
+ 方法: `POST`

+ 参数：
    ```JSON
    {
        "username": "张三",
        "password": "123456"
    }
    ```


 + 返回值
    ```JSON
    {
        "result": true,
        "msessage": "登录成功"
    }
    ```

### 用户登出
+ 备注：登出后，会删除在session中的数据
+ URL : `/api/users/logout`
+ 方法: `GET`

+ 参数：无


 + 返回值
    ```JSON
    {
        "result": true,
        "msessage": "登出成功"
    }
    ``` 
    如果当前未登录的话
    ```JSON
    {
        "result":false,
        "msessage": "未登录"
    }
    ```    


### 取当前登录的用户
+ 备注：从Session中取出当前登录的用户信息
+ URL : `/api/users/self`
+ 方法: `GET`

+ 参数： 无

 + 返回值
    ```JSON
    {
        "result": true,
        "msessage": "",
        "user": {
            "userId": 1,
            "username": "张三"
        }
    }
    ```


### 用户注册

+ 备注：不允许用户名重复
+ URL : `/api/users`
+ 方法: `POST`

+ 参数：
    ```JSON
    {
        "username": "张三",
        "password": "123456"
    }
    ```


 + 返回值
    ```JSON
    {
        "result": true,
        "msessage": "注册成功"
    }
    ```



### 获取图画列表

+ URL : `/api/paintings`
+ 方法: `GET`

+ 参数： 无


 + 返回值
    ```JSON
    {
        "result": true,
        "msessage": "",
        "paintings": [
            {
                "paintingId": 1,
                "name": "著名画作",
                "houseId":1,
                "url": "http://path-to-your-painting/"
            },
            {
                "paintingId": 2,
                "name": "著名画作1",
                "houseId":2,
                "url": "http://path-to-your-painting/"
            },
        ]
    }
    ```


### 获取某图画的NPC介绍数据

+ URL : `/api/paintings/:paintingId/introduction`
+ 方法: `GET`


+ URL参数：
    |参数名|描述|
    |:-|:-|
    |paintingId|某图画ID|


+ 参数： 无

+ 返回值
    ```JSON
    {
        "result": true,
        "msessage": "",
        "introduction": [
            {"content": "这是一幅神奇的图画"},
            {"content": "这是一幅美丽的图画"}
        ]
    }
    ```



### 获取某图画的评论列表

+ URL : `/api/paintings/:paintingId/comments`
+ 方法: `GET`


+ URL参数：
    |参数名|描述|
    |:-|:-|
    |paintingId|某图画ID|


+ 参数： 无

+ 返回值
    ```JSON
    {
        "result": true,
        "msessage": "",
        "comments": [
            {
                "userId": 1,
                "username": "张三",
                "content": "这幅画画的真棒！",
                "transform": {
                    "position": {"x": 0, "y": 0, "z": 0},
                    "rotation": {"x": 0, "y": 0, "z": 0}
                }
            },
            {
                "userId": 2,
                "username": "李四",
                "content": "对啊这幅画画的真棒啊！",
                "transform": {
                    "position": {"x": 0, "y": 0, "z": 0},
                    "rotation": {"x": 0, "y": 0, "z": 0}
                }
            }
        ]
    }
    ```



### 对某图画发表评论

+ URL : `/api/paintings/:paintingId/comments`
+ 方法: `POST`


+ URL参数：
    |参数名|描述|
    |:-|:-|
    |paintingId|某图画ID|

+ 参数： 
    ```JSON
    {
        "content": "这幅画画的真棒！",
        "transform": {
            "position": {"x": 0, "y": 0, "z": 0},
            "rotation": {"x": 0, "y": 0, "z": 0}
        }
    }
    ```


 + 返回值
    ```JSON
    {
        "result": true,
        "msessage": "发表成功"
    }
    ```




## WebSocket 后端部分

### 由客户端发送

#### 用户行走

+ 备注： 大厅的 `paintingId` 是 `-1`
+ 事件名称： `move`
+ 数据示例：
    ```JSON
    {
        "paintingId": -1,
        "position": {
            "x": 0,
            "y": 0,
            "z": 0
        },

        "rotation": {
            "x": 0,
            "y": 0,
            "z": 0
        }
    }
    ```


#### 发送弹幕

+ 备注： 大厅的 `paintingId` 是 `-1`
+ 事件名称： `barrage`
+ 数据示例：
    ```JSON
    {
        "paintingId": -1,
        "content": "这是一条弹幕"
    }
    ```

#### 用户退出

+ 事件名称： `exit`
+ 数据示例：
    ```JSON
    {
    	"paintingId": -1
    }
    ```



### 由服务端发送

与“由客户端发送相同”，只是加上一个 `socketId` 字段用以标识用户
