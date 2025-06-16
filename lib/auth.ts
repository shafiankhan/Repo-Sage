import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Check if Firebase is properly configured
const checkFirebaseConfig = () => {
  if (!auth || !db) {
    throw new Error('Firebase is not properly configured. Please check your environment variables.');
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  checkFirebaseConfig();
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.code === 'auth/operation-not-allowed') {
      throw new Error('Email/password authentication is not enabled. Please enable it in Firebase Console > Authentication > Sign-in method.');
    }
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string, name: string) => {
  checkFirebaseConfig();
  
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      name,
      email,
      plan: 'free',
      credits: 100,
      createdAt: new Date().toISOString(),
    });
    
    return result;
  } catch (error: any) {
    if (error.code === 'auth/operation-not-allowed') {
      throw new Error('Email/password authentication is not enabled. Please enable it in Firebase Console > Authentication > Sign-in method.');
    }
    throw error;
  }
};

export const signInWithGoogle = async () => {
  checkFirebaseConfig();
  
  try {
    const result = await signInWithPopup(auth, googleProvider);
    
    // Check if user document exists, create if not
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name: result.user.displayName || 'User',
        email: result.user.email,
        plan: 'free',
        credits: 100,
        createdAt: new Date().toISOString(),
      });
    }
    
    return result;
  } catch (error: any) {
    if (error.code === 'auth/operation-not-allowed') {
      throw new Error('Google authentication is not enabled. Please enable it in Firebase Console > Authentication > Sign-in method.');
    }
    throw error;
  }
};

export const signInWithGithub = async () => {
  checkFirebaseConfig();
  
  try {
    const result = await signInWithPopup(auth, githubProvider);
    
    // Check if user document exists, create if not
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name: result.user.displayName || 'User',
        email: result.user.email,
        plan: 'free',
        credits: 100,
        createdAt: new Date().toISOString(),
      });
    }
    
    return result;
  } catch (error: any) {
    if (error.code === 'auth/operation-not-allowed') {
      throw new Error('GitHub authentication is not enabled. Please enable it in Firebase Console > Authentication > Sign-in method.');
    }
    throw error;
  }
};

export const logout = async () => {
  checkFirebaseConfig();
  return await signOut(auth);
};