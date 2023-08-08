import { useState, FormEvent, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataUser } from "../../../App";
import { LoginForm } from "../../../types/Login.type";
import { Alert, Button, Input } from "@material-tailwind/react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const { setData, setCheck } = useContext(DataUser);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://nodejs-api-mae6.onrender.com/api/login",
        loginForm
      );

      const userDataFromResponse: string = response.data.user;
      setData(userDataFromResponse);
      setCheck(true);
      navigate("/profile");
    } catch (error: any) {
      setError(error.response?.data?.error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border-solid border-2 max-w-xl mx-auto p-10 m-10"
      >
        <div className="flex flex-col justify-center gap-y-3">
          <label className="flex justify-center pb-2 text-3xl">Login</label>
          <label htmlFor="" className="text-md flex justify-center">
            Sign in to continue
          </label>
          <div>
            <Input
              label="Email:"
              type="email"
              id="email"
              name="email"
              value={loginForm.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              label="Password:"
              type="password"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
            />
          </div>
          {error && (
            <Alert color="red" className="py-1">
              {error}
            </Alert>
          )}
          <div className="flex flex-row gap-x-3">
            <Button
              variant="outlined"
              type="submit"
              className="w-full"
              onClick={() => navigate("/signup")}
            >
              sign up
            </Button>
            <Button variant="gradient" type="submit" className="w-full">
              sign in
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
