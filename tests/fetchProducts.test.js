require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('Deve ser uma função', () => {
    expect.assertions(1);
    const expected = typeof fetchProducts
    const result = 'function';
    
    expect(expected).toBe(result);
  });

  it('Deve dar um fetch ao utilizar "computador" como parâmetro', async () => {
    expect.assertions(1);
    await fetchProducts('computador');

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Deve utilizar o endpoint específico', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Deve retornar uma estrutura de dados', async () => {
    expect.assertions(1);
    const data = await fetchProducts('computador');
    
    expect(data).toBe(computadorSearch);
  });

  it('Deve retornar um erro ao não passar um parâmetro', async () => {
    expect.assertions(1);
    const fail = await fetchProducts();
    
    expect(fail).toEqual(new Error('You must provide an url'));
  });


});
