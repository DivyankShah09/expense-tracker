import { useState } from "react";
import { TextInput } from "../../../components/input/TextInput";
import { HeaderText } from "../../../components/text/HeaderText";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { toast } from "react-toastify";
import { useForgotPassword } from "./hook/forgotPasswordHook";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { mutateAsync } = useForgotPassword();

  var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

  const validateForm = () => {
    if (!email) {
      toast.error("Email is required");
      return false;
    }

    if (!password) {
      toast.error("Password is required");
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

    if (!confirmPassword) {
      toast.error("Confirm Password is required");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const callResetPassword = async () => {
    if (validateForm()) {
      const response = await mutateAsync({
        email: email,
        password: password,
      });

      if (response.statusCode === 201) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("userId", response.data.id);
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
    <>
      <div className="text-center min-h-[80vh] py-16">
        <HeaderText label="Reset Password" />
        <div className="w-1/3 text-center p-2 mx-auto my-2">
          <TextInput
            label="Email"
            labelPosition="top"
            placeholderText="Email"
            value={email}
            onChange={(value) => setEmail(value)}
            type="email"
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
          />{" "}
          <PrimaryButton
            buttonText="Reset Password"
            onClick={async () => {
              await callResetPassword();
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
