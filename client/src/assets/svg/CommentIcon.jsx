import React from "react";

function CommentIcon({ onClick }) {
  return (
    <div onClick={onClick}>
      {/* <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M25.9828 25.2089L24.4349 19.1278C25.43 17.3034 25.9828 15.2027 25.9828 12.9914C25.9828 5.80467 20.1781 0 12.9914 0C5.80467 0 0 5.80467 0 12.9914C0 20.1781 5.80467 25.9828 12.9914 25.9828C15.2027 25.9828 17.3034 25.43 19.1278 24.4349L25.2089 25.9828C25.6511 26.0934 26.0934 25.6511 25.9828 25.2089ZM24.3243 12.9914C24.3243 15.2027 23.7715 16.8612 22.887 18.5197C22.7764 18.7408 22.7211 19.0172 22.7764 19.2936L23.9374 23.9374L19.3489 22.7764C19.0725 22.7211 18.7961 22.7211 18.5749 22.887C17.5799 23.4398 15.7003 24.3243 13.0467 24.3243C6.74448 24.3243 1.65848 19.2383 1.65848 12.9914C1.65848 6.74448 6.74448 1.65848 12.9914 1.65848C19.2383 1.65848 24.3243 6.74448 24.3243 12.9914Z"
          fill="#262626"
        />
      </svg> */}
      <svg
        aria-label="Comment"
        className=""
        fill="currentColor"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24">
        <title>Comment</title>
        <path
          d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="2"></path>
      </svg>
    </div>
  );
}

export default CommentIcon;
