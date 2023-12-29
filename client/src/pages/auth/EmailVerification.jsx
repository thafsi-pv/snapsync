import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EmailVerificationExpired from "./components/EmailVerificationExpired";
import EmailVerificationPending from "./components/EmailVerificationPending";
import EmailVerificationSuccess from "./components/EmailVerificationSuccess";
import { axiosInstance } from "../../services/api/axiosInterceptor";
import { VERIFY_EMAIL_API } from "../../services/api/const";

const EmailVerification = () => {
  const [isVerified, setIsVerified] = useState();
  const [tokenExpired, setTokenExpired] = useState();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  useEffect(() => {
    if (code) {
      handleVerification();
    }
  }, []);

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
    return <EmailVerificationSuccess />;
  } else if (tokenExpired === true) {
    return <EmailVerificationExpired handleResendEmail={handleResendEmail} />;
  }
  return <EmailVerificationPending handleResendEmail={handleResendEmail} />;
};

export default EmailVerification;
