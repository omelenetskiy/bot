const TelegramBot = require('node-telegram-bot-api');
const token = '5321221901:AAE9oBfGqYxtozpi7WcNf0HqYDUm05XPoBU';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

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
