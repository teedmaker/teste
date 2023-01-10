
// Import the functions you need from the SDKs you need
importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging.js")

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYyws2NvvXfPqKRBQNoc2SifKCOA0-bQI",
  authDomain: "testeapp-aa6a6.firebaseapp.com",
  projectId: "testeapp-aa6a6",
  storageBucket: "testeapp-aa6a6.appspot.com",
  messagingSenderId: "409137549600",
  appId: "1:409137549600:web:961e1db70326d33f438745"
};

const FIREBASE_VAPID_KEY = 'BHD2g9VbMlSCbN0vJBvVvP2DzaL59CYjMBQqvRU2OX9EH81NUpQA3PrrUPHjZrIduGPmBFWDkbA1ZMoEat1osCM';

(async () => {
  try {
    initializeApp(firebaseConfig);

    const messaging = getMessaging();

    const getFirebaseToken = async () => {
      try {
        const currentToken = await getToken(messaging, { vapidKey: FIREBASE_VAPID_KEY });
        if (!currentToken) {
          console.log("No registration token available. Request permission to generate one.");
        }
      } catch (error) {
        console.log("An error occurred while retrieving token. ", error);
      }
    };

    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await getFirebaseToken();
    }
  } catch (error) {
    console.log("An error occurred while initializing firebase. ", error);
    document.querySelector('#msg').innerHTML += 'Erro ao inicializar firebase: ' + error;
  }
})();
