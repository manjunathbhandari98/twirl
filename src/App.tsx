import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import type { RootState } from "./app/store";
import Header from "./components/common/Header";
import Bottombar from "./components/layout/Bottombar";
import CreatePostModal from "./components/modal/CreatePostModal";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  const isModalOpen = useSelector((state: RootState) => state.post.isModalOpen);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <>
      {/* Only show header if logged in */}
      {isAuthenticated && <Header />}

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
      </Routes>

      {/* Only show bottom bar if logged in */}
      {isAuthenticated && <Bottombar />}

      {isModalOpen && <CreatePostModal />}
    </>
  );
}

export default App;
