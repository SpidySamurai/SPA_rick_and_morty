import router from "./routes";
import "./styles/base.css";
import "./styles/header.css";
import "./styles/home.css";
import "./styles/character.css";
import "./styles/about.css";
import "./styles/error.css";

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
