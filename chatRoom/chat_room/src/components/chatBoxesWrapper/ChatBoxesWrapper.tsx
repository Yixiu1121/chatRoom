import TabComponents from "../tabs/Tabs";
import React, { useEffect, useState } from "react";
import { Wrapper, MessageStyle, TypeStyle } from "./ChatBoxesWrapper.style";
import ChatModal from "../chatModal/ChatModal";
import { ChatBoxesProps } from "./ChatBoxesWrapper.type";
import { useChat } from "../../containers/hooks/useChat";
import { RoomChats } from "../message/Message.type";

//TODO call get_chatRoom api
const initialItems = [
  {
    label: "test room",
    roomId: "123456",
    key: "1",
  },
  {
    label: "room 2",
    roomId: "12345",
    key: "2",
  },
];

const ChatBoxesWrapper: React.FC<ChatBoxesProps> = ({ me }) => {
  const [openModal, setOpenModal] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("1");
  const [ChatRooms, setChatRooms] = useState(initialItems);
  const [filteredChats, setFilteredChats] = useState([]);
  const { allChats } = useChat();
  useEffect(() => {
    const roomId = ChatRooms.find((room) => room.key === activeKey)?.roomId;
    if (allChats.length > 0) {
      const chat = allChats.find((chat: RoomChats) => chat.room_id === roomId);
      setFilteredChats(chat?.["chats"] || []);
    }
  }, [allChats, activeKey]);

  return (
    <Wrapper>
      <TabComponents
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        setOpenModal={setOpenModal}
        chatRooms={ChatRooms}
      />
      <MessageStyle me={me} messages={filteredChats} />
      {openModal && (
        <ChatModal
          open={openModal}
          setChatRooms={setChatRooms}
          ChatRooms={ChatRooms}
        />
      )}
      <TypeStyle
        roomId={ChatRooms.find((room) => room.key === activeKey)?.roomId}
      />
    </Wrapper>
  );
};
export default ChatBoxesWrapper;
