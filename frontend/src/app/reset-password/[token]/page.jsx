import ResetPasswordForm from "@/app/components/ResetPasswordForm/ResetPasswordForm";
import React from "react";

export const metadata = {
  title: "Reset Password",
  description: "",
};

const ResetPassword = () => {
  return (
    <div className="container flex items-center justify-center min-h-screen admin">
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPassword;
