import { AtSign, Heart, MessageCircle, Repeat2, UserPlus } from "lucide-react";
import type { Notification } from "../../types";
import { formatTweetDate } from "../../utils/formatDate";

type Props = { notification: Notification };

const NotificationContainer = ({ notification }: Props) => {
  let icon;
  let text;
  let bgColor;

  switch (notification.type) {
    case "like":
      icon = <Heart size={14} />;
      text = "liked your post";
      bgColor = "bg-red-400";
      break;
    case "comment":
      icon = <MessageCircle size={14} />;
      text = "commented on your post";
      bgColor = "bg-blue-400";
      break;
    case "follow":
      icon = <UserPlus size={14} />;
      text = "started following you";
      bgColor = "bg-green-400";
      break;
    case "mention":
      icon = <AtSign size={14} />;
      text = "mentioned you in a post";
      bgColor = "bg-purple-400";
      break;
       case "retweet":
      icon = <Repeat2 size={14} />;
      text = "mentioned you in a post";
      bgColor = "bg-orange-400";
      break;
    default:
      icon = null;
      text = "";
      bgColor = "bg-gray-400";
  }

  return (
    <div className={`flex p-3 cursor-pointer gap-2 ${!notification.isRead && 'bg-gray-200/60'}  my-2 rounded-xl`}>
      <div className="flex gap-3 relative">
        {/* Profile Image */}
        <img
          src={notification.user.avatar}
          alt={notification.user.username}
          className="rounded-full w-11 h-11 border"
        />
        {/* Icon overlay */}
        <div
          className={`rounded-full absolute left-7 top-5 p-1 text-white ${bgColor}`}
        >
          {icon}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col mx-4">
         <div className="text-gray-800 flex gap-2">
        <span className="font-medium text-black">
          {notification.user.displayName}
        </span>
        <span>{text}</span>
      </div>

      {/* Time */}
      <span className="text-sm text-gray-700">{formatTweetDate(notification.createdAt)}</span>
      </div>
     
    </div>
  );
};

export default NotificationContainer;
