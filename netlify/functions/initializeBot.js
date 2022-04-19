// const { writeUserData } = require('./firebase');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  const { id, is_bot: isBot, first_name: firstName, last_name: lastName } = ctx.from;
  // writeUserData(id, firstName, lastName);
  return ctx.reply(`Welcome, ${id}: ${firstName} ${lastName}. You are ${isBot ? '' : 'not a'} bot`);
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('text', (ctx) => ctx.replyWithHTML('<b>Hello</b>'));

bot.launch();

// exports.botInstance = bot;

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

//curl -F "url=https://bot-0071.netlify.app/.netlify/functions/update" https://api.telegram.org/bot5321221901:AAE9oBfGqYxtozpi7WcNf0HqYDUm05XPoBU/setWebhook?url=https://bot-0071.netlify.app/.netlify/functions/update

exports.handler = () => {
  console.log(`Telegram bot successfully initialized`);
  return { statusCode: 200 };
};