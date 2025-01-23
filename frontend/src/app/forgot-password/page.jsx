import ForgotPasswordForm from "@/app/components/ForgotPasswordForm/ForgotPasswordForm";
import React from "react";

export const metadata = {
  title: "Forgot Password",
  description: "",
};

const ForgotPassword = () => {
  return (
    <div className="container flex items-center justify-center min-h-screen admin">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
