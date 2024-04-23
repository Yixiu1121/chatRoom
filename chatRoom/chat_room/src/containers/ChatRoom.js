import Title from "../components/Title";
import ChatModal from "../components/ChatModal";
import Message from "../components/Message";
import ChatBoxesWrapper from "../components/ChatBoxesWrapper";
import Type from "../components/Type";
import { ChatProvider, useChat } from "./hooks/useChat.js";
import { message } from "antd";
import { useState, useEffect, useRef } from "react";
const ChatRoom = () => {
  const { me, messages, displayStatus, sendMessage, startChat } = useChat();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState("沒東西");
  const [chatBoxes, setChatBoxes] = useState([]);
  const [msgSent, setMsgSent] = useState(false);
  const renderChat = (chat) => {
    //產生 chat 的 DOM　nodes
    <div>{chat}</div>;
  };
  const extractChat = (friend) => {
    return renderChat(
      messages.filter(({ name, body }) => name === friend || name === me)
    );
  };
  useEffect(() => {
    setChatBoxes([]);
  }, []);
  const createChatBox = (friend) => {
    if (chatBoxes.some(({ key }) => key === friend)) {
      throw new Error(friend + "'s chat box has already opened.");
    }
    const chat = extractChat(friend);
    setChatBoxes([
      ...chatBoxes,
      {
        label: friend,
        children: chat,
        key: friend,
      },
    ]);
    setMsgSent(true);
    console.log("chat", chat);
    return friend;
  };
  const removeChatBox = (targetKey, activeKey) => {
    const index = chatBoxes.findIndex(({ key }) => key === activeKey);
    const newChatBoxes = chatBoxes.filter(({ key }) => key !== targetKey);
    setChatBoxes(newChatBoxes);
    return activeKey
      ? activeKey === targetKey
        ? index === 0
          ? ""
          : chatBoxes[index - 1].key
        : activeKey
      : "";
  };

  return (
    <>
      <Title name={me} />
      <ChatBoxesWrapper
        messages={messages}
        me={me}
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
          startChat(me, key);
        }}
        onEdit={(targetKey, action) => {
          //按下加之後
          if (action === "add") {
            // const newTabIndex = useRef(0)
            // const newActiveKey = `newTab${newTabIndex.current++}`;
            setActiveKey(activeKey);
            setModalOpen(true);
            console.log(chatBoxes);
          } else if (action === "remove") {
            setActiveKey(removeChatBox(targetKey, activeKey));
          }
        }}
        items={chatBoxes}
      />
      <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          //按下create
          setActiveKey(createChatBox(name));
          startChat(me, name);
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false); //按下cancel
        }}
      />
      <Type
        messages={messages}
        me={me}
        displayStatus={displayStatus}
        sendMessage={sendMessage}
        activeKey={activeKey}
      />
    </>
  );
};
export default ChatRoom;
