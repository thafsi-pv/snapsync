import React from "react";
import Button from "../../../components/uiPrimitives/button";
import { useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";

function EmailVerificationPending() {
  const location = useLocation();
  const { email, id } = location.state || {};
  const { resendEmailActivation } = useAuth();
  const { addToast } = useToast();

  const handleResendEmail = async () => {
    const sendStatus = await resendEmailActivation(id);
    if (sendStatus.status == 200) {
      addToast("Mail sent successfully..", 3000);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">
          Email Verification Pending
        </h1>
        <p className="text-gray-700 mb-4">
          Thank you for signing up. We've sent you a verification email. on
          <strong> {email}</strong> Please click the link in the email to verify
          your account.
        </p>
        <Button onClick={handleResendEmail} label="Resend Email" />
      </div>
    </div>
  );
}

export default EmailVerificationPending;
