const getPage = () => {
  const hash = location.hash.slice(1).toLowerCase();
  const path = hash.split("?")[0] || "";
  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "page" && segments[1]) {
    const pageNumber = parseInt(segments[1], 10);
    return Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
  }

  return 1;
};

export default getPage;
