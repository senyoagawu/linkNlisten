//display profile info
<>
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
</>;
