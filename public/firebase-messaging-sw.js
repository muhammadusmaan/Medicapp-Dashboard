// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyDF1TYRiYh_LYqNrvzj9Jfqvr6kSvagdIM",
  authDomain: "medicapp-find-doctors.firebaseapp.com",
  projectId: "medicapp-find-doctors",
  storageBucket: "medicapp-find-doctors.appspot.com",
  messagingSenderId: "650333018935",
  appId: "1:650333018935:web:07343d60843fcd00dbd8b2",
  measurementId: "G-6276G70V0B"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);
  console.log("this: ", this);
  console.log("self: ", self);
  console.log("window: ", window);
  console.log("localStorage: ", localStorage);
  setTimeout(() => {
    // setNotification({title: '', body: ''})
    //localStorage.clear();
    //history.push(LOGIN_ROUTE);
  }, 1500);

  // self.registration.showNotification(notificationTitle,
  //   notificationOptions);
});