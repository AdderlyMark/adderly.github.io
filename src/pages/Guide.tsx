import { motion } from 'framer-motion';
import { PlayCircle, AlertTriangle, FileText, CheckCircle2, Cpu } from 'lucide-react';
import './Guide.css';

export const Guide = () => {
  return (
    <div className="guide-page container">
      
      {/* Header */}
      <motion.div 
        className="guide-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Как переустановить <span className="text-gradient">Windows</span>?</h1>
        <p className="subtitle">
          Самый простой способ переустановки без флешки и потери данных.
        </p>
      </motion.div>

      {/* Video */}
      <motion.div 
        className="video-showcase"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="video-frame">
          <iframe 
            src="https://www.youtube.com/embed/nBvSLOUS03Y" 
            title="Как переустановить Windows БЕЗ ФЛЕШКИ" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-caption">
          <PlayCircle size={20} />
          <span>Официальный гайд от Марка Аддерли</span>
        </div>
      </motion.div>

      {/* Content Container */}
      <div className="guide-content-wrapper">
        
        {/* Steps Block */}
        <motion.div 
          className="content-block steps-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="block-header">
            <div className="icon-box purple">
              <FileText size={24} />
            </div>
            <h2>Кратко о методе</h2>
          </div>
          
          <p className="block-desc">
            Этот метод позволяет переустановить систему прямо из-под рабочей Windows, 
            используя только ISO образ. Ваши файлы сохранятся в папке <code>Windows.old</code>.
          </p>
          
          <div className="steps-list">
            <div className="step-item">
              <div className="step-number">1</div>
              <p>Скачайте ISO образ Windows (можно с <a href="/iso">нашего сайта</a>).</p>
            </div>
            <div className="step-item">
              <div className="step-number">2</div>
              <p>Дважды кликните по скачанному ISO файлу, чтобы его "смонтировать" как виртуальный диск.</p>
            </div>
            <div className="step-item">
              <div className="step-number">3</div>
              <p>Зайдите на этот диск, запустите файл <b>setup.exe</b> и следуйте инструкциям установщика.</p>
            </div>
          </div>
        </motion.div>

        {/* Warning Block */}
        <motion.div 
          className="content-block warning-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="block-header">
            <div className="icon-box yellow">
              <AlertTriangle size={24} />
            </div>
            <h3>Важно для Windows 11</h3>
          </div>
          
          <p className="block-desc">
            Если ваш ПК официально не поддерживается (старый процессор или нет TPM 2.0), 
            стандартный установщик выдаст ошибку. Нужно применить обход через реестр.
          </p>
          
          <div className="reg-hint">
            <Cpu size={20} className="hint-icon" />
            <div className="hint-text">
              <p>На этапе установки нажмите <b>Shift + F10</b>, введите <code>regedit</code>.</p>
              <p>В пути <code>HKLM\SYSTEM\Setup</code> создайте раздел <code>LabConfig</code>.</p>
              <p>В нём создайте параметры DWORD (32-bit): <code>BypassTPMCheck=1</code> и <code>BypassSecureBootCheck=1</code>.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};