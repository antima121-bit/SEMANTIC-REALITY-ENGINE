import React from 'react';

const AuditSidebar = ({ history, onLoadHistory }) => {
    return (
        <aside className="glass-panel audit-sidebar" style={{ height: 'fit-content' }}>
            <div className="section-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1rem', color: '#fff', letterSpacing: '1px', textTransform: 'uppercase' }}>Audit Trail</h3>
                <span className="badge" style={{ fontSize: '0.6rem', padding: '2px 6px', background: '#222', color: '#888' }}>ID: {Math.floor(Math.random() * 10000)}</span>
            </div>

            {history.length === 0 ? (
                <div style={{ color: '#444', fontSize: '0.8rem', fontStyle: 'italic', textAlign: 'center', marginTop: '2rem', fontFamily: 'var(--font-mono)' }}>
                    // NO TRANSACTIONS
                </div>
            ) : (
                <div className="history-list">
                    {history.map((item, idx) => (
                        <div key={idx} className="history-item" onClick={() => onLoadHistory(item)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span className="history-domain">{item.domain}</span>
                                <span className="history-time">{item.timestamp}</span>
                            </div>
                            <div className="history-text">{item.input}</div>
                        </div>
                    ))}
                </div>
            )}
        </aside>
    );
};

export default AuditSidebar;
