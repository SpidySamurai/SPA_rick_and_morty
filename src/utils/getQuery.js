const getQuery = () => {
  const hash = window.location.hash || "";
  const queryString = hash.split("?")[1] || "";
  return new URLSearchParams(queryString);
};

export default getQuery;
