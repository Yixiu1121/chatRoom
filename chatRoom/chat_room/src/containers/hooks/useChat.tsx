import { Message, RoomChats } from "@/components/message/Message.type";
import { useState, useEffect, useContext, createContext } from "react";

const LOCALSTORAGE_KEY = "save-me";
// const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
const ChatContext = createContext({
  status: {},
  me: "",
  signedIn: false,
  allChats: [],
  sendMessage: (payload: Message, roomId: string) => {},
  startChat: () => {},
  clearMessages: () => {},
  displayStatus: (value: any) => {},
  handleSetMyName: (me: string) => {},
  setStatus: () => {},
  setSignedIn: (value: boolean) => {},
  addNewChat: (RoomChats: RoomChats) => {},
});

const ChatProvider = (props: any) => {
  const [status, setStatus] = useState({});
  const [me, setMe] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  //TODO api get allChats
  const [allChats, setAllChats] = useState<RoomChats[]>([
    {
      room_name: "test room",
      room_id: "123456",
      chats: [
        { name: "蛤蟆", body: "新增聊天室時要新增room_id, chats 加到messages" },
      ],
    },
    {
      room_name: "room 2",
      room_id: "12345",
      chats: [{ name: "peter", body: "hi" }],
    },
  ]);

  const emitEvent = async (data: any[]) => {
    client.send(JSON.stringify(data));
    console.log(client.readyState);
  };
  const displayStatus = () => {
    // display friend online or not
    console.log(status);
  };
  const handleSetMyName = (name: string) => {
    setMe(name);
  };

  const sendMessage = (payload: Message, roomId: string) => {
    emitEvent(["input", payload]);
    const updatedChatRooms = allChats.map((room) => {
      if (room.room_id === roomId) {
        return {
          ...room,
          chats: [...room.chats, payload],
        };
      }
      return room;
    });
    console.log("updatedChatRooms", updatedChatRooms);
    setAllChats(updatedChatRooms);
    setStatus({
      type: "success",
      msg: "Message sent.",
    });
  };
  const startChat = (name: string, friend: string) => {
    emitEvent(["chat", { name: name, friend: friend }]);
    setStatus({
      type: "success",
      msg: "start chat.",
    });
  };
  const clearMessages = () => {
    emitEvent(["clear"]);
    setAllChats([]);
    setStatus({
      type: "success",
      msg: "Message cleared.",
    });
  };
  const addNewChat = (RoomChats: RoomChats) => {
    setAllChats([...allChats, RoomChats]);
  };
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [me, signedIn]);
  const client = new WebSocket("ws://localhost:8000");
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
        setAllChats(() => [...allChats, ...payload]);
        break;
      }
      case "status": {
        console.log(task);
        setStatus(payload);
        break;
      }
      case "init": {
        // console.log(task)
        setAllChats(payload);
        break;
      }
      case "cleared": {
        console.log(task);
        setAllChats([]);
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
        allChats,
        handleSetMyName,
        setSignedIn,
        sendMessage,
        clearMessages,
        displayStatus,
        startChat,
        addNewChat,
      }}
      {...props}
    />
  );
};

const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
