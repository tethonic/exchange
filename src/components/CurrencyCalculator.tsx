import { useState } from 'react';

const OMR_TO_USD = 2.6;
const FEE_PERCENTAGE = 0.04;

const calculateExchange = (amount: number, isOmrToUsdt: boolean) => {
  if (amount <= 0) return { output: 0 };
  
  if (isOmrToUsdt) {
    const rawUsdt = amount * OMR_TO_USD;
    return { output: rawUsdt * (1 - FEE_PERCENTAGE) };
  } else {
    const rawOmr = amount / OMR_TO_USD;
    return { output: rawOmr * (1 - FEE_PERCENTAGE) };
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
      <div className="mb-6">
        <h3 className="text-lg font-bold">
          {isOmrToUsdt ? 'Convert OMR to USDT' : 'Convert USDT to OMR'}
        </h3>
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
          <div className="bg-gray-900/50 p-4 rounded-lg">
            <div className="flex justify-between text-base font-medium">
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
