import { useState } from 'react';
import TwirlBox from '../components/layout/TwirBox';
import { currentUser } from '../data/profile';
import { twirls } from '../data/twirls';
import { getTrendingHashtags } from '../utils/getTrendingHashtags';
import { getTwirlScore } from '../utils/getTwirlScore';

const SearchPage = () => {
  const tabs = [{ name: 'For You' }, { name: 'Trending' }];
  const [activeTab, setActiveTab] = useState(0);
  const forYouFeed = twirls
    .map((t) => ({ ...t, score: getTwirlScore(t, currentUser) }))
    .sort((a, b) => b.score - a.score);
  const trends = getTrendingHashtags(twirls);

  return (
    <div className="w-full p-3">
      {/* Searchbar */}
      <input
        type="text"
        className="p-2 border-[1px] w-full rounded-2xl outline-0"
        placeholder="Search Twirl"
        style={{ borderColor: 'var(--gray-text)' }}
      />
      <div className="my-8 flex justify-around items-center">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`${activeTab == index && 'text-pink-600 border-b '} p-2`}
          >
            {tab.name}
          </div>
        ))}
      </div>
      {activeTab == 0 && (
        <div className="p-2">
          {forYouFeed.map((twirl, i) => (
            <TwirlBox key={i} twirl={twirl} isReply={false} />
          ))}
        </div>
      )}
      {activeTab == 1 && (
        <div className="rounded-xl w-full sm:w-80">
          {trends.map((trend, i: number) => (
            <div key={trend.hashtag} className="flex flex-col my-4 py-2">
              <div className="flex gap-1">
                {/* <span>{i + 1}. </span> */}
                <span className="font-medium">{trend.hashtag}</span>
              </div>
              <span className="text-sm" style={{ color: 'var(--text-gray)' }}>
                {trend.postCount} Posts
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
