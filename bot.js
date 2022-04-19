const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);
const express = require('express');
const app = express();

//323160304

app.get('/api/:id', (req, res) => {
  // Retrieve the tag from our URL path
  var { id } = req.params;
  bot.telegram.sendMessage(id, `Ti pidrilla!`);
});

app.get('/visa', (req, res) => {
  const { chat_id, city } = req.query;
  bot.telegram.sendMessage(
    chat_id,
    `Появились места на подачу VISA! ${city} 
  https://visa.vfsglobal.com/blr/ru/pol/login
  или 
  https://visa.vfsglobal.com/blr/ru/pol/book-an-appointment`
  );
});

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});
