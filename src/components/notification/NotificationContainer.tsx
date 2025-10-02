import {
  AtSign,
  Dot,
  Heart,
  MessageCircle,
  Repeat2,
  UserPlus,
} from 'lucide-react';
import type { Notification } from '../../types';

type Props = { notification: Notification };

const NotificationContainer = ({ notification }: Props) => {
  let icon;
  let text;
  let bgColor;

  switch (notification.type) {
    case 'like':
      icon = <Heart size={14} />;
      text = 'liked your post';
      bgColor = 'bg-red-400';
      break;
    case 'comment':
      icon = <MessageCircle size={14} />;
      text = 'commented on your post';
      bgColor = 'bg-blue-400';
      break;
    case 'follow':
      icon = <UserPlus size={14} />;
      text = 'started following you';
      bgColor = 'bg-green-400';
      break;
    case 'mention':
      icon = <AtSign size={14} />;
      text = 'mentioned you in a post';
      bgColor = 'bg-purple-400';
      break;
    case 'retweet':
      icon = <Repeat2 size={14} />;
      text = 'retweeted your post';
      bgColor = 'bg-orange-400';
      break;
    default:
      icon = null;
      text = '';
      bgColor = 'bg-gray-400';
  }

  return (
    <div className="flex justify-between items-center cursor-pointer my-2 rounded-xl">
      <div className="flex p-3 gap-3 my-2 rounded-xl">
        {/* Avatar + Icon */}
        <div className="flex-shrink-0 relative">
          <img
            src={notification.user.avatar}
            alt={notification.user.username}
            className="rounded-full w-11 h-11 border"
          />
          <div
            className={`rounded-full absolute left-7 top-5 p-1 text-white ${bgColor}`}
          >
            {icon}
          </div>
        </div>

        {/* Text (responsive) */}
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-1 text-sm sm:text-base">
            <span
              className="font-medium"
              style={{ color: 'var(--text-color)' }}
            >
              {notification.user.displayName}
            </span>
            <span className="text-gray-500">{text}</span>
          </div>
        </div>
      </div>

      {/* Unread Dot */}
      {!notification.isRead && (
        <Dot size={40} color="green" className="blink flex-shrink-0" />
      )}
    </div>
  );
};

export default NotificationContainer;
