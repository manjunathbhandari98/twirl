import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import TwirlBox from "../components/layout/TwirBox";
import { currentUser } from "../data/profile";
import { twirls } from "../data/twirls";


const CollectionPage = () =>{
    const selectedCollection = useSelector((state:RootState) => state.collection.selectedCollection);
    const favorites = currentUser.favorites?.filter(f => f.id == selectedCollection);

    return(
       <div className="space-y-6 p-4">
  {favorites?.map(fav => {
    const threadsForFav = twirls.filter(thread => fav.twirlIds.includes(thread.id));
    return (
      <div
        key={fav.id}
      >
        {/* Favorite Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{fav.title}</h2>
          <p className="text-gray-500 mt-1">{fav.description}</p>
        </div>

        {/* Threads Grid */}
        <div className="space-y-4">
          {threadsForFav.map(thread => (
            <TwirlBox
              key={thread.id}
              twirl={thread}
            />
          ))}
        </div>
      </div>
    );
  })}
</div>

    )
}

export default CollectionPage;