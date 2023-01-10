importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    apiKey: "AIzaSyAYyws2NvvXfPqKRBQNoc2SifKCOA0-bQI",
    authDomain: "testeapp-aa6a6.firebaseapp.com",
    projectId: "testeapp-aa6a6",
    storageBucket: "testeapp-aa6a6.appspot.com",
    messagingSenderId: "409137549600",
    appId: "1:409137549600:web:961e1db70326d33f438745"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging
  .requestPermission()
  .then(function () {
    console.log("Notification permission granted.");
  })
  .catch(function (err) {
    console.log("Unable to get permission to notify.", err);
  });

messaging.setBackgroundMessageHandler(function(payload) {
    // console.log(
    //   "[firebase-messaging-sw.js] Received background message ",
    //   payload,
    // );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message body.",
      icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
      notificationTitle,
      notificationOptions,
    );
});
