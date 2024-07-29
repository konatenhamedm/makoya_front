// components/NotificationItem.js
import React from "react";
import Image from "next/image";

interface NotificationItemProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  title,
  description,
  image,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <Image className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
