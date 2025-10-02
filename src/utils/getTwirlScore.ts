import type { Twirl, User } from "../types";

export const getTwirlScore = (twirl:Twirl, currentUser:User) => {
  const now = Date.now();
  const ageInHours = (now - new Date(twirl.createdAt).getTime()) / (1000 * 60 * 60);

  const recencyScore = Math.max(0, 50 - ageInHours); // fresher = higher
  const engagementScore =
    twirl.reactions.like * 2 +
    twirl.reactions.love * 3 +
    twirl.replyCount * 4 +
    twirl.retwirls * 5;

  const followingScore = currentUser.id.includes(twirl.author.id) ? 30 : 0;

  return recencyScore + engagementScore + followingScore;
}
