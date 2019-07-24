import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBbpy1mHDt0dm9DkYAyFveqCs2ADUG4YJA",
    authDomain: "crwn-db-rizki.firebaseapp.com",
    databaseURL: "https://crwn-db-rizki.firebaseio.com",
    projectId: "crwn-db-rizki",
    storageBucket: "",
    messagingSenderId: "252541330236",
    appId: "1:252541330236:web:c94da3adcec2231d"
  }

  export const createUserProfileDocuments = async(userAuth, additionalData)=>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get()

    if(!snapShot.exists){
      const {displayName, email} = userAuth
      const createdAt = new Date()

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef
  }

  firebase.initializeApp(config)

  export const auth = firebase.auth()
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt: 'select_account'})
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase