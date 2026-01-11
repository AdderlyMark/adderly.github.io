import { Youtube, Send, Zap } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="mini-footer">
      <div className="container footer-content">
        
        <div className="footer-copyright">
          <span>© 2025 Adderly.Top // Марк Аддерли</span>
        </div>

        <div className="footer-socials">
          <a 
            href="https://t.me/adderly324" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link telegram"
            title="Telegram"
          >
            <Send size={18} />
          </a>
          
          <a 
            href="https://www.youtube.com/@MakuAdarii" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link youtube"
            title="YouTube"
          >
            <Youtube size={18} />
          </a>

          <a 
            href="https://boosty.to/adderly" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link boosty"
            title="Boosty"
          >
            <Zap size={18} fill="currentColor" />
          </a>
        </div>

      </div>
    </footer>
  );
};