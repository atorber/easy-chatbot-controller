import BotClient from '../src/BotClient.js'

const username = ''
const password = ''
const botid = ''
const botClient = new BotClient(username, password, botid)

async function main() {
  return await botClient.send('tyutluyc', 'hello')
}

main()
