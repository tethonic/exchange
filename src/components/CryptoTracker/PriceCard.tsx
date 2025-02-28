import { CryptoPrice } from '../../types/crypto';
import { MiniChart } from './MiniChart/index';

interface PriceCardProps {
  data: CryptoPrice;
}

export const PriceCard = ({ data }: PriceCardProps) => {
  const isPositive = parseFloat(data.priceChangePercent) >= 0;

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 w-full">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-100">{data.symbol}</h3>
          <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
            {isPositive ? '▲' : '▼'} {data.priceChangePercent}%
          </span>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold text-gray-100">
            ${parseFloat(data.price).toFixed(2)}
          </div>
          <div className="flex gap-2 text-xs text-gray-400">
            <span>H: ${parseFloat(data.high24h).toFixed(2)}</span>
            <span>L: ${parseFloat(data.low24h).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 h-[60px]">
        <MiniChart symbol={data.symbol} />
      </div>
    </div>
  );
};
