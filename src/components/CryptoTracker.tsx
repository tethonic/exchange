import { useEffect, useState, useRef } from 'react';
import { SimpleLineChart } from './SimpleLineChart';
import { WebSocketService } from '../services/websocketService';

interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  priceChange: number;
  priceHistory: number[];
}

const CRYPTO_NAMES: Record<string, string> = {
  BTCUSDT: 'Bitcoin',
  ETHUSDT: 'Ethereum',
  USDTUSDC: 'Tether',
  XRPUSDT: 'Ripple',
  DOGEUSDT: 'Dogecoin'
};

export const CryptoTracker = () => {
  const [cryptoData, setCryptoData] = useState<Record<string, CryptoData>>({});
  const wsRef = useRef<WebSocketService | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocketService();

    wsRef.current.setOnMessageCallback((data) => {
      if (typeof data.s === 'string' && CRYPTO_NAMES[data.s]) {
        setCryptoData(prev => {
          const symbol = data.s as string;
          const currentData = prev[symbol] || {
            symbol,
            name: CRYPTO_NAMES[symbol],
            price: 0,
            priceChange: 0,
            priceHistory: []
          };

          return {
            ...prev,
            [symbol]: {
              ...currentData,
              price: parseFloat(data.c as string),
              priceChange: parseFloat(data.P as string),
              priceHistory: [...(currentData.priceHistory || []), parseFloat(data.c as string)].slice(-100)
            }
          };
        });
      }
    });

    return () => {
      if (wsRef.current) {
        wsRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="space-y-2.5">
      {Object.values(cryptoData).map((crypto) => {
        const chartData = crypto.priceHistory.map((price, index) => ({
          timestamp: index,
          price,
        }));

        const priceChangeColor = crypto.priceChange >= 0 
          ? 'text-green-500' 
          : 'text-red-500';

        return (
          <div 
            key={crypto.symbol} 
            className="bg-gray-800/90 p-2.5 sm:p-3 rounded-lg hover:bg-gray-800 transition-all duration-200 border border-gray-700/50"
          >
            {/* Rest of the JSX remains the same, just update the data references */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="flex justify-between sm:w-40 sm:shrink-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm sm:text-base">{crypto.name}</span>
                  <span className="text-gray-400 text-xs sm:text-sm">
                    ({crypto.symbol.replace('USDT', '')})
                  </span>
                </div>
                <div className={`${priceChangeColor} text-right font-medium sm:hidden text-sm`}>
                  {crypto.priceChange.toFixed(2)}%
                </div>
              </div>

              <div className="flex flex-1 items-center gap-3 sm:gap-4">
                <div className="w-24 sm:w-32 shrink-0 text-left sm:text-right">
                  <span className="font-medium text-sm sm:text-base">
                    ${crypto.price.toLocaleString()}
                  </span>
                </div>
                
                <div className={`hidden sm:block w-20 shrink-0 ${priceChangeColor} text-right font-medium`}>
                  {crypto.priceChange.toFixed(2)}%
                </div>
                
                <div className="flex-1 min-w-[120px] sm:min-w-[200px] sm:max-w-[280px] lg:max-w-[400px]">
                  <SimpleLineChart
                    data={chartData}
                    color={crypto.priceChange >= 0 ? '#10B981' : '#EF4444'}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
