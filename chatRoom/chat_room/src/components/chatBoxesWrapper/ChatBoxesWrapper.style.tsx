import styled from "styled-components";
import MessageComponent from "../message/Message";
import Type from "../type/Type";
export const Wrapper = styled.div`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;
export const MessageStyle = styled(MessageComponent)`
  flex-grow: 1;
  overflow-y: auto;
  height: 300px;
`;
export const TypeStyle = styled(Type)`
  flex-shrink: 0;
  margin-top: auto;
`;
