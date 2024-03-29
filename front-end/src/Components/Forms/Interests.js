import React, { useContext, useState } from "react";
import { AppContext } from "../../App";
import InterestCard from "../InterestCard";
import styles from "../Interests.module.css";
import {
  addInterest,
  followInterest,
  unfollowInterest,
} from "../../actions/interests";

const Interests = ({ setModal }) => {
  const {
    state: {
      interests: { all_interests: interests },
    },
    state: {
      user: { email },
    },
  } = useContext(AppContext);
  const [newInterest, setNewInterest] = useState({ name: "" });

  const onchange = (e) => {
    e.preventDefault();
    setNewInterest({ name: e.target.value });
  };

  const close = () => {
    setModal({});
  };
  const updateInterests = async (e) => {
    e.preventDefault();
    for (let id in interests) {
      const follow = interests[id][1];
      if (follow) {
        await followInterest(email, id);
      } else {
        await unfollowInterest(email, id);
      }
      //TODO refactor to this:c
      // _ = response ? await followInterest(email, id) : await unfollowInterest(email,id)
    }
    setModal({});
  };

  const addNewInterest = async (e) => {
    e.preventDefault();
    await addInterest({ ...newInterest, ...{ email } });
    setModal({});
  };

  return (
    <div>
      <div className={styles.formtype}>Click to select your Interests</div>
      <div className={styles.closeBtn} onClick={close}>
        Close
      </div>
      <div className={styles.interests}>
        {Object.keys(interests)?.map((interest) => (
          <InterestCard
            key={interest}
            info={{ interest: interests[interest], idx: interest }}
          />
        ))}
      </div>
      <button className={styles.button} onClick={updateInterests}>
        Update Interests
      </button>
    </div>
  );
};
export default Interests;
