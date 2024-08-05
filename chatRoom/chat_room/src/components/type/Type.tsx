import { Input } from "antd";
import { useState, useRef } from "react";
import { useChat } from "../../containers/hooks/useChat";

const Type: React.FC = () => {
  const [body, setBody] = useState("");
  const bodyRef = useRef(null);
  const { me, displayStatus, sendMessage } = useChat();
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
        sendMessage({ name: me, body: body });
        setBody("");
      }}
    ></Input.Search>
  );
};
export default Type;
