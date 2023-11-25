export function maskEmailAddress(email) {
  const [username, domain] = email[0].split("@");
  const usernameLength = username.length;
  const maskedUsername =
    username.substring(0, 1) +
    "*".repeat(usernameLength - 2) +
    username.slice(-1);
  const maskedEmail = maskedUsername + "@" + domain;
  return maskedEmail;
}
