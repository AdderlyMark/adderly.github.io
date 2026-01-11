import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Zap, Copy, Check, Bitcoin, 
  Wallet, ExternalLink, Coffee 
} from 'lucide-react';
import './Support.css';

// Данные криптокошельков (Заглушки - замени на реальные адреса Марка)
const WALLETS = [
  { name: 'Bitcoin (BTC)', network: 'BTC', address: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
  { name: 'USDT', network: 'TRC20', address: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
  { name: 'Ethereum (ETH)', network: 'ERC20', address: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
  { name: 'TON', network: 'TON', address: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' },
];

export const Support = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Сброс галочки через 2 сек
  };

  return (
    <div className="support-page container">
      
      <motion.div 
        className="support-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="heart-icon-wrapper">
          <Heart className="heart-pulse" fill="currentColor" />
        </span>
        <h1>Поддержать <span className="text-gradient">Марка Аддерли</span></h1>
        <p>Ты можешь поддержать меня различными способами! :)</p>
      </motion.div>

      <div className="support-grid">
        
        {/* --- Левая колонка: Boosty --- */}
        <motion.div 
          className="boosty-column"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="section-label">Boosty (Карты РФ)</div>
          
          <a href="https://boosty.to/adderly" target="_blank" className="support-card primary">
            <div className="card-bg-glow"></div>
            <div className="card-icon-box">
              <Zap size={32} />
            </div>
            <div className="card-content">
              <h3>Купить спонсорскую подписку</h3>
              <p>Эксклюзивный контент, доступ к приватному чату в Telegram.</p>
            </div>
            <ExternalLink className="link-icon" size={20} />
          </a>

          <a href="https://boosty.to/markadderly/donate" target="_blank" className="support-card secondary">
            <div className="card-icon-box">
              <Coffee size={32} />
            </div>
            <div className="card-content">
              <h3>Одноразовый донат</h3>
              <p>Сказать спасибо за видео или софт любой суммой.</p>
            </div>
            <ExternalLink className="link-icon" size={20} />
          </a>
        </motion.div>

        {/* --- Правая колонка: Крипта --- */}
        <motion.div 
          className="crypto-column"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-label">Криптовалюта</div>
          
          <div className="crypto-terminal">
            <div className="terminal-header">
              <Bitcoin size={18} /> Crypto_Wallet.exe
            </div>
            
            <div className="wallets-list">
              {WALLETS.map((wallet, index) => (
                <div key={index} className="wallet-item">
                  <div className="wallet-info">
                    <span className="wallet-name">{wallet.name}</span>
                    <span className="wallet-net">{wallet.network}</span>
                  </div>
                  
                  <div className="wallet-address-box" onClick={() => handleCopy(wallet.address, index)}>
                    <code className="address-text">
                      {wallet.address.slice(0, 10)}...{wallet.address.slice(-6)}
                    </code>
                    <button className="copy-btn">
                      <AnimatePresence mode='wait'>
                        {copiedIndex === index ? (
                          <motion.span 
                            key="check"
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                          >
                            <Check size={16} color="#4ade80" />
                          </motion.span>
                        ) : (
                          <motion.span 
                            key="copy"
                            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                          >
                            <Copy size={16} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="terminal-footer">
              <Wallet size={14} /> Спасибо за вашу поддержку!
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};