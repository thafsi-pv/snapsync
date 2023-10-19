export const genericError = (error) => {
  if (error.response.data.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
  }
};
