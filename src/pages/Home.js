import getData from "../utils/getData";
import getPage from "../utils/getPage";
import getQuery from "../utils/getQuery";
import { buildHashForPage, buildQueryString } from "../utils/queryHelpers";

const statuses = [
  { value: "", label: "All statuses" },
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
];

const speciesOptions = [
  { value: "", label: "All species" },
  { value: "Human", label: "Human" },
  { value: "Alien", label: "Alien" },
  { value: "Humanoid", label: "Humanoid" },
  { value: "Robot", label: "Robot" },
  { value: "Animal", label: "Animal" },
  { value: "Mythological Creature", label: "Mythological" },
  { value: "Disease", label: "Disease" },
  { value: "Cronenberg", label: "Cronenberg" },
  { value: "unknown", label: "Unknown" },
];

const genders = [
  { value: "", label: "All genders" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
];

const statusLabelMap = statuses.reduce((acc, status) => {
  if (status.value) {
    acc[status.value] = status.label;
  }
  return acc;
}, {});

const speciesLabelMap = speciesOptions.reduce((acc, option) => {
  if (option.value) {
    acc[option.value.toLowerCase()] = option.label;
  }
  return acc;
}, {});

const genderLabelMap = genders.reduce((acc, gender) => {
  if (gender.value) {
    acc[gender.value] = gender.label;
  }
  return acc;
}, {});

const escapeHTML = (text = "") =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const paginate = (info, currentPage, filters) => {
  if (!info) return "";

  const totalPages = info.pages || 1;
  if (totalPages <= 1) {
    return "";
  }

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const queryString = buildQueryString(filters);

  const prevLink =
    prevPage >= 1
      ? `<a class="Pagination-link" href="${buildHashForPage(prevPage, queryString)}">Previous</a>`
      : '<span class="Pagination-link Pagination-link--disabled">Previous</span>';

  const nextLink =
    nextPage <= totalPages
      ? `<a class="Pagination-link" href="${buildHashForPage(nextPage, queryString)}">Next</a>`
      : '<span class="Pagination-link Pagination-link--disabled">Next</span>';

  return `
    <div class="Pagination" aria-label="Character pagination">
      ${prevLink}
      <span class="Pagination-info">Page ${currentPage} of ${totalPages}</span>
      ${nextLink}
    </div>
  `;
};

const renderActiveFilters = (filters) => {
  const pills = [];

  if (filters.name) {
    pills.push(`
      <button class="Filter-pill" data-filter="name" type="button">
        Name: ${escapeHTML(filters.name)}
        <span aria-hidden="true">×</span>
      </button>
    `);
  }

  if (filters.status) {
    pills.push(`
      <button class="Filter-pill" data-filter="status" type="button">
        Status: ${statusLabelMap[filters.status] || filters.status}
        <span aria-hidden="true">×</span>
      </button>
    `);
  }

  if (filters.species) {
    pills.push(`
      <button class="Filter-pill" data-filter="species" type="button">
        Species: ${
          speciesLabelMap[filters.species.toLowerCase()] ||
          escapeHTML(filters.species)
        }
        <span aria-hidden="true">×</span>
      </button>
    `);
  }

  if (filters.gender) {
    pills.push(`
      <button class="Filter-pill" data-filter="gender" type="button">
        Gender: ${genderLabelMap[filters.gender] || filters.gender}
        <span aria-hidden="true">×</span>
      </button>
    `);
  }

  if (!pills.length) return "";

  pills.push(
    '<button class="Filter-pill Filter-pill--clear" data-filter="all" type="button">Clear filters</button>'
  );

  return `<div class="ActiveFilters" aria-label="Active filters">${pills.join("")}</div>`;
};

export const renderCharacterGrid = (characters, hasFilters, currentPage, filters) => {
  if (!characters || characters.error || !characters.results) {
    const errorMessage = hasFilters
      ? "No characters matched those filters."
      : "Characters could not be loaded.";
    const actionLabel = hasFilters ? "Clear filters" : "Go back to page 1";
    return `
      <section class="Characters Characters--empty">
        <p>${errorMessage}</p>
        <a href="#/">${actionLabel}</a>
      </section>
    `;
  }

  return `
      ${renderActiveFilters(filters)}
      <div class="Characters">
        ${characters.results
          .map(
            (character) => `
          <article class="Character-item">
            <button class="Favorite-btn" data-id="${character.id}" aria-label="Toggle favorite">
                <span class="icon-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </span>
                <span class="icon-filled">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff4757" stroke="#ff4757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </span>
            </button>
            <a href="#/${character.id}/">
              <img src="${character.image}" alt="${character.name}" loading="lazy" decoding="async">
              <h2>${character.name}</h2>
            </a>
          </article>
        `
          )
          .join("")}
      </div>
      ${paginate(characters.info, currentPage, filters)}
  `;
};

const Home = async () => {
  const currentPage = getPage();
  const query = getQuery();
  const filters = {
    name: query.get("name")?.trim() || "",
    status: (query.get("status") || "").toLowerCase(),
    species: query.get("species")?.trim() || "",
    gender: (query.get("gender") || "").toLowerCase(),
  };
  const hasFilters = Boolean(filters.name || filters.status || filters.species || filters.gender);
  const characters = await getData(null, { page: currentPage, ...filters });

  const view = `
    <section class="Characters-section" data-page="${currentPage}">
      <form class="SearchForm" aria-label="Filter characters">
        <label>
          <span class="SearchForm-label">Search by name</span>
          <input
            type="search"
            name="name"
            placeholder="E.g. Rick, Morty"
            value="${escapeHTML(filters.name)}"
          >
        </label>
        <label>
          <span class="SearchForm-label">Species / race</span>
          <select name="species">
            ${speciesOptions
              .map(
                (option) => `
                  <option value="${option.value}" ${
                  option.value.toLowerCase() === filters.species.toLowerCase()
                    ? "selected"
                    : ""
                }>${option.label}</option>
                `
              )
              .join("")}
          </select>
        </label>
        <label>
          <span class="SearchForm-label">Status</span>
          <select name="status">
            ${statuses
              .map(
                (status) =>
                  `<option value="${status.value}" ${
                    status.value === filters.status ? "selected" : ""
                  }>${status.label}</option>`
              )
              .join("")}
          </select>
        </label>
        <label>
          <span class="SearchForm-label">Gender</span>
          <select name="gender">
            ${genders
              .map(
                (gender) => `
                  <option value="${gender.value}" ${
                  gender.value === filters.gender ? "selected" : ""
                }>${gender.label}</option>
                `
              )
              .join("")}
          </select>
        </label>
        <div class="SearchForm-actions">
          <button type="reset" class="SearchForm-reset">Clear</button>
        </div>
      </form>
      <div id="characters-container">
        ${renderCharacterGrid(characters, hasFilters, currentPage, filters)}
      </div>
    </section>
  `;
  return view;
};

export default Home;
