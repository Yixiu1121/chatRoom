import { useState, useEffect, useContext, createContext } from "react";
const client = new WebSocket("ws://localhost:8000");

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  messages: [],
  sendMessage: () => {},
  startChat: () => {},
  clearMessages: () => {},
  displayStatus: () => {},
});

const ChatProvider = (props) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const sendData = async (data) => {
    client.send(JSON.stringify(data));
    console.log(client.readyState);
  };
  const displayStatus = () => {
    // display friend online or not
  };

  const sendMessage = (payload) => {
    sendData(["input", payload]);
    setMessages([...messages, payload]);
    setStatus({
      type: "success",
      msg: "Message sent.",
    });
    console.log("sendMessage", messages);
  };
  const startChat = (name, friend) => {
    sendData(["chat", { name: name, friend: friend }]);
    // setMessages([payload]);
    setStatus({
      type: "success",
      msg: "start chat.",
    });
  };
  const clearMessages = () => {
    sendData(["clear"]);
    setMessages([]);
    setStatus({
      type: "success",
      msg: "Message cleared.",
    });
  };

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);

  client.onopen = () => {
    console.log("open connection");
  };
  client.onclose = () => {
    console.log("close connection");
  };
  client.onerror = (ev) => {
    console.log(ev);
  };
  client.onmessage = (byteString) => {
    const { data } = byteString;
    const [task, payload] = JSON.parse(data);
    console.log(JSON.parse(data));
    switch (task) {
      case "backchat": {
        console.log("chat", payload);
        break;
      }
      case "output": {
        console.log("task", task);
        setMessages(() => [...messages, ...payload]);
        break;
      }
      case "status": {
        console.log(task);
        setStatus(payload);
        break;
      }
      case "init": {
        // console.log(task)
        setMessages(payload);
        break;
      }
      case "cleared": {
        console.log(task);
        setMessages([]);
        break;
      }
      default:
        break;
    }
  };
  return (
    <ChatContext.Provider
      value={{
        status,
        me,
        signedIn,
        messages,
        setMe,
        setSignedIn,
        sendMessage,
        clearMessages,
        displayStatus,
        startChat,
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
