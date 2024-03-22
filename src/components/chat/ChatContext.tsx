// ChatContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, User } from '@/app/data'; // Import directly from your data.tsx file

interface ChatContextType {
  userData: User[];
  sendMessage: (newMessage: Message, userId: number) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<User[]>([]); // Initialize with empty array or fetch from a local store or API

  const sendMessage = (newMessage: Message, userId: number) => {
    setUserData((currentUsers) => {
      return currentUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            messages: [...(user.messages || []), newMessage],
          };
        }
        return user;
      });
    });
  };

  return (
    <ChatContext.Provider value={{ userData, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
