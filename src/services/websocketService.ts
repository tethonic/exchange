export class WebSocketService {
  private ws: WebSocket | null = null;
  private readonly symbols = ['btcusdt', 'ethusdt', 'usdtusdc', 'xrpusdt', 'dogeusdt'];
  private onMessageCallback: ((data: Record<string, unknown>) => void) | null = null;

  constructor() {
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket('wss://stream.binance.com:9443/ws');

    this.ws.onopen = () => {
      console.log('Connected to Binance WebSocket');
      this.subscribe();
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(data);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected. Reconnecting...');
      setTimeout(() => this.connect(), 5000);
    };
  }

  private subscribe() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const subscribeMessage = {
        method: 'SUBSCRIBE',
        params: this.symbols.map(symbol => `${symbol}@ticker`),
        id: 1
      };
      this.ws.send(JSON.stringify(subscribeMessage));
    }
  }

  public setOnMessageCallback(callback: (data: Record<string, unknown>) => void) {
    this.onMessageCallback = callback;
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}
