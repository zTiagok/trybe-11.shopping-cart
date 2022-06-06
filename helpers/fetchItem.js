const fetchItem = (id) => {
  const itemUrl = `https://api.mercadolibre.com/items/${id}`;

  return fetch(itemUrl)
  .then((response) => response.json())
  .then((data) => data)
  .catch((error) => error);
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
