const Header = () => {
  const view = `
    <header class="Header-main">
      <div class="Header-bar">
        <a href="https://javierchiortiz.dev/" class="Header-brand" aria-label="Visit Javier Chi" target="_blank" rel="noopener">
          <span class="Header-title">JavierChi.dev</span>
          <span class="Header-subtitle">Rick & Morty Explorer</span>
        </a>
        <nav class="Header-nav" aria-label="Primary navigation">
          <a href="#/">Home</a>
          <a href="#/about/">About</a>
          <a href="#/favorites/">Favorites</a>
          <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener">API</a>
          <button class="ThemeToggle" aria-label="Toggle Dark Mode">
            <span class="ThemeToggle-icon">🌓</span>
          </button>
        </nav>
      </div>
    </header>
  `;
  return view;
};

export default Header;
