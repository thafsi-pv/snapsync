export const getIdFromUrl = (currentURL) => {
  const parts = currentURL.split("/");
  const id = parts[parts.length - 1];
  return id;
};
