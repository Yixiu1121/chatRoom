export interface MessageProps {
  me: string;
  messages: Messages[];
}
export interface Messages {
  name: string;
  body: string;
}
export interface MessageStyleProps {
  $isMe: boolean;
}
