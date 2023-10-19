import React, { useEffect } from "react";
import Button from "../../components/button";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInterceptor";

const EmailVerification = () => {
  const params = useParams();

  useEffect(() => {
    if (params) {
      handleVerification()
    }
  }, []);

  const handleVerification=async()=>{
    const verification=await axiosInstance.post()
  }

  const handleResendEmail = () => {
    // Add logic to resend the verification email here
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">
          Email Verification Pending
        </h1>
        <p className="text-gray-700 mb-4">
          Thank you for signing up. We've sent you a verification email. on
          <strong>mail@sample.com</strong> Please click the link in the email to
          verify your account.
        </p>
        <Button onClick={handleResendEmail} label="Resend Email" />
      </div>
    </div>
  );
};

export default EmailVerification;
