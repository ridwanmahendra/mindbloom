// localStorage keys
const STORAGE_KEYS = {
    CHAT_SESSIONS: 'mindbloom_chat_sessions',
    MOOD_ENTRIES: 'mindbloom_mood_entries',
    CURRENT_SESSION: 'mindbloom_current_session',
    USER_PREFERENCES: 'mindbloom_user_prefs'
};

// ==========================================
// CHAT SESSIONS
// ==========================================

export const saveChatSession = (session) => {
    try {
        const sessions = getChatSessions();
        const existingIndex = sessions.findIndex(s => s.id === session.id);

        if (existingIndex >= 0) {
            sessions[existingIndex] = { ...session, updatedAt: new Date().toISOString() };
        } else {
            sessions.push({ ...session, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        }

        localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions));
        return true;
    } catch (error) {
        console.error('Error saving chat session:', error);
        return false;
    }
};

export const getChatSessions = () => {
    try {
        const sessions = localStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS);
        return sessions ? JSON.parse(sessions) : [];
    } catch (error) {
        console.error('Error getting chat sessions:', error);
        return [];
    }
};

export const getChatSession = (id) => {
    const sessions = getChatSessions();
    return sessions.find(s => s.id === id) || null;
};

export const deleteChatSession = (id) => {
    try {
        const sessions = getChatSessions();
        const filtered = sessions.filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting chat session:', error);
        return false;
    }
};

export const clearAllChatSessions = () => {
    try {
        localStorage.removeItem(STORAGE_KEYS.CHAT_SESSIONS);
        localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
        return true;
    } catch (error) {
        console.error('Error clearing chat sessions:', error);
        return false;
    }
};

export const getCurrentSessionId = () => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
};

export const setCurrentSessionId = (id) => {
    if (id) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, id);
    } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    }
};

export const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getSessionTitle = (messages) => {
    if (!messages || messages.length === 0) return 'New Conversation';
    const firstUserMessage = messages.find(m => m.role === 'user');
    if (!firstUserMessage) return 'New Conversation';

    // Truncate to 50 chars
    const title = firstUserMessage.content.slice(0, 50);
    return title.length < firstUserMessage.content.length ? title + '...' : title;
};

export const exportChatSession = (session) => {
    try {
        let text = `MindBloom Chat Session\n`;
        text += `Date: ${new Date(session.createdAt).toLocaleString('id-ID')}\n`;
        text += `Title: ${session.title}\n`;
        text += `\n${'='.repeat(50)}\n\n`;

        session.messages.forEach(msg => {
            const role = msg.role === 'user' ? 'Anda' : 'MindBloom AI';
            const time = new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            text += `[${time}] ${role}:\n${msg.content}\n\n`;
        });

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mindbloom_chat_${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('Error exporting chat:', error);
        return false;
    }
};

// ==========================================
// MOOD ENTRIES
// ==========================================

export const saveMoodEntry = (entry) => {
    try {
        const entries = getMoodEntries();
        const existingIndex = entries.findIndex(e => e.id === entry.id);

        if (existingIndex >= 0) {
            entries[existingIndex] = entry;
        } else {
            entries.push(entry);
        }

        // Sort by date descending
        entries.sort((a, b) => new Date(b.date) - new Date(a.date));

        localStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(entries));
        return true;
    } catch (error) {
        console.error('Error saving mood entry:', error);
        return false;
    }
};

export const getMoodEntries = () => {
    try {
        const entries = localStorage.getItem(STORAGE_KEYS.MOOD_ENTRIES);
        return entries ? JSON.parse(entries) : [];
    } catch (error) {
        console.error('Error getting mood entries:', error);
        return [];
    }
};

export const getMoodEntry = (id) => {
    const entries = getMoodEntries();
    return entries.find(e => e.id === id) || null;
};

export const deleteMoodEntry = (id) => {
    try {
        const entries = getMoodEntries();
        const filtered = entries.filter(e => e.id !== id);
        localStorage.setItem(STORAGE_KEYS.MOOD_ENTRIES, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting mood entry:', error);
        return false;
    }
};

export const generateMoodId = () => {
    return `mood_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getMoodStats = () => {
    const entries = getMoodEntries();
    if (entries.length === 0) return null;

    const total = entries.length;
    const avgRating = entries.reduce((sum, e) => sum + e.rating, 0) / total;

    const moodCounts = {};
    entries.forEach(e => {
        moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
    });

    const mostFrequent = Object.entries(moodCounts)
        .sort((a, b) => b[1] - a[1])[0];

    return {
        totalEntries: total,
        averageRating: avgRating.toFixed(1),
        mostFrequentMood: mostFrequent ? mostFrequent[0] : null,
        moodDistribution: moodCounts
    };
};

// ==========================================
// USER PREFERENCES
// ==========================================

export const saveUserPreferences = (prefs) => {
    try {
        localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(prefs));
        return true;
    } catch (error) {
        console.error('Error saving preferences:', error);
        return false;
    }
};

export const getUserPreferences = () => {
    try {
        const prefs = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
        return prefs ? JSON.parse(prefs) : { name: '', theme: 'dark' };
    } catch (error) {
        console.error('Error getting preferences:', error);
        return { name: '', theme: 'dark' };
    }
};
