import { Heart, Shield, Sparkles, Users } from 'lucide-react';
import './Hero.css';

export default function Hero({ onStartChat }) {
    return (
        <section className="hero">
            <div className="container">
                <div className="hero-content fade-in-up">
                    <div className="hero-badge">
                        <Sparkles size={16} />
                        <span>Powered by Teknokrat NeuroMind </span>
                    </div>

                    <h1 className="hero-title">
                        Jaga Kesehatan Mental Anda dengan
                        <span className="gradient-text"> MindBloom</span>
                    </h1>

                    <p className="hero-description">
                        Platform konsultasi kesehatan mental berbasis AI yang aman, terpercaya, dan mudah diakses.
                        Dapatkan dukungan emosional 24/7 kapan pun Anda membutuhkannya.
                    </p>

                    <div className="hero-cta">
                        <button className="btn btn-primary" onClick={onStartChat}>
                            <Heart size={20} />
                            Mulai Konsultasi Gratis
                        </button>
                        <button className="btn btn-secondary">
                            <Shield size={20} />
                            Pelajari Lebih Lanjut
                        </button>
                    </div>

                    <div className="hero-features">
                        <div className="hero-feature">
                            <Users size={20} />
                            <span>Untuk Umum & Mahasiswa</span>
                        </div>
                        <div className="hero-feature">
                            <Shield size={20} />
                            <span>100% Aman & Privat</span>
                        </div>
                        <div className="hero-feature">
                            <Sparkles size={20} />
                            <span>AI yang Empatik</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hero-graphic">
                <div className="floating-orb orb-1"></div>
                <div className="floating-orb orb-2"></div>
                <div className="floating-orb orb-3"></div>
            </div>
        </section>
    );
}
