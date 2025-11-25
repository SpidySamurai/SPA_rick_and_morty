export const buildQueryString = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });
  return params.toString();
};

export const buildHashForPage = (page, queryString) => {
  const isFirstPage = !page || page === 1;
  const base = isFirstPage ? "#/" : `#/page/${page}/`;
  return queryString ? `${base}?${queryString}` : base;
};
