
// const { sendAvailableSlots } = require('./netlify/functions/firebase');
// const { botInstance } = require('./netlify/functions/initializeBot');


// exports.handler = async (event) => {
//   const { message } = JSON.parse(event.body);
//   console.log(message.text);
//   await sendAvailableSlots((chatId) => botInstance.telegram.sendMessage(chatId, message.text));

//   return { statusCode: 200 };
// };