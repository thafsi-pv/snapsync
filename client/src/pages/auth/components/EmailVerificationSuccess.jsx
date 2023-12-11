import React, { useEffect, useState } from "react";
import Button from "../../../components/uiPrimitives/button";
import { Link, useNavigate } from "react-router-dom";

function EmailVerificationSuccess() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
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
}

export default EmailVerificationSuccess;
