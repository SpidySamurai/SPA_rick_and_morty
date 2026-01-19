import Header from "../template/Header";
import Loading from "../template/Loading";
import Home from "../pages/Home";
import Character from "../pages/Character";
import About from "../pages/About";
import Favorites from "../pages/Favorites";
import Error404 from "../pages/Error404";
import getHash from "../utils/getHash";
import resolveRoutes from "../utils/resolveRoutes";

const routes = {
  "/": Home,
  "/page": Home,
  "/:id": Character,
  "/about": About,
  "/favorites": Favorites,
};

const loadingMessages = {
  "/": "Loading character grid...",
  "/page": "Loading character grid...",
  "/:id": "Loading character details...",
  "/about": "Loading about page...",
  "/favorites": "Loading your collection...",
};

const router = async () => {
  const header = document.getElementById("header");
  const content = document.getElementById("content");

  if (!header || !content) return;

  header.innerHTML = await Header();

  const hash = getHash();
  const route = await resolveRoutes(hash);
  const render = routes[route] ? routes[route] : Error404;
  const loadingMessage = loadingMessages[route] || "Loading portal data...";
  content.innerHTML = Loading(loadingMessage);

  try {
    const view = await render();
    content.innerHTML = view;
  } catch (error) {
    console.error("Render error", error);
    content.innerHTML = `
      <section class="Characters Characters--empty">
        <p>Something went wrong while opening this portal.</p>
        <a href="#/">Return home</a>
      </section>
    `;
  }
};

export default router;
