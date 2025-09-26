import type { Notification } from "../types";
import { suggestedUser } from "./suggestedUser";
import { twirls } from "./twirls";

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "like",
    user: suggestedUser[0],
    post: twirls[3],
    message: "liked your post",
    createdAt: "2024-01-15T11:30:00Z",
    isRead: false,
  },
  {
    id: "notif-2",
    type: "comment",
    user: suggestedUser[1],
    post: twirls[0],
    message: "commented on your post",
    createdAt: "2024-01-15T10:45:00Z",
    isRead: false,
  },
  {
    id: "notif-3",
    type: "follow",
    user: suggestedUser[2],
    message: "started following you",
    createdAt: "2024-01-15T09:15:00Z",
    isRead: true,
  },
  {
    id: "notif-4",
    type: "mention",
    user: suggestedUser[1],
    post: twirls[1],
    message: "mentioned you in a post",
    createdAt: "2024-01-14T17:20:00Z",
    isRead: false,
  },
  {
    id: "notif-5",
    type: "retweet",
    user: suggestedUser[2],
    post: twirls[2],
    message: "reposted your post",
    createdAt: "2024-01-14T15:10:00Z",
    isRead: false,
  },
  {
    id: "notif-6",
    type: "like",
    user: suggestedUser[2],
    post: twirls[4],
    message: "liked your post",
    createdAt: "2024-01-14T13:45:00Z",
    isRead: true,
  },
  {
    id: "notif-7",
    type: "comment",
    user: suggestedUser[3],
    post: twirls[2],
    message: "commented on your post",
    createdAt: "2024-01-14T12:05:00Z",
    isRead: false,
  },
];
