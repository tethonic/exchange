import { useCallback, useEffect, useState } from 'react';
import { CryptoPrice } from '../../types/crypto';
import { PriceCard } from './PriceCard';

export const CryptoTracker = () => {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);

  const fetchPrices = useCallback(async () => {
    try {
      const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
      const data = await response.json();
      const majorPairs = data
        .filter((item: { symbol: string }) => item.symbol.endsWith('USDT'))
        .slice(0, 20) // Show more pairs
        .map((item: { symbol: string; lastPrice: string; priceChangePercent: string; highPrice: string; lowPrice: string }) => ({
          symbol: item.symbol.replace('USDT', ''),
          price: item.lastPrice,
          priceChangePercent: parseFloat(item.priceChangePercent).toFixed(2),
          high24h: item.highPrice,
          low24h: item.lowPrice,
        }));
      setPrices(majorPairs);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex overflow-x-auto py-4 px-2 gap-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {prices.map((price) => (
          <div key={price.symbol} className="flex-shrink-0 w-[300px]">
            <PriceCard data={price} />
          </div>
        ))}
      </div>
    </div>
  );
};
