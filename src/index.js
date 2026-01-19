import router from "./routes";
import { buildHashForPage, buildQueryString } from "./utils/queryHelpers";
import getData from "./utils/getData";
import { renderCharacterGrid } from "./pages/Home";
import "./styles/vars.css";
import "./styles/base.css";
import "./styles/header.css";
import "./styles/home.css";
import "./styles/character.css";
import "./styles/about.css";
import "./styles/error.css";
import "./styles/favorites.css";

window.addEventListener("load", router);
window.addEventListener("hashchange", router);

const navigateToHash = (hash) => {
	if (window.location.hash === hash) {
		router();
		return;
	}
	window.location.hash = hash;
};

const getCurrentQueryParams = () => {
	const [, queryString = ""] = window.location.hash.split("?");
	return new URLSearchParams(queryString);
};

// Utility to debounce function execution
const debounce = (func, wait) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

const handleSilentSearch = async (form) => {
	const formData = new FormData(form);
	const filters = {
		name: formData.get("name")?.toString().trim() || "",
		species: formData.get("species")?.toString().trim() || "",
		status: formData.get("status")?.toString() || "",
		gender: formData.get("gender")?.toString() || "",
	};

    const hasFilters = Boolean(filters.name || filters.status || filters.species || filters.gender);
	const queryString = buildQueryString(filters);
    const newHash = buildHashForPage(1, queryString);

    // 1. Update URL without triggering hashchange (which causes full re-render)
    history.pushState(null, null, newHash);

    // 2. Manual fetch
    const container = document.getElementById("characters-container");
    if (!container) {
        // Fallback if not on home page for some reason, though unlikely with current interactions
        router(); 
        return;
    }

    // Optional: Add loading state to grid
    container.style.opacity = "0.5";

    try {
        const characters = await getData(null, { page: 1, ...filters });
        // 3. Manual DOM update
        container.innerHTML = renderCharacterGrid(characters, hasFilters, 1, filters);
        
        // Update pagination links to match new state? 
        // renderCharacterGrid handles pagination HTML generation, but we need to ensure 
        // those links work. Since they are just hrefs, clicking them will trigger hashchange -> full reload,
        // which is acceptable for pagination (page change), but we could optimize that too later.
        // For now, minimizing filter reload is the request.
    } catch (error) {
        console.error("Silent search failed", error);
    } finally {
        container.style.opacity = "1";
    }
};

const debouncedSearch = debounce((form) => handleSilentSearch(form), 400);

document.addEventListener("submit", (event) => {
	if (!event.target.matches(".SearchForm")) return;
	event.preventDefault();
	handleSilentSearch(event.target);
});

document.addEventListener("input", (event) => {
	if (!event.target.matches(".SearchForm input")) return;
	debouncedSearch(event.target.closest("form"));
});

document.addEventListener("change", (event) => {
	if (!event.target.matches(".SearchForm select")) return;
	handleSilentSearch(event.target.closest("form"));
});

document.addEventListener("reset", (event) => {
	if (!event.target.matches(".SearchForm")) return;
	event.preventDefault();
	event.target.reset();
	navigateToHash("#/");
});

document.addEventListener("click", (event) => {
	const pill = event.target.closest(".Filter-pill");
	if (!pill) return;
	event.preventDefault();
	const params = getCurrentQueryParams();
	const filter = pill.dataset.filter;
	if (filter === "all") {
		params.delete("name");
		params.delete("species");
		params.delete("status");
		params.delete("gender");
	} else {
		params.delete(filter);
	}
	const queryString = params.toString();
	navigateToHash(buildHashForPage(1, queryString));
});

import { initTheme, toggleTheme } from "./utils/theme";

window.addEventListener("load", () => {
	initTheme();
	const toggleBtn = document.querySelector(".ThemeToggle");
	if (toggleBtn) {
		toggleBtn.addEventListener("click", () => {
			toggleTheme();
		});
	}
});

import { toggleFavorite, isFavorite } from "./utils/favorites";

const updateFavoriteBtn = (btn) => {
	const id = btn.dataset.id;
	const isFav = isFavorite(id);
	if (isFav) {
		btn.classList.add("is-favorite");
	} else {
		btn.classList.remove("is-favorite");
	}
};

window.addEventListener("click", (e) => {
	const btn = e.target.closest(".Favorite-btn");
	if (btn) {
		e.preventDefault();
		e.stopPropagation();
		const id = btn.dataset.id;
		toggleFavorite(id);
		updateFavoriteBtn(btn);
	}
});

// Update buttons on render (simple approach: mutation observer or re-check)
// Since we don't have a complex state manager, we can use a MutationObserver
const observer = new MutationObserver(() => {
	document.querySelectorAll(".Favorite-btn").forEach(updateFavoriteBtn);
});

observer.observe(document.getElementById("content"), {
	childList: true,
	subtree: true,
});
