export interface Message {
  id: number;
  name: string;
  avatar: string;
  message: string;
}

// Assuming this is the existing array of messages
export const messages: Message[] = [
  // Initial messages...
];

// Function to add a new message
export const addMessage = (newMessage: string, isUserMessage: boolean) => {
  const baseId = messages[messages.length - 1]?.id ?? 0; // Get the last id, or 0 if no messages
  const newId = baseId + 1;

  // Assuming id 1 and 2 have specific data you want to copy (adjust according to your actual structure)
  const templateMessage = messages.find(m => m.id === (isUserMessage ? 1 : 2));

  if (templateMessage) {
    const { name, avatar } = templateMessage; // Extract other details you want to copy
    const messageToAdd: Message = {
      id: newId,
      name,
      avatar,
      message: newMessage,
    };
    messages.push(messageToAdd); // Append the new message
    }
};

// Function to append a new message to userData
export const appendNewMessage = (newMessageText: string, isUserMessage: boolean) => {
    const lastMessage = userData[0].messages[userData[0].messages.length - 1];
    const newId = lastMessage.id + 1; // Generate a new ID based on the last message

    const newMessage = {
        id: newId,
        avatar: isUserMessage ? '/User1.png' : '/ChatGPT.png', // Assuming avatars based on message origin
        name: isUserMessage ? 'Jane Doe' : 'ChatGPT', // Assuming names based on message origin
        message: newMessageText,
    };

    // Append the new message to the messages array
    userData[0].messages.push(newMessage);
};

export const userData = [
    {
        id: 1,
        avatar: '/ChatGPT.png',
        name: 'ChatGPT',
        messages: [
            {
                id : 1,
                avatar: '/User1.png',
                name: 'Jane Doe',
                message: 'Hello GPT!!',
            },
            {
                id : 2,
                avatar: '/ChatGPT.png',
                name: 'ChatGPT',
                message: 'How may I help you today?',
            },
        ]
    }
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
    id: 5,
    avatar: '/LoggedInUser.jpg',
    name: 'Jakob Hoeg',
};

export type LoggedInUserData = (typeof loggedInUserData);

export interface Message {
    id: number;
    avatar: string;
    name: string;
    message: string;
}

export interface User {
    id: number;
    avatar: string;
    messages: Message[];
    name: string;
}