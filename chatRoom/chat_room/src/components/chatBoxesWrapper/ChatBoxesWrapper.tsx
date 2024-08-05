import TabComponents from "../tabs/Tabs";
import React, { useEffect, useState } from "react";
import { Wrapper, MessageStyle, TypeStyle } from "./ChatBoxesWrapper.style";
import ChatModal from "../chatModal/ChatModal";
import { ChatBoxesProps } from "./ChatBoxesWrapper.type";
import { useChat } from "../../containers/hooks/useChat";

// call get_chatRoom api
const initialItems = {
  label: "test room",
  roomId: "12345",
  key: "1",
};
// flow
// 1. 先打開modal
// 2. 輸入資料
// 3. 確認後新增chatRoom
// 4. activeKey 切到新的chatRoom

const ChatBoxesWrapper: React.FC<ChatBoxesProps> = ({ me }) => {
  const [openModal, setOpenModal] = useState(false);
  const [ChatRooms, setChatRooms] = useState([
    initialItems,
    {
      label: "room 2",
      roomId: "12345",
      key: "2",
    },
  ]);
  const [activeKey, setActiveKey] = useState(initialItems.key);
  const { messages } = useChat();
  // useEffect(() => {
  // get room data api
  //   const room_data = [{ name: "peter", body: "hi" }];
  //   setMessages(room_data);
  // }, [activeKey]);
  useEffect(() => {
    console.log("ChatRooms", ChatRooms);
  }, [ChatRooms]);
  return (
    <Wrapper>
      <TabComponents
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        setOpenModal={setOpenModal}
        chatRooms={ChatRooms}
      />
      <MessageStyle me={me} messages={messages} />
      {openModal && (
        <ChatModal
          open={openModal}
          setChatRooms={setChatRooms}
          ChatRooms={ChatRooms}
        />
      )}
      <TypeStyle />
    </Wrapper>
  );
};
export default ChatBoxesWrapper;
