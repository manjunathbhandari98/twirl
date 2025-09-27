import type { User } from "../types";

export const currentUser: User = {
 id: 'user-1',
  username: 'callme_m',
  email: 'manjunath@mail.com',
  displayName: 'Manjunath',
  avatar: 'https://pbs.twimg.com/profile_images/1948452583103676416/ad9o5fdM_400x400.jpg',
  bio: 'Software engineer, tech enthusiast, and coffee lover ☕',
  verified: true,
  followerCount: 1250,
  followingCount: 500,
  postCount: 89,
  theme: 'system',
  favorites: [
    {
      id:'fvr-1',
      title: 'Tech Articles',
      description: 'Collection of my favorite tech reads and tutorials',
      twirlIds: ['t11', 't7', 't9'],
    },
    {
      id:'fvr-2',
      title: 'Coffee Recipes',
      description: 'Best coffee recipes and brewing techniques',
      twirlIds: ['t11', 't15'],
    },
    {
      id:'fvr-3',
      title: 'Project Ideas',
      description: 'Interesting projects I want to build someday',
      twirlIds: ['t1', 't2', 't3', 't4'],
    },
  ],

};
