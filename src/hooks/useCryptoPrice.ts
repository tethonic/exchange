import { useState, useEffect } from 'react';
import { BinanceService } from '../services/binance';
import { CryptoPrice, SupportedCrypto } from '../types/crypto';

export const useCryptoPrice = (symbols: SupportedCrypto[]) => {
  const [prices, setPrices] = useState<Record<string, CryptoPrice>>({});

  useEffect(() => {
    const unsubscribe = BinanceService.subscribe(symbols, (price) => {
      setPrices(prev => ({
        ...prev,
        [price.symbol]: price
      }));
    });

    return () => unsubscribe();
  }, [symbols.join(',')]);

  return prices;
};
