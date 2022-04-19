// // const { writeUserData } = require('./firebase');
// const { Telegraf } = require('telegraf');
const TelegramBot = require('node-telegram-bot-api');

// const bot = new Telegraf(process.env.BOT_TOKEN, { polling: true });
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Петушок');
});
// console.log(process.env.BOT_TOKEN);
// bot.start((ctx) => {
//   console.log('ctx', ctx.first_name);

//   const { id, is_bot: isBot, first_name: firstName, last_name: lastName } = ctx.from;
//   // writeUserData(id, firstName, lastName);
//   return ctx.reply(`Welcome, ${id}: ${firstName} ${lastName}. You are ${isBot ? '' : 'not a'} bot`);
// });
// bot.help((ctx) => ctx.reply('Send me a sticker'));
// bot.on('text', (ctx) => ctx.replyWithHTML('<b>Hello</b>'));

// bot.catch((e) => {
//   console.log('ERROR!!!', e);
// });

// bot.launch();

// bot.launch();

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

exports.handler = async (event) => {
  try {
    console.log(event.body);
    bot.processUpdate(event.body);
    // await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: '' };
  } catch (e) {
    console.log(e);
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' };
  }
};

// https://api.telegram.org/bot5321221901:AAE9oBfGqYxtozpi7WcNf0HqYDUm05XPoBU/setWebhook?url=https://bot-0071.netlify.app/api/bot

// https://api.telegram.org/bot5321221901:AAE9oBfGqYxtozpi7WcNf0HqYDUm05XPoBU/setWebhook?url=https://bot-0071.netlify.app/.netlify/functions/bot

//https://api.telegram.org/bot5321221901:AAE9oBfGqYxtozpi7WcNf0HqYDUm05XPoBU/setWebhook?url=http://localhost:8888/.netlify/functions/initializeBot
