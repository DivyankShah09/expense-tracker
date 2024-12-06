import { useState } from "react";
import { TextInput } from "../../../components/input/TextInput";
import { HeaderText } from "../../../components/text/HeaderText";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { NumberInput } from "../../../components/input/NumberInput";
import { toast } from "react-toastify";
import { useSignUp } from "./hook/signUpHook";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [age, setAge] = useState<number>(10);
  const [gender, setGender] = useState<string>("");
  const { mutateAsync } = useSignUp();

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

  const validateForm = () => {
    if (!name) {
      toast.error("Name is required");
      return false;
    }

    if (!email) {
      toast.error("Email is required");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Email is not in valid format");
      return false;
    }

    if (!age) {
      toast.error("Age is requied");
      return false;
    }

    if (!gender) {
      toast.error("Gender is required");
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

    if (!passwordRegex.test(password)) {
      toast.error(
        <div>
          <p>Password must fullfil following conditions: </p>
          <ul>
            <li>Minimum 1 uppercase alphabet.</li>
            <li>Minimum 1 lowercase alphabet.</li>
            <li>Minimum 1 number.</li>
            <li>Minimum 1 special character (!@#$%^&*).</li>
          </ul>
        </div>
      );
      return false;
    }

    return true;
  };

  const callSignup = async () => {
    if (validateForm()) {
      const response = await mutateAsync({
        name: name,
        email: email,
        password: password,
        gender: gender,
        age: age,
      });
      if (response.statusCode === 201) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("name", response.data.name);

        navigate("/dashboard");
      } else {
        toast.error(response.statusMessage);
        return false;
      }
    }
  };

  return (
    <div className="text-center min-h-[80vh] py-16">
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
        <PrimaryButton
          buttonText="Signup"
          onClick={async () => {
            await callSignup();
          }}
        />
        <p className="text-center cursor-pointer">
          Already a User?{" "}
          <Link to={"/login"}>
            <span className="cursor-pointer underline hover:text-primary">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
