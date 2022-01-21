## 简介

easy-chatbot-controller是一个聊天机器人控制器，可以使用htpp调用方式向你的聊天机器人发布消息。

配合聊天机器人客户端使用 https://github.com/atorber/wechaty-mqtt-link

## 实现架构

控制端app——百度云MQTT——聊天机器人

## 示例

```
import BotController from '../src/index.js'

const iotcoreid = '百度云物联网核心套件IoTCoreId'
const username = 'MQTT用户名'
const password = 'MQTT密码'
const botId = '聊天机器人名称'

const bcr = new BotController(iotcoreid, username, password, botId)

async function main() {
  // await bcr.sendText(['tyutluyc',], 'hello')
  // await bcr.sendContact(['tyutluyc',],'ledongmao')
  // await bcr.sendAttachment(['tyutluyc',],'https://wechaty.github.io/wechaty/images/bot-qr-code.png')
  // await bcr.sendImage(['tyutluyc',],'https://wechaty.github.io/wechaty/images/bot-qr-code.png')
  let mp = {
    "appid": "wx36027ed8c62f675e",
    "description": "群组大师群管理工具",
    "title": "群组大师",
    "pagePath": "pages/start/relatedlist/index.html",
    "thumbKey": "",
    "thumbUrl": "http://mmbiz.qpic.cn/mmbiz_jpg/mLJaHznUd7O4HCW51IPGVarcVwAAAuofgAibUYIct2DBPERYIlibbuwthASJHPBfT9jpSJX4wfhGEBnqDvFHHQww/0",
    "username": "gh_6c52e2baeb2d@app"
  }
  // await bcr.sendMiniProgram(['tyutluyc',], mp)
  let link = {
    "description": "WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love",
    "thumbnailUrl": "https://avatars0.githubusercontent.com/u/25162437?s=200&v=4",
    "title": "Welcome to Wechaty",
    "url": "https://github.com/wechaty/wechaty"
  }
  await bcr.sendUrl(['tyutluyc',], link)
  // await bcr.sendAt(['tyutluyc',], 'hi', '5550027590@chatroom')
}

main()
```



