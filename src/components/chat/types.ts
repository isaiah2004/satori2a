// types.ts
export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
}

export interface User {
  id: number;
  avatar: string;
  messages?: Message[];
  name: string;
}

export interface ChatContextType {
  userData: User[];
  sendMessage: (newMessage: Message, userId: number) => void;
}
