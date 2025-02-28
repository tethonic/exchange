import './App.css'
import { CryptoTracker } from './components/CryptoTracker';

function App() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8 text-center">
          Crypto Market
        </h1>
        <CryptoTracker />
      </div>
    </div>
  );
}

export default App;
