import React, { useContext } from "react";
import { animationTransition, animationVariants } from "../../../utils/const";
import { UserActionContext } from "../../../services/providers/UserActionContext";
import TextField from "../../uiPrimitives/fields/TextField";
import InputField from "../../uiPrimitives/fields/InputField";
import { motion } from "framer-motion";

function AddPostInputs({ postFormik }) {
  const { userData } = useContext(UserActionContext);
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        transition={animationTransition}
        className=" lg:w-2/4 w-full">
        <div className="p-4 flex gap-2">
          <img
            src={userData?.imageUrl}
            className="w-7 h-7 rounded-full"
            alt=""
          />
          <p>{userData?.userName}</p>
        </div>
        <TextField
          rows={5}
          placeholder="Write a caption"
          inputClass="border-none"
          id="caption"
          name="caption"
          onChange={postFormik.handleChange}
          onBlur={postFormik.handleBlur}
          value={postFormik.values.caption}
        />
        <InputField
          placeholder="Enter Location"
          id="location"
          name="location"
          onChange={postFormik.handleChange}
          onBlur={postFormik.handleBlur}
          value={postFormik.values.location}
        />
      </motion.div>
    </>
  );
}

export default AddPostInputs;
