import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyBvFxcMItEf39AwxKkyXQ7YTBxB3tQ9R08',
  authDomain: 'managemoney-ed237.firebaseapp.com',
  projectId: 'managemoney-ed237',
  storageBucket: 'managemoney-ed237.appspot.com',
  messagingSenderId: '475061028952',
  appId: '1:475061028952:web:d40cec8f365ff513fda22d'
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getDatabase(FIREBASE_APP)