import { Bell, Search, User } from "lucide-react";

const Header = () =>{
    return (
        <div className="flex justify-around items-center">
            <div className="">
                <img src="/twirl-logo.png" alt="logo" className="w-20 h-20" />
            </div>

            {/* Search bar */}
            <div className="border p-2 rounded-3xl w-xl flex justify-between">
                <input type="text" name="" id="" className="border-0 outline-0 w-full"
                placeholder="search for anything...."
                />
                <Search/>
            </div>

        
            <div className="flex gap-10 items-center">
                <button className="bg-blue-500 py-2 px-4 rounded-2xl text-white">Post</button>
                <Bell/>
                <User/>
            </div>
        </div>
    )
}

export default Header;