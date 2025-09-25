import type { Twirl } from "../types";

export const twirls:Twirl[] = [
  {
    "id": "t1",
    "user": {
      "id": "u1",
      "username": "john_doe",
      "displayName": "John Doe",
      "avatar": "https://randomuser.me/api/portraits/men/32.jpg",
      "verified": true
    },
    "content": "Burgundy Private along with Louis Vuitton India, hosted an exclusive showcase of the LV Wedding Edit in Delhi - a celebration of bridal elegance and timeless luxury.",
    "media": [
      "https://pbs.twimg.com/media/G03qwmqbwAEdEnq?format=jpg&name=large",
      "https://pbs.twimg.com/media/G03qwmobIAAc1Pz?format=jpg&name=large",
      
    ],
    "createdAt": "2025-09-23T10:30:00Z",
    "likes": 120,
    "retweets": 45,
    "comments": [
      {
        "id": "c1",
        "user": {
          "id": "u2",
          "username": "sarah_smith",
          "displayName": "Sarah Smith",
          "avatar": "https://randomuser.me/api/portraits/women/44.jpg"
        },
        "content": "Looks awesome 🔥",
        "createdAt": "2025-09-23T11:00:00Z"
      },
      {
        "id": "c2",
        "user": {
          "id": "u3",
          "username": "tech_guy",
          "displayName": "Tech Guy",
          "avatar": "https://randomuser.me/api/portraits/men/15.jpg"
        },
        "content": "Great job! Can you share the repo?",
        "createdAt": "2025-09-23T11:15:00Z"
      }
    ]
  },
  {
    "id": "t2",
    "user": {
      "id": "u2",
      "username": "sarah_smith",
      "displayName": "Sarah Smith",
      "avatar": "https://randomuser.me/api/portraits/women/44.jpg",
      "verified": false
    },
    "content": "Morning coffee + coding = perfect start ☕💻",
    "media": [],
    "createdAt": "2025-09-24T06:45:00Z",
    "likes": 87,
    "retweets": 22,
    "comments": []
  },
  {
      "id": "t3",
      "user": {
      "id": "u4",
      "username": "nature_lover",
      "displayName": "Nature Lover",
      "avatar": "https://randomuser.me/api/portraits/women/25.jpg",
      "verified": false
    },
    "content": "Check out this sunset 🌅 #nofilter",
    "media": [
      "https://picsum.photos/600/400?random=2"
    ],
    "createdAt": "2025-09-22T18:10:00Z",
    "likes": 210,
    "retweets": 70,
    "comments": [
      {
        "id": "c3",
        "user": {
          "id": "u1",
          "username": "john_doe",
          "displayName": "John Doe",
          "avatar": "https://randomuser.me/api/portraits/men/32.jpg"
        },
        "content": "This is amazing!",
        "createdAt": "2025-09-22T19:00:00Z"
      }
    ]
  },
  {
  "id": "t5",
  "user": {
    "id": "u3",
    "username": "sarah_dev",
    "displayName": "Sarah Codes",
    "avatar": "https://i.pravatar.cc/150?img=13",
    "verified": true
  },
  "content": "The Frontend Race Poll",
  "createdAt": "2025-09-24T08:45:00Z",
  "likes": 87,
  "retweets": 12,
  "comments": [
    {
      "id": "c201",
      "user": {
        "id": "u1",
        "username": "johndoe",
        "displayName": "John Doe",
        "avatar": "https://i.pravatar.cc/150?img=11",
        "verified": false
      },
      "content": "React all the way! 🔥",
      "createdAt": "2025-09-24T09:10:00Z"
    }
  ],
  "media": [],
  "poll": {
    "question": "Which frontend framework are you most excited about in 2025?",
    "options": [
      { "id": "o1", "text": "React", "votes": 42 },
      { "id": "o2", "text": "Next.js", "votes": 28 },
      { "id": "o3", "text": "Svelte", "votes": 10 },
      { "id": "o4", "text": "SolidJS", "votes": 7 }
    ],
    "totalVotes": 87,
    "expiresAt": "2025-09-25T08:45:00Z"
  }
}

]
