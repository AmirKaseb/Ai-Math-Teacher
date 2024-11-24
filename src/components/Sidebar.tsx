import React from 'react';
import { MessageSquare, LogOut, Plus } from 'lucide-react';

interface Chat {
  id: string;
  title: string;
  timestamp: Date;
}

interface SidebarProps {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onSignOut: () => void;
  selectedChatId?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  onSelectChat,
  onNewChat,
  onSignOut,
  selectedChatId,
}) => {
  return (
    <div className="w-64 bg-gray-900 h-screen flex flex-col">
      <button
        onClick={onNewChat}
        className="m-2 p-3 flex items-center gap-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
      >
        <Plus className="w-5 h-5" />
        New Chat
      </button>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full p-3 flex items-center gap-2 hover:bg-gray-700 transition-colors ${
              selectedChatId === chat.id ? 'bg-gray-700' : ''
            }`}
          >
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <span className="text-gray-200 text-sm truncate">{chat.title}</span>
          </button>
        ))}
      </div>

      <button
        onClick={onSignOut}
        className="m-2 p-3 flex items-center gap-2 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </div>
  );
}