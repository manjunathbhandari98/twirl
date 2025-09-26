import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setActiveTab } from "../../redux/NotificationSlice";

const NotificationTab = () =>{
    const dispatch = useDispatch();
    const activeTab = useSelector((state:RootState) => state.notification.activeTab);
    const tabs = [
        {name:'All', value:"all"},
        {name:'Follows', value:'follows'},
        {name:'Mentions', value:'mentions'}
    ] as const;

    return(
        <div className="flex px-3 py-2">
      {/* Scrollable tabs container */}
      <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => dispatch(setActiveTab(tab.value))}
            className={`flex outline-0 items-center gap-2 px-3 py-2 text-sm whitespace-nowrap transition-all
              ${
                activeTab === tab.value
                  ? "border-b-2 border-pink-600 font-medium text-pink-700"
                  : "text-gray-600 hover:text-pink-600"
              }`}
          >
            <span>{tab.name}</span>
           
          </button>
        ))}
      </div>

    </div>
    )
}

export default NotificationTab;