import "./App.css";
import styled from "styled-components";
import ChatRoom from "./containers/chatRoom/ChatRoom";
import SignIn from "./containers/SignIn";
import { useChat } from "./containers/hooks/useChat";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

function App() {
  const { status, signedIn, displayStatus } = useChat();

  useEffect(() => {
    displayStatus(status);
  }, [status, displayStatus]);

  return (
    <Wrapper>{signedIn ? <ChatRoom></ChatRoom> : <SignIn></SignIn>}</Wrapper>
  );
}

export default App;
