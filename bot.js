require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const { BOT_CHAT_ID, BOT_TOKEN } = process.env;

console.log(BOT_CHAT_ID);
console.log(BOT_TOKEN);
console.log(process.env);
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  console.log(chatId);
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Hi pidr');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text == 'dog') {
    bot.sendMessage(chatId, "You sent 'dog'");
  }
});
