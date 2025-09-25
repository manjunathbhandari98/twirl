import { Bell, Home, Plus, Search, Users } from "lucide-react";

const Bottombar = () =>{

    const navItems = [
        {icon: <Home/> , link:''},
         {icon: <Search/> , link:''},
          {icon: <Plus/> , link:''},
           {icon: <Bell/> , link:''},
            {icon: <Users/> , link:''},
    ]

    return(
        <div className="p-5 shadow-2xl bg-white fixed bottom-0 w-full flex sm:hidden justify-between items-center">
            {navItems.map((item,index) =>(
                <div className="p-1" key={index} >
                    {item.icon}
                </div>
            ))}
        </div>
    )
}

export default Bottombar;