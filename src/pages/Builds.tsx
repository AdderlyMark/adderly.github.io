import { motion } from 'framer-motion';
import { Download, Info, Server, ShieldAlert, Zap } from 'lucide-react';
import './Builds.css';

const PLACEHOLDER_IMG = "https://i.pinimg.com/736x/b1/c0/16/b1c016b25d6fc1f264eb93e489a59173.jpg";

// Типы данных
type Build = {
  title: string;
  version: string;
  desc: string;
  tags?: string[]; // "New", "Lite", "Pro" и т.д.
  notes?: string;
};

type Section = {
  id: string;
  title: string;
  subtitle?: string;
  builds: Build[];
};

// --- ДАННЫЕ СБОРОК ---
const BUILD_SECTIONS: Section[] = [
  {
    id: 'pro',
    title: 'Основные сборки на Pro редакции',
    builds: [
      {
        title: 'MakuOS 11 Pro 24H2',
        version: 'Windows 11 24H2 (26100.7015)',
        desc: 'Сборка со всеми обновлениями и оптимизацией на основе почти самой последней версии Windows 11 – 24H2.',
        notes: 'Подойдёт для современных ПК.',
        tags: ['New', 'Pro']
      },
      {
        title: 'MakuOS 10 Pro 22H2',
        version: 'Windows 10 22H2 (19045.6456)',
        desc: 'Сборка со всеми обновлениями и оптимизацией на основе самой последней версии Windows 10. Тем, кому не нравится Windows 11.',
        notes: 'Подойдёт для современных ПК.',
        tags: ['New', 'Pro']
      }
    ]
  },
  {
    id: 'lite',
    title: 'Mini и Lite сборки для слабых ПК',
    subtitle: 'Максимальная производительность, вырезанный Defender и мусор.',
    builds: [
      {
        title: 'MakuOS 11 Lite 22H2 V2',
        version: 'Windows 11 22H2 (22621.1702)',
        desc: 'Основа: Win 11 с обновлениями по лето 2023. Без Windows Defender, центра обновлений и мусора.',
        notes: 'Не для современных игр. Для тех, кто хочет попробовать Win 11 на слабом ПК.',
        tags: ['Lite']
      },
      {
        title: 'MakuOS 10 Mini 22H2 V2',
        version: 'Windows 10 22H2 (19045.6456)',
        desc: 'Mini сборка на основе актуальной Win 10 со всеми обновлениями. Без Defender и UWP.',
        notes: 'Для игр возможно подойдёт, и точно даст жизнь старому ПК.',
        tags: ['New', 'Mini']
      },
      {
        title: 'MakuOS 10 Lite 1809',
        version: 'Windows 10 1809 (17763.6414)',
        desc: 'Основа: Win 10 1809 с обновлениями по 2024 год. Без Defender и обновлений.',
        notes: 'Идеально для очень слабых ПК или MacBook Intel. Не для современных новинок.',
        tags: ['Lite', 'Old Kernel']
      }
    ]
  },
  {
    id: 'ltsc',
    title: 'Сборки на основе LTSC редакции',
    builds: [
      {
        title: 'MakuOS 11 24H2 LTSC',
        version: 'Windows 11 24H2 (26100.1742)',
        desc: 'Оптимизация на основе Enterprise LTSC. Стабильность и минимум лишнего.',
        notes: 'Для любителей самого нового софта. На старые ПК лучше ставить 22H2.',
        tags: ['LTSC']
      },
      {
        title: 'MakuOS 10 21H2 LTSC',
        version: 'Windows 10 21H2 (19044.1288)',
        desc: 'Основа: Win 10 LTSC. Классика стабильности.',
        notes: 'Отличный вариант самой актуальной системы для работы.',
        tags: ['LTSC']
      }
    ]
  },
  {
    id: 'old',
    title: 'Старые Windows',
    subtitle: 'Для ностальгии или специфического железа.',
    builds: [
      {
        title: 'MakuOS 8.1',
        version: 'Windows 8.1 (Upd. 2023)',
        desc: 'Сборка на основе Windows 8.1 со всеми обновлениями по 2023 год.',
        tags: ['Legacy']
      },
      {
        title: 'MakuOS 7',
        version: 'Windows 7 (Upd. 2020)',
        desc: 'Сборка на основе Windows 7 со всеми обновлениями по 2020 год.',
        tags: ['Legacy']
      }
    ]
  }
];

export const Builds = () => {
  return (
    <div className="builds-page container">
      <motion.div 
        className="builds-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Сборки от <span className="brand-text">Аддерли</span></h1>
        <p>Лучшие сборки Windows — без мусора, рекламы и Яндексов.</p>
      </motion.div>

      <div className="sections-wrapper">
        {BUILD_SECTIONS.map((section, sIndex) => (
          <motion.section 
            key={section.id} 
            className="build-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: sIndex * 0.1 }}
          >
            <div className="section-title-block">
              <h2>{section.title}</h2>
              {section.subtitle && <span className="section-subtitle">{section.subtitle}</span>}
            </div>

            <div className="builds-grid">
              {section.builds.map((build, bIndex) => (
                <BuildCard key={bIndex} build={build} />
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

const BuildCard = ({ build }: { build: Build }) => (
  <motion.div 
    className="build-card"
    whileHover={{ y: -5 }}
  >
    <div className="card-image">
      <img src={PLACEHOLDER_IMG} alt={build.title} />
      <div className="card-badges">
        {build.tags?.includes('New') && <span className="badge-new">Новинка!</span>}
        {build.tags?.includes('Lite') && <span className="badge-tag tag-lite">Lite</span>}
        {build.tags?.includes('Pro') && <span className="badge-tag tag-pro">Pro</span>}
        {build.tags?.includes('LTSC') && <span className="badge-tag tag-ltsc">LTSC</span>}
      </div>
      <div className="image-overlay"></div>
    </div>
    
    <div className="card-body">
      <div className="build-header">
        <h3>{build.title}</h3>
        <code className="version-code">{build.version}</code>
      </div>
      
      <p className="build-desc">{build.desc}</p>
      
      {build.notes && (
        <div className="build-note">
          <Info size={16} />
          <span>{build.notes}</span>
        </div>
      )}

      <div className="card-footer">
        <button className="btn btn-full">
          <Download size={18} /> Скачать
        </button>
      </div>
    </div>
  </motion.div>
);