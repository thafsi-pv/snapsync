import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInterceptor";
import { VERIFY_EMAIL_API } from "../../axios/const";

const EmailVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { code } = useParams();

  useEffect(() => {
    if (code) {
      handleVerification();
    }
  }, []);

  const handleVerification = async () => {
    const verification = await axiosInstance.post(VERIFY_EMAIL_API, code);

    if (verification.status == 200) setIsVerified(true);
  };

  const handleResendEmail = () => {
    // Add logic to resend the verification email here
  };
  if (!isVerified) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">
            Email Verification Pending
          </h1>
          <p className="text-gray-700 mb-4">
            Thank you for signing up. We've sent you a verification email. on
            <strong> mail@sample.com</strong> Please click the link in the email
            to verify your account.
          </p>
          <Button onClick={handleResendEmail} label="Resend Email" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">
          Email Verification Successful
        </h1>
        <p className="text-gray-700 mb-4">
          Your email has been successfully verified. You can now access your
          account.
        </p>
        <Link to="/auth/login">
          <Button label="Log In" />
        </Link>
      </div>
    </div>
  );
};

export default EmailVerification;
