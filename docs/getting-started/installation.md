# Installation Guide

Complete setup instructions for SmartBadge integration.

## Quick Installation

SmartBadge requires no installation - it's a hosted service that generates badges on-demand via URL patterns.

Simply add badge URLs to your README:

```markdown
[![Semantic Analysis](https://smartbadge.io/badge/your-org/your-repo/semantic.svg)](https://smartbadge.io)
```

## Advanced Setup

For power users and enterprise customers, SmartBadge offers additional integration options.

### CLI Tool (Coming Soon)

```bash
npm install -g @smartbadge/cli
smartbadge generate --repo your-org/your-repo --type semantic
```

### API Integration

See our [API Documentation](../api/overview) for programmatic badge generation.