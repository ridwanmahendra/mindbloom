import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ChatInterface from './components/ChatInterface';
import MoodTracker from './components/MoodTracker';
import Resources from './components/Resources';

function App() {
    const [currentPage, setCurrentPage] = useState('home');

    const handleNavigate = (page) => {
        setCurrentPage(page);
    };

    const handleStartChat = () => {
        setCurrentPage('chat');
    };

    return (
        <div className="app">
            <div className="animated-bg"></div>

            <Header currentPage={currentPage} onNavigate={handleNavigate} />

            <main>
                {currentPage === 'home' ? (
                    <>
                        <Hero onStartChat={handleStartChat} />
                        <Features />
                    </>
                ) : currentPage === 'chat' ? (
                    <ChatInterface />
                ) : currentPage === 'mood' ? (
                    <MoodTracker />
                ) : currentPage === 'resources' ? (
                    <Resources />
                ) : null}
            </main>

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2025 MindBloom. Platform konsultasi kesehatan mental berbasis AI. - Powered by Teknokrat NeuroMind - Universitas Teknokrat Indonesia </p>
                    <p className="footer-note">
                        Untuk kasus darurat atau pikiran bunuh diri, segera hubungi layanan kesehatan mental profesional.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
