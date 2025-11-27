export const MOOD_TYPES = {
    HAPPY: { emoji: '😊', label: 'Bahagia', color: '#10b981' },
    NEUTRAL: { emoji: '😐', label: 'Netral', color: '#6b7280' },
    SAD: { emoji: '😔', label: 'Sedih', color: '#3b82f6' },
    ANXIOUS: { emoji: '😰', label: 'Cemas', color: '#f59e0b' },
    ANGRY: { emoji: '😤', label: 'Marah', color: '#ef4444' }
};

export const MOOD_KEYS = Object.keys(MOOD_TYPES);

export const getMoodEmoji = (moodKey) => {
    return MOOD_TYPES[moodKey]?.emoji || '😐';
};

export const getMoodLabel = (moodKey) => {
    return MOOD_TYPES[moodKey]?.label || 'Unknown';
};

export const getMoodColor = (moodKey) => {
    return MOOD_TYPES[moodKey]?.color || '#6b7280';
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Hari ini';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Kemarin';
    } else {
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
};

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const getRatingLabel = (rating) => {
    if (rating >= 8) return 'Sangat Baik';
    if (rating >= 6) return 'Baik';
    if (rating >= 4) return 'Cukup';
    if (rating >= 2) return 'Kurang';
    return 'Sangat Kurang';
};
