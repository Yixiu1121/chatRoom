import styled from "styled-components";
import { TitleProps } from "./Title.type";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
  }
`;
const Title: React.FC<TitleProps> = ({ name }) => (
  <Wrapper>
    <h1>
      {name ? `${name}'s ` : "My"}
      Chat Room
    </h1>
  </Wrapper>
);
export default Title;
