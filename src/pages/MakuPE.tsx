import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Usb, Wifi, Globe, HardDrive, Download, 
  ChevronRight, Disc, Layers, Monitor, Command, 
  CheckCircle2, AlertTriangle, Power
} from 'lucide-react';
import './MakuPE.css';

// Список приложений
const APPS_LIST = [
  "Google Chrome", "Telegram", "7-Zip", "AnyDesk", "Recuva", 
  "EasyBCD", "WinNTSetup", "CPU-Z", "GPU-Z", "CrystalDiskInfo", 
  "Unlocker", "Victoria", "Everything", "System Informer", 
  "Speccy", "Explorer++", "Bootice", "Q-Dir", "HDD Low Level", 
  "Notepad++", "Mini Tool Partition Wizard", "Hex Editor"
];

// Ссылки на скачивание
const DOWNLOAD_LINKS = [
  { name: "Скачать с MediaFire", url: "#", icon: <Download size={20}/>, primary: true },
  { name: "Скачать с Telegram", url: "#", icon: <Command size={20}/>, primary: false },
  { name: "Скачать с Google Диска", url: "#", icon: <HardDrive size={20}/>, primary: false },
];

export const MakuPE = () => {
  const [installMethod, setInstallMethod] = useState<'rufus' | 'ventoy'>('rufus');

  return (
    <div className="makupe-page">
      
      {/* --- Hero Section --- */}
      <section className="pe-hero container">
        <div className="pe-hero-content">
          <motion.div 
            className="pe-badge"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Usb size={16} /> Portable OS
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            MakuPE <span className="text-gradient">2024</span>
          </motion.h1>
          
          <motion.p 
            className="pe-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Windows Preinstallation Environment на базе Windows 10 1809 x64.<br/>
            Ваша скорая помощь для компьютера на одной флешке.
          </motion.p>

          <motion.div 
            className="pe-specs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
             <div className="spec-item"><Disc size={18}/> <span>ISO Образ</span></div>
             <div className="spec-item"><Layers size={18}/> <span>GPT & UEFI</span></div>
             <div className="spec-item"><HardDrive size={18}/> <span>&lt; 2 GB</span></div>
          </motion.div>
        </div>
      </section>

      {/* --- Features Grid --- */}
      <section className="pe-features container">
        <div className="feature-grid">
          <div className="f-card">
            <Wifi className="f-icon" />
            <h3>Интернет из коробки</h3>
            <p>Встроенные драйвера позволяют выйти в сеть через Ungoogled Chromium и даже зайти в Telegram.</p>
          </div>
          <div className="f-card">
            <Monitor className="f-icon" />
            <h3>Удаленная помощь</h3>
            <p>Встроенный AnyDesk: дайте доступ к ПК другу или мастеру для восстановления системы.</p>
          </div>
          <div className="f-card">
            <Layers className="f-icon" />
            <h3>Легкость</h3>
            <p>Основан на Windows 10 1809. Образ весит меньше 2 ГБ и поместится на любую флешку.</p>
          </div>
        </div>
      </section>

      {/* --- Apps Cloud --- */}
      <section className="pe-apps container">
        <h2><Command className="section-icon"/> Набор инструментов</h2>
        <p className="section-desc">Все необходимое для диагностики и реанимации ПК</p>
        
        <div className="apps-cloud">
          {APPS_LIST.map((app, i) => (
            <motion.span 
              key={i} 
              className="app-tag"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              viewport={{ once: true }}
            >
              {app}
            </motion.span>
          ))}
        </div>
      </section>

      {/* --- Installation Guide (Tabs) --- */}
      <section className="pe-guide container">
        <h2>Как записать на флешку?</h2>
        
        <div className="guide-switcher">
          <button 
            className={`switcher-btn ${installMethod === 'rufus' ? 'active' : ''}`}
            onClick={() => setInstallMethod('rufus')}
          >
            Способ 1: Rufus (Рекомендуем)
          </button>
          <button 
            className={`switcher-btn ${installMethod === 'ventoy' ? 'active' : ''}`}
            onClick={() => setInstallMethod('ventoy')}
          >
            Способ 2: Ventoy
          </button>
        </div>

        <div className="guide-content">
          <AnimatePresence mode='wait'>
            {installMethod === 'rufus' ? (
              <motion.div 
                key="rufus"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="guide-step-list"
              >
                <div className="step">
                  <span className="step-num">1</span>
                  <p>Скачайте <a href="https://rufus.ie" target="_blank">Rufus</a> и запустите.</p>
                </div>
                <div className="step">
                  <span className="step-num">2</span>
                  <p>Выберите флешку (8 ГБ+) в пункте "Устройство".</p>
                </div>
                <div className="step">
                  <span className="step-num">3</span>
                  <p>Нажмите "Выбрать" и укажите <b>ISO образ MakuPE</b>.</p>
                </div>
                <div className="step">
                  <span className="step-num">4</span>
                  <p>В "Схеме раздела" укажите тип вашего диска (GPT/MBR). Остальные настройки не трогайте.</p>
                </div>
                <div className="step">
                  <span className="step-num">5</span>
                  <p>Нажмите <b>СТАРТ</b>. Согласитесь на форматирование. Ждите "Готов".</p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="ventoy"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="guide-step-list"
              >
                <div className="step">
                  <span className="step-num">1</span>
                  <p>Скачайте <a href="https://ventoy.net" target="_blank">Ventoy</a> и запустите <b>Ventoy2Disk.exe</b>.</p>
                </div>
                <div className="step">
                  <span className="step-num">2</span>
                  <p>Выберите флешку. В меню "Настройки" включите <b>Secure Boot Support</b> (если нужен).</p>
                </div>
                <div className="step">
                  <span className="step-num">3</span>
                  <p>Нажмите "Установить". Флешка будет отформатирована.</p>
                </div>
                <div className="step">
                  <span className="step-num">4</span>
                  <p>После установки просто <b>скопируйте ISO файл</b> на флешку как обычный файл.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="boot-info">
          <div className="boot-icon"><Power size={24}/></div>
          <div className="boot-text">
            <h3>Как запустить?</h3>
            <p>
              Перезагрузитесь с флешки. В Windows: откройте Пуск → Зажмите <b>Shift</b> → Нажмите "Перезагрузка". 
              В меню выберите "Использовать устройство" → USB.
            </p>
          </div>
        </div>
      </section>

      {/* --- Download Section --- */}
      <section className="pe-download container">
        <h2>Скачать MakuPE</h2>
        <div className="download-grid">
          {DOWNLOAD_LINKS.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              className={`dl-btn ${link.primary ? 'primary' : ''}`}
            >
              <div className="dl-icon">{link.icon}</div>
              <span>{link.name}</span>
              {link.primary && <ChevronRight className="dl-arrow" />}
            </a>
          ))}
        </div>
      </section>

    </div>
  );
};