importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in the messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyCB01z2ReEqTRv0jD_66TTBTgPZaxOcsco",
  authDomain: "your-sw.firebaseapp.com",
  databaseURL: "https://your-sw.firebaseio.com",
  projectId: "your-sw",
  storageBucket: "",
  messagingSenderId: "905012060414",
  appId: "1:905012060414:web:229b7a9dcbd007b7"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notificationTitle = 'Background Message Title';
  var notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});