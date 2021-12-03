import React, { useContext } from "react";
import styles from "./Forms/Form.module.css";
import { UIContext, AppContext } from "../App";
export default function UIMessage() {
  const { uiMessage } = useContext(UIContext);
  const {
    ui: { setModal },
    rerender,
  } = useContext(AppContext);

  const closeModal = () => {
    setModal("");
    rerender();
  };
  debugger;

  return (
    <div>
      {/* <Navbar /> */}
      <div className={styles.form_container}>
        <form className={styles.create_post_form}>
          <h2 className={styles.form_name}>{uiMessage}</h2>
          <div className={styles.closeBtn} onClick={closeModal}>
            close
          </div>
        </form>
      </div>
    </div>
  );
}
