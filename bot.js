const { Telegraf } = require('telegraf');
const express = require('express');
const cron = require('node-cron');
const https = require('https');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

const AO = 323160304;
const YR = 534189599;

//323160304
//534189599

app.get('/', (req, res) => {
  bot.telegram.sendMessage(AO, 'Ping from kaffeine');
  bot.telegram.sendMessage(YR, 'Ping from kaffeine');

  res.send('Ping')
});

app.get('/cron', (req, res) => {
  bot.telegram.sendMessage(AO, 'Ping from node-cron');
  bot.telegram.sendMessage(YR, 'Ping from node-cron');

  res.send('Ping')
});

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


cron.schedule('*/15 * * * *', () => {
  const options = {
    hostname: 'visa-bot0071.herokuapp.com',
    port: 443,
    path: '/cron',
    method: 'GET',
  };

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
  });

  req.on('error', error => {
    console.error(error);
  });

  req.end();
});

app.listen(PORT, function () {
  console.log(`Server is running at port ${PORT}`);
});
