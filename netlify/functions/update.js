const sendMessage = require('../../sendMessage');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, onValue } = require('firebase/database');

// import { sendMessage } from '../../sendMessage';
// import { initializeApp } from 'firebase/app';
// import { getDatabase, ref, set } from 'firebase/database';

//curl -F "url=https://bot-0071.netlify.app/.netlify/functions/update" https://api.telegram.org/bot5321221901:AAE9oBfGqYxtozpi7WcNf0HqYDUm05XPoBU/setWebhook

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: 'bot-test-visa-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getDatabase();

const writeUserData = (chatId) => {
  set(ref(db, 'users/' + chatId), {
    chat_id: chatId,
  });
};

exports.handler = async (event) => {
  const { message } = JSON.parse(event.body);
  writeUserData(message.chat.id);

  const users = ref(db, 'users');
  // users.forEach(user => {
  // })

  onValue(
    users,
    (snapshot) => {
      snapshot.forEach(async (childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childKey);
        console.log(childData);

        await sendMessage(childKey, message.text);
      });
    },
    {
      onlyOnce: true,
    }
  );

  await sendMessage(message.chat.id, message.text);

  console.log('Received an update from Telegram!', event.body);

  return { statusCode: 200 };
};
