export interface MessageProps {
  me: string;
  messages: Message[];
}
export interface Message {
  name: string;
  body: string;
}
export interface MessageStyleProps {
  $isMe: boolean;
}
export interface RoomChats {
  room_name: string;
  room_id: string;
  chats: Message[];
}
