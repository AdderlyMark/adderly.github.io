import { motion, type Variants } from 'framer-motion';
import { 
  Disc, Download, Activity, Usb, HelpCircle, 
  FileQuestion, ShieldBan, Send, Heart, Box, PlayCircle, ChevronRight 
} from 'lucide-react';
import './Home.css';

const NAV_ITEMS = [
  { title: "Сборки от Аддерли", icon: <Box size={24}/>, link: "/builds", accent: false },
  { title: "Официальные ISO Windows", icon: <Disc size={24}/>, link: "/iso", accent: false },
  { title: "Скачать MakuTweaker", icon: <Download size={24}/>, link: "/makutweaker", accent: true },
  { title: "MakuTweaker Benchmark", icon: <Activity size={24}/>, link: "/benchmark", accent: false },
  { title: "Windows PE от Аддерли", icon: <Usb size={24}/>, link: "/winpe", accent: false },
  { title: "Как переустановить Windows?", icon: <HelpCircle size={24}/>, link: "/guide", accent: false },
  { title: "Часто задаваемые вопросы", icon: <FileQuestion size={24}/>, link: "/faq", accent: false },
  { title: "Запрещатор Яндекса", icon: <ShieldBan size={24}/>, link: "/yandex-ban", accent: false },
  { title: "Telegram канал", icon: <Send size={24}/>, link: "https://t.me/adderly324", accent: false },
  { title: "Поддержать на Boosty", icon: <Heart size={24}/>, link: "/support", accent: true },
];

// Очень плавная анимация появления
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.08, 
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" } // Без пружины, просто плавно
  }
};

export const Home = () => {
  return (
    <div className="home-page container">
      
      {/* Header */}
      <motion.div 
        className="header-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="status-pill">
           <span className="dot-pulse"></span> Official Site
        </div>
        <h1>Добро пожаловать на <span className="brand-text">Adderly.Top</span>!</h1>
        <p className="subtitle">
          Сайт Марка Аддерли — техноблогера на YouTube.<br/>
          Сборки Windows, софт и оптимизация.
        </p>

        {/* Оранжевый блок AdBlock (разрешено) */}
        <div className="adblock-notice">
          <div className="notice-icon">!</div>
          <p>
            На сайте есть реклама. Если вы выключите AdBlock и кликнете по баннеру, 
            вы поможете мне продолжать деятельность!
          </p>
        </div>
      </motion.div>

      {/* Video */}
      <motion.div 
        className="video-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <div className="video-label">
          <PlayCircle size={18} /> Самое актуальное видео
        </div>
        <div className="video-wrapper">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/DcA9EwB-WCQ" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
      </motion.div>

      {/* Grid Buttons */}
      <motion.div 
        className="nav-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {NAV_ITEMS.map((item, index) => (
          <motion.a 
            key={index} 
            href={item.link} 
            className={`nav-card ${item.accent ? 'card-accent' : ''}`}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-icon-box">{item.icon}</div>
            <span className="card-title">{item.title}</span>
            <ChevronRight className="card-arrow" size={20} />
            <div className="card-shine"></div>
          </motion.a>
        ))}
      </motion.div>

    </div>
  );
};