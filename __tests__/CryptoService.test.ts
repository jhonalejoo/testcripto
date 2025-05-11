// src/services/__tests__/CryptoService.test.ts
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { CryptoService } from '../src/services/CryptoService';

const mock = new MockAdapter(axios);

describe('CryptoService', () => {
  afterEach(() => mock.reset());

  it('should fetch and return crypto data', async () => {
    const mockData = {
      data: [
        { id: '90', name: 'Bitcoin', symbol: 'BTC', price_usd: '30000' },
        { id: '80', name: 'Ethereum', symbol: 'ETH', price_usd: '2000' },
      ],
    };

    mock.onGet('https://api.coinlore.net/api/tickers/').reply(200, mockData);

    const result = await CryptoService.getCryptos();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Bitcoin');
    expect(result[1].symbol).toBe('ETH');
  });

  it('should throw on API error', async () => {
    mock.onGet('https://api.coinlore.net/api/tickers/').reply(500);

    await expect(CryptoService.getCryptos()).rejects.toThrow();
  });
});
