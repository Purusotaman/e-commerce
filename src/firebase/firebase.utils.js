import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBh9wfn4vOHqhgVigOFAeUESUoJ_iCX40U",
    authDomain: "my-crwn-clothing.firebaseapp.com",
    projectId: "my-crwn-clothing",
    storageBucket: "my-crwn-clothing.appspot.com",
    messagingSenderId: "762012828034",
    appId: "1:762012828034:web:02d9b06380a574d1724f9b",
    measurementId: "G-ZZHFSV27LC"
  };

export const createUserProfileDocument = async (userData, additionalData) => {
  if(!userData) return;
  
  const userRef = firestore.doc(`users/${userData.uid}`);
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const {displayName, email} = userData;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('Error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
