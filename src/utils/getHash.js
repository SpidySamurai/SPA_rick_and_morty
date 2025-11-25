const getHash = () => {
  const hash = location.hash.slice(1).toLocaleLowerCase();
  const path = hash.split("?")[0] || "/";
  const segments = path.split("/").filter(Boolean);
  if (!segments.length) {
    return "/";
  }
  return segments[0];
};

export default getHash;
