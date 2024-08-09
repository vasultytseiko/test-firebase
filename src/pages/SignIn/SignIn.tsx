import React from "react";
import { auth, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import styles from './SignIn.module.scss'
import { Button, Form, Typography } from 'antd';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const db = getFirestore();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className={styles.login_page}>
      <div className={styles.login_form}>
            <Typography.Title >Login</Typography.Title>
            <Form className={styles.form}>
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={handleGoogleSignIn}>
                    Sign in with Google
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
  );
};

export default SignIn;
