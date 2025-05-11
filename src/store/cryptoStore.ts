// src/store/cryptoStore.ts
import { create } from 'zustand';
import { Crypto } from '../models/Crypto';
import { CryptoService } from '../services/CryptoService';

type CryptoStore = {
  cryptos: Crypto[];
  loading: boolean;
  error: string | null;
  cryptoSelected: Crypto | null;
  fetchCryptos: () => Promise<void>;
  setCryptoSelected: (crypto: Crypto) => void;
};

export const useCryptoStore = create<CryptoStore>((set) => ({
  cryptos: [],
  loading: false,
  error: null,
  cryptoSelected: null,
  fetchCryptos: async () => {
    set({ loading: true, error: null });
    try {
      const data = await CryptoService.getCryptos();
      set({ cryptos: data, loading: false });
    } catch (e) {
      set({ error: 'Error al cargar criptos', loading: false });
    }
  },
  setCryptoSelected: (crypto) => set({ cryptoSelected: crypto }),
}));
