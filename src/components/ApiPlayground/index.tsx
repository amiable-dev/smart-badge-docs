import React, { useState } from 'react';

export default function ApiPlayground(): JSX.Element {
  const [badgeRepo, setBadgeRepo] = useState('facebook/react');
  const [badgeType, setBadgeType] = useState('semantic');
  const [badgeResult, setBadgeResult] = useState<string>('');
  const [showBadgeResult, setShowBadgeResult] = useState(false);
  
  const [apiKey, setApiKey] = useState('');
  const [analysisRepo, setAnalysisRepo] = useState('facebook/react');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analysisError, setAnalysisError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testBadge = () => {
    const url = `https://smartbadge.io/badge/${badgeRepo}/${badgeType}.svg`;
    setBadgeResult(url);
    setShowBadgeResult(true);
  };

  const testAnalysis = async () => {
    if (!apiKey) {
      alert('Please enter your API key');
      return;
    }
    
    setLoading(true);
    setAnalysisError('');
    setAnalysisResult(null);
    
    try {
      const response = await fetch(`https://api.smartbadge.io/v1/analyze/${analysisRepo}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setAnalysisResult(data);
        setAnalysisError('');
      } else {
        throw new Error(data.error?.message || 'API request failed');
      }
    } catch (error: any) {
      setAnalysisError(error.message);
      setAnalysisResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Badge Generation Test */}
      <div className="api-playground">
        <h3>🔗 Badge Generation Test</h3>
        <p>Enter a repository to generate a badge:</p>
        
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
          <input 
            type="text" 
            placeholder="owner/repo" 
            value={badgeRepo}
            onChange={(e) => setBadgeRepo(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid var(--ifm-border-color)',
              borderRadius: '4px'
            }}
          />
          <select 
            value={badgeType}
            onChange={(e) => setBadgeType(e.target.value)}
            style={{
              padding: '0.5rem',
              border: '1px solid var(--ifm-border-color)',
              borderRadius: '4px'
            }}
          >
            <option value="semantic">Semantic Analysis</option>
            <option value="language">Language Detection</option>
            <option value="framework">Framework Detection</option>
            <option value="maturity">Project Maturity</option>
          </select>
        </div>
        
        <button className="smartbadge-button" onClick={testBadge}>
          🚀 Generate Badge
        </button>
        
        {showBadgeResult && (
          <div style={{marginTop: '1rem'}}>
            <strong>Result:</strong><br/>
            <img src={badgeResult} alt="Generated Badge" style={{margin: '0.5rem 0'}} />
            <pre style={{
              background: 'var(--ifm-code-background)', 
              padding: '0.5rem', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              {badgeResult}
            </pre>
          </div>
        )}
      </div>

      {/* Analysis API Test */}
      <div className="api-playground" style={{marginTop: '2rem'}}>
        <h3>🔐 Analysis API Test</h3>
        <p>Get detailed semantic analysis (requires API key):</p>
        
        <div style={{marginBottom: '1rem'}}>
          <label><strong>API Key:</strong></label>
          <input 
            type="password" 
            placeholder="sk_live_..." 
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            style={{
              width: '100%', 
              padding: '0.5rem', 
              margin: '0.25rem 0',
              border: '1px solid var(--ifm-border-color)',
              borderRadius: '4px'
            }}
          />
          <small>Your API key is not stored and only used for testing</small>
        </div>
        
        <div style={{marginBottom: '1rem'}}>
          <label><strong>Repository:</strong></label>
          <input 
            type="text" 
            placeholder="owner/repo" 
            value={analysisRepo}
            onChange={(e) => setAnalysisRepo(e.target.value)}
            style={{
              width: '100%', 
              padding: '0.5rem', 
              margin: '0.25rem 0',
              border: '1px solid var(--ifm-border-color)',
              borderRadius: '4px'
            }}
          />
        </div>
        
        <button 
          className="smartbadge-button" 
          onClick={testAnalysis}
          disabled={loading}
        >
          {loading ? '⏳ Loading...' : '🔍 Get Analysis'}
        </button>
        
        {analysisResult && (
          <div style={{marginTop: '1rem'}}>
            <strong>Response:</strong>
            <pre style={{
              background: 'var(--ifm-code-background)', 
              padding: '1rem', 
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
          </div>
        )}
        
        {analysisError && (
          <div style={{marginTop: '1rem', color: 'var(--smartbadge-error)'}}>
            <strong>Error:</strong>
            <div>{analysisError}</div>
          </div>
        )}
      </div>
    </div>
  );
}