import React from "react";
import { addNotification } from "../../firebase";
import { Button } from "antd";
import style from './Button.module.scss'

interface ButtonProps {
  type: string;
}

export default function CustomButton({ type }: ButtonProps) {
  const handleClick = async () => {
    try {
      await addNotification(type);
    } catch (error) {
      console.error("Error adding notification: ", error);
    }
  };

  return (
    <Button
      type="primary"
      onClick={handleClick}
      className={style.notification_button}
    >
      {type}
    </Button>
  );
}
