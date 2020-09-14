# Raven-weapp

为方便百度小程序接入 sentry，由 raven 改写而来的百度小程序版本。

#### 支持微信、百度、头条、qq、支付宝小程序

#### 引入文件

由于目前小程序不支持从 node_modules 中引入文件，因此以 npm 方式安装的话只能手动将 raven-weapp/dist 目录下需要的文件拷贝到其他文件中，在 app.js 中引入，例如：

```
var Raven = require('./utils/raven-weapp/build/raven')
```

或以 Bower 安装 raven-weapp 并引入：

```
var Raven = require('./bower_components/raven-weapp/build/raven')
```

#### 初始化 Raven

```
Raven.config('https://xxx@crash.youzan.com/x', options).install()
```

在 app 的 onLaunch 中初始化(?)，options 为可选配置对象，目前支持：

```
options = {
    release: '当前小程序版本'，
    environment: '指定为production才会上报',
    allowDuplicates: true, // 允许相同错误重复上报
    sampleRate: 0.5 // 采样率
}
```

#### 收集信息

收集的信息将在上报时被一起带上

##### 基本信息

初始化后 raven 会默认收集以下信息：

```
{
    SDKversion: '小程序基础库版本',
    BDversion: '百度版本',
    device: '设备型号',
    network: '网络类型',
    system: '系统信息',
}
```

可以通过[Raven.setUserContext(context)](https://docs.sentry.io/learn/context/#capturing-the-user)或者[Raven.setExtraContext(context)](https://docs.sentry.io/learn/context/#extra-context)添加更多信息（kdtId 和 userId 等）

##### 用户行为

###### console

console 的行为默认将被自动收集

###### ajax

wx.request 不可扩展，因此只能手动收集请求的行为：例如在经过封装的请求函数的成功回调内添加：

```
Raven.captureBreadcrumb({
  category: 'ajax',
  data: {
    method: 'get',
    url: 'weapp.showcase.page/1.0.0/get',
    status_code: 200
  }
```

###### dom

ui 操作的记录暂不支持

###### location

页面变化的记录暂不支持

#### 信息上报

分为 message 和 exception 的上报

##### message

使用[Raven.captureMessage(msg, option)](https://docs.sentry.io/clients/javascript/usage/#capturing-messages)上报需要上报的信息比如 ajax 的报错等

##### exception

所有 uncaught exception 都会被小程序捕获封装成 msg 传递到 app 的 onError 中，在 onError 中上报这些信息：

```
onError(msg) {
    Raven.captureException(msg, {
      level: 'error'
    })
  }
```
