export interface CryptoPrice {
  symbol: string;
  price: string;
  priceChange: string;
  priceChangePercent: string;
  high24h: string;
  low24h: string;
}

export interface ChartData {
  timestamp: number;
  price: number;
}

export type SupportedCrypto = 'BTCUSDT' | 'ETHUSDT' | 'XRPUSDT' | 'DOGEUSDT' | 'USDTUSDC';
