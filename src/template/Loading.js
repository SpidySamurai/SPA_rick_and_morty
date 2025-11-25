const Loading = (message = "Loading portal data...") => `
  <section class="Loading-state" role="status" aria-live="polite">
    <span class="loading" aria-hidden="true"></span>
    <p>${message}</p>
  </section>
`;

export default Loading;
