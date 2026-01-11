import { motion } from 'framer-motion';
import { Disc, Download, Cloud, Info, ShieldCheck } from 'lucide-react';
import './ISO.css';

// Данные
const ISO_DATA = [
  {
    category: "Windows 11",
    items: [
      {
        title: "Windows 11 24H2",
        build: "26100.1742",
        edition: "RU - Все редакции",
        link: "#", // Вставь сюда реальную ссылку
        tag: "New"
      },
      {
        title: "Windows 11 22H2",
        build: "22621.1702",
        edition: "RU - Все редакции",
        link: "#",
        tag: "Stable"
      }
    ]
  },
  {
    category: "Windows 10",
    items: [
      {
        title: "Windows 10 22H2",
        build: "19045.2965",
        edition: "RU - Все редакции",
        link: "#",
        tag: "Recommended"
      },
      {
        title: "Windows 10 20H2",
        build: "19042.508",
        edition: "RU - Все редакции",
        link: "#",
        tag: "Old"
      }
    ]
  }
];

export const ISO = () => {
  return (
    <div className="iso-page container">
      
      <motion.div 
        className="iso-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Официальные <span className="text-gradient">ISO образы</span></h1>
        <p className="subtitle">
          Загружайте чистые образы Windows напрямую без обхода блокировок.
        </p>
      </motion.div>

      {/* Информационный блок */}
      <motion.div 
        className="info-box"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="info-icon">
          <Cloud size={28} />
        </div>
        <div className="info-content">
          <h3>Хостинг на Google Диске</h3>
          <p>
            Все образы были выгружены из источников Microsoft. 
            Старые версии Windows 10/11, которые официально удалены, были пересобраны заново.
            Скачивание происходит на максимальной скорости.
          </p>
        </div>
      </motion.div>

      {/* Сетка категорий */}
      <div className="iso-categories">
        {ISO_DATA.map((group, groupIndex) => (
          <motion.section 
            key={groupIndex}
            className="iso-group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + (groupIndex * 0.1) }}
          >
            <h2 className="group-title">
              <ShieldCheck size={24} className="group-icon"/> {group.category}
            </h2>
            
            <div className="iso-grid">
              {group.items.map((item, index) => (
                <div key={index} className="iso-card">
                  <div className="card-shine"></div>
                  
                  <div className="iso-icon-wrapper">
                    <Disc size={40} strokeWidth={1.5} />
                  </div>
                  
                  <div className="iso-details">
                    <h3>{item.title}</h3>
                    <div className="meta-row">
                      <span className="meta-badge build">Build {item.build}</span>
                      {item.tag && <span className={`meta-badge tag-${item.tag.toLowerCase()}`}>{item.tag}</span>}
                    </div>
                    <p className="edition-text">{item.edition}</p>
                  </div>

                  <button className="download-btn">
                    <Download size={20} /> Скачать
                  </button>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

    </div>
  );
};