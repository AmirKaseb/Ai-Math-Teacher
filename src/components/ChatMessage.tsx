import React from "react";
import { format } from "date-fns";
import { Bot, User } from "lucide-react";
import mohamedImage from "../assets/mohamed.jpg";

interface ChatMessageProps {
  message: string;
  isAi: boolean;
  timestamp: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isAi, timestamp }) => {
  return (
    <div className={`flex gap-4 p-4 ${isAi ? "bg-gray-50" : "bg-white"}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAi ? "bg-emerald-500" : "bg-blue-500"
        }`}
      >
        {isAi ? (
          <img
            src={mohamedImage}
            alt="Mohamed Kasseb"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <User className="w-5 h-5 text-white" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{isAi ? "Mohamed Kasseb AI" : "You"}</span>
          <span className="text-xs text-gray-500">{format(timestamp, "MMM d, h:mm a")}</span>
        </div>
        <p className="mt-1 text-gray-700 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};
