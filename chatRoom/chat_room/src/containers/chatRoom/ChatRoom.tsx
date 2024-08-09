import Title from "../../components/title/Title";
import ChatBoxesWrapper from "../../components/chatBoxesWrapper/ChatBoxesWrapper";
import { useChat } from "../hooks/useChat";

const ChatRoom = () => {
  const { me } = useChat();

  return (
    <>
      <Title name={me} />
      <ChatBoxesWrapper me={me} />
    </>
  );
};
export default ChatRoom;
