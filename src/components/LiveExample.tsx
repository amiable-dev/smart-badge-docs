import React, { useState, useEffect } from 'react';

interface LiveExampleProps {
  repository?: string;
  showCode?: boolean;
}

export default function LiveExample({ 
  repository = 'facebook/react',
  showCode = true 
}: LiveExampleProps): JSX.Element {
  const [badges, setBadges] = useState<string[]>([]);
  
  useEffect(() => {
    const types = ['semantic', 'language', 'framework', 'maturity'];
    const urls = types.map(type => 
      `https://smartbadge.io/badge/${repository}/${type}.svg`
    );
    setBadges(urls);
  }, [repository]);

  const markdownCode = badges.map((url, idx) => {
    const types = ['Semantic', 'Language', 'Framework', 'Maturity'];
    return `[![${types[idx]}](${url})](https://smartbadge.io)`;
  }).join('\n');

  return (
    <div className="interactive-example">
      <h4>Live Badge Examples for {repository}</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        {badges.map((url, idx) => (
          <img 
            key={idx}
            src={url} 
            alt={`Badge ${idx}`} 
            style={{ margin: '0.25rem' }}
          />
        ))}
      </div>
      
      {showCode && (
        <div>
          <strong>Markdown Code:</strong>
          <pre style={{
            background: 'var(--ifm-code-background)',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.85rem',
            overflow: 'auto'
          }}>
            {markdownCode}
          </pre>
        </div>
      )}
    </div>
  );
}