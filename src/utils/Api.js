import firebaseApp from './Firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const db = firebase.firestore(firebaseApp)

export async function isUserAdmin(uid) {
  const response = await db.collection("admins").doc(uid).get()
  return response.exists
}