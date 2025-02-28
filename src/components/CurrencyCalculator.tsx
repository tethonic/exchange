import { useState } from 'react';

const OMR_TO_USD = 2.6;
const FEE_PERCENTAGE = 0.02; // 2% fee

const calculateExchange = (amount: number, isOmrToUsdt: boolean) => {
  if (amount <= 0) return { output: 0, fee: 0 };
  
  if (isOmrToUsdt) {
    // OMR to USDT
    const rawUsdt = amount * OMR_TO_USD;
    const fee = rawUsdt * FEE_PERCENTAGE;
    return {
      output: rawUsdt - fee,
      fee: fee
    };
  } else {
    // USDT to OMR
    const rawOmr = amount / OMR_TO_USD;
    const fee = rawOmr * FEE_PERCENTAGE;
    return {
      output: rawOmr - fee,
      fee: fee
    };
  }
};

interface CalculatorSectionProps {
  type: 'buy' | 'sell';
  inputAmount: string;
  onInputChange: (value: string) => void;
}

const CalculatorSection = ({ type, inputAmount, onInputChange }: CalculatorSectionProps) => {
  const isOmrToUsdt = type === 'buy';
  const details = calculateExchange(parseFloat(inputAmount) || 0, isOmrToUsdt);

  return (
    <div className="bg-gray-800/90 p-6 rounded-lg border border-gray-700/50">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">
            {isOmrToUsdt ? 'Convert OMR to USDT' : 'Convert USDT to OMR'}
          </h3>
        </div>
        <div className="text-sm text-gray-400 space-y-1">
          <div>Base Rate: 1 OMR = ${OMR_TO_USD} USDT</div>
          <div>Exchange Fee: 2%</div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {isOmrToUsdt ? 'Amount in OMR' : 'Amount in USDT'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={inputAmount}
              onChange={(e) => onInputChange(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              placeholder="0.00"
              step="0.01"
            />
            <span className="absolute right-3 top-3 text-gray-500">
              {isOmrToUsdt ? 'OMR' : 'USDT'}
            </span>
          </div>
        </div>

        {parseFloat(inputAmount) > 0 && (
          <div className="bg-gray-900/50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">You Send</span>
              <span>
                {parseFloat(inputAmount).toFixed(3)} {isOmrToUsdt ? 'OMR' : 'USDT'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Exchange Fee (2%)</span>
              <span className="text-yellow-500">
                {details.fee.toFixed(3)} {isOmrToUsdt ? 'USDT' : 'OMR'}
              </span>
            </div>
            <div className="flex justify-between text-base font-medium pt-2 border-t border-gray-700">
              <span className="text-gray-300">You Receive</span>
              <span className="text-green-500">
                {details.output.toFixed(3)} {isOmrToUsdt ? 'USDT' : 'OMR'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CurrencyCalculator = () => {
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Currency Exchange Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CalculatorSection
          type="buy"
          inputAmount={buyAmount}
          onInputChange={setBuyAmount}
        />
        <CalculatorSection
          type="sell"
          inputAmount={sellAmount}
          onInputChange={setSellAmount}
        />
      </div>
    </div>
  );
};
