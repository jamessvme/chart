import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig: Record<string, string | undefined> = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEAS_ID
}

class Firebase {
  public auth: app.auth.Auth
  public db: app.firestore.Firestore

	constructor() {
		app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
	}

  public signin = (email: string, password: string): Promise<any> => {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  public signup = (email: string, password: string): Promise<any> => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  } 

  public signout = (): Promise<any> => this.auth.signOut();
}

const firebase = new Firebase();
const auth = firebase.auth;

export { auth, firebase as default};