import { History, Trash2, Download } from 'lucide-react';
import { formatDateTime } from '../utils/constants';
import './ChatHistory.css';

export default function ChatHistory({
    sessions,
    currentSessionId,
    onLoadSession,
    onDeleteSession,
    onExportSession,
    onNewSession
}) {
    if (sessions.length === 0) {
        return (
            <div className="chat-history empty">
                <div className="history-header">
                    <History size={20} />
                    <h3>Riwayat Chat</h3>
                </div>
                <div className="empty-history">
                    <p>Belum ada riwayat percakapan</p>
                </div>
            </div>
        );
    }

    return (
        <div className="chat-history">
            <div className="history-header">
                <History size={20} />
                <h3>Riwayat Chat</h3>
            </div>

            <button className="new-session-btn" onClick={onNewSession}>
                + Percakapan Baru
            </button>

            <div className="sessions-list">
                {sessions.map(session => (
                    <div
                        key={session.id}
                        className={`session-item ${currentSessionId === session.id ? 'active' : ''}`}
                        onClick={() => onLoadSession(session.id)}
                    >
                        <div className="session-info">
                            <div className="session-title">{session.title}</div>
                            <div className="session-date">{formatDateTime(session.updatedAt)}</div>
                            <div className="session-messages">
                                {session.messages.length} pesan
                            </div>
                        </div>

                        <div className="session-actions" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="action-btn export"
                                onClick={() => onExportSession(session)}
                                title="Export"
                            >
                                <Download size={14} />
                            </button>
                            <button
                                className="action-btn delete"
                                onClick={() => onDeleteSession(session.id)}
                                title="Hapus"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
