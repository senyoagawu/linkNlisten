import React, { useState } from "react";
// import {NavBar} from "../Navbar";
import styles from "./Form.module.css";
// import { uploadImage } from "../../uploadImage";
import { editProfile } from "../../utils/ajax";

const EditProfile = ({ setModal }) => {
  const storedUser = localStorage.user;
  // const [profileImage, setImage] = useState(undefined)
  const [profile, setProfile] = useState(
    storedUser ? JSON.parse(storedUser) : {}
  );
  const closeModal = () => {
    setModal({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(profile.email, profile);
    const { user } = await editProfile(profile.email, profile);
    setProfile(user);
    localStorage.user = JSON.stringify(user);
    setTimeout(closeModal, 1500);
  };

  const onchange = (e) => {
    e.preventDefault();
    const [field, val] = [e.target.name, e.target.value];
    setProfile({
      ...profile,
      ...{ [field]: val },
    });
  };

  return (
    <div>
      {/* <Navbar /> */}
      <div className={styles.form_container}>
        <form className={styles.profile_form}>
          <h2 className={styles.form_name}>Edit Profile</h2>
          <div className={styles.closeBtn} onClick={closeModal}>
            close
          </div>
          <div className={styles.field_container}>
            <input
              className={styles.inputs}
              type="text"
              value={profile.first_name}
              placeholder="First Name"
              name="first_name"
              onChange={onchange}
            />
          </div>
          <div className={styles.field_container}>
            <input
              className={styles.inputs}
              type="text"
              value={profile.last_name}
              placeholder="Last Name"
              name="last_name"
              onChange={onchange}
            />
          </div>
          <div className={styles.field_container}>
            <input
              className={styles.inputs}
              type="text"
              value={profile.email}
              placeholder="Email"
              name="email"
              onChange={onchange}
            />
          </div>
          <div className={styles.field_container}>
            <input
              className={styles.inputs}
              type="text"
              value={profile.bio}
              placeholder="Bio"
              name="bio"
              onChange={onchange}
            />
          </div>
          <div className={styles.field_container}>
            <input
              className={styles.inputs}
              type="text"
              value={profile.location}
              placeholder="Location"
              name="location"
              onChange={onchange}
            />
          </div>
          <button className={styles.button_editprofile} onClick={handleSubmit}>
            Accept Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
