import getHash from "../utils/getHash";
import getData from "../utils/getData";

const toLabel = (value) => (value && value !== "unknown" ? value : "Unknown");

const getEpisodeSummaries = async (episodeUrls = []) => {
  const urls = episodeUrls.slice(0, 3);
  const responses = await Promise.allSettled(
    urls.map((url) => fetch(url).then((res) => res.json()))
  );
  return responses
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
};

const Character = async () => {
  const id = getHash();
  const character = await getData(id);

  if (!character) {
    return `
      <section class="Character Character--error">
        <p>Character data could not be loaded. Please go back and try again.</p>
      </section>
    `;
  }

  const statusClass = character.status.toLowerCase().replace(/\s+/g, "-");
  const attributes = [character.species, character.gender].filter(Boolean);
  const episodes = await getEpisodeSummaries(character.episode);

  const view = `
    <section class="Character">
      <article class="Character-hero">
        <div class="Character-portrait">
          <img src="${character.image}" alt="${character.name}" loading="lazy" decoding="async">
          <button class="Favorite-btn" data-id="${character.id}" aria-label="Toggle favorite">
                <span class="icon-empty">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </span>
                <span class="icon-filled">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff4757" stroke="#ff4757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </span>
            </button>
        </div>
        <div class="Character-meta">
          <div class="Character-heading">
            <p class="Character-name">${character.name}</p>
          </div>
          <div class="Character-pills">
            <span class="Character-pill Character-pill--status Character-pill--${statusClass}">
              ${character.status}
            </span>
            ${
              attributes.length
                ? attributes
                    .map((item) => `<span class="Character-pill">${item}</span>`)
                    .join("")
                : ""
            }
          </div>
        </div>
      </article>
      <article class="Character-details">
        <h3>Profile</h3>
        <dl class="Character-list">
          <div>
            <dt>Origin</dt>
            <dd>${toLabel(character.origin?.name)}</dd>
          </div>
          <div>
            <dt>Last location</dt>
            <dd>${toLabel(character.location?.name)}</dd>
          </div>
          <div>
            <dt>Episodes</dt>
            <dd>${character.episode.length}</dd>
          </div>
          <div>
            <dt>First appearance</dt>
            <dd>${character.episode[0]?.split("episode/")[1] || "—"}</dd>
          </div>
        </dl>
      </article>
      <article class="Character-episodes">
        <h3>Featured episodes</h3>
        <ul>
          ${
            episodes.length
              ? episodes
                  .map(
                    (episode) => `
                  <li>
                    <div>
                      <p class="Episode-name">${episode.name}</p>
                      <span class="Episode-code">${episode.episode}</span>
                    </div>
                    <p class="Episode-date">${episode.air_date}</p>
                  </li>
                `
                  )
                  .join("")
              : `<li>No episode information available.</li>`
          }
        </ul>
      </article>
    </section>
  `;
  return view;
};

export default Character;
