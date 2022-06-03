require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('Deve ser uma função', () => {
    expect.assertions(1);
    const expected = typeof fetchItem;
    const result = 'function';
    
    expect(expected).toBe(result);
  });

  it('Deve dar um fetch ao utilizar "MLB1615760527" como parâmetro', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Deve utilizar o endpoint específico', async () => {
    expect.assertions(1);
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';

    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('Deve retornar uma estrutura de dados', async () => {
    expect.assertions(1);
    const data = await fetchItem('MLB1615760527');
    
    expect(data).toBe(item);
  });

  it('Deve retornar um erro ao não passar um parâmetro', async () => {
    expect.assertions(1);
    const fail = await fetchItem();
    
    expect(fail).toEqual(new Error('You must provide an url'));
  });
});
