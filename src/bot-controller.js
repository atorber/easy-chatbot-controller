import rp from 'request-promise'

class BotController {
  constructor(iotcoreid,username, password, botId) {
    this.username = username
    this.password = password
    this.botId = botId
    this.host = `https://${iotcoreid}.iot.gz.baidubce.com`
  }

  async pubMsg(msg) {
    let commandInvoke = `thing/chatbot/${this.botId}/command/invoke`
    // 获取mqtt请求token
    let opt = {
      method: 'POST',
      url: this.host,
      body: {
        username: this.username,
        password: this.password
      },
      json: true,
      encoding: null
    }

    let res = await rp(opt)
    let pub_token = res.token
    console.debug(pub_token)

    // 推送消息
    let url = `${this.host}pub?topic=${commandInvoke}&qos=0`
    opt = {
      method: 'POST',
      url,
      headers: {
        token: pub_token,
        Accept: 'application/json',
        'Content-Type': 'application/octet-stream'
      },
      body: JSON.stringify(msg)
    }

    // console.info(opt)

    let push_res = await rp(opt)
    console.debug(push_res)

    return push_res
  }

  async send(toContacts, messagePayload) {

    let msg = {
      "reqId": "442c1da4-9d3a-4f9b-a6e9-bfe858e4ac43",
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "send",
      "params": {
        toContacts,
        "messageType": "Text",
        messagePayload
      }
    }

    return await this.pubMsg(msg)

  }

  async sendAt(room, toContacts, messagePayload) {
    let msg = {
      "reqId": "442c1da4-9d3a-4f9b-a6e9-bfe858e4ac43",
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "sendAt",
      "params": {
        room,
        toContacts,
        messagePayload
      }
    }

    return await this.pubMsg(msg)

  }

  getCurTime() {
    //timestamp是整数，否则要parseInt转换
    let timestamp = new Date().getTime()
    var timezone = 8 //目标时区时间，东八区
    var offset_GMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
    var time = timestamp + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000
    return time
  }
  getCurTs() {
    //timestamp是整数，否则要parseInt转换
    let timestamp = new Date().getTime()
    return timestamp
  }
}

export { BotController }

export default BotController
