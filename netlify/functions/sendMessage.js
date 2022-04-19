
const { sendAvailableSlots } = require('./firebase');
const { botInstance } = require('./initializeBot');


exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  console.log(message.text);
  await sendAvailableSlots((chatId) => botInstance.telegram.sendMessage(chatId, message.text));

  return { statusCode: 200 };
};