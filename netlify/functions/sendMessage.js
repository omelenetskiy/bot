
const { sendAvailableSlots } = require('./firebase');
const { botInstance } = require('./initializeBot');


exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);

  await sendAvailableSlots((chatId) => botInstance.telegram.sendMessage(chatId, message.text));

  return { statusCode: 200 };
};