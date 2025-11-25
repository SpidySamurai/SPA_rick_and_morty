import getData from "../utils/getData";
import getPage from "../utils/getPage";

const paginate = (info, currentPage) => {
  if (!info) return "";

  const totalPages = info.pages || 1;
  if (totalPages <= 1) {
    return "";
  }
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const prevLink =
    prevPage >= 1
      ? `<a class="Pagination-link" href="${prevPage === 1 ? "#/" : `#/page/${prevPage}/`}">Previous</a>`
      : '<span class="Pagination-link Pagination-link--disabled">Previous</span>';

  const nextLink =
    nextPage <= totalPages
      ? `<a class="Pagination-link" href="#/page/${nextPage}/">Next</a>`
      : '<span class="Pagination-link Pagination-link--disabled">Next</span>';

  return `
    <div class="Pagination" aria-label="Character pagination">
      ${prevLink}
      <span class="Pagination-info">Page ${currentPage} of ${totalPages}</span>
      ${nextLink}
    </div>
  `;
};

const Home = async () => {
  const currentPage = getPage();
  const characters = await getData(null, currentPage);

  if (!characters || characters.error || !characters.results) {
    return `
      <section class="Characters Characters--empty">
        <p>Characters could not be loaded. <a href="#/">Go back to page 1</a>.</p>
      </section>
    `;
  }

  const view = `
    <section class="Characters-section" data-page="${currentPage}">
      <div class="Characters">
        ${characters.results
          .map(
            (character) => `
          <article class="Character-item">
            <a href="#/${character.id}/">
              <img src="${character.image}" alt="${character.name}">
              <h2>${character.name}</h2>
            </a>
          </article>
        `
          )
          .join("")}
      </div>
      ${paginate(characters.info, currentPage)}
    </section>
  `;
  return view;
};

export default Home;
