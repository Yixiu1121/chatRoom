import styled from "styled-components";
import React, { useEffect } from "react";
import { MessageProps, MessageStyleProps } from "./Message.type";

const StyledMessage = styled.div<MessageStyleProps>`
    display: flex;
    align-items: center;
    flex-direction: ${({ $isMe }) => ($isMe ? "row-reverse" : "row")};
    margin: 8px 10px;

    & p:first-child{
        margin: 0 5px;
    }

    & p:last-child{
        padding: 2px 5px
        border-radius: 5px;
        backgroud: #eee;
        color: grey;
        margin: auto 0;
    }
`;

const MessageComponent: React.FC<MessageProps> = ({ me, messages }) => {
  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);
  return (
    <div>
      {messages.length === 0 ? (
        <p style={{ color: "#ccc" }}>No messages...</p>
      ) : (
        messages.map(({ name, body }, i) => (
          <StyledMessage $isMe={name === me} key={i}>
            <p>
              {name} send : {body}
            </p>
          </StyledMessage>
        ))
      )}
    </div>
  );
};

export default MessageComponent;
