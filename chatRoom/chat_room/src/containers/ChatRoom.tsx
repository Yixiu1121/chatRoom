import Title from "../components/title/Title";
// import ChatModal from "../components/chatModal/ChatModal.js";
import Type from "../components/type/Type";
import ChatBoxesWrapper from "../components/chatBoxesWrapper/ChatBoxesWrapper";
import { useChat } from "./hooks/useChat";
import { useState, useEffect } from "react";
const ChatRoom = () => {
  const { me, messages, displayStatus, sendMessage, startChat } = useChat();
  // const [modalOpen, setModalOpen] = useState(false);
  const [chatBoxes, setChatBoxes] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const [filtedMessages, setFiltedMessages] = useState();
  useEffect(() => {
    extractChat(activeKey);
  }, [messages, activeKey]);
  const extractChat = (friendName) => {
    console.log(messages);
    let filtedMessages = messages.filter(
      ({ name, friend, body }) =>
        (name === friendName && friend === me) ||
        (name === me && friend === friendName)
    );
    console.log("filtedMessages", filtedMessages);
    return setFiltedMessages(filtedMessages);
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
    console.log("friend", friend);
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
      <ChatBoxesWrapper me={me} messages={messages} />
      {/* <ChatBoxesWrapper
        messages={filtedMessages}
        me={me}
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
          extractChat(key);
          startChat(me, key);
        }}
        onEdit={(targetKey, action) => {
          //按下加之後
          if (action === "add") {
            setActiveKey(activeKey);
            setModalOpen(true);
            console.log(chatBoxes);
          } else if (action === "remove") {
            setActiveKey(removeChatBox(targetKey, activeKey));
          }
        }}
        items={chatBoxes}
      /> */}
      {/* <ChatModal
        open={modalOpen}
        onCreate={({ name }) => {
          setActiveKey(createChatBox(name));
          createChatBox(name);
          startChat(me, name);
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
      /> */}
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
