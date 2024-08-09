import React, { useEffect, useState } from "react";
import { listenForNotifications} from "../../firebase";
import NotificationItem from "../../UI/NotificationsItem/NotificationItem";
import { getAuth } from "firebase/auth";
import { Space, Typography } from "antd";
import styles from "./Notifications.module.scss";

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    const unsubscribeNotifications = listenForNotifications(
      (fetchedNotifications: any[]) => {
        const sortedNotifications = fetchedNotifications.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setNotifications(sortedNotifications);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeNotifications();
    };
  }, []);

  return (
    <Space
      align="center"
      direction="vertical"
      className={styles.notifications_field}
    >
      <ul>
        <Typography.Title>Notifications</Typography.Title>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            id={notification.id}
            type={notification.type}
            read={notification.read}
            email={userEmail}
          />
        ))}
      </ul>
    </Space>
  );
}
