const API = "https://rickandmortyapi.com/api/character/";

const getData = async (id, options = {}) => {
  let apiURl = API;

  if (id) {
    apiURl = `${API}${id}`;
  } else {
    const params = new URLSearchParams();
    if (options.page) params.set("page", options.page);
    ["name", "status", "species", "gender"].forEach((key) => {
      if (options[key]) {
        params.set(key, options[key]);
      }
    });
    const queryString = params.toString();
    apiURl = queryString ? `${API}?${queryString}` : API;
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
