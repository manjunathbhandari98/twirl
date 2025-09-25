import { BadgeCheck } from "lucide-react";
import { suggestedUser } from "../../data/suggestedUser";

const SuggestedUser = () =>{
    return(
        <div className="rounded-xl p-4 border space-y-5">
            <h2 className="font-medium text-xl">Suggestions</h2>
            {suggestedUser.map((suggestion) =>(
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
          {/* Profile Image */}
          <img
            src={suggestion.avatar}
            alt={suggestion.username}
            className="rounded-full w-11 h-11 border"
          />

          {/* Name + Username + Date */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h2 className="font-semibold text-base">
                {suggestion.displayName}
              </h2>
              {suggestion.verified && (
                <BadgeCheck className="w-4 h-4 text-sky-500" />
              )}
            </div>
            <div className="flex gap-2 text-sm text-gray-500">
              <p>@{suggestion.username}</p>
              
            </div>
          </div>
        </div>

        <button className="px-2 py-1 cursor-pointer rounded-lg bg-[#0a0018] text-white">Follow</button>
                </div>
                
            ))}
            <p className="text-sm text-[#0a0018] cursor-pointer">Show More</p>
        </div>
    )
}

export default SuggestedUser;