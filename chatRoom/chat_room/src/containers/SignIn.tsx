import Title from "../components/title/Title";
import LogIn from "../components/login/LogIn";
import { useChat } from "./hooks/useChat";

const SignIn = () => {
  const { me, displayStatus, setSignedIn, handleSetMyName } = useChat();
  const handleLogin = (name: string) => {
    console.log(name);
    if (!name) {
      displayStatus({
        type: "error",
        msg: "Missing user name",
      });
    } else {
      setSignedIn(true);
    }
  };
  return (
    <>
      <Title name={""} />
      <LogIn me={me} changeName={handleSetMyName} onLogin={handleLogin} />
    </>
  );
};

export default SignIn;
