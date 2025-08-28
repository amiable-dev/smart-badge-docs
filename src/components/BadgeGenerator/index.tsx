import React, { useState, useCallback } from 'react';

interface BadgeGeneratorProps {
  defaultRepo?: string;
  defaultStyle?: string;
}

interface BadgeConfig {
  repository: string;
  badgeType: 'semantic' | 'language' | 'framework' | 'maturity';
  style: 'flat' | 'flat-square' | 'for-the-badge' | 'social';
  color: string;
  label?: string;
}

export default function BadgeGenerator({ 
  defaultRepo = 'facebook/react', 
  defaultStyle = 'flat' 
}: BadgeGeneratorProps): JSX.Element {
  const [config, setConfig] = useState<BadgeConfig>({
    repository: defaultRepo,
    badgeType: 'semantic',
    style: defaultStyle as BadgeConfig['style'],
    color: 'blue',
    label: '',
  });

  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generateBadgeUrl = useCallback(() => {
    const baseUrl = 'https://smartbadge.io/badge';
    const params = new URLSearchParams();
    
    if (config.style !== 'flat') params.set('style', config.style);
    if (config.color !== 'blue') params.set('color', config.color);
    if (config.label) params.set('label', config.label);
    
    const paramString = params.toString();
    const url = `${baseUrl}/${config.repository}/${config.badgeType}.svg${paramString ? '?' + paramString : ''}`;
    
    setGeneratedUrl(url);
    return url;
  }, [config]);

  React.useEffect(() => {
    generateBadgeUrl();
  }, [generateBadgeUrl]);

  const copyToClipboard = async () => {
    const markdownCode = `[![${config.badgeType.charAt(0).toUpperCase() + config.badgeType.slice(1)}](${generatedUrl})](https://smartbadge.io)`;
    
    try {
      await navigator.clipboard.writeText(markdownCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="api-playground">
      <h3>🎨 Live Badge Generator</h3>
      <p>Configure your SmartBadge and get the markdown code instantly!</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <label>
            <strong>Repository (owner/repo):</strong>
            <input
              type="text"
              value={config.repository}
              onChange={(e) => setConfig(prev => ({ ...prev, repository: e.target.value }))}
              placeholder="facebook/react"
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                margin: '0.25rem 0',
                border: '1px solid var(--ifm-border-color)',
                borderRadius: '4px'
              }}
            />
          </label>
        </div>
        
        <div>
          <label>
            <strong>Badge Type:</strong>
            <select
              value={config.badgeType}
              onChange={(e) => setConfig(prev => ({ ...prev, badgeType: e.target.value as BadgeConfig['badgeType'] }))}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                margin: '0.25rem 0',
                border: '1px solid var(--ifm-border-color)',
                borderRadius: '4px'
              }}
            >
              <option value="semantic">Semantic Analysis</option>
              <option value="language">Language Detection</option>
              <option value="framework">Framework Detection</option>
              <option value="maturity">Project Maturity</option>
            </select>
          </label>
        </div>
        
        <div>
          <label>
            <strong>Style:</strong>
            <select
              value={config.style}
              onChange={(e) => setConfig(prev => ({ ...prev, style: e.target.value as BadgeConfig['style'] }))}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                margin: '0.25rem 0',
                border: '1px solid var(--ifm-border-color)',
                borderRadius: '4px'
              }}
            >
              <option value="flat">Flat</option>
              <option value="flat-square">Flat Square</option>
              <option value="for-the-badge">For The Badge</option>
              <option value="social">Social</option>
            </select>
          </label>
        </div>
        
        <div>
          <label>
            <strong>Color:</strong>
            <select
              value={config.color}
              onChange={(e) => setConfig(prev => ({ ...prev, color: e.target.value }))}
              style={{ 
                width: '100%', 
                padding: '0.5rem', 
                margin: '0.25rem 0',
                border: '1px solid var(--ifm-border-color)',
                borderRadius: '4px'
              }}
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="orange">Orange</option>
              <option value="purple">Purple</option>
              <option value="gray">Gray</option>
            </select>
          </label>
        </div>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>
          <strong>Custom Label (optional):</strong>
          <input
            type="text"
            value={config.label}
            onChange={(e) => setConfig(prev => ({ ...prev, label: e.target.value }))}
            placeholder="Leave empty for default"
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              margin: '0.25rem 0',
              border: '1px solid var(--ifm-border-color)',
              borderRadius: '4px'
            }}
          />
        </label>
      </div>
      
      {generatedUrl && (
        <div className="badge-preview" style={{ marginBottom: '1rem' }}>
          <strong>Preview:</strong><br />
          <img src={generatedUrl} alt="Badge Preview" style={{ margin: '0.5rem 0' }} />
        </div>
      )}
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>Markdown Code:</strong>
        <textarea
          readOnly
          value={`[![${config.badgeType.charAt(0).toUpperCase() + config.badgeType.slice(1)}](${generatedUrl})](https://smartbadge.io)`}
          style={{
            width: '100%',
            height: '80px',
            padding: '0.5rem',
            margin: '0.5rem 0',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            border: '1px solid var(--ifm-border-color)',
            borderRadius: '4px',
            background: 'var(--ifm-code-background)'
          }}
        />
      </div>
      
      <button
        onClick={copyToClipboard}
        className="smartbadge-button"
        style={{ marginRight: '1rem' }}
      >
        {copied ? '✅ Copied!' : '📋 Copy Markdown'}
      </button>
      
      <a 
        href={generatedUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="smartbadge-button"
        style={{ textDecoration: 'none' }}
      >
        🔗 View Badge
      </a>
    </div>
  );
}