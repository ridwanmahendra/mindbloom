import { Phone, AlertCircle, BookOpen, Heart, ExternalLink, Shield } from 'lucide-react';
import './Resources.css';

const CRISIS_HOTLINES = [
    {
        name: 'Kementerian Kesehatan RI',
        number: '119 ext. 8',
        description: 'Layanan konseling kesehatan mental gratis 24/7',
        available: '24/7'
    },
    {
        name: 'SEJIWA (Yayasan Semai Jiwa)',
        number: '119 ext. 8 atau 021-500-454',
        description: 'Konseling krisis dan dukungan emosional',
        available: 'Senin - Jumat, 09:00 - 17:00'
    },
    {
        name: 'Into The Light Indonesia',
        number: '021-788-42580',
        description: 'Pencegahan bunuh diri dan dukungan mental health',
        available: '24/7'
    },
    {
        name: 'LSM Jangan Bunuh Diri',
        number: '021-9696 9293 / 0812-8989-2000',
        description: 'Konseling pencegahan bunuh diri',
        available: '24/7'
    }
];

const HELPFUL_ARTICLES = [
    {
        title: '5 Tanda Anda Perlu Berbicara dengan Profesional',
        description: 'Kenali kapan saatnya mencari bantuan dari psikolog atau psikiater',
        icon: AlertCircle
    },
    {
        title: 'Cara Mengatasi Stres Akademik',
        description: 'Tips praktis untuk mahasiswa dalam menghadapi tekanan kuliah',
        icon: BookOpen
    },
    {
        title: 'Self-Care untuk Kesehatan Mental',
        description: 'Kebiasaan sehari-hari yang bisa meningkatkan well-being Anda',
        icon: Heart
    },
    {
        title: 'Mengenali Gejala Depresi dan Anxiety',
        description: 'Perbedaan antara kesedihan normal dan kondisi yang memerlukan bantuan',
        icon: Shield
    }
];

const WHEN_TO_SEEK_HELP = [
    'Perasaan sedih, cemas, atau putus asa yang berlangsung lebih dari 2 minggu',
    'Kesulitan melakukan aktivitas sehari-hari',
    'Perubahan drastis dalam pola tidur atau makan',
    'Menarik diri dari teman dan keluarga',
    'Pikiran untuk menyakiti diri sendiri atau orang lain',
    'Penggunaan alkohol atau obat-obatan yang berlebihan',
    'Perubahan suasana hati yang ekstrem',
    'Kesulitan konsentrasi atau membuat keputusan'
];

export default function Resources() {
    return (
        <section className="resources section">
            <div className="container">
                <div className="resources-header">
                    <h1 className="resources-title">
                        <BookOpen className="title-icon" />
                        Sumber Daya & Dukungan
                    </h1>
                    <p className="resources-subtitle">
                        Informasi penting tentang kesehatan mental dan cara mendapatkan bantuan profesional
                    </p>
                </div>

                {/* Crisis Alert */}
                <div className="crisis-alert glass-card">
                    <div className="alert-icon">
                        <AlertCircle size={32} />
                    </div>
                    <div className="alert-content">
                        <h2>Dalam Keadaan Darurat?</h2>
                        <p>
                            Jika Anda atau seseorang yang Anda kenal memiliki <strong>pikiran untuk bunuh diri</strong> atau
                            dalam <strong>bahaya langsung</strong>, hubungi nomor darurat atau pergi ke UGD terdekat segera.
                        </p>
                    </div>
                </div>

                {/* Crisis Hotlines */}
                <div className="section-block">
                    <h2 className="block-title">
                        <Phone size={24} />
                        Layanan Bantuan Darurat
                    </h2>
                    <p className="block-description">
                        Hubungi hotline berikut jika Anda membutuhkan bantuan segera. Semua layanan bersifat rahasia.
                    </p>

                    <div className="hotlines-grid">
                        {CRISIS_HOTLINES.map((hotline, index) => (
                            <div key={index} className="hotline-card glass-card">
                                <div className="hotline-header">
                                    <Phone className="hotline-icon" />
                                    <div>
                                        <h3 className="hotline-name">{hotline.name}</h3>
                                        <div className="hotline-available">{hotline.available}</div>
                                    </div>
                                </div>
                                <div className="hotline-number">{hotline.number}</div>
                                <p className="hotline-description">{hotline.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* When to Seek Help */}
                <div className="section-block">
                    <h2 className="block-title">
                        <Shield size={24} />
                        Kapan Harus Mencari Bantuan Profesional?
                    </h2>
                    <p className="block-description">
                        Pertimbangkan untuk berkonsultasi dengan psikolog atau psikiater jika Anda mengalami:
                    </p>

                    <div className="help-signs glass-card">
                        <ul className="signs-list">
                            {WHEN_TO_SEEK_HELP.map((sign, index) => (
                                <li key={index}>
                                    <span className="sign-bullet">•</span>
                                    {sign}
                                </li>
                            ))}
                        </ul>
                        <div className="help-note">
                            <AlertCircle size={20} />
                            <p>
                                <strong>Ingat:</strong> Mencari bantuan adalah tanda kekuatan, bukan kelemahan.
                                Kesehatan mental sama pentingnya dengan kesehatan fisik.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Helpful Articles */}
                <div className="section-block">
                    <h2 className="block-title">
                        <BookOpen size={24} />
                        Artikel & Panduan
                    </h2>

                    <div className="articles-grid">
                        {HELPFUL_ARTICLES.map((article, index) => {
                            const Icon = article.icon;
                            return (
                                <div key={index} className="article-card glass-card">
                                    <div className="article-icon">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="article-title">{article.title}</h3>
                                    <p className="article-description">{article.description}</p>
                                    <button className="read-more-btn">
                                        Baca Selengkapnya
                                        <ExternalLink size={16} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Self-Care Tips */}
                <div className="section-block">
                    <h2 className="block-title">
                        <Heart size={24} />
                        Tips Self-Care Harian
                    </h2>

                    <div className="self-care-tips glass-card">
                        <div className="tips-grid">
                            <div className="tip-item">
                                <h4>🌟 Tidur Cukup</h4>
                                <p>7-9 jam per malam untuk orang dewasa</p>
                            </div>
                            <div className="tip-item">
                                <h4>🏃 Olahraga Teratur</h4>
                                <p>Minimal 30 menit, 3-5 kali seminggu</p>
                            </div>
                            <div className="tip-item">
                                <h4>🥗 Makan Bergizi</h4>
                                <p>Pola makan seimbang dan teratur</p>
                            </div>
                            <div className="tip-item">
                                <h4>🧘 Praktik Mindfulness</h4>
                                <p>Meditasi atau breathing exercises</p>
                            </div>
                            <div className="tip-item">
                                <h4>👥 Koneksi Sosial</h4>
                                <p>Habiskan waktu dengan orang tersayang</p>
                            </div>
                            <div className="tip-item">
                                <h4>🎨 Hobi & Kreativitas</h4>
                                <p>Lakukan aktivitas yang Anda nikmati</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
