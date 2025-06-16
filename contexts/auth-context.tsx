"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, enableNetwork, disableNetwork } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserData {
  uid: string;
  name: string;
  email: string;
  plan: string;
  credits: number;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isOffline: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isOffline: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Check if Firebase auth is available
    if (!auth) {
      console.warn('Firebase auth not initialized');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user && db) {
        try {
          // Try to enable network connection first
          await enableNetwork(db);
          setIsOffline(false);
          
          // Fetch user data from Firestore with retry logic
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as UserData);
          } else {
            // If user document doesn't exist, create a default one
            setUserData({
              uid: user.uid,
              name: user.displayName || 'User',
              email: user.email || '',
              plan: 'free',
              credits: 100,
            });
          }
        } catch (error: any) {
          console.warn('Error fetching user data:', error.message);
          
          // Check if it's an offline error
          if (error.code === 'unavailable' || error.message.includes('offline')) {
            setIsOffline(true);
            // Set default user data when offline
            setUserData({
              uid: user.uid,
              name: user.displayName || 'User',
              email: user.email || '',
              plan: 'free',
              credits: 100,
            });
          } else {
            // For other errors, still set basic user data
            setUserData({
              uid: user.uid,
              name: user.displayName || 'User',
              email: user.email || '',
              plan: 'free',
              credits: 100,
            });
          }
        }
      } else {
        setUserData(null);
        setIsOffline(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      // Try to re-enable network when coming back online
      if (db) {
        enableNetwork(db).catch(console.warn);
      }
    };

    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, isOffline }}>
      {children}
    </AuthContext.Provider>
  );
};