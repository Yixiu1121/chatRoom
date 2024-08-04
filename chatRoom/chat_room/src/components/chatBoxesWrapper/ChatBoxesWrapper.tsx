import Message from "../message/Message";
import TabComponents from "../tabs/Tabs";
import React, { useState } from "react";
import { Wrapper } from "./ChatBoxesWrapper.style";
import ChatModal from "../chatModal/ChatModal";
import { ChatBoxesProps } from "./ChatBoxesWrapper.type";

const ChatBoxesWrapper: React.FC<ChatBoxesProps> = ({ me, messages }) => {
  const [openModal, setOpenModal] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");
  return (
    <Wrapper>
      <TabComponents
        setOpenModal={setOpenModal}
        initialItems={[]} //call api
        addItems={{ label: newFriendName, children: [], key: newFriendName }}
      />
      <Message me={me} messages={messages} />
      {openModal && (
        <ChatModal open={openModal} setNewFriendName={setNewFriendName} />
      )}
    </Wrapper>
  );
};
export default ChatBoxesWrapper;
