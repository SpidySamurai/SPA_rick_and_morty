const THEME_KEY = "rickandmorty_theme";

export const getTheme = () => {
	return localStorage.getItem(THEME_KEY) || "light";
};

export const setTheme = (theme) => {
	document.documentElement.setAttribute("data-theme", theme);
	localStorage.setItem(THEME_KEY, theme);
};

export const toggleTheme = () => {
	const currentTheme = getTheme();
	const newTheme = currentTheme === "light" ? "dark" : "light";
	setTheme(newTheme);
	return newTheme;
};

export const initTheme = () => {
	const savedTheme = getTheme();
	setTheme(savedTheme);
};
