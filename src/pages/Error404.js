const Error404 = () => {
  const view = `
    <section class="Error404" aria-labelledby="error-title">
      <div class="Error404-card">
        <p class="Error404-code">404</p>
        <h2 id="error-title">Portal not found</h2>
        <p>
          This dimension does not exist in JavierChi.dev's Rick & Morty Explorer.
          Try jumping back to the main roster.
        </p>
        <a class="Error404-button" href="#/">Return home</a>
      </div>
    </section>
  `;
  return view;
};

export default Error404;
