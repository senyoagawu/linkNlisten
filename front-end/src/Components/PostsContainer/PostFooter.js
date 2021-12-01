import React, { useContext } from "react";
import { editSvg, deleteSvg } from "../../svgs";
import Button from "../Buttons";
import { AppContext } from "../../App";
export default function PostFooter() {
  const {
    ui: { setModal },
  } = useContext(AppContext);
  return (
    <div>
      <Button
        explanation="click to delete post"
        svg={deleteSvg}
        action={() => setModal("deletePost")}
        isDisabled={false}
      />
      <Button
        explanation="click to edit post"
        svg={editSvg}
        action={() => setModal("editPost")}
        isDisabled={false}
      />
    </div>
  );
}
