import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, AlertTriangle, HelpCircle, UserCheck } from 'lucide-react';
import './FAQ.css';

// Типы данных
type FAQItem = {
  id: string;
  question: string;
  answer: string | string[]; // Может быть строкой или списком шагов
  type: 'text' | 'list'; // Тип отображения
};

// --- ДАННЫЕ (Контент из твоего сообщения) ---
const GENERAL_FAQ: FAQItem[] = [
  {
    id: 'g1',
    question: 'Ошибка Rufus: "Выбранный образ ISO содержит отозванный загрузчик UEFI"',
    type: 'text',
    answer: `Такое сообщение высвечивается абсолютно во всех образах Windows начиная с версий позже 2024 года. Решить просто, достаточно нажать "ОК". Просто Rufus предупреждает Вас о возможной ошибке 0xc0000428 (в которой говориться о том, что цифровую подпись проверить не удаётся) при включенном Secure Boot в BIOS. Такая ошибка на практике встречается очень редко, но имейте ввиду: если всё же встретитесь с ней, либо отключите Secure Boot, либо в параметрах загрузки отключите обязательную проверку подписи драйверов.`
  },
  {
    id: 'g2',
    question: 'При установке Windows просят загрузить драйвер для диска',
    type: 'text',
    answer: `Вам следует зайти на сайт производителя вашего диска/ноутбука и загрузить драйверы (обычно IRST или Storage Driver). На установочной флешке создайте папку "Drivers" и распакуйте туда скачанное. В окне ошибки укажите путь к этой папке. Также помогает обновление BIOS или перестановка флешки из порта USB 3.0 в 2.0.`
  },
  {
    id: 'g3',
    question: 'В меню выбора дисков пишет: "Не удалось создать новый или найти существующий раздел"',
    type: 'text',
    answer: `Удалите раздел, на который вы устанавливаете систему, чтобы он стал "Незанятым пространством" (Unallocated). Если не помогает — проверьте драйвера диска или режим работы контроллера (AHCI/RAID) в BIOS.`
  },
  {
    id: 'g4',
    question: 'После установки Windows мне снова предлагают его установить',
    type: 'text',
    answer: `Вы просто загрузились снова с флешки. Выньте флешку из USB-порта и перезагрузите компьютер.`
  },
  {
    id: 'g5',
    question: 'Сместилась звёздочка под пунктом "GPT" в diskpart',
    type: 'text',
    answer: `Если вы обнаружили звёздочку напротив одного из дисков — это GPT. Из-за особенностей локализации консоли Windows символы могут смещаться. Если звёздочки нет вообще — диск MBR.`
  },
  {
    id: 'g6',
    question: 'Windows на экране блокировки просит пароль, которого нет',
    type: 'text',
    answer: `Просто нажмите "Enter" (оставьте поле пустым). Если хотите установить свой пароль, оставьте поле "старый пароль" пустым.`
  },
  {
    id: 'g7',
    question: 'Можно ли вернуть Microsoft Store?',
    type: 'text',
    answer: `Зависит от сборки. В Lite-версиях без магазина вернуть его корректно обычно нельзя. Если он вам нужен — скачивайте Full/Pro версию с магазином изначально.`
  },
  {
    id: 'g8',
    question: 'Какую версию Windows мне скачать?',
    type: 'text',
    answer: `ПК до 2013 года? Ставьте Windows 10. \nПроцессор 2014-2017 (Intel 4-7 gen)? Попробуйте Windows 11 Lite. \nСовременное мощное железо? Ставьте Windows 11 24H2 Pro. Lite-версии на мощных ПК прироста не дадут.`
  }
];

const ERROR_FAQ: FAQItem[] = [
  {
    id: 'e1',
    question: 'Ошибка на 69-71% (Код: 0xC0000005)',
    type: 'list',
    answer: [
      'Попробуйте начать установку заново.',
      'Вставьте USB-флешку в порт USB 2.0 (черный), а не 3.0 (синий).',
      'Отключите Secure Boot в BIOS.',
      'Попробуйте включить режим CSM (Legacy) в BIOS.',
      'Не используйте Ventoy. Запишите образ через Rufus.'
    ]
  },
  {
    id: 'e2',
    question: 'Ошибка 0x80070003',
    type: 'list',
    answer: [
      'Проверьте флешку, она может быть неисправна.',
      'Отключите Secure Boot.',
      'Включите CSM/Legacy Mode в BIOS.',
      'Перезапишите флешку через Rufus (без Ventoy).'
    ]
  },
  {
    id: 'e3',
    question: 'Ошибка 0x8007025D',
    type: 'list',
    answer: [
      'Проблема часто в оперативной памяти (RAM). Проверьте планки.',
      'Отключите всю лишнюю периферию (флешки, принтеры) во время установки.',
      'При записи Rufus выберите "Медленное форматирование" (проверка на бэды).',
      'Смените флешку.'
    ]
  },
  {
    id: 'e4',
    question: 'Ошибка при загрузке 0хС0000225 (winload.efi)',
    type: 'list',
    answer: [
      'Сбросьте BIOS (выньте батарейку на 30 сек).',
      'Обновите BIOS.',
      'Восстановление загрузчика через CMD: diskpart -> list vol (найти FAT32 раздел) -> bcdboot C:\\windows.',
      'SFC Scan: sfc /scannow /offbootdir=C:\\ /offwindir=C:\\Windows',
      'Полное пересоздание загрузчика через bcdboot с присвоением буквы разделу EFI.'
    ]
  }
];

// --- КОМПОНЕНТ АККОРДЕОНА ---
const AccordionItem = ({ item, isOpen, onClick }: { item: FAQItem, isOpen: boolean, onClick: () => void }) => {
  return (
    <motion.div 
      className={`accordion-item ${isOpen ? 'open' : ''}`}
      initial={false}
    >
      <button className="accordion-trigger" onClick={onClick}>
        <span className="question-text">{item.question}</span>
        <span className="icon-box">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="accordion-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="content-inner">
              {item.type === 'list' ? (
                <ul>
                  {(item.answer as string[]).map((step, idx) => (
                    <li key={idx}><span className="step-num">{idx + 1}.</span> {step}</li>
                  ))}
                </ul>
              ) : (
                <p>{item.answer as string}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- ГЛАВНАЯ СТРАНИЦА ---
export const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="faq-page container">
      <motion.div 
        className="faq-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Центр поддержки</h1>
        <p>Ответы на частые вопросы и решения ошибок установки</p>
      </motion.div>

      <div className="faq-grid">
        {/* Секция 1: Общие вопросы */}
        <section className="faq-section">
          <div className="section-title">
            <HelpCircle className="section-icon" /> Общие вопросы
          </div>
          <div className="accordion-group">
            {GENERAL_FAQ.map(item => (
              <AccordionItem 
                key={item.id} 
                item={item} 
                isOpen={openId === item.id}
                onClick={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </section>

        {/* Секция 2: Ошибки */}
        <section className="faq-section">
          <div className="section-title text-error">
            <AlertTriangle className="section-icon" /> Ошибки Windows
          </div>
          <div className="accordion-group">
            {ERROR_FAQ.map(item => (
              <AccordionItem 
                key={item.id} 
                item={item} 
                isOpen={openId === item.id}
                onClick={() => toggleItem(item.id)}
              />
            ))}
          </div>
        </section>
      </div>

      <motion.div 
        className="credits"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <UserCheck size={16} />
        <span>Спасибо <b>MegicalAmongus</b> за помощь с составлением FAQ!</span>
      </motion.div>
    </div>
  );
};