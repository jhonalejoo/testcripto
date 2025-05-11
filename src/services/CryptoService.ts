import axios from 'axios';
import { Crypto } from '../models/Crypto';

export class CryptoService {
  static async getCryptos(): Promise<Crypto[]> {
    const res = await axios.get('https://api.coinlore.net/api/tickers/');
    return res.data.data.map(Crypto.fromApi);
  }
}