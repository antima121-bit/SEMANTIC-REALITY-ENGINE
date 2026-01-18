import React, { useEffect, useRef } from 'react';

const stepsVector = [
    { id: 1, title: 'ID' },
    { id: 2, title: 'EXT' },
    { id: 3, title: 'RULE' },
    { id: 4, title: 'AMB' },
    { id: 5, title: 'OUT' }
];

const EngineStatus = ({ currentStep, logs, isActive }) => {
    const logEndRef = useRef(null);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    if (!isActive) return null;

    return (
        <section className="glass-panel vis-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.5s ease-out' }}>
            <div className="vis-header" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '1rem', borderBottom: '1px solid #333' }}>
                <div
                    className="animate-scan"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        background: 'var(--accent-color)',
                        boxShadow: '0 0 15px var(--accent-color)',
                        zIndex: 10
                    }}
                />
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ENGINE SEQUENCE</h3>
            </div>

            <div className="vis-content" style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                {stepsVector.map((step, idx) => {
                    const isCompleted = idx < currentStep;
                    const isProcessing = idx === currentStep;

                    return (
                        <div
                            key={step.id}
                            style={{
                                flex: 1,
                                height: '60px',
                                background: isCompleted ? 'var(--accent-color)' : (isProcessing ? 'rgba(255, 68, 0, 0.2)' : '#111'),
                                border: isProcessing ? '1px solid var(--accent-color)' : '1px solid #222',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: isCompleted ? '#000' : (isProcessing ? '#fff' : '#444'),
                                fontFamily: 'var(--font-mono)',
                                transition: 'all 0.3s'
                            }}
                        >
                            <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>0{step.id}</span>
                            <span style={{ fontSize: '0.6rem' }}>{step.title}</span>
                        </div>
                    );
                })}
            </div>

            <div
                className="terminal-log"
                style={{
                    background: '#000',
                    padding: '1rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: '#888',
                    height: '100px',
                    overflowY: 'auto',
                    borderLeft: '2px solid var(--accent-color)'
                }}
            >
                {logs.map((log, index) => (
                    <div key={index} style={{ marginBottom: '4px', color: index === logs.length - 1 ? '#fff' : 'inherit' }}>{log}</div>
                ))}
                <div ref={logEndRef} />
            </div>
        </section>
    );
};

export default EngineStatus;
