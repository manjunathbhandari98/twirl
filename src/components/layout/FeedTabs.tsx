import { MoreHorizontal, Sparkle } from "lucide-react";
import { useState } from "react";

const FeedTabs = () =>{
    const [activeTab, setActiveTab] = useState(1);
    const tabs = [
        {name:'For You', icon:<Sparkle size={14}/>},
        {name:'Following'},
        {name:'Trending'}
    ]

    return(
        <div className="flex justify-between items-center px-3 py-2">
      {/* Scrollable tabs container */}
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-2 px-3 py-2 text-md whitespace-nowrap transition-all
              ${
                activeTab === index
                  ? "border-b-2 border-pink-600 font-medium text-pink-700"
                  : "text-gray-600 hover:text-pink-600"
              }`}
          >
            <span>{tab.name}</span>
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Options button */}
      <MoreHorizontal className="cursor-pointer sm:block hidden" />
    </div>
    )
}

export default FeedTabs;