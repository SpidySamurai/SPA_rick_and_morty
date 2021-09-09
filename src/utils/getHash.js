const getHash = () =>
  location.hash.slice(1).toLocaleLowerCase().split("/")[1] || "/"; // #1/ without arguments // ["",'1','']

export default getHash;
