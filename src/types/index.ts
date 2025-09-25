
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
