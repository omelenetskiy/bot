// const { writeUserData } = require('./firebase');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  console.log('ctx', ctx);
  const { id, is_bot: isBot, first_name: firstName, last_name: lastName } = ctx.from;
  // writeUserData(id, firstName, lastName);
  return ctx.reply(`Welcome, ${id}: ${firstName} ${lastName}. You are ${isBot ? '' : 'not a'} bot`);
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('text', (ctx) => ctx.replyWithHTML('<b>Hello</b>'));

bot.launch();

// exports.botInstance = bot;

// Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));

//curl -F "url=https://bot-0071.netlify.app/.netlify/functions/update" https://api.telegram.org/bot5321221901:AAE9oBfGqYxtozpi7WcNf0HqYDUm05XPoBU/setWebhook?url=https://bot-0071.netlify.app/.netlify/functions/update
process.on('uncaughtException', function (error) {
  console.log('\x1b[31m', 'Exception: ', error, '\x1b[0m');
});

process.on('unhandledRejection', function (error, p) {
  console.log('\x1b[31m', 'Error: ', error.message, '\x1b[0m');
});

exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: '' };
  } catch (e) {
    return {
      statusCode: 400,
      body: `Huila ti. ERROR!!! ${e}`,
    };
  }
};

// https://api.telegram.org/bot5321221901:AAE9oBfGqYxtozpi7WcNf0HqYDUm05XPoBU/setWebhook?url=https://bot-0071.netlify.app/.netlify/functions/initializeBot

//https://api.telegram.org/bot5321221901:AAE9oBfGqYxtozpi7WcNf0HqYDUm05XPoBU/setWebhook?url=http://localhost:8888/.netlify/functions/initializeBot
