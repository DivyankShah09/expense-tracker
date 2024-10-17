import { useState } from "react";
import { TextInput } from "../../components/input/TextInput";

const Login = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <div className="bg-indigo-500 border border-sky-500">
      <p className="text-sky-400/100">Login</p>
      <TextInput
        labelPosition="top"
        placeholderText="Email"
        value={email}
        onChange={(value) => setEmail(value)}
        type="email"
      />
    </div>
  );
};

export default Login;
