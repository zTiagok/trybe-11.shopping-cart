const fetchProducts = (id) => {
  const productsUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;

  return fetch(productsUrl)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
