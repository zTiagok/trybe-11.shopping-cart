const cart = document.querySelector('.cart__items');
const cartTotalPrice = document.querySelector('.total-price');
const emptyCart = document.querySelector('.empty-cart');
const itens = document.querySelector('.items');

const emptyCartFunction = () => {
  while (cart.lastChild) {
    cart.lastChild.remove();
    cartTotalPrice.innerHTML = '';
    saveCartItems(cart);
  }
};

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

const retrieveValue = async (values) => {
  const valueResult = values
  .reduce((previousValue, currentValue) => parseFloat(previousValue) + parseFloat(currentValue), 0);

  cartTotalPrice.innerHTML = valueResult;
};

const retrieveNumbers = async () => {
  const childs = cart.childNodes;
  const allValues = [];

  childs.forEach((child) => {
    const childString = child.innerHTML;
    const indexOf$ = childString.indexOf('$');
    const childValue = childString.slice(indexOf$ + 1);

    allValues.push(childValue);
  });

  retrieveValue(allValues);
};

const cartCheck = () => {
  if (cart.lastChild) {
    saveCartItems(cart);
    retrieveNumbers();
  }
};

const removeLoading = () => {
  const getLoading = document.querySelector('.loading');

  getLoading.remove();
};

const createLoading = () => {
  const child = document.createElement('div');
  child.className = 'loading';
  child.innerHTML = 'Carregando...';

  itens.appendChild(child);
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(cart);
  retrieveNumbers();

  if (cartTotalPrice.innerHTML[0] === '0') cartTotalPrice.innerHTML = '';
};

const createCartItemElement = ({ id: sku, title: name, price: salePrice }) => {
  const li = document.createElement('li');
  const ol = document.querySelector('.cart__items');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  ol.appendChild(li);
  cartCheck();
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

const retrieveProducts = async () => {
  const response = fetchProducts('computador');
  const data = await response;
  
  removeLoading();
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
      retrieveNumbers();
    });
  }
};

// THEMES SCRIPT ______________________________________________________________________
const themeButton = document.querySelector('.theme-changer');
const themeBody = document.getElementsByTagName('body');
const emptyButton = document.querySelector('.empty-cart');
const black = 'black-theme';
const white = 'white-theme';

const blackTheme = () => {
  themeBody[0].className = black;
  emptyButton.style.color = 'white';
};

const whiteTheme = () => {
  themeBody[0].className = white;
  emptyButton.style.color = 'black';
};

const switchTheme = () => {
  if (themeBody[0].className === white) {
    themeButton.innerHTML = 'Tema Claro';
    blackTheme();
  } else if (themeBody[0].className === black) {
    themeButton.innerHTML = 'Tema Escuro';
    whiteTheme();
  }

  buttonChanger();
};

emptyCart.addEventListener('click', emptyCartFunction);
themeButton.addEventListener('click', switchTheme);

window.onload = () => { retrieveProducts(); retrieveCart(); createLoading(); };
