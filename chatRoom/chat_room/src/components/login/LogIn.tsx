import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { LoginProps } from "./Login.type";
import { useState } from "react";

const LogIn: React.FC<LoginProps> = ({ me, changeName, onLogin }) => {
  const [name, setName] = useState("");
  return (
    <Input.Search
      size="large"
      style={{ width: 300, margin: 50 }}
      prefix={<UserOutlined />}
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      enterButton="Sign In"
      onSearch={() => {
        changeName(name);
        onLogin(name);
      }}
    />
  );
};
export default LogIn;
