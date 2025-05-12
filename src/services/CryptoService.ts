import axios from 'axios';
import { Crypto } from '../models/Crypto';

// URL base de la API
const BASE_URL = 'https://api.coinlore.net/api';

export const CryptoService = {
  // Obtiene criptomonedas desde la API
  getCryptos: async (start = 0, limit = 20): Promise<Crypto[]> => {
    const response = await axios.get(`${BASE_URL}/tickers/?start=${start}&limit=${limit}`);
    return response.data.data.map(Crypto.fromApi);
  },
  // Obtiene una criptomoneda específica por ID
  getCryptoById: async (id: string): Promise<Crypto> => {
    const response = await axios.get(`${BASE_URL}/ticker/?id=${id}`);
    return Crypto.fromApi(response.data[0]);
  }
};