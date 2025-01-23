import { useState } from "react";
import { Button } from "../../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../../../Styles/BtnColor.module.css";
import { useGlobalContext } from "../../../context/GlobalContext";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password must be at most 20 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const { login } = useGlobalContext();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.user?._id);
        login();
        toast.success("Login successful");
        setErrorMessage("");
        navigate(`/records`);
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-12 rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-[26px] font-bold text-center text-gray-900">
          Login to OncoCura
        </h2>
        <p className="text-[14px] text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-blue-700 underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Create a new account
          </span>
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500 text-[16px]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full px-3 py-6 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage className="" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500 text-[16px]">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      name="password"
                      type="password"
                      className="block w-full px-3 py-6 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-full py-6 bg-[#004DFF] hover:bg-[#3155cd] text-white text-md rounded-md ${style.btnColor}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        {errorMessage && (
          <div className="text-red-500 pt-3 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
