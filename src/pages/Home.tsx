import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import Footer from "../components/common/Footer";
import FeedTabs from "../components/layout/FeedTabs";
import SuggestedUser from "../components/layout/SuggestedUsers";
import Trending from "../components/layout/Trending";
import TwirlBox from "../components/layout/TwirBox";
import Notifications from "../components/notification/Notifications";
import { twirls } from "../data/twirls";


const Home = () =>{
    const isNotificationModalOpen = useSelector((state:RootState) => state.notification.notificationModalOpen);
    return(
        <div className="grid sm:grid-cols-[8fr_4fr] sm:mt-7 mt-3 mb-20 sm:mx-10 mx-2">
            {isNotificationModalOpen ? (
                <div>
                    <Notifications/>
                </div>
            ) : (
                <div>
                 <FeedTabs/>
           {[...twirls]
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .map(twirl => (
    <TwirlBox key={twirl.id} twirl={twirl} />
))}

            </div>
            )}
            
           <div className="sm:flex flex-col hidden gap-4 mx-5 mt-7">
            <Trending/>
            <SuggestedUser/>
            <Footer/>
           </div>
           
        </div>
    )
}

export default Home;