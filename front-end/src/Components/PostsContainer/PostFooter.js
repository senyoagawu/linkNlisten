import React, { useContext, createContext } from "react";
import { editSvg, deleteSvg } from "../../svgs";
import Button from "../Buttons";
import { AppContext } from "../../App";

const createContext = createContext();
export default function PostFooter({ authorsId, postId }) {
  const { userId } = JSON.parse(localStorage.getItem("user")).user.id;

  const {
    ui: { setModal },
  } = useContext(AppContext);

  const disabled = userId !== authorsId;
  return (
    <div>
      <Button
        explanation="click to delete post"
        svg={deleteSvg}
        action={() => setModal("deletePost")}
        // isDisabled={disabled}
        isDisabled={false}
      />
      <Button
        explanation="click to edit post"
        svg={editSvg}
        action={() => setModal("editPost")}
        // isDisabled={disabled}
        isDisabled={false}
      />
    </div>
  );
}
