import { create } from 'zustand';
import { Crypto } from '../models/Crypto';
import { CryptoService } from '../services/CryptoService';

// Interfaz que define el estado y acciones del store
interface CryptoStore {
  cryptos: Crypto[];  // Lista de criptomonedas
  cryptoSelected: Crypto | null; // Criptomoneda seleccionada
  loading: boolean;
  page: number;
  fetchCryptos: () => Promise<void>; // Función para cargar criptomonedas
  setCryptoSelected: (crypto: Crypto) => void; // Función para establecer la cripto seleccionada
}

// Store global usando Zustand
export const useCryptoStore = create<CryptoStore>((set, get) => ({
  cryptos: [],
  cryptoSelected: null,
  loading: false,
  page: 0,

  // Carga criptomonedas usando el servicio y actualiza el estado
  fetchCryptos: async () => {
    const { page, cryptos } = get();
    set({ loading: true });
    const newCryptos = await CryptoService.getCryptos(page * 20, 20);
    set({
      cryptos: [...cryptos, ...newCryptos], // Agrega nuevas criptos
      page: page + 1,
      loading: false
    });
  },

  // Establece la cripto seleccionada
  setCryptoSelected: (crypto: Crypto) => set({ cryptoSelected: crypto }),
}));
