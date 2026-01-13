import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'Welcome to the System Terminal. Type "help" for commands.' }
  ]);
  const dummyRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    dummyRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const newHistory = [...history, { type: 'input', content: input }];
      
      // Command Logic
      const cmd = input.toLowerCase().trim();
      if (cmd === 'help') {
        newHistory.push({ type: 'output', content: 'Available: help, clear, about, status' });
      } else if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      } else if (cmd === 'about') {
        newHistory.push({ type: 'output', content: 'Terminal React v1.0.4 - Initialized.' });
      } else if (cmd === 'status') {
        newHistory.push({ type: 'output', content: 'System: Online | Connection: Encrypted' });
      } else {
        newHistory.push({ type: 'output', content: `Command not found: ${cmd}` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.window}>
        <div style={styles.titleBar}>
          <span style={styles.dotRed}></span>
          <span style={styles.dotYellow}></span>
          <span style={styles.dotGreen}></span>
          <span style={styles.titleText}>bash — 80×24</span>
        </div>
        <div style={styles.terminalBody}>
          {history.map((line, i) => (
            <div key={i} style={line.type === 'input' ? styles.inputLine : styles.outputLine}>
              {line.type === 'input' && <span style={styles.prompt}>$ </span>}
              {line.content}
            </div>
          ))}
          <div style={styles.inputArea}>
            <span style={styles.prompt}>$ </span>
            <input
              style={styles.inputField}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              autoFocus
            />
          </div>
          <div ref={dummyRef}></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#1a1a1a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  window: { width: '100%', maxWidth: '800px', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid #333' },
  titleBar: { backgroundColor: '#333', padding: '10px', display: 'flex', alignItems: 'center', gap: '8px' },
  dotRed: { width: '12px', height: '12px', backgroundColor: '#ff5f56', borderRadius: '50%' },
  dotYellow: { width: '12px', height: '12px', backgroundColor: '#ffbd2e', borderRadius: '50%' },
  dotGreen: { width: '12px', height: '12px', backgroundColor: '#27c93f', borderRadius: '50%' },
  titleText: { color: '#aaa', fontSize: '12px', marginLeft: '10px', fontFamily: 'monospace' },
  terminalBody: { padding: '20px', height: '400px', overflowY: 'auto', fontFamily: '"Courier New", Courier, monospace', fontSize: '14px' },
  prompt: { color: '#00ff00', fontWeight: 'bold' },
  inputLine: { color: '#fff', marginBottom: '4px' },
  outputLine: { color: '#00ff00', marginBottom: '8px', opacity: 0.8 },
  inputArea: { display: 'flex' },
  inputField: { backgroundColor: 'transparent', border: 'none', color: '#fff', outline: 'none', flex: 1, fontFamily: 'inherit', fontSize: 'inherit' }
};

export default Terminal;
