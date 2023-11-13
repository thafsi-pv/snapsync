import React from "react";

function EmailVerificationExpired({handleResendEmail}) {
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

export default EmailVerificationExpired;
