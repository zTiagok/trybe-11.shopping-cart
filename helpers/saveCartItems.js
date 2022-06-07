const saveCartItems = (item) => {
  localStorage.setItem('cartItems', `${item.innerHTML}`);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
