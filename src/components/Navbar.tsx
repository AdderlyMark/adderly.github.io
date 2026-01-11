import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          ADDERLY<span className="dot">.</span>TOP
        </Link>

        {/* Десктопное меню */}
        <div className="desktop-menu">
          <Link to="/builds" className="nav-link">Сборки Windows</Link>
          <Link to="/makutweaker" className="nav-link">MakuTweaker</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
          
          {/* Обновили ссылку на внутреннюю страницу поддержки */}
          <Link to="/support" className="btn-small">
            Поддержать
          </Link>
        </div>

        {/* Мобильная кнопка */}
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Link to="/builds" onClick={() => setIsOpen(false)}>Сборки Windows</Link>
            <Link to="/makutweaker" onClick={() => setIsOpen(false)}>MakuTweaker</Link>
            <Link to="/faq" onClick={() => setIsOpen(false)}>FAQ</Link>
            <Link to="/support" onClick={() => setIsOpen(false)} style={{color: 'var(--accent-color)'}}>
              Поддержать автора
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};