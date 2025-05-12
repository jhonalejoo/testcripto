import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { CryptoService } from '../src/services/CryptoService';

const mock = new MockAdapter(axios);
describe('CryptoService', () => {
  afterEach(() => mock.reset());

  //Test api de criptomonedas paginada
  it('should fetch and return crypto data', async () => {
    const mockData = {
      data: [
        { id: '90', name: 'Bitcoin', symbol: 'BTC', price_usd: '30000' },
        { id: '80', name: 'Ethereum', symbol: 'ETH', price_usd: '2000' },
      ],
    };

    mock
      .onGet(/https:\/\/api\.coinlore\.net\/api\/tickers\/?.*/)
      .reply(200, mockData);

    const result = await CryptoService.getCryptos();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Bitcoin');
    expect(result[1].symbol).toBe('ETH');
  });

  it('should throw on API error when fetching all cryptos', async () => {
    mock
      .onGet(/https:\/\/api\.coinlore\.net\/api\/tickers\/?.*/)
      .reply(500);

    await expect(CryptoService.getCryptos()).rejects.toThrow();
  });

  //Test api de detalle de criptomonedas
  it('should fetch and return a single crypto by ID', async () => {
    const mockDetail = [
      { id: '90', name: 'Bitcoin', symbol: 'BTC', price_usd: '30000' },
    ];

    mock
      .onGet('https://api.coinlore.net/api/ticker/?id=90')
      .reply(200, mockDetail);

    const result = await CryptoService.getCryptoById('90');

    expect(result).toBeDefined();
    expect(result.id).toBe('90');
    expect(result.name).toBe('Bitcoin');
    expect(result.symbol).toBe('BTC');
    expect(result.price_usd).toBe('30000');
  });

  it('should throw on API error when fetching crypto by ID', async () => {
    mock
      .onGet('https://api.coinlore.net/api/ticker/?id=12345')
      .reply(500);

    await expect(CryptoService.getCryptoById('12345')).rejects.toThrow();
  });
});
