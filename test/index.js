import BotController from '../src/index.js'

// const iotcoreid = ''
// const username = ''
// const password = ''
// const botId = ''

const bcr = new BotController(iotcoreid, username, password, botId)

async function main() {
  await bcr.sendText(['tyutluyc',], 'hello')
  await bcr.createRoom(['tyutluyc', 'ledongmao'], 'hello')
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
  // await bcr.sendUrl(['tyutluyc',], link)
  // await bcr.sendAt(['tyutluyc',], 'hi', '5550027590@chatroom')
}

main()
