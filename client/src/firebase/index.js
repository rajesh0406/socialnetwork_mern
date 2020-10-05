import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyAP92MpogpFN1SoayguC2nmv0txFxShNbI",
  authDomain: "socialnetworkmern.firebaseapp.com",
  databaseURL: "https://socialnetworkmern.firebaseio.com",
  projectId: "socialnetworkmern",
  storageBucket: "socialnetworkmern.appspot.com",
  messagingSenderId: "775926348646",
  appId: "1:775926348646:web:6d29686641c938c447e6a7",
  measurementId: "G-1KJ7TJQL18"
};
firebase.initializeApp(firebaseConfig)
const storage=firebase.storage()
export 
{
    storage,firebase as default
}