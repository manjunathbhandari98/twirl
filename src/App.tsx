import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import type { RootState } from "./app/store";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import Bottombar from "./components/layout/Bottombar";
import SuggestedUser from "./components/layout/SuggestedUsers";
import Trending from "./components/layout/Trending";
import CreatePostModal from "./components/modal/CreatePostModal";
import Notifications from "./components/notification/Notifications";
import Auth from "./pages/Auth";
import CollectionPage from "./pages/CollectionPage";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  const isModalOpen = useSelector((state: RootState) => state.post.isModalOpen);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const isNotificationModalOpen = useSelector(
    (state: RootState) => state.notification.notificationModalOpen
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }} className="min-h-screen">
      {/* Only show header if logged in */}
      {isAuthenticated && <Header />}
 <div className="grid sm:grid-cols-[8fr_4fr] sm:mt-7 mt-3 mb-20 sm:mx-10 mx-2">
 {isNotificationModalOpen ? (
        <div>
          <Notifications />
        </div>
      ) : (
      <Routes>
        {/* Public route */}
        <Route path="/auth" element={<Auth />} />

        {/* Protected route */}
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
         <Route
          path="/:username"
          element={
            <PrivateRoutes>
              <MyAccount />
            </PrivateRoutes>
          }
        />

        <Route
          path="/collections/:collectionTitle"
          element={
            <PrivateRoutes>
              <CollectionPage />
            </PrivateRoutes>
          }
        />
      </Routes>
      )}
      <div className="sm:flex flex-col hidden gap-4 mx-5 mt-7">
        <Trending />
        <SuggestedUser />
        <Footer />
      </div>
 </div>

      {/* Only show bottom bar if logged in */}
      {isAuthenticated && <Bottombar />}

      {isModalOpen && <CreatePostModal />}
    </div>
  );
}

export default App;