import { useEffect, useState } from "react";
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

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(20, { message: "Password must be at most 20 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/, {
        message:
          "Password must contain at least one uppercase letter and a number",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    localStorage.setItem("login", "false");
  }, []);

  const handleSignUp = async (values) => {
    return await axios.post("http://localhost:3000/api/v1/users/signup", {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  const handleError = (error) => {
    if (error.response && error.response.status === 400) {
      setErrorMessage("A user with this email already exists.");
      toast.error("A user with this email already exists.");
    } else {
      setErrorMessage("An unexpected error occurred. Please try again.");
      toast.error("An unexpected error occurred. Please try again.");
    }
    console.error(
      "Error during signup:",
      error.response?.data?.message || error.message
    );
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await handleSignUp(values);
      if (!response.status === 201) {
        throw new Error("Failed to sign up");
      }
      toast.success("Account created successfully! Redirecting to login...");
      localStorage.setItem("login", "false");
      navigate("/login");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 rounded-lg h-[600px]">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-[26px] font-bold text-center text-gray-900">
          Create Account!
        </h2>
        <p className="text-[14px] text-gray-500">
          Already have an account?{" "}
          <span
            className="text-blue-700 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500 text-[16px]">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="name"
                      name="name"
                      type="text"
                      className="block w-full px-3 py-5 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      className="block w-full px-3 py-5 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
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
                      className="block w-full px-3 py-5 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-500 text-[16px]">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="block w-full px-3 py-5 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-300 sm:text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={`w-full py-6 bg-[#004DFF] hover:bg-[#3155cd] text-white text-md rounded-md ${style.btnColor}`}
              disabled={loading}
            >
              {loading ? (
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
                "Signup"
              )}
            </Button>
          </form>
        </Form>
      </div>
      {errorMessage && (
        <div className="text-red-500 pt-3 text-center">{errorMessage}</div>
      )}
    </div>
  );
};

export default SignUpForm;
