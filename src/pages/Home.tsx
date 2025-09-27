import { useEffect, useState } from 'react';
import FeedTabs from '../components/layout/FeedTabs';
import TwirlBox from '../components/layout/TwirBox';
import { twirls } from '../data/twirls';

const Home = () => {
  const sortedTwirls = [...twirls].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const [visibleCount, setVisibleCount] = useState(5);  // initial visible items
  const loadCount = 5;


  useEffect(() =>{
    const handleScroll = () =>{
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.body.scrollHeight;

        if(scrollTop + windowHeight >= fullHeight - 100) {
            setVisibleCount(prev => Math.min(prev + loadCount, sortedTwirls.length))
        };

    }
    window.addEventListener('scroll',handleScroll);
    return () => window.removeEventListener('scroll',handleScroll);
  },[sortedTwirls.length])

  return (
   
        <div>
          <FeedTabs />
          {sortedTwirls.slice(0,visibleCount)
            .map((twirl) => (
              <TwirlBox key={twirl.id} twirl={twirl} />
            ))}
        </div>
     
  );
};

export default Home;
