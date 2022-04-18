const { writeUserData, sendAvailableSlots } = require('../../utils/firebase');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => {
  const { id, is_bot: isBot, first_name: firstName, last_name: lastName } = ctx.from;
  writeUserData(id);
  ctx.reply(`Welcome, ${id}: ${firstName} ${lastName}. You are ${isBot ? '' : 'not a'} bot`);
  ctx.reply('👍');
});
bot.help((ctx) => ctx.reply('Send me a sticker'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

//curl -F "url=https://bot-0071.netlify.app/.netlify/functions/update" https://api.telegram.org/bot5321221901:AAE9oBfGqYxtozpi7WcNf0HqYDUm05XPoBU/setWebhook?url=https://bot-0071.netlify.app/.netlify/functions/update/api/update

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);

  await sendAvailableSlots((chatId) => bot.telegram.sendMessage(chatId, message.text));
  console.log('Received an update from Telegram!', event.body);

  return { statusCode: 200 };
};
