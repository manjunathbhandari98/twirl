import { BadgeCheck, Heart, MessageCircle,  Repeat2 } from "lucide-react";
import type { Comment } from "../../types";
import { formatTweetDate } from "../../utils/formatDate";

type ReplyProps = {
    reply: Comment
}

const ReplyBox = ({reply}:ReplyProps) =>{
    return(
        <div className="m-5">
            <div className="flex justify-between items-start">
        <div className="flex gap-3">
          {/* Profile Image */}
          <img
            src={reply.user.avatar}
            alt={reply.user.username}
            className="rounded-full w-11 h-11 border"
          />

          {/* Name + Username + Date */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <h2 className="font-semibold text-base">
                {reply.user.displayName}
              </h2>
              {reply.user.verified && (
                <BadgeCheck className="w-4 h-4 text-sky-500" />
              )}
            </div>
            <div className="flex gap-2 text-sm text-gray-500">
              <p>@{reply.user.username}</p>
              <span>·</span>
              <p>{formatTweetDate(reply.createdAt)}</p>
            </div>
          </div>
        </div>

      </div>

      <div className="my-3">
        <p className="text-[15px] leading-relaxed">{reply.content}</p>
      </div>

      {/* Action buttons */}
       <div className="flex gap-5 items-center">
            <button className="flex items-center gap-2 hover:text-pink-500 transition">
          <Heart size={18} />
          <span>{reply.content.length}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-sky-500 transition">
          <MessageCircle size={18} />
          <span>{reply.content.length}</span>
        </button>

        <button className="flex items-center gap-2 hover:text-green-500 transition">
          <Repeat2 size={18} />
          <span>{reply.content.length}</span>
        </button>
        </div>
        </div>
    )
}

export default ReplyBox;