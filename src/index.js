import router from "./routes";
import { buildHashForPage, buildQueryString } from "./utils/queryHelpers";
import "./styles/base.css";
import "./styles/header.css";
import "./styles/home.css";
import "./styles/character.css";
import "./styles/about.css";
import "./styles/error.css";

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

document.addEventListener("submit", (event) => {
	if (!event.target.matches(".SearchForm")) return;
	event.preventDefault();
	const formData = new FormData(event.target);
	const filters = {
		name: formData.get("name")?.toString().trim() || "",
		species: formData.get("species")?.toString().trim() || "",
		status: formData.get("status")?.toString() || "",
		gender: formData.get("gender")?.toString() || "",
	};
	const queryString = buildQueryString(filters);
	navigateToHash(buildHashForPage(1, queryString));
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
