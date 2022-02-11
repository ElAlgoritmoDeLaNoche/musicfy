import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTe2-JCGGlGCyoDvWOm7PavlHJcNXN94Y",
  authDomain: "musicfy-ab49c.firebaseapp.com",
  projectId: "musicfy-ab49c",
  storageBucket: "musicfy-ab49c.appspot.com",
  messagingSenderId: "476774810950",
  appId: "1:476774810950:web:323e6d04b0d260814d5147",
  measurementId: "G-JPE1KFND5E"
};

export default firebase.initializeApp(firebaseConfig);