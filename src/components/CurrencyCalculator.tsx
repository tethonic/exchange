import { useState } from 'react';

const OMR_TO_USD = 2.6;
const EXCHANGE_CONFIG = {
  buy: {
    baseRate: OMR_TO_USD,
    fee: 0.02, // 2% fee
    get rate() { return this.baseRate * (1 + this.fee); }
  },
  sell: {
    baseRate: OMR_TO_USD,
    fee: 0.02, // 2% fee
    get rate() { return this.baseRate * (1 - this.fee); }
  }
};

interface ExchangeDetails {
  inputAmount: number;
  outputAmount: number;
  fee: number;
  rate: number;
}

interface CalculatorSectionProps {
  type: 'buy' | 'sell';
  omrAmount: string;
  usdtAmount: string;
  onOmrChange: (value: string) => void;
  onUsdtChange: (value: string) => void;
}

const CalculatorSection = ({ type, omrAmount, usdtAmount, onOmrChange, onUsdtChange }: CalculatorSectionProps) => {
  const config = EXCHANGE_CONFIG[type];
  const calculateDetails = (): ExchangeDetails => {
    const input = type === 'buy' ? parseFloat(omrAmount) || 0 : parseFloat(usdtAmount) || 0;
    const rate = config.rate;
    const output = type === 'buy' ? input * rate : input / rate;
    const fee = type === 'buy' 
      ? (input * config.baseRate * config.fee)
      : (input * config.fee);

    return {
      inputAmount: input,
      outputAmount: output,
      fee,
      rate
    };
  };

  const details = calculateDetails();

  return (
    <div className="bg-gray-800/90 p-6 rounded-lg border border-gray-700/50">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{type === 'buy' ? 'Convert OMR to USDT' : 'Convert USDT to OMR'}</h3>
        </div>
        <div className="text-sm text-gray-400 space-y-1">
          <div>Base Rate: 1 OMR = ${OMR_TO_USD} USDT</div>
          <div>Exchange Fee: 2%</div>
          <div>Final Rate: 1 OMR = ${config.rate.toFixed(3)} USDT</div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {type === 'buy' ? 'You Send (OMR)' : 'You Send (USDT)'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={type === 'buy' ? omrAmount : usdtAmount}
              onChange={(e) => (type === 'buy' ? onOmrChange(e.target.value) : onUsdtChange(e.target.value))}
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="0.00"
              step="0.01"
            />
            <span className="absolute right-3 top-3 text-gray-500">
              {type === 'buy' ? 'OMR' : 'USDT'}
            </span>
          </div>
        </div>

        {details.inputAmount > 0 && (
          <div className="bg-gray-900/50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Amount</span>
              <span>{details.inputAmount.toFixed(3)} {type === 'buy' ? 'OMR' : 'USDT'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Exchange Fee (2%)</span>
              <span className="text-yellow-500">
                {details.fee.toFixed(3)} {type === 'buy' ? 'USDT' : 'OMR'}
              </span>
            </div>
            <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-700">
              <span className="text-gray-300">You Receive</span>
              <span className="text-green-500">
                {details.outputAmount.toFixed(3)} {type === 'buy' ? 'USDT' : 'OMR'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CurrencyCalculator = () => {
  const [buyOmr, setBuyOmr] = useState('');
  const [buyUsdt, setBuyUsdt] = useState('');
  const [sellOmr, setSellOmr] = useState('');
  const [sellUsdt, setSellUsdt] = useState('');

  const handleBuyOmrChange = (value: string) => {
    setBuyOmr(value);
    const omr = parseFloat(value) || 0;
    setBuyUsdt((omr * EXCHANGE_CONFIG.buy.rate).toFixed(3));
  };

  const handleBuyUsdtChange = (value: string) => {
    setBuyUsdt(value);
    const usdt = parseFloat(value) || 0;
    setBuyOmr((usdt / EXCHANGE_CONFIG.buy.rate).toFixed(3));
  };

  const handleSellOmrChange = (value: string) => {
    setSellOmr(value);
    const omr = parseFloat(value) || 0;
    setSellUsdt((omr * EXCHANGE_CONFIG.sell.rate).toFixed(3));
  };

  const handleSellUsdtChange = (value: string) => {
    setSellUsdt(value);
    const usdt = parseFloat(value) || 0;
    setSellOmr((usdt / EXCHANGE_CONFIG.sell.rate).toFixed(3));
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Currency Exchange Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CalculatorSection
          type="buy"
          omrAmount={buyOmr}
          usdtAmount={buyUsdt}
          onOmrChange={handleBuyOmrChange}
          onUsdtChange={handleBuyUsdtChange}
        />
        <CalculatorSection
          type="sell"
          omrAmount={sellOmr}
          usdtAmount={sellUsdt}
          onOmrChange={handleSellOmrChange}
          onUsdtChange={handleSellUsdtChange}
        />
      </div>
    </div>
  );
};
