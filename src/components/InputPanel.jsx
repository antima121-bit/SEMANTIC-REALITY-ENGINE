import React, { useState, useEffect, useRef } from 'react';

const InputPanel = ({ onProcess, isProcessing }) => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [sampleIdx, setSampleIdx] = useState(0);

    const samples = [
        "कर्मचारी को नोटिस अवधि के दौरान सेवा से हटाया नहीं जाएगा।", // Legal
        "मरीज को दिन में दो बार 500 मिलीग्राम दवा दी जाए।", // Medical
        "फाइल को तीन कार्य दिवसों के भीतर अनुमोदन हेतु प्रस्तुत किया जाए।", // Admin
        "कल दवा बंद करें।" // Ambiguity
    ];

    // Instant Inject for Testing
    const handleInject = () => {
        setText(samples[sampleIdx]);
        setSampleIdx((prev) => (prev + 1) % samples.length);
    };

    // Simulated Speech-to-Text Logic
    const simulateSpeech = () => {
        setIsListening(true);
        setText(''); // Clear old text

        const phrase = samples[sampleIdx];
        let charIndex = 0;

        // Delay before typing starts (simulating "listening" phase)
        setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (charIndex < phrase.length) {
                    setText(prev => prev + phrase.charAt(charIndex));
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                    setIsListening(false);
                    setSampleIdx((prev) => (prev + 1) % samples.length);
                }
            }, 50); // Typing speed
        }, 1000);
    };

    const handleSubmit = () => {
        if (!text.trim()) return;
        onProcess(text);
    };

    return (
        <section className="glass-panel input-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontWeight: 700, letterSpacing: '2px', fontSize: '1.5rem', color: '#fff', textTransform: 'uppercase' }}>Input Stream</h2>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Audio Visualizer */}
                    {isListening && (
                        <div style={{ display: 'flex', gap: '2px', height: '20px', alignItems: 'center' }}>
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="animate-wave"
                                    style={{
                                        width: '4px',
                                        background: 'var(--accent-color)',
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <button
                        onClick={handleInject}
                        className="badge"
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--accent-color)',
                            color: 'var(--accent-color)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.2s'
                        }}
                        title="Instant Auto-Inject"
                    >
                        <span>⚡</span>
                    </button>

                    <button
                        onClick={isListening ? null : simulateSpeech}
                        disabled={isListening || isProcessing}
                        className="badge"
                        style={{
                            background: isListening ? 'rgba(255, 68, 0, 0.2)' : 'transparent',
                            border: '1px solid var(--accent-color)',
                            color: 'var(--accent-color)',
                            cursor: isListening ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s',
                            boxShadow: isListening ? '0 0 15px rgba(255, 68, 0, 0.4)' : 'none'
                        }}
                        title="Activate Voice Command"
                    >
                        <span>{isListening ? '🎙️ LISTENING...' : '🎤 VOICE CMD'}</span>
                    </button>
                    <span className="badge" style={{ background: 'var(--accent-dim)', color: 'var(--accent-color)', border: '1px solid var(--accent-color)' }}>HINDI</span>
                </div>
            </div>

            <div className="textarea-wrapper" style={{ position: 'relative' }}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isProcessing || isListening}
                    placeholder={isListening ? "Listening..." : "> ENTER SEMANTIC DATA VECTOR..."}
                    style={{
                        width: '100%',
                        height: '200px',
                        background: '#0a0a0a',
                        border: '1px solid #333',
                        color: 'var(--accent-color)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.1rem',
                        padding: '1.5rem',
                        resize: 'none',
                        outline: 'none',
                        clipPath: 'polygon(0 0, 100% 0, 100% 90%, 98% 100%, 0 100%)'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--accent-color)';
                        e.target.style.boxShadow = '0 0 20px rgba(255, 68, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = '#333';
                        e.target.style.boxShadow = 'none';
                    }}
                />
            </div>

            <div className="controls" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="options" style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', background: 'var(--accent-color)', opacity: 0.5 }}></div>
                        STRICT MODE
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '12px', height: '12px', border: '1px solid #666' }}></div>
                        DEBUG LOGS
                    </label>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isProcessing || isListening || !text.trim()}
                    className="primary-btn"
                >
                    {isProcessing ? 'PROCESSING...' : 'INITIATE ENGINE'}
                </button>
            </div>
        </section>
    );
};

export default InputPanel;
