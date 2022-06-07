const cart = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;

  return e;
};

const storageCheck = () => {
  if (cart.lastChild) {
    saveCartItems(cart);
  }
};

// FUNÇÃO FINALIZADA!
const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cart);
};

// FUNÇÃO FINALIZADA!
const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  const ol = document.querySelector('.cart__items');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
  storageCheck();
  return li;
};

const retrieveItem = async (id) => {
  const response = fetchItem(id);
  const data = await response;
  
  createCartItemElement(data);
};

const getID = (origin) => {
  const parent = (origin.target.parentElement);

  retrieveItem(parent.firstChild.innerHTML);
};

const addListenerToButton = () => {
  const parent = document.querySelectorAll('.item');

  parent.forEach((child) => {
    const button = child.lastChild;

    button.addEventListener('click', getID);
  });
};

// FUNÇÃO FINALIZADA!
const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  const parent = document.querySelector('.items');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  addListenerToButton();
  parent.appendChild(section);
};

// UTILIZAR A FUNÇÃO!
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

// FUNÇÃO FINALIZADA!
const retrieveProducts = async () => {
  const response = fetchProducts('computador');
  const data = await response;
  
  data.results.forEach((result) => {
    createProductItemElement(result);
  });
};

const retrieveCart = () => {
  const storage = localStorage.getItem('cartItems');

  if (storage) {
    cart.innerHTML = storage;

    const items = cart.childNodes;

    items.forEach((item) => {
      item.addEventListener('click', cartItemClickListener);
    });
  }
};

retrieveCart();

window.onload = () => { retrieveProducts(); };
