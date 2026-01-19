import getData from "../utils/getData";
import { getFavorites, toggleFavorite } from "../utils/favorites";

const Favorites = async () => {
  const favorites = getFavorites();
  
  if (favorites.length === 0) {
    return `
      <section class="Favorites-header">
        <h2 class="Favorites-title">My Favorites</h2>
        <p class="Favorites-subtitle">You haven't saved any characters yet.</p>
      </section>
      <section class="Characters Characters--empty">
         <a href="#/">Explore Characters</a>
      </section>
    `;
  }

  // API supports retrieving multiple characters by passing comma-separated IDs
  // e.g., https://rickandmortyapi.com/api/character/1,2,3
  const ids = favorites.join(",");
  
  // getData logic handles single ID vs multiple vs defaults. 
  // If only 1 favorite, API returns object. If multiple, array.
  let characters = await getData(ids);
  
  // Normalize to array
  if (!Array.isArray(characters)) {
    characters = [characters];
  }

  const view = `
    <section class="Favorites-header">
      <h2 class="Favorites-title">My Favorites</h2>
      <p class="Favorites-subtitle">Your collection across the multiverse.</p>
    </section>
    <div class="Characters">
      ${characters
        .map(
          (character) => `
        <article class="Character-item">
          <button class="Favorite-btn is-favorite" data-id="${character.id}" aria-label="Remove from favorites">
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
  `;
  return view;
};

export default Favorites;
