import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, ChevronLeft, ChevronRight, Monitor, 
  Zap, Shield, Trash2, Box
} from 'lucide-react';
import './MakuTweaker.css';

const TWEAKER_IMG = "https://i.pinimg.com/originals/b0/a2/f3/b0a2f310b8807d682cb3600522694474.jpg"; 
const SCREENSHOTS = [TWEAKER_IMG, TWEAKER_IMG];

export const MakuTweaker = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SCREENSHOTS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SCREENSHOTS.length - 1 : prev - 1));
  };

  return (
    <div className="tweaker-page">
      
      <section className="hero-section container">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="version-badge"
          >
            <span className="dot-pulse"></span> v5.0 Available Now
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Полный контроль над <br/><span className="text-gradient">Windows</span>
          </motion.h1>

          <motion.p 
            className="hero-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            MakuTweaker позволяет гибко настроить систему под себя. 
            Удаление "неудаляемого", твики реестра и ускорение работы в один клик.
          </motion.p>
        </div>

        <motion.div 
          className="app-window-wrapper"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="app-window">
            <div className="window-header">
              <div className="window-controls">
                <span className="w-btn close"></span>
                <span className="w-btn min"></span>
                <span className="w-btn max"></span>
              </div>
              <div className="window-title">MakuTweaker.exe</div>
            </div>
            <div className="window-content">
              <div className="slider-nav prev" onClick={prevSlide}><ChevronLeft /></div>
              <div className="slider-nav next" onClick={nextSlide}><ChevronRight /></div>
              
              <AnimatePresence mode='wait'>
                <motion.img 
                  key={currentSlide}
                  src={SCREENSHOTS[currentSlide]}
                  alt="Interface"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </div>
          </div>
          <div className="window-glow"></div>
        </motion.div>

        <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }} 
          >
            <button className="btn btn-primary btn-glow">
              <Download size={20} /> Скачать MakuTweaker
            </button>
            <button className="btn btn-secondary">
               Для Win 7/8.1
            </button>
        </motion.div>
      </section>

      <section className="features-container container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2>Что нового в <span className="text-accent">5.0</span>?</h2>
        </motion.div>

        <div className="bento-grid">
          <div className="bento-card large">
            <div className="card-icon"><Monitor size={32} /></div>
            <h3>Новый интерфейс</h3>
            <p>Полностью переработанный UI/UX. Теперь темная тема стала еще глубже, а навигация интуитивнее.</p>
          </div>
          <div className="bento-card">
            <div className="card-icon"><Zap size={32} /></div>
            <h3>Поддержка 24H2</h3>
            <p>Полная совместимость с последним обновлением Windows 11.</p>
          </div>
          <div className="bento-card">
            <div className="card-icon"><Trash2 size={32} /></div>
            <h3>Удаление UWP</h3>
            <p>Улучшенный алгоритм очистки встроенного мусора.</p>
          </div>
          <div className="bento-card">
             <div className="card-icon"><Shield size={32} /></div>
             <h3>Безопасность</h3>
             <p>Все твики можно откатить обратно через точку восстановления.</p>
          </div>
        </div>
      </section>

      <section className="specs-section container">
        <div className="specs-wrapper">
          <div className="specs-box">
            <h3><Box size={20}/> Системные требования</h3>
            <ul className="specs-list">
              <li>
                <span className="spec-label">ОС:</span> 
                <span className="spec-val">Windows 10 (1809+) или Windows 11</span>
              </li>
              <li>
                <span className="spec-label">Компоненты:</span> 
                <span className="spec-val">.NET Core 8.0 Runtime</span>
              </li>
              <li>
                <span className="spec-label">Права:</span> 
                <span className="spec-val">Запуск от имени администратора</span>
              </li>
            </ul>
          </div>

          <div className="history-box">
             <h3>История версий</h3>
             <div className="history-list">
                <div className="history-item">
                  <span className="ver">v4.3.0</span>
                  <span className="desc">Добавлено контекстное меню и фиксы .NET</span>
                </div>
                <div className="history-item">
                  <span className="ver">v4.2.0</span>
                  <span className="desc">Исправление ошибок очистки диска</span>
                </div>
                <div className="history-item">
                  <span className="ver">v4.1.0</span>
                  <span className="desc">Первая версия с поддержкой Win 11</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      <div className="spacer"></div>
    </div>
  );
};