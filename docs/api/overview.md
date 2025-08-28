# API Overview

SmartBadge provides a comprehensive REST API for programmatic badge generation and semantic analysis.

## Base URL

```
https://api.smartbadge.io/v1
```

## Authentication

API access requires an API key for advanced features:

```bash
curl -H "Authorization: Bearer your-api-key" \
     https://api.smartbadge.io/v1/analyze/owner/repo
```

## Rate Limits

- **Free Tier**: 1,000 requests/month
- **Pro Tier**: 50,000 requests/month  
- **Enterprise**: Custom limits

## Quick Start

### Generate a Badge

```bash
# Simple badge generation (no auth required)
curl https://smartbadge.io/badge/facebook/react/semantic.svg

# With customization
curl "https://smartbadge.io/badge/facebook/react/semantic.svg?style=for-the-badge&color=blue"
```

### Get Analysis Data

```bash
# Detailed analysis (requires API key)
curl -H "Authorization: Bearer your-api-key" \
     https://api.smartbadge.io/v1/analyze/facebook/react
```

Response:
```json
{
  "repository": "facebook/react",
  "analysis": {
    "classification": "Library",
    "confidence": 0.98,
    "category": "Frontend Framework", 
    "technologies": [
      "JavaScript",
      "TypeScript", 
      "React"
    ],
    "maturity": "Mature",
    "complexity": "High"
  },
  "badges": {
    "semantic": "https://smartbadge.io/badge/facebook/react/semantic.svg",
    "language": "https://smartbadge.io/badge/facebook/react/language.svg",
    "framework": "https://smartbadge.io/badge/facebook/react/framework.svg"
  },
  "cached_at": "2024-01-15T10:30:00Z",
  "expires_at": "2024-01-16T10:30:00Z"
}
```

## Endpoints

### Badge Generation

| Endpoint | Description |
|----------|-------------|
| `GET /badge/:owner/:repo/:type.svg` | Generate badge SVG |
| `GET /badge/:owner/:repo/:type.png` | Generate badge PNG |
| `GET /badge/:owner/:repo/:type.json` | Get badge metadata |

### Analysis API

| Endpoint | Description |
|----------|-------------|
| `GET /v1/analyze/:owner/:repo` | Get semantic analysis |
| `POST /v1/analyze/:owner/:repo/refresh` | Refresh analysis cache |
| `GET /v1/repositories/:owner/:repo/badges` | List available badges |

### Batch Operations

| Endpoint | Description |  
|----------|-------------|
| `POST /v1/batch/analyze` | Analyze multiple repositories |
| `GET /v1/batch/status/:batch_id` | Check batch status |

## SDKs & Libraries

### JavaScript/Node.js

```bash
npm install @smartbadge/client
```

```javascript
import { SmartBadge } from '@smartbadge/client';

const client = new SmartBadge({ apiKey: 'your-key' });
const analysis = await client.analyze('owner/repo');
```

### Python

```bash
pip install smartbadge-python
```

```python
from smartbadge import SmartBadge

client = SmartBadge(api_key='your-key')
analysis = client.analyze('owner/repo')
```

### Go

```bash
go get github.com/smartbadge/go-client
```

```go
import "github.com/smartbadge/go-client"

client := smartbadge.New("your-key")
analysis, err := client.Analyze("owner/repo")
```

## Error Handling

Standard HTTP status codes with detailed error messages:

```json
{
  "error": {
    "code": "REPOSITORY_NOT_FOUND",
    "message": "Repository 'owner/repo' not found or not accessible",
    "details": "Ensure the repository is public or you have access permissions"
  }
}
```

Common error codes:
- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (missing/invalid API key)
- `404` - Repository not found
- `429` - Rate limit exceeded
- `500` - Internal server error

## Webhooks

Receive notifications when analysis completes:

```json
{
  "event": "analysis.completed",
  "repository": "owner/repo",
  "analysis": { /* analysis data */ },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

Configure webhooks in your dashboard or via API:

```bash
curl -X POST https://api.smartbadge.io/v1/webhooks \
  -H "Authorization: Bearer your-key" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-app.com/webhook", "events": ["analysis.completed"]}'
```

Ready to dive deeper? Check out our detailed [API Endpoints](./endpoints) documentation and [Authentication](./authentication) guide.