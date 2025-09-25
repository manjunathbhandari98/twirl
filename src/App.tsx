import Bottombar from "./components/layout/Bottombar"
import Header from "./components/common/Header"
import Home from "./pages/Home"
import { useSelector } from "react-redux"
import type { RootState } from "./app/store"
import CreatePostModal from "./components/modal/CreatePostModal"

function App() {
   const isModalOpen = useSelector((state: RootState) => state.post.isModalOpen)
  return (
    <>
    <Header/>
    <Home/>
    <Bottombar/>
    {isModalOpen && <CreatePostModal/>}
    </>
  )
}

export default App
