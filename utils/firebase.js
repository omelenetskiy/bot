const { initializeApp } = require('firebase/app')
const { getDatabase, ref, set, onValue } = require('firebase/database');


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

exports.writeUserData = (chatId) => {
  set(ref(db, 'users/' + chatId), {
    chat_id: chatId,
  });
};

const users = ref(db, 'users');

exports.sendAvailableSlots = (sendMessage) => onValue(
  users,
  (snapshot) => {
    snapshot.forEach(async (childSnapshot) => {
      const childKey = childSnapshot.key;
      const childData = childSnapshot.val();
      console.log(childKey);
      console.log(childData);

      sendMessage(childKey);
    });
  },
  {
    onlyOnce: true,
  }
);