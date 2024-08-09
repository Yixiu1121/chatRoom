import React, { useState } from "react";
import { Input, Modal } from "antd";
import { ChatModalProps } from "./ChatModal.type";
import { useChat } from "../../containers/hooks/useChat";

const ChatModal: React.FC<ChatModalProps> = ({
  open,
  setChatRooms,
  ChatRooms,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(open);
  const [val, setInputValue] = useState("");
  const { addNewChat } = useChat();
  const handleOk = () => {
    if (!val) {
      alert("please enter value or cancel the modal");
    }
    // check the val if exist
    // else if (val in [room.label for room in ChatRooms]) {
    // }
    else {
      // TODO call add_chatRoom api and have room_id
      // TODO create chat object to messages
      const newRoom = {
        label: val,
        roomId: "24678",
        key: ChatRooms.length + 1,
      };
      setChatRooms([...ChatRooms, newRoom]);
      const messageData = {
        room_name: val,
        room_id: "24678",
        chats: [],
      };
      addNewChat(messageData);
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Add"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Add new chat...</p>
        <Input
          defaultValue="enter new friend's name"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default ChatModal;
