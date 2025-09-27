import { Hash, TrendingUp } from "lucide-react";
import { trendings } from "../../data/trendings";

const Trending = () =>{
    return(
        <div className="rounded-xl p-4 border space-y-5">
            <h2 className="font-medium text-xl">Trendings</h2>
            <div className="flex flex-col gap-3">
            {trendings.map(trend =>(
                <div key={trend.id} className="flex justify-between items-center hover:text-blue-600 cursor-pointer">
                    <div className="flex gap-3 items-center">
                        <Hash size={20}/>
                        <div className="flex flex-col">
                            <h4 className="font-medium">#{trend.topic}</h4>
                            <p className="text-sm">{trend.posts} posts</p>
                        </div>
                    </div>
                    <div className="text-xs text-green-500 flex gap-2">
                    <TrendingUp size={14}/>
                    <p>{trend.change}%</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Trending;