import { MoveLeft } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { mockNotifications } from "../../data/notifications";
import { setActiveTab, setNotificationModalClose } from "../../redux/NotificationSlice";
import NotificationContainer from "./NotificationContainer";
import NotificationTab from "./NotificationTab";

const Notifications = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.notification.activeTab);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Step 1: Filter by active tab
  let filteredNotifications = [...mockNotifications];
  if (activeTab === "follows") {
    filteredNotifications = filteredNotifications.filter(n => n.type === "follow");
  } else if (activeTab === "mentions") {
    filteredNotifications = filteredNotifications.filter(n => n.type === "mention");
  }

  // Step 2: Sort notifications (Unread first, then newest)
  const sortedNotifications = filteredNotifications.sort((a, b) => {
    if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Step 3: Pagination
  const totalPages = Math.ceil(sortedNotifications.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginated = sortedNotifications.slice(startIndex, startIndex + pageSize);

  const handleMoveBack = () =>{
    dispatch(setNotificationModalClose())
    dispatch(setActiveTab('all'))
  }

  return (
    <div className="mx-4">
      <div className="flex justify-between w-full p-5">
        <button onClick={handleMoveBack} className="cursor-pointer">
          <MoveLeft />
        </button>
        <h2 className="">Notifications</h2>
      </div>

      <NotificationTab />

      {paginated.map(notification => (
        <NotificationContainer key={notification.id} notification={notification} />
      ))}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Notifications;
