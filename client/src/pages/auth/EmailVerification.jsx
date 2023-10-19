import React, { useEffect, useState } from "react";
import Button from "../../components/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInterceptor";
import { VERIFY_EMAIL_API } from "../../axios/const";

const EmailVerification = () => {
  const [isVerified, setIsVerified] = useState();
  const [tokenExpired, setTokenExpired] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const [countdown, setCountdown] = useState(-1);

  useEffect(() => {
    if (code) {
      handleVerification();
    }
  }, []);

  useEffect(() => {
    if (countdown >= 0) {
      const timer = setInterval(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          clearInterval(timer);
          navigate("/auth/login");
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [countdown, navigate]);

  const handleVerification = async () => {
    const verification = await axiosInstance.post(
      `${VERIFY_EMAIL_API}?code=${code}`
    );

    if (verification.status == 200) {
      setIsVerified(true);
      setCountdown(5);
    }

    if (
      verification?.response?.data?.name == "TokenExpiredError" &&
      verification?.response?.status == 401
    ) {
      setTokenExpired(true);
    }
  };

  const handleResendEmail = () => {
    // Add logic to resend the verification email here
  };
  if (isVerified === true) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">
            Email Verification Successful
          </h1>
          <p className="text-gray-700 mb-2">
            Your email has been successfully verified. You can now access your
            account.
          </p>
          <p className="text-gray-700 mb-4">
            Redirecting to login page in {countdown} seconds...
          </p>
          <Link to="/auth/login">
            <Button label="Log In" />
          </Link>
        </div>
      </div>
    );
  } else if (tokenExpired === true) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">
            Email Verification Expired
          </h1>
          <p className="text-gray-700 mb-4">
            Your email verification link has expired. Please request a new
            verification email.
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
};

export default EmailVerification;
