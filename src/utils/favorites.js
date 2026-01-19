const FAVORITES_KEY = "rickandmorty_favorites";

export const getFavorites = () => {
	const favorites = localStorage.getItem(FAVORITES_KEY);
	return favorites ? JSON.parse(favorites) : [];
};

export const isFavorite = (id) => {
	const favorites = getFavorites();
	return favorites.includes(String(id));
};

export const toggleFavorite = (id) => {
	const favorites = getFavorites();
	const strId = String(id);
	const index = favorites.indexOf(strId);

	if (index === -1) {
		favorites.push(strId);
	} else {
		favorites.splice(index, 1);
	}

	localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
	return index === -1; // true if added, false if removed
};
