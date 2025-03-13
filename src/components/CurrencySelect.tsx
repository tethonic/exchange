export interface FiatCurrency {
  code: string;
  symbol: string;
  rate: number;
}

const FIAT_CURRENCIES: FiatCurrency[] = [
  { code: 'USD', symbol: '$', rate: 1 },
  { code: 'OMR', symbol: 'ر.ع.', rate: 2.6 }, // 1 OMR = 2.6 USD
];

interface CurrencySelectProps {
  selectedCurrency: FiatCurrency;
  onCurrencyChange: (currency: FiatCurrency) => void;
}

export const CurrencySelect = ({ selectedCurrency, onCurrencyChange }: CurrencySelectProps) => {
  return (
    <div className="mb-6 flex justify-end">
      <select
        aria-label="Select currency"
        value={selectedCurrency.code}
        onChange={(e) => {
          const currency = FIAT_CURRENCIES.find(c => c.code === e.target.value);
          if (currency) onCurrencyChange(currency);
        }}
        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {FIAT_CURRENCIES.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export { FIAT_CURRENCIES };
