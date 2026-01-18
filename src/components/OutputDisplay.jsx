import React, { useEffect, useRef } from 'react';

const OutputDisplay = ({ result }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (result) {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [result]);

    if (!result) return null;

    // Helper to determine Risk Color class
    const getRiskClass = (level) => {
        if (level.includes('LOW')) return 'safe';
        if (level.includes('MODERATE')) return 'warn';
        return 'crit';
    };

    // Helper to pretty print JSON with colors
    const renderJSON = (jsonString) => {
        try {
            const obj = JSON.parse(jsonString);
            const formatted = JSON.stringify(obj, null, 2);
            return formatted.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, (match) => {
                let cls = 'json-number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'json-key';
                    } else {
                        cls = 'json-string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'json-boolean';
                } else if (/null/.test(match)) {
                    cls = 'json-boolean';
                }
                return `<span class="${cls}">${match}</span>`;
            });
        } catch (e) {
            return jsonString; // Fallback
        }
    };

    // Extract Risk Level for Visuals
    const riskLevelVal = result.semantic.match(/risk_level": "(.*?)"/i)?.[1] || "UNKNOWN";
    const confidenceVal = "98%";

    return (
        <section ref={sectionRef} className="glass-panel output-section" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'slideUp 0.5s ease-out' }}>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.5rem', color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>SEMANTIC OUTPUT</h2>
                <span className="badge success" style={{ background: '#0a0a0a', borderColor: '#00ff66', color: '#00ff66', border: '1px solid' }}>SECURE TRANSMISSION</span>
            </div>

            {/* Visual Metrics Row */}
            <div className="metrics-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="metric-item" style={{ background: '#111', padding: '1.5rem', border: '1px solid #222' }}>
                    <div className="metric-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span className="metric-label" style={{ color: '#666', fontSize: '0.8rem' }}>CONFIDENCE SCORE</span>
                        <span className="metric-value" style={{ color: '#00ff66', fontSize: '1.5rem', fontWeight: 700 }}>{confidenceVal}</span>
                    </div>
                    <div className="progress-bar" style={{ height: '4px', background: '#222' }}>
                        <div className="progress-fill safe" style={{ width: '98%', height: '100%', background: '#00ff66', boxShadow: '0 0 10px rgba(0,255,102,0.2)' }}></div>
                    </div>
                </div>
                <div className="metric-item" style={{ background: '#111', padding: '1.5rem', border: '1px solid #222' }}>
                    <div className="metric-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span className="metric-label" style={{ color: '#666', fontSize: '0.8rem' }}>RISK ASSESSMENT</span>
                        <span className="metric-value" style={{ color: '#ff4400', fontSize: '1.5rem', fontWeight: 700 }}>{riskLevelVal.toUpperCase()}</span>
                    </div>
                    <div className="progress-bar" style={{ height: '4px', background: '#222' }}>
                        <div className={`progress-fill ${getRiskClass(riskLevelVal.toUpperCase())}`} style={{ width: '100%', height: '100%' }}></div>
                    </div>
                </div>
            </div>

            <div className="result-block">
                <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>// TRANSLATED OUTPUT</h3>
                <div className="content-box" style={{ background: '#000', border: '1px solid #333', padding: '1.5rem', fontSize: '1.1rem', lineHeight: 1.6, color: '#fff', borderLeft: '4px solid var(--accent-color)' }} dangerouslySetInnerHTML={{ __html: result.translation }} />
            </div>

            <div className="result-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="result-block">
                    <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>// SEMANTIC FRAME</h3>
                    <div
                        className="content-box mono"
                        style={{ background: '#0a0a0a', border: '1px solid #222', padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#ccc', overflowX: 'auto' }}
                        dangerouslySetInnerHTML={{ __html: renderJSON(result.semantic) }}
                    />
                </div>
                <div className="result-block">
                    <h3 style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1rem', fontFamily: 'var(--font-mono)' }}>// SYSTEM FLAGS</h3>
                    <div className="content-box warning" style={{ background: 'rgba(255, 68, 0, 0.05)', border: '1px solid var(--accent-color)', color: 'var(--accent-color)', padding: '1.5rem' }}>
                        {result.risks}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OutputDisplay;
