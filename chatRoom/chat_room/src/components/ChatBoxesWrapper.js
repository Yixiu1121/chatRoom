import { Tabs } from "antd";
import Message from "./Message";
import styled from "styled-components";
import { useEffect } from "react";
import { useChat } from "../containers/hooks/useChat";
const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
`;

const ChatBoxesWrapper = ({ me, onChange, onEdit, items, activeKey }) => {
  const { messages, startChat } = useChat();
  useEffect(() => {
    <Message></Message>;
  }, [messages]);

  return (
    <>
      <Wrapper>
        <Tabs
          activeKey={activeKey}
          onChange={onChange}
          onEdit={onEdit}
          type="editable-card"
          items={items}
        />
        <Message me={me} messages={messages} />
      </Wrapper>
    </>
  );
};
export default ChatBoxesWrapper;
