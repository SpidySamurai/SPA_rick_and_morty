const About = () => {
  const view = `
    <section class="About">
      <h2>About this demo</h2>
      <p>
        Single Page Application built with JavaScript, HTML, CSS, and Webpack to showcase how to consume the Rick & Morty API.
      </p>
      <p>
        The project focuses on hash-based routing and lightweight view composition without relying on frameworks.
      </p>
      <ul class="About-list">
        <li><strong>Stack:</strong> JavaScript · HTML · CSS · Webpack</li>
        <li><strong>Routing:</strong> Hash-based SPA navigation with dynamic character views.</li>
        <li><strong>UI:</strong> Responsive cards, modals, and subtle micro-interactions.</li>
      </ul>
    </section>
  `;
  return view;
};

export default About;
