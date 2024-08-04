export interface TypeProps {
  me: string;
  displayStatus: (arg: DisplayStatus) => {};
  sendMessage: (arg: SendMessageProps) => {};
  activeKey: string;
}
export interface SendMessageProps {
  name: string;
  friend: string;
  body: string;
}
export interface DisplayStatus {
  type: string;
  msg: string;
}
