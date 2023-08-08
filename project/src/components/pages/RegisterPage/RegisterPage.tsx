import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { RegisterForm } from "../../../types/Register.type";
import { Alert, Button, Input } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://nodejs-api-mae6.onrender.com/api/register",
        formData
      );
      navigate("/login");
      console.log(response.data);
    } catch (error: any) {
      setError(
        error.response?.data?.error || "เกิดข้อผิดพลาดในการลงทะเบียนผู้ใช้งาน"
      );
    }
  };

  return (
    <div className="max-w-full">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border-solid border-2 max-w-xl mx-auto p-10 m-10"
      >
        <div className="flex flex-col justify-center gap-y-3">
          <label className="flex justify-center pb-2 text-3xl">
            Create new Account
          </label>
          <label htmlFor="" className="text-md flex justify-center">
            Already Registered? Login
          </label>
          <div>
            <Input
              label="First Name:"
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              label="Last Name:"
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              label="Email:"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              label="Password:"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {error && (
            <Alert color="red" className="py-1">
              {error}
            </Alert>
          )}
          <Button variant="gradient" type="submit" className="mx-auto px-20">
            sign up
          </Button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-1">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
