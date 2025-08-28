# Integrations

Connect SmartBadge with your favorite development tools and workflows.

## GitHub Actions

Automate badge updates with repository changes:

```yaml
name: Update SmartBadge
on: [push, pull_request]
jobs:
  update-badges:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Refresh SmartBadge Cache
        run: |
          curl -X POST "https://api.smartbadge.io/refresh/owner/repo"
```

## Documentation Sites

### Docusaurus

```jsx
import BadgeGenerator from '@site/src/components/BadgeGenerator';

// Interactive badge generator component
<BadgeGenerator defaultRepo="your-org/your-repo" />
```

### GitBook

Add dynamic badges to GitBook documentation:

```markdown
{% embed url="https://smartbadge.io/badge/your-org/your-repo/semantic.svg" %}
```

### Notion

Embed badges in Notion pages using the image block with SmartBadge URLs.

## Package Managers

### npm

Include badges in package.json metadata:

```json
{
  "name": "your-package",
  "smartbadge": {
    "repository": "your-org/your-repo",
    "badges": ["semantic", "framework"]
  }
}
```

### PyPI

Add badges to your Python package descriptions:

```python
# setup.py
long_description = """
[![Semantic Analysis](https://smartbadge.io/badge/your-org/your-repo/semantic.svg)](https://smartbadge.io)

Your package description here...
"""
```

## API Integration

Programmatically generate badges:

```javascript
const SmartBadge = require('@smartbadge/api');

const client = new SmartBadge({ apiKey: 'your-key' });
const badge = await client.generate('owner/repo', 'semantic');
```

## Webhooks

Get notified when analysis completes:

```json
{
  "repository": "owner/repo",
  "analysis": {
    "classification": "Web Application",
    "confidence": 0.94,
    "technologies": ["React", "Node.js"]
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Third-Party Tools

### Shields.io Migration

Easily migrate from shields.io badges:

```bash
# Old shields.io badge
[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com)

# New SmartBadge equivalent  
[![Semantic](https://smartbadge.io/badge/owner/repo/semantic.svg)](https://smartbadge.io)
```

### README Generators

Popular README generators support SmartBadge:

- **readme-md-generator**: Built-in SmartBadge templates
- **readme-scribe**: Custom SmartBadge integration
- **github-readme-stats**: Complementary semantic analysis

Ready to integrate SmartBadge into your workflow? Check out our [API Documentation](../api/overview) for detailed implementation guides!