import React from "react";
import { Link } from "react-router-dom";

function CreateNewAccount() {
  return (
    <Link to="/auth/signup">
      <a className="text-sm font-semibold" href="#">
        Create new account
      </a>
    </Link>
  );
}

export default CreateNewAccount;
