import type { Twirl } from "../types";

export const getTrendingHashtags = (twirls: Twirl[], topN = 5) => {
  const hashtagMap: Record<string, { score: number; postCount: number }> = {};

  const now = Date.now();

  twirls.forEach((twirl) => {
    const hoursAgo = (now - twirl.createdAt.getTime()) / (1000 * 60 * 60);
    const timeDecay = 1 / (1 + hoursAgo); // recent posts weigh more

    twirl.hashtags?.forEach((tag) => {
      const engagement =
        twirl.reactions.like +
        twirl.reactions.love +
        twirl.reactions.laugh * 1.5 +
        twirl.reactions.wow * 2;

      const score = engagement * timeDecay;

      if (!hashtagMap[tag]) hashtagMap[tag] = { score: 0, postCount: 0 };
      hashtagMap[tag].score += score;
      hashtagMap[tag].postCount += 1;
    });
  });

  return Object.entries(hashtagMap)
    .map(([hashtag, data]) => ({ hashtag, ...data }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
};
