import { Messages } from "../message/Message.type";

export interface ChatBoxesProps {
  me: string;
  messages: Messages[];
}
