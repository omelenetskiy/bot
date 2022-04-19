import { bot } from './telegraf';

bot.start((ctx) => {
  const { id, is_bot: isBot, first_name: firstName, last_name: lastName } = ctx.from;
  // writeUserData(id, firstName, lastName);
  return ctx.reply(`Welcome, ${id}: ${firstName} ${lastName}. You are ${isBot ? '' : 'not a'} bot`);
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('text', (ctx) => ctx.replyWithHTML('<b>Hello</b>'));
bot.catch((e) => {
  console.log('ERROR!!!', e);
});
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
