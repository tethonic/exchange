import './App.css'
import { CryptoTracker } from './components/CryptoTracker';
import { CurrencyCalculator } from './components/CurrencyCalculator';

function App() {
  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto px-0 sm:px-2 md:px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-6 text-center">
          Tethonic Crypto Tracker
        </h1>
        <CryptoTracker />
        <CurrencyCalculator />
      </div>
    </div>
  );
}

export default App;
