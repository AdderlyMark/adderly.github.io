import { motion } from 'framer-motion';
import { Download, PlayCircle, ShieldBan, Network, Lock } from 'lucide-react';
import './MakuYan.css';

export const MakuYan = () => {
  return (
    <div className="makuyan-page">
      {/* Фоновый эффект (защитное поле) */}
      <div className="yan-bg-field"></div>

      <section className="yan-hero container">
        <div className="hero-content">
          
          <motion.div 
            className="yan-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ShieldBan size={16} /> Privacy Protection Tool
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Скачать запрещатор Яндекса — <span className="text-gradient">MakuYan</span>
          </motion.h1>
          
          <motion.p 
            className="yan-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            MakuYan — программа, которая заблокирует Яндекс, 
            Мессенджер Max и все их IP адреса на системном уровне!
          </motion.p>

          {/* Визуальный центральный элемент */}
          <motion.div 
            className="yan-visual-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          >
            <div className="shield-container">
              <ShieldBan className="main-shield-icon" size={120} strokeWidth={1} />
              {/* Декоративные элементы вокруг щита */}
              <motion.div 
                className="orbit-icon icon-net"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Network size={24} />
              </motion.div>
              <motion.div 
                className="orbit-icon icon-lock"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Lock size={24} />
              </motion.div>
            </div>
            <div className="visual-glow"></div>
          </motion.div>

          <motion.div 
            className="yan-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button className="btn btn-primary btn-lg glow-effect">
              <Download size={22} /> Скачать MakuYan
            </button>
            <a href="https://www.youtube.com/watch?v=97CMTnJL9p0" target="_blank" className="btn btn-outline btn-lg">
              <PlayCircle size={22} /> Обзор на программу
            </a>
          </motion.div>
          
          <motion.p 
            className="yan-disclaimer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Программа вносит изменения в файл hosts и правила брандмауэра. <br/>
            Для работы требуются права администратора.
          </motion.p>

        </div>
      </section>
    </div>
  );
};