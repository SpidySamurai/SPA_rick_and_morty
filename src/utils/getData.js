const API = "https://rickandmortyapi.com/api/character/";

const getData = async (id, page) => {
  let apiURl = API;

  if (id) {
    apiURl = `${API}${id}`;
  } else if (page) {
    apiURl = `${API}?page=${page}`;
  }
  try {
    const response = await fetch(apiURl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Fetch Error", error);
  }
};

export default getData;
