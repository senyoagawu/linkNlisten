import React, { useContext } from "react";
import { AppContext } from "../App";
import styles from "./Views/Home.module.css";

const Sidebar = ({ setModal }) => {
  const {
    state: { posts, individualPosts, user, interests },
  } = useContext(AppContext);

  console.log(interests);

  const onclick = (e) => {
    setModal({
      whichModal: e.target.id,
    });
  };
  const titleize = (str) =>
    str
      .split("")
      .map((char, i) => (i === 0 ? char.toUpperCase() : char.toLowerCase()))
      .join("");

  const edit_profile = () => {};
  return (
    <div className={styles.sidebar_container}>
      <div className={styles.profile_pic_container}>
        <img
          className={styles.profile_pic}
          src={user.profile_pic}
          alt="profile pic"
        />
      </div>
      <div className={styles.name}>{`${titleize(user.first_name)} ${titleize(
        user.last_name
      )}`}</div>
      <div className={styles.bio}>{user.bio}</div>
      <div className={styles.location}>{user.location}</div>
      <div className={styles.button}>
        <button
          id="profile"
          className={styles.edit_profile_button}
          onClick={onclick}
        >
          Edit Profile
        </button>
      </div>
      <div className={styles.button}>
        <button
          id="interests"
          className={styles.edit_profile_button}
          onClick={onclick}
        >
          Edit Interests
        </button>
      </div>
      <div className={styles.button}>
        <button
          id="post"
          className={styles.create_post_button}
          onClick={onclick}
        >
          Create a Post
        </button>
      </div>
      <div className={styles.num_interests}>
        # of Interests: {interests?.followed?.length}
      </div>
      <div className={styles.num_interests_created}>
        # of Created Interests: {interests?.created?.length}
      </div>
      <div className={styles.num_posts}>
        # of Posts: {individualPosts?.length}
      </div>
    </div>
  );
};

// bio
// edit profile
// interests
// # interests
// # interests created
// # posts made

export default Sidebar;
