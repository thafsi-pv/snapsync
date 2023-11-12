import { useFormik } from "formik";
import React from "react";
import InputField from "../../../components/uiPrimitives/fields/InputField";

function Comment({ postId, callBack }) {
  const commentFormik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("🚀 ~ file: AddPost.jsx:62 ~ AddPost ~ values:", values);
      callBack(postId, values);
      resetForm();
    },
  });

  return (
    <form
      onSubmit={commentFormik.handleSubmit}
      className="flex flex-row ml-1 gap-5 w-full  items-center border-t">
      <img
        src="https://file.rendit.io/n/sW1YVBq1yktiO0tHe8fZ.svg"
        className="w-6 shrink-0"
      />
      <div className=" w-full h-full">
        <InputField
          placeholder="Add a comment"
          extra="border-none bg-white"
          inputClass="border-none "
          className="h-full"
          id="comment"
          name="comment"
          onChange={commentFormik.handleChange}
          onBlur={commentFormik.handleBlur}
          value={commentFormik.values.comment}
        />
      </div>
      {commentFormik.values.comment && (
        <button type="submit" className="font-semibold text-[#149df7]">
          Post
        </button>
      )}
    </form>
  );
}

export default Comment;
