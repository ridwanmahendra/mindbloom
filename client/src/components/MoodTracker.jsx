import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Trash2, Plus } from 'lucide-react';
import { saveMoodEntry, getMoodEntries, deleteMoodEntry, generateMoodId, getMoodStats } from '../utils/storage';
import { MOOD_TYPES, MOOD_KEYS, getMoodEmoji, getMoodLabel, getMoodColor, formatDate, getRatingLabel } from '../utils/constants';
import MoodChart from './MoodChart';
import './MoodTracker.css';
import './MoodChart.css';

export default function MoodTracker() {
    const [entries, setEntries] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedMood, setSelectedMood] = useState('NEUTRAL');
    const [rating, setRating] = useState(5);
    const [note, setNote] = useState('');
    const [stats, setStats] = useState(null);
    const [chartPeriod, setChartPeriod] = useState(7);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = () => {
        const loadedEntries = getMoodEntries();
        setEntries(loadedEntries);
        setStats(getMoodStats());
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const entry = {
            id: generateMoodId(),
            mood: selectedMood,
            rating: rating,
            note: note.trim(),
            date: new Date().toISOString()
        };

        if (saveMoodEntry(entry)) {
            loadEntries();
            setShowForm(false);
            setSelectedMood('NEUTRAL');
            setRating(5);
            setNote('');
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Hapus catatan mood ini?')) {
            if (deleteMoodEntry(id)) {
                loadEntries();
            }
        }
    };

    const getTodayEntry = () => {
        const today = new Date().toDateString();
        return entries.find(e => new Date(e.date).toDateString() === today);
    };

    const todayEntry = getTodayEntry();

    return (
        <section className="mood-tracker section">
            <div className="container">
                <div className="mood-tracker-header">
                    <div className="header-text">
                        <h1 className="mood-title">
                            <Calendar className="title-icon" />
                            Mood Tracker
                        </h1>
                        <p className="mood-subtitle">
                            Catat perasaan Anda setiap hari untuk memahami pola emosi dan kesehatan mental
                        </p>
                    </div>

                    {!showForm && !todayEntry && (
                        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                            <Plus size={20} />
                            Catat Mood Hari Ini
                        </button>
                    )}
                </div>

                {/* Stats Cards */}
                {stats && entries.length > 0 && (
                    <div className="mood-stats">
                        <div className="stat-card glass-card">
                            <div className="stat-icon">
                                <Calendar size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.totalEntries}</div>
                                <div className="stat-label">Total Catatan</div>
                            </div>
                        </div>

                        <div className="stat-card glass-card">
                            <div className="stat-icon">
                                <TrendingUp size={24} />
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{stats.averageRating}/10</div>
                                <div className="stat-label">Rata-rata Rating</div>
                            </div>
                        </div>

                        <div className="stat-card glass-card">
                            <div className="stat-icon" style={{ fontSize: '2rem' }}>
                                {getMoodEmoji(stats.mostFrequentMood)}
                            </div>
                            <div className="stat-content">
                                <div className="stat-value">{getMoodLabel(stats.mostFrequentMood)}</div>
                                <div className="stat-label">Mood Paling Sering</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mood Charts */}
                {entries.length > 0 && (
                    <div className="mood-analytics">
                        <h2 className="section-title">
                            <TrendingUp size={24} />
                            Analytics & Insights
                        </h2>

                        <div className="chart-period-selector">
                            <button
                                className={`period-btn ${chartPeriod === 7 ? 'active' : ''}`}
                                onClick={() => setChartPeriod(7)}
                            >
                                7 Hari
                            </button>
                            <button
                                className={`period-btn ${chartPeriod === 14 ? 'active' : ''}`}
                                onClick={() => setChartPeriod(14)}
                            >
                                14 Hari
                            </button>
                            <button
                                className={`period-btn ${chartPeriod === 30 ? 'active' : ''}`}
                                onClick={() => setChartPeriod(30)}
                            >
                                30 Hari
                            </button>
                        </div>

                        <MoodChart entries={entries} period={chartPeriod} />
                    </div>
                )}

                {/* Today's Entry Notice */}
                {todayEntry && !showForm && (
                    <div className="today-notice glass-card">
                        <div className="notice-emoji">{getMoodEmoji(todayEntry.mood)}</div>
                        <div className="notice-content">
                            <h3>Mood Hari Ini Sudah Tercatat!</h3>
                            <p>Anda merasa <strong>{getMoodLabel(todayEntry.mood)}</strong> dengan rating <strong>{todayEntry.rating}/10</strong></p>
                        </div>
                    </div>
                )}

                {/* Mood Entry Form */}
                {showForm && (
                    <div className="mood-form-container glass-card fade-in">
                        <h3>Bagaimana Perasaan Anda Hari Ini?</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Pilih Mood</label>
                                <div className="mood-selector">
                                    {MOOD_KEYS.map(key => (
                                        <button
                                            key={key}
                                            type="button"
                                            className={`mood-option ${selectedMood === key ? 'selected' : ''}`}
                                            onClick={() => setSelectedMood(key)}
                                            style={selectedMood === key ? { borderColor: getMoodColor(key) } : {}}
                                        >
                                            <span className="mood-emoji">{getMoodEmoji(key)}</span>
                                            <span className="mood-label">{getMoodLabel(key)}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Rating: {rating}/10 - {getRatingLabel(rating)}</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={rating}
                                    onChange={(e) => setRating(parseInt(e.target.value))}
                                    className="rating-slider"
                                    style={{
                                        background: `linear-gradient(to right, ${getMoodColor(selectedMood)} 0%, ${getMoodColor(selectedMood)} ${rating * 10}%, rgba(255,255,255,0.1) ${rating * 10}%, rgba(255,255,255,0.1) 100%)`
                                    }}
                                />
                                <div className="rating-markers">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                        <span key={n}>{n}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Catatan (opsional)</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Tuliskan apa yang membuat Anda merasa seperti ini..."
                                    rows="4"
                                    className="mood-note-input"
                                />
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                                    Batal
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Simpan Mood
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Mood History */}
                <div className="mood-history">
                    <h2 className="history-title">Riwayat Mood</h2>

                    {entries.length === 0 ? (
                        <div className="empty-state glass-card">
                            <Calendar size={48} className="empty-icon" />
                            <h3>Belum Ada Catatan Mood</h3>
                            <p>Mulai catat perasaan Anda hari ini untuk tracking mood Anda</p>
                        </div>
                    ) : (
                        <div className="entries-list">
                            {entries.map(entry => (
                                <div key={entry.id} className="mood-entry glass-card">
                                    <div className="entry-header">
                                        <div className="entry-mood">
                                            <span className="entry-emoji">{getMoodEmoji(entry.mood)}</span>
                                            <div className="entry-info">
                                                <div className="entry-mood-label">{getMoodLabel(entry.mood)}</div>
                                                <div className="entry-date">{formatDate(entry.date)}</div>
                                            </div>
                                        </div>
                                        <div className="entry-rating" style={{ color: getMoodColor(entry.mood) }}>
                                            {entry.rating}/10
                                        </div>
                                    </div>

                                    {entry.note && (
                                        <div className="entry-note">
                                            <p>{entry.note}</p>
                                        </div>
                                    )}

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(entry.id)}
                                        title="Hapus catatan"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
