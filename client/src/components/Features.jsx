import { Brain, Clock, Heart, Lock, MessageCircle, Shield } from 'lucide-react';
import './Features.css';

const features = [
    {
        icon: MessageCircle,
        title: 'Konsultasi 24/7',
        description: 'Akses konsultasi kesehatan mental kapan saja, di mana saja tanpa batasan waktu'
    },
    {
        icon: Brain,
        title: 'AI yang Empatik',
        description: 'Powered by Gemini AI yang dilatih untuk memahami dan memberikan dukungan emosional'
    },
    {
        icon: Lock,
        title: 'Privasi Terjamin',
        description: 'Semua percakapan Anda dijaga kerahasiaannya dengan enkripsi end-to-end'
    },
    {
        icon: Heart,
        title: 'Dukungan Profesional',
        description: 'Saran dan panduan berdasarkan praktik kesehatan mental yang teruji'
    },
    {
        icon: Shield,
        title: 'Aman & Terpercaya',
        description: 'Platform yang aman untuk berbagi keluh kesah dan mencari solusi'
    },
    {
        icon: Clock,
        title: 'Respon Instan',
        description: 'Dapatkan respons cepat tanpa perlu menunggu antrian yang panjang'
    }
];

export default function Features() {
    return (
        <section className="features section">
            <div className="container">
                <div className="features-header">
                    <h2 className="features-title">
                        Mengapa Memilih <span className="gradient-text">MindBloom</span>?
                    </h2>
                    <p className="features-subtitle">
                        Platform konsultasi kesehatan mental terlengkap dengan teknologi AI terkini
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="feature-card glass-card"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="feature-icon">
                                    <Icon size={28} />
                                </div>
                                <h3 className="feature-title">{feature.title}</h3>
                                <p className="feature-description">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
