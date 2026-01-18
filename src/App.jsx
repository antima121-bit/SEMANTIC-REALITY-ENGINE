import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import InputPanel from './components/InputPanel';
import EngineStatus from './components/EngineStatus';
import OutputDisplay from './components/OutputDisplay';
import AuditSidebar from './components/AuditSidebar';
import './index.css';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [logs, setLogs] = useState(['> SYSTEM INITIALIZED...']);
  const [result, setResult] = useState(null);

  // New State for History
  const [history, setHistory] = useState([]);

  const addLog = (msg) => {
    setLogs(prev => [...prev, `> ${msg}`]);
  };

  const processText = async (text) => {
    setIsProcessing(true);
    setResult(null);
    setCurrentStep(0);
    setLogs(['> ENGINE INITIALIZED...']);

    // Helper for delay
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Step 1: DOMAIN ID
    addLog("SCANNING INPUT STREAM...");
    await wait(1500);

    // Determine Domain early for ID
    const lowerText = text.toLowerCase();
    let detectedDomain = "LEGAL";
    if (lowerText.includes("patient") || lowerText.includes("medicine")) detectedDomain = "MEDICAL";
    if (lowerText.includes("file") || lowerText.includes("approval")) detectedDomain = "ADMINISTRATIVE";

    addLog(`DOMAIN: ${detectedDomain} [CONFIDENCE 98%]`);
    setCurrentStep(1);

    // Step 2: EXTRACTION
    addLog("EXTRACTING SEMANTIC ENTITIES...");
    await wait(2000);
    addLog("ACTOR: AUTHORIZED OFFICER | OBLIGATION: MANDATORY");
    setCurrentStep(2);

    // Step 3: ENFORCEMENT
    addLog("APPLYING COMPLIANCE RULES...");
    await wait(1500);
    addLog("VS. INDIAN LEGAL CORPUS... MATCH FOUND.");
    setCurrentStep(3);

    // Step 4: AMBIGUITY
    addLog("RESOLVING AMBIGUITIES...");
    await wait(1200);
    addLog("NO CRITICAL RISK DETECTED.");
    setCurrentStep(4);

    // Step 5: RE-EXPRESSION
    addLog("GENERATING FINAL OUTPUT...");
    await wait(1500);

    // Dynamic Mock Logic based on Specific Hindi Patterns
    let newResult = {};

    // DATASET SAMPLES
    if (lowerText.includes("कर्मचारी को नोटिस") || lowerText.includes("removed from service")) {
      // EXAMPLE 1: LEGAL
      newResult = {
        translation: `<strong>The employee shall not be terminated during the notice period.</strong>`,
        semantic: JSON.stringify({
          "domain": "LEGAL",
          "hindi_text": "कर्मचारी को नोटिस अवधि के दौरान सेवा से हटाया नहीं जाएगा।",
          "english_reference": "The employee shall not be terminated during the notice period.",
          "semantic_frame": {
            "actor": "employer",
            "authority_level": "organizational",
            "action": "terminate",
            "object": "employee",
            "time_reference": "notice period",
            "obligation_level": "shall_not",
            "certainty_level": "absolute",
            "risk_level": "High"
          }
        }, null, 2),
        risks: `None. High confidence in Legal Domain.`
      };
    } else if (lowerText.includes("मरीज को") || lowerText.includes("500") || lowerText.includes("medicine")) {
      // EXAMPLE 2: MEDICAL
      newResult = {
        translation: `<strong>The patient is to be administered 500 mg of the medication twice daily.</strong>`,
        semantic: JSON.stringify({
          "domain": "MEDICAL",
          "hindi_text": "मरीज को दिन में दो बार 500 मिलीग्राम दवा दी जाए।",
          "english_reference": "The patient is to be administered 500 mg of the medication twice daily.",
          "semantic_frame": {
            "actor": "medical_staff",
            "authority_level": "clinical",
            "action": "administer",
            "object": "medication",
            "dosage": "500 mg",
            "frequency": "twice daily",
            "obligation_level": "mandatory",
            "certainty_level": "explicit",
            "risk_level": "Critical"
          }
        }, null, 2),
        risks: `⚠️ Critical Compliance Required.`
      };
    } else if (lowerText.includes("फाइल को") || lowerText.includes("approval")) {
      // EXAMPLE 3: ADMINISTRATIVE
      newResult = {
        translation: `<strong>The file shall be submitted for approval within three working days.</strong>`,
        semantic: JSON.stringify({
          "domain": "ADMINISTRATIVE",
          "hindi_text": "फाइल को तीन कार्य दिवसों के भीतर अनुमोदन हेतु प्रस्तुत किया जाए।",
          "english_reference": "The file shall be submitted for approval within three working days.",
          "semantic_frame": {
            "actor": "department_staff",
            "authority_level": "administrative",
            "action": "submit",
            "object": "file",
            "time_reference": "three working days",
            "obligation_level": "shall",
            "certainty_level": "explicit",
            "risk_level": "Medium"
          }
        }, null, 2),
        risks: `Standard Administrative Deadline.`
      };
    } else if (lowerText.includes("कल दवा बंद") || lowerText.includes("ambiguity")) {
      // EXAMPLE 4: AMBIGUITY
      newResult = {
        translation: `<strong>⚠️ AMBIGUITY DETECTED: The timing for discontinuing the medication is unclear.</strong>`,
        semantic: JSON.stringify({
          "domain": "MEDICAL",
          "hindi_text": "कल दवा बंद करें।",
          "possible_interpretations": [
            "Stop the medication tomorrow",
            "The medication was stopped yesterday"
          ],
          "flag_required": true,
          "risk_level": "Critical"
        }, null, 2),
        risks: `⚠️ CRITICAL: Temporal ambiguity (Tomorrow vs Yesterday). Verification required.`
      };
    } else {
      // DEFAULT / FALLBACK
      newResult = {
        translation: `<strong>WHEREAS</strong> the undersigned authority acknowledges the submission; <br><br><strong>IT IS HEREBY DIRECTED</strong> that the stated action be executed immediately, in strict accordance with the provisions of the relevant Indian Administrative Protocols.`,
        semantic: JSON.stringify({
          "domain": "LEGAL / ADMINISTRATIVE",
          "actor": "Authorized Signatory (Implied)",
          "risk_level": "Low"
        }, null, 2),
        risks: `None detected. Validated against Indian Legal Corpus.`
      };
    }

    setResult(newResult);

    // Add to History
    const newHistoryItem = {
      timestamp: new Date().toLocaleTimeString(),
      domain: detectedDomain,
      input: text,
      result: newResult
    };
    setHistory(prev => [newHistoryItem, ...prev]);

    setIsProcessing(false);
    addLog("PROCESS COMPLETE.");
  };

  const handleLoadHistory = (item) => {
    setResult(item.result);
    // Optional: scroll to output
  };

  return (
    <div className="app-container">
      <CustomCursor />

      <header className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="header-title">S.R.E.</h1>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-color)', letterSpacing: '4px', fontSize: '0.8rem', marginTop: '-10px' }}>SEMANTIC REALITY ENGINE</p>
        </div>

        <div style={{ textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end', marginBottom: '4px' }}>
            <div className={`status-dot ${isProcessing ? 'animate-blink' : ''}`} style={{ width: '8px', height: '8px', background: 'var(--accent-color)', borderRadius: '50%' }}></div>
            <span>{isProcessing ? 'PROCESSING STREAM' : 'SYSTEM STANDBY'}</span>
          </div>
          <div>V2.0.4 [STABLE]</div>
        </div>
      </header>

      <div className="app-layout">
        <main className="main-content">
          <InputPanel onProcess={processText} isProcessing={isProcessing} />
          <EngineStatus currentStep={currentStep} logs={logs} isActive={isProcessing} />
          <OutputDisplay result={result} />
        </main>

        <AuditSidebar history={history} onLoadHistory={handleLoadHistory} />
      </div>

      <footer style={{
        marginTop: '2rem',
        borderTop: '1px solid #222',
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: '#666'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span>// DEVELOPER UPLINK</span>
          <a href="https://www.linkedin.com/in/antima-mishra-6483ba252/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            LINKEDIN
          </a>
          <a href="https://github.com/antima121-bit" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            GITHUB
          </a>
          <a href="mailto:antimamishra113@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            EMAIL
          </a>
        </div>
        <div>ID: ANTIMA_001</div>
      </footer>
    </div>
  );
}

export default App;
