import React, { useEffect, useRef } from "react";
import { markNotificationAsRead } from "../../firebase";
import styles from './NotificationItem.module.scss'

interface NotificationProps {
  id: string;
  type: string;
  read: string[];
  email: string | null;
}

export default function NotificationItem({
  id,
  type,
  read,
  email,
}: NotificationProps) {
  const notificationRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!email) return;

    // observer we use to detect when the element is in view, read message feature
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && !read.includes(email)) {
            try {
              await markNotificationAsRead(id, email);
            } catch (error) {
              console.error(error);
            }
          }
        });
      },
      { threshold: 0.5 } // trigger when half of the element is in view
    );

    // observe the notification
    if (notificationRef.current) {
      observer.observe(notificationRef.current);
    }

    return () => {
      if (notificationRef.current) {
        observer.unobserve(notificationRef.current);
      }
    };
  }, [email, id, read]);

  return (
    <li
    className={styles.notifications}
      ref={notificationRef}
      style={{ textDecoration: read.length >= 2 ? "line-through" : "none" }}
    >
      {type}
    </li>
  );
}
