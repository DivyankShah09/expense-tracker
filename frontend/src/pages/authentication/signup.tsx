import { useState } from "react";
import { TextInput } from "../../components/input/TextInput";
import { HeaderText } from "../../components/text/HeaderText";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/button/PrimaryButton";
import { NumberInput } from "../../components/input/NumberInput";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [age, setAge] = useState<number>();
  const [gender, setGender] = useState<string>();

  const validateForm = () => {
    if (!name) {
      toast.error("Name is required");
      return false;
    }

    if (!email) {
      toast.error("Email is required");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      return false;
    }

    if (!confirmPassword) {
      toast.error("Confirm Password is required");
      return false;
    }
    return true;
  };

  const callSignup = () => {
    if (validateForm()) {
      console.log("Name: ", name);
      console.log("Email: ", email);
      console.log("Password: ", password);
      console.log("Confirm Password: ", confirmPassword);
      console.log("Gender: ", gender);
      console.log("Age: ", age);
    }
  };

  return (
    <div className="my-5 text-center">
      <HeaderText label="Signup" />
      <div className="w-1/3 text-center p-2 mx-auto my-2">
        <TextInput
          label="Name"
          labelPosition="top"
          placeholderText="Name"
          value={name}
          onChange={(value) => setName(value)}
          type="text"
        />
        <TextInput
          label="Email"
          labelPosition="top"
          placeholderText="Email"
          value={email}
          onChange={(value) => setEmail(value)}
          type="email"
        />
        <NumberInput
          label="Age"
          labelPosition="top"
          placeholderText="Age"
          value={age}
          onChange={(value) => setAge(value)}
          type="number"
        />
        <TextInput
          label="Gender"
          labelPosition="top"
          placeholderText="Gender"
          value={gender}
          onChange={(value) => setGender(value)}
          type="text"
        />
        <TextInput
          label="Password"
          labelPosition="top"
          placeholderText="Password"
          value={password}
          onChange={(value) => setPassword(value)}
          type="password"
        />
        <TextInput
          label="Confirm Password"
          labelPosition="top"
          placeholderText="Confirm Password"
          value={confirmPassword}
          onChange={(value) => setConfirmPassword(value)}
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
          buttonText="Signup"
          onClick={async () => {
            await callSignup();
          }}
        />
        <p className="text-center cursor-pointer">
          Already a User?{" "}
          <Link to={"/login"}>
            <span className="cursor-pointer underline">Signup</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
