require('dotenv').config();
const { Telegraf } = require('telegraf');
const { BOT_TOKEN } = process.env;

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));

bot.launch();
