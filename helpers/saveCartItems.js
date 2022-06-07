const saveCartItems = (item) => {
  const cartItems = item.innerHTML;
  return localStorage.setItem('cartItems', cartItems);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
