import React, { useState } from "react";
import { Input, Modal } from "antd";
import { ChatModalProps } from "./ChatModal.type";

const ChatModal: React.FC<ChatModalProps> = ({
  open,
  setChatRooms,
  ChatRooms,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(open);
  const [val, setInputValue] = useState("");

  const handleOk = () => {
    if (!val) {
      alert("please enter value or cancel the modal");
    }
    // check the val if exist
    // else if (val in [room.label for room in ChatRooms]) {
    // }
    else {
      // call add_chatRoom api and have room_id
      const newRoom = { label: val, roomId: "24678", key: "1" };
      setChatRooms([...ChatRooms, newRoom]);
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
