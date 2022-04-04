import rp from 'request-promise'
import { v4 } from 'uuid'

class BotController {
  constructor(iotcoreid, username, password, botId) {
    this.username = username || process.env['MQTT_USERNAME']
    this.password = password || process.env['MQTT_PASSWORD']
    this.botId = botId || process.env['BOTID']
    this.iotcoreid = iotcoreid || process.env['MQTT_COREID']
    this.host = `http://${this.iotcoreid}.iot.gz.baidubce.com`
    this.authTime = 0
    this.token = ''
    this.commandInvoke = `thing/chatbot/${this.botId}/command/invoke`
  }

  async pubMsg(msg) {
    let curTime = new Date().getTime()
    let isTimeOut = (curTime - this.authTime) < 180 && this.authTime != 0
    if (!this.token || isTimeOut) {
      try {
        await this.auth()
      } catch (err) {
        return err
      }
    }
    // 推送消息
    let url = `${this.host}/pub?topic=${this.commandInvoke}&qos=0`
    let opt = {
      method: 'POST',
      url,
      headers: {
        token: this.token,
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

  async pubMsgByName(name, params) {
    let msg = {
      "reqId": v4(),
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": name,
      "params": params
    }
    let curTime = new Date().getTime()
    let isTimeOut = (curTime - this.authTime) < 180 && this.authTime != 0
    if (!this.token || isTimeOut) {
      try {
        await this.auth()
      } catch (err) {
        return err
      }
    }
    // 推送消息
    let url = `${this.host}/pub?topic=${this.commandInvoke}&qos=0`
    let opt = {
      method: 'POST',
      url,
      headers: {
        token: this.token,
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

  async auth() {
    // 获取mqtt请求token
    let opt = {
      method: 'POST',
      url: `${this.host}/auth`,
      body: {
        username: this.username,
        password: this.password,
        tokenLifeSpanInSeconds: 600
      },
      json: true,
      encoding: null
    }

    let res = await rp(opt)
    if (res.token) {
      this.token = res.token
      this.authTime = new Date().getTime()
    }
    return res
  }

  async createRoom(contactList, topic) {
    let msg = {
      "reqId": v4(),
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "send",
      "params": {
        "contactList": contactList,
        "topic": topic
      }
    }

    return await this.pubMsg(msg)

  }

  async contactFindAll() {

    let msg = {
      "reqId": v4(),
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "contactFindAll",
      "params": {
      }
    }

    return await this.pubMsg(msg)

  }

  async roomFindAll() {

    let msg = {
      "reqId": v4(),
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "roomFindAll",
      "params": {
      }
    }

    return await this.pubMsg(msg)

  }

  async sendText(toContacts, text) {

    let msg = {
      "reqId": v4(),
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "send",
      "params": {
        toContacts,
        "messageType": "Text",
        messagePayload: text
      }
    }

    return await this.pubMsg(msg)

  }

  async sendContact(toContacts, contactId) {

    let msg = {
      "reqId": v4(),
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "send",
      "params": {
        toContacts,
        messageType: "Contact",
        messagePayload: contactId
      }
    }

    return await this.pubMsg(msg)
  }

  async sendAttachment(toContacts, url) {

    let msg = {
      "reqId": v4(),
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "send",
      "params": {
        toContacts,
        "messageType": "Attachment",
        messagePayload: url
      }
    }
    return await this.pubMsg(msg)
  }

  async sendImage(toContacts, url) {

    let msg = {
      "reqId": v4(),
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "send",
      "params": {
        toContacts,
        "messageType": "Image",
        messagePayload: url
      }
    }
    return await this.pubMsg(msg)
  }

  async sendUrl(toContacts, link) {
    if (!(link.url && link.title && link.thumbnailUrl && link.description)) {
      return '缺少必要参数'
    }
    let msg = {
      "reqId": v4(),
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "send",
      "params": {
        toContacts,
        "messageType": "Url",
        messagePayload: link
      }
    }
    return await this.pubMsg(msg)
  }

  async sendMiniProgram(toContacts, mp) {
    if (!(mp.appid && mp.title && mp.pagePath && mp.thumbKey && mp.username)) {
      return '缺少必要参数'
    }
    let msg = {
      "reqId": v4(),
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "send",
      "params": {
        toContacts,
        "messageType": "MiniProgram",
        messagePayload: mp
      }
    }
    return await this.pubMsg(msg)
  }

  async sendAt(toContacts, text, room) {
    let msg = {
      "reqId": "442c1da4-9d3a-4f9b-a6e9-bfe858e4ac43",
      "method": "thing.command.invoke",
      "version": "1.0",
      "timestamp": this.getCurTs(),
      "name": "sendAt",
      "params": {
        room,
        toContacts,
        messagePayload: text
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
