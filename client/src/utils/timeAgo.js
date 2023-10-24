export const timeAgo = (timestamp) => {
  const currentTime = new Date();
  const postTime = new Date(timestamp);

  const timeDifference = currentTime - postTime;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} y`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} m`;
  } else if (weeks > 0) {
    return weeks === 1 ? "1 week ago" : `${weeks} w`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} d`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} h`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} m`;
  } else {
    return seconds === 1 ? "1 second ago" : `${seconds} s`;
  }
};
