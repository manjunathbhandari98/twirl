
export interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  verified?: boolean
}

export interface Comment {
  id: string
  user: User
  content: string
  createdAt: string // ISO date string
}

export interface PollOption{
  id: string,
  text:string,
  votes:number
}

export interface Poll{
  question:string,
  options: PollOption[],
  totalVotes:number,
  expiresAt:string
}

export interface Twirl {
  id: string
  user: User
  content: string
  media: string[]        // image or video URLs
  poll ?: Poll,
  createdAt: string      // ISO date string
  likes: number
  retweets: number
  comments: Comment[]
}


export interface Post {
  id: string;
  author: User;
  content: string;
  media?: MediaItem[];
  poll?: Poll;
  createdAt: Date;
  reactions: Reactions;
  replyCount: number;
  shareCount: number;
  views: number;
  isBookmarked: boolean;
  parentId?: string;
  replies?: Post[];
  isScheduled?: boolean;
  scheduledFor?: Date;
  expiresAt?: Date;
  collaborators?: User[];
  threadId?: string;
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

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'retweet' | 'thread_update';
  user: User;
  post?: Twirl;
  message: string;
  createdAt: string;
  isRead: boolean;
}


export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
}
