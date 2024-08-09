import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDKVCVd_1dVuwb4aGFEr8Et2-7oel3C4qI",
    authDomain: "test-cf72c.firebaseapp.com",
    projectId: "test-cf72c",
    storageBucket: "test-cf72c.appspot.com",
    messagingSenderId: "568672335595",
    appId: "1:568672335595:web:c1001f8ddd9eeea84170ae",
    measurementId: "G-8S9DP0TH37"
  };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const addNotification = async (type: string) => {
  const notificationsRef = collection(db, 'notifications');
  await addDoc(notificationsRef, {
    type,
    read: [],
    timestamp: new Date()
  });
};


export const markNotificationAsRead = async (id: string, userEmail: string) => {
  const notificationRef = doc(db, 'notifications', id);
  // fetch the document data from the database
  const notificationDoc = await getDoc(notificationRef);

  if (notificationDoc.exists()) {
    const data = notificationDoc.data();
    // get the list of users who have read the notification
    const currentRead = data.read || [];

        if (!currentRead.includes(userEmail)) {
      currentRead.push(userEmail);
      await updateDoc(notificationRef, { read: currentRead });
    }
  } else {
    console.error('Notification not found');
  }
};

export const listenForNotifications = (callback: Function) => {
  const notificationsRef = collection(db, 'notifications');

  // set up a real-time listener on the notifications collection
  return onSnapshot(notificationsRef, (snapshot) => {
    const notifications = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(notifications);
  });
};

