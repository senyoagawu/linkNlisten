import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import styles from "../Interests.module.css";
// import { addInterest } from "../../actions/interests";
import { createInterest } from "../../store/interests";

export default function CreateInterest() {
  const {
    ui: { setModal },
    stateSetters: { setRefresh },
  } = useContext(AppContext);
  const [name, setName] = useState("");
  const creatorsId = JSON.parse(localStorage.getItem("user")).user.id;

  const submitNewInterest = async (e) => {
    e.preventDefault();
    // await addInterest({ creatorsId, name });
    createInterest({ creatorsId, name });
    setModal(null);
  };
  return (
    <div>
      <label>Add new Interest</label>
      <input
        placeholder="Add new interest"
        className={styles.inputs}
        type="text"
        value={name}
        name="interest"
        onChange={({ target: { value } }) => setName(value)}
      />
      <button onClick={submitNewInterest} className={styles.button}>
        Add
      </button>
    </div>
  );
}
