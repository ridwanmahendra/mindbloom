import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, AlertCircle, Sparkles, Menu, X } from 'lucide-react';
import ChatHistory from './ChatHistory';
import {
    saveChatSession,
    getChatSessions,
    getChatSession,
    deleteChatSession,
    getCurrentSessionId,
    setCurrentSessionId,
    generateSessionId,
    getSessionTitle,
    exportChatSession
} from '../utils/storage';
import './ChatInterface.css';

export default function ChatInterface() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentSessionId, setCurrentSession] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [showHistory, setShowHistory] = useState(true);
    const messagesEndRef = useRef(null);

    // Load sessions and current session on mount
    useEffect(() => {
        loadSessions();
        const savedSessionId = getCurrentSessionId();
        if (savedSessionId) {
            loadSession(savedSessionId);
        }
    }, []);

    // Auto-save when messages change
    useEffect(() => {
        if (messages.length > 0 && currentSessionId) {
            const session = {
                id: currentSessionId,
                title: getSessionTitle(messages),
                messages: messages
            };
            saveChatSession(session);
            loadSessions(); // Refresh sessions list
        }
    }, [messages, currentSessionId]);

    const loadSessions = () => {
        setSessions(getChatSessions().sort((a, b) =>
            new Date(b.updatedAt) - new Date(a.updatedAt)
        ));
    };

    const loadSession = (sessionId) => {
        const session = getChatSession(sessionId);
        if (session) {
            setMessages(session.messages || []);
            setCurrentSession(sessionId);
            setCurrentSessionId(sessionId);
        }
    };

    const handleNewSession = () => {
        const newSessionId = generateSessionId();
        setMessages([]);
        setCurrentSession(newSessionId);
        setCurrentSessionId(newSessionId);
        setError(null);
    };

    const handleDeleteSession = (sessionId) => {
        if (window.confirm('Hapus percakapan ini?')) {
            deleteChatSession(sessionId);
            loadSessions();

            if (currentSessionId === sessionId) {
                handleNewSession();
            }
        }
    };

    const handleExportSession = (session) => {
        exportChatSession(session);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputValue.trim() || isLoading) return;

        // Create new session if none exists
        if (!currentSessionId) {
            const newSessionId = generateSessionId();
            setCurrentSession(newSessionId);
            setCurrentSessionId(newSessionId);
        }

        const userMessage = {
            role: 'user',
            content: inputValue.trim(),
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: userMessage.content,
                    history: messages
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to get response');
            }

            const data = await response.json();

            const assistantMessage = {
                role: 'assistant',
                content: data.response,
                timestamp: data.timestamp
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (err) {
            console.error('Chat error:', err);
            setError(err.message);

            const errorMessage = {
                role: 'assistant',
                content: 'Maaf, terjadi kesalahan. ' + err.message,
                timestamp: new Date().toISOString(),
                isError: true
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="chat-section section">
            <div className="container">
                <div className="chat-header">
                    <h2 className="chat-title">
                        <button
                            className="history-toggle"
                            onClick={() => setShowHistory(!showHistory)}
                            title={showHistory ? "Sembunyikan riwayat" : "Tampilkan riwayat"}
                        >
                            {showHistory ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        <Sparkles className="title-icon" />
                        Konsultasi dengan AI
                    </h2>
                    <p className="chat-subtitle">
                        Ceritakan apa yang Anda rasakan. Kami di sini untuk mendengarkan dan membantu.
                    </p>
                </div>

                <div className="chat-layout">
                    {showHistory && (
                        <ChatHistory
                            sessions={sessions}
                            currentSessionId={currentSessionId}
                            onLoadSession={loadSession}
                            onDeleteSession={handleDeleteSession}
                            onExportSession={handleExportSession}
                            onNewSession={handleNewSession}
                        />
                    )}

                    <div className="chat-container glass-card">
                        <div className="chat-messages">
                            {messages.length === 0 ? (
                                <div className="chat-empty">
                                    <Sparkles size={48} className="empty-icon" />
                                    <h3>Mulai Percakapan</h3>
                                    <p>Sampaikan keluh kesah atau ceritakan apa yang sedang Anda rasakan</p>
                                    <div className="suggestion-chips">
                                        <button
                                            className="chip"
                                            onClick={() => setInputValue('Saya merasa stres dengan tugas kuliah')}
                                        >
                                            Stres akademik
                                        </button>
                                        <button
                                            className="chip"
                                            onClick={() => setInputValue('Saya sering merasa cemas tanpa alasan')}
                                        >
                                            Merasa cemas
                                        </button>
                                        <button
                                            className="chip"
                                            onClick={() => setInputValue('Saya kesulitan tidur akhir-akhir ini')}
                                        >
                                            Susah tidur
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`message ${message.role} ${message.isError ? 'error' : ''}`}
                                        >
                                            <div className="message-avatar">
                                                {message.role === 'user' ? '👤' : '🤖'}
                                            </div>
                                            <div className="message-content">
                                                <div className="message-text">{message.content}</div>
                                                <div className="message-time">
                                                    {new Date(message.timestamp).toLocaleTimeString('id-ID', {
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="message assistant loading">
                                            <div className="message-avatar">🤖</div>
                                            <div className="message-content">
                                                <div className="typing-indicator">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>

                        {error && (
                            <div className="chat-error">
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </div>
                        )}

                        <form className="chat-input-form" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Ketik pesan Anda di sini..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="chat-submit"
                                disabled={isLoading || !inputValue.trim()}
                            >
                                {isLoading ? (
                                    <Loader2 size={20} className="spinner" />
                                ) : (
                                    <Send size={20} />
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
