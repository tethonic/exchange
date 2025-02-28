import { CryptoPrice } from '../types/crypto';

export class BinanceService {
  private static ws: WebSocket | null = null;
  private static subscribers: Map<string, (data: CryptoPrice) => void> = new Map();

  static subscribe(symbols: string[], callback: (data: CryptoPrice) => void) {
    const streams = symbols.map(symbol => `${symbol.toLowerCase()}@ticker`).join('/');
    const wsUrl = `wss://stream.binance.com:9443/ws/${streams}`;

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.ws = new WebSocket(wsUrl);
      
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const price: CryptoPrice = {
          symbol: data.s,
          price: data.c,
          priceChange: data.p,
          priceChangePercent: data.P,
          high24h: data.h,
          low24h: data.l,
        };
        
        this.subscribers.forEach(cb => cb(price));
      };
    }

    const id = Math.random().toString(36);
    this.subscribers.set(id, callback);

    return () => {
      this.subscribers.delete(id);
      if (this.subscribers.size === 0 && this.ws) {
        this.ws.close();
        this.ws = null;
      }
    };
  }
}
