import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, where, getDocs, query, limit } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: 'AIzaSyBX5gkKsbOr1V0zxBuSqHWFct12dFOsQHA',
    authDomain: 'nextfire-demo.firebaseapp.com',
    projectId: 'nextfire-demo',
    storageBucket: 'nextfire-demo.appspot.com',
    messagingSenderId: '827402452263',
    appId: '1:827402452263:web:c9a4bea701665ddf15fd02',
  };

  function createFirebaseApp(config){
    try{
        return getApp();
    }
    catch{
        return initializeApp(config);
    }
  }

  const firebaseApp = createFirebaseApp(firebaseConfig);

  //   Auth exports
  export const auth = getAuth(firebaseApp);
  export const googleAuthProvider = new GoogleAuthProvider();

  //   Firestore exports
  export const firestore = getFirestore(firebaseApp);

  //   Storage exports
  export const storage = getStorage(firebaseApp);
  export const STATE_CHANGED = 'state_changed';


  /**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
   export async function getUserWithUsername(username) {

    const q = query(
      collection(firestore, 'users'), 
      where('username', '==', username),
      limit(1)
    )
    const userDoc = ( await getDocs(q) ).docs[0];
    return userDoc;
  }

  
  /**`
   * Converts a firestore document to JSON
   * @param  {DocumentSnapshot} doc
   */
  export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
      createdAt: data?.createdAt.toMillis() || 0,
      updatedAt: data?.updatedAt.toMillis() || 0,
    };
  }
  