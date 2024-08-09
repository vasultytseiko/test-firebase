import React from "react";
import {Button} from "antd";
import Notifications from "../../features/Notifications/Notifications";
import { getAuth, signOut } from "firebase/auth";
import styles from "./NotificationsPage.module.scss";
import CustomButton from "../../UI/Button/CustomButton";

export default function NotificationPage() {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <Button className={styles.button} type="primary" onClick={handleLogout}>Logout</Button>
      </nav>

      <div className={styles.home}>
        <div className={styles.buttons}>
          <CustomButton type="Info" />
          <CustomButton type="Warning" />
          <CustomButton type="Error" />
        </div>

        <div className={styles.notifications}>
          <Notifications />
        </div>
      </div>
    </div>
  );
}
