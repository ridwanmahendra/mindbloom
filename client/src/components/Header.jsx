import { Sparkles } from 'lucide-react';
import './Header.css';

export default function Header({ currentPage, onNavigate }) {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <div className="logo">
                        <Sparkles className="logo-icon" />
                        <span className="logo-text">Mind<span className="gradient-text">Bloom</span></span>
                    </div>

                    <nav className="nav">
                        <button
                            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                            onClick={() => onNavigate('home')}
                        >
                            Beranda
                        </button>
                        <button
                            className={`nav-link ${currentPage === 'chat' ? 'active' : ''}`}
                            onClick={() => onNavigate('chat')}
                        >
                            Konsultasi
                        </button>
                        <button
                            className={`nav-link ${currentPage === 'mood' ? 'active' : ''}`}
                            onClick={() => onNavigate('mood')}
                        >
                            Mood Tracker
                        </button>
                        <button
                            className={`nav-link ${currentPage === 'resources' ? 'active' : ''}`}
                            onClick={() => onNavigate('resources')}
                        >
                            Sumber Daya
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
