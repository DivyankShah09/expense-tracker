import { useState } from "react";
import { TextInput } from "../../components/input/TextInput";
import { HeaderText } from "../../components/text/HeaderText";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/button/PrimaryButton";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const callLogin = async () => {};

  return (
    <div className="my-5 text-center">
      <HeaderText label="Login" />
      <div className="w-1/3 text-center p-2 mx-auto my-2">
        <TextInput
          labelPosition="top"
          placeholderText="Email"
          value={email}
          onChange={(value) => setEmail(value)}
          type="email"
        />
        <TextInput
          labelPosition="top"
          placeholderText="Password"
          value={password}
          onChange={(value) => setPassword(value)}
          type="password"
        />
        <p
          className="text-right underline cursor-pointer hover:text-gray-400"
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          Forgot Password?
        </p>
        <PrimaryButton
          buttonText="Login"
          onClick={async () => {
            await callLogin();
          }}
        />
        <p className="text-center">
          Do not have an account?{" "}
          <span
            className="underline cursor-pointer hover:text-gray-400"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
