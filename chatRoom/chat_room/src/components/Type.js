import { Input } from "antd";
import { useState, useRef } from "react";

const Type = ({ me, messages, displayStatus, sendMessage, activeKey }) => {
  const [body, setBody] = useState("");
  const bodyRef = useRef(null);
  return (
    <Input.Search
      ref={bodyRef.current}
      value={body}
      onChange={(e) => setBody(e.target.value)}
      enterButton="Send"
      placeholder="Type a message here..."
      onSearch={(msg) => {
        if (!msg) {
          console.log(body);
          displayStatus({
            type: "error",
            msg: "Please enter a message body.",
          });
          return;
        }
        console.log(messages);
        sendMessage({ name: me, friend: activeKey, body: msg });
        setBody("");
      }}
    ></Input.Search>
  );
};
export default Type;
