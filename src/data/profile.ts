import type { User } from "../types";

export const currentUser: User = {
  id: 'user-1',
  username: 'johndoe',
  email:'jhondoe@mail.com',
  displayName: 'John Doe',
  avatar: 'https://imgs.search.brave.com/G_CdsrWw2bn9y2hqgj2yHsIscvl6X8-O5qK8puH9B-A/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wbmctY2lyY2xl/LXByb2ZpbGUtcGlj/dHVyZS1zdGlja2Vy/LWNhc3VhbC1tYW4t/dHJhbnNwYXJlbnQt/YmFja2dyb3VuZF81/Mzg3Ni05NDU4NDUu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw',
  bio: 'Software engineer, tech enthusiast, and coffee lover ☕',
  verified: true,
  followerCount: 1250,
  followingCount: 500,
  postCount: 89,
  theme: 'system',
};
