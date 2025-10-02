export interface User {
  id: string;
  username: string;
  email: string;
  bio: string;
  displayName: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  theme: string;
  avatar: string;
  verified?: boolean;
  favorites? : Favorite[]
}

export interface Favorite{
  id:string;
   title: string; 
   description: string; 
   twirlIds: string[]
}

export interface Comment {
  id: string;
  user: User;
  content: string;
  createdAt: Date; 
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  question: string;
  options: PollOption[];
  totalVotes: number;
  expiresAt?: Date; 
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
}

export interface Reactions {
  like: number;
  love: number;
  laugh: number;
  angry: number;
  sad: number;
  wow: number;
  userReaction?: string;
}

export interface Twirl {
  id: string;
  author: User;
  content: string;
  media?: MediaItem[];
  hashtags?:string[]
  poll?: Poll;
  createdAt: Date; 
  reactions: Reactions;
  replyCount: number;
  shareCount: number;
  views: number;
  retwirls: number;
  visibility: 'public' | 'private' | 'temporary';
  isBookmarked: boolean;
  parentId?: string;
  replies?: Twirl[];
  isScheduled?: boolean;
  scheduledFor?: Date;
  expiresAt?: Date;
  collaborators?: User[];
  threadId?: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'retweet' | 'thread_update';
  user: User;
  post?: Twirl;
  message: string;
  createdAt: Date; 
  isRead: boolean;
}

export type HashtagTrend = {
  hashtag: string;
  score: number;
  postCount: number;
};