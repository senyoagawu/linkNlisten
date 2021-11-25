export default (time) => {
  const timeAgo = new Date(time);
  // TODO: format
  const timediff = (new Date() - timeAgo) / 6000;
  if (timediff < 60) {
    return `${Math.floor(timediff)} minutes ago`;
  } else if (timediff < 1440) {
    return `${Math.floor(timediff / 60)} hours ago`;
  } else if (timediff < 10080) {
    return `${Math.floor(timediff / 1440)} days ago`;
  }
  return `${Math.floor(timediff / 10080)} weeks ago`;
};
