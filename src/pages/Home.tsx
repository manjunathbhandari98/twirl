import Footer from "../components/common/Footer";
import FeedTabs from "../components/layout/FeedTabs";
import SuggestedUser from "../components/layout/SuggestedUsers";
import Trending from "../components/layout/Trending";
import TwirlBox from "../components/layout/TwirBox";
import { twirls } from "../data/twirls";


const Home = () =>{
    return(
        <div className="grid sm:grid-cols-[8fr_4fr] sm:mt-7 mt-3 mb-20 sm:mx-10 mx-2">
            <div>
                 <FeedTabs/>
            {twirls.map(twirl => (
                    <TwirlBox key={twirl.id} twirl = {twirl} />
            ))}
            </div>
           <div className="sm:flex flex-col hidden gap-4 mx-5 mt-7">
            <Trending/>
            <SuggestedUser/>
            <Footer/>
           </div>
           
        </div>
    )
}

export default Home;