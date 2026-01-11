import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Builds } from './pages/Builds';
import { MakuTweaker } from './pages/MakuTweaker';
import { FAQ } from './pages/FAQ';
import { Support } from './pages/Support';
import { ISO } from './pages/ISO';
import { MakuPE } from './pages/MakuPE';
import { MakuYan } from './pages/MakuYan';
import { MakuBenchmark } from './pages/MakuBenchmark';
import { Guide } from './pages/Guide';
import { Admin } from './pages/Admin';
import { useAnalytics } from './hooks/useAnalytics';

const AppContent = () => {
  useAnalytics();

  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builds" element={<Builds />} />
          <Route path="/iso" element={<ISO />} />
          <Route path="/makutweaker" element={<MakuTweaker />} />
          <Route path="/winpe" element={<MakuPE />} />
          <Route path="/yandex-ban" element={<MakuYan />} />
          <Route path="/benchmark" element={<MakuBenchmark />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <Footer /> 
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;