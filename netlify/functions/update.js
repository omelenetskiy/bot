const sendMessage = require('../../sendMessage');

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  await sendMessage(message.chat.id, message.text);

  console.log('Received an update from Telegram!', event.body);
  return { statusCode: 200 };
};
