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
