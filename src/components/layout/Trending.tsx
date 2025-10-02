import { Hash, TrendingUp } from 'lucide-react';
import { twirls } from '../../data/twirls';
import { getTrendingHashtags } from '../../utils/getTrendingHashtags';

const Trending = () => {
  const trends = getTrendingHashtags(twirls);
  return (
    <div className="rounded-xl p-4 border space-y-5">
      <h2 className="font-medium text-xl">Trendings</h2>
      <div className="flex flex-col gap-3">
        {trends.map((trend) => (
          <div
            key={trend.hashtag}
            className="flex justify-between items-center hover:text-blue-600 cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <Hash size={20} />
              <div className="flex flex-col">
                <h4 className="font-medium">{trend.hashtag}</h4>
                <p className="text-sm">{trend.postCount} posts</p>
              </div>
            </div>
            <div className="text-xs text-green-500 flex gap-2">
              <TrendingUp size={14} />
              <p>
                {String(Math.min(99, Math.floor(trend.score))).padStart(2, '0')}
                %
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
