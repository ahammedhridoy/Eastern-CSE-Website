// import LoginForm from "@/app/components/LoginForm/LoginForm";
import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";

export const metadata = {
  title: "Login",
  description: "",
};

const Login = () => {
  return (
    <div className="container flex items-center justify-center min-h-screen admin">
      <LoginForm />
    </div>
  );
};

export default Login;
