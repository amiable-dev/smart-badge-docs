# Authentication

Learn how to authenticate with the SmartBadge API for advanced features.

## API Keys

SmartBadge uses API keys for authentication. Get your API key from the [SmartBadge Dashboard](https://smartbadge.io/dashboard).

### Getting Your API Key

1. **Sign up** at [smartbadge.io](https://smartbadge.io)
2. **Verify your email** and complete onboarding
3. **Visit Dashboard** → API Keys section
4. **Generate new key** with appropriate permissions

### API Key Types

**Read-Only Keys:**
- Get analysis data
- Generate badges
- Search repositories
- Good for client-side applications

**Full Access Keys:**
- All read operations
- Refresh analysis cache
- Batch operations
- Webhook management
- Required for server-side integrations

## Authentication Methods

### Bearer Token (Recommended)

Include your API key in the Authorization header:

```bash
curl -H "Authorization: Bearer sk_live_1234567890abcdef" \
     https://api.smartbadge.io/v1/analyze/owner/repo
```

```javascript
// JavaScript/Node.js
const response = await fetch('https://api.smartbadge.io/v1/analyze/owner/repo', {
  headers: {
    'Authorization': 'Bearer sk_live_1234567890abcdef'
  }
});
```

```python
# Python
import requests

headers = {
    'Authorization': 'Bearer sk_live_1234567890abcdef'
}
response = requests.get('https://api.smartbadge.io/v1/analyze/owner/repo', headers=headers)
```

### Query Parameter (Public APIs Only)

For public badge generation, you can use query parameters:

```bash
curl "https://smartbadge.io/badge/owner/repo/semantic.svg?api_key=sk_live_1234567890abcdef"
```

⚠️ **Security Warning**: Only use query parameters for public badge URLs. Never expose API keys in client-side code or public URLs for sensitive operations.

## Environment Setup

### Development vs Production

Use different API keys for different environments:

```bash
# Development
export SMARTBADGE_API_KEY=sk_test_1234567890abcdef

# Production  
export SMARTBADGE_API_KEY=sk_live_0987654321fedcba
```

### Key Prefixes

SmartBadge API keys use prefixes to indicate their type:
- `sk_test_` - Test/development keys
- `sk_live_` - Production keys  
- `pk_` - Public/read-only keys

## Security Best Practices

### Secure Storage

**✅ Do:**
- Store API keys in environment variables
- Use secure configuration management
- Rotate keys regularly (quarterly recommended)
- Use least-privilege principle (read-only when possible)

**❌ Don't:**
- Commit API keys to version control
- Include keys in client-side JavaScript
- Share keys in chat/email/documentation
- Use production keys in development

### Key Rotation

Rotate API keys regularly for security:

1. **Generate new key** in dashboard
2. **Update applications** with new key
3. **Test functionality** with new key
4. **Revoke old key** after verification

### IP Restrictions (Enterprise)

Enterprise accounts can restrict API keys to specific IP addresses:

```bash
# Configure in dashboard or via API
curl -X PATCH https://api.smartbadge.io/v1/api-keys/sk_live_123 \
  -H "Authorization: Bearer sk_live_123" \
  -d '{"allowed_ips": ["203.0.113.1", "198.51.100.0/24"]}'
```

## Error Handling

### Authentication Errors

**401 Unauthorized - Missing API Key:**
```json
{
  "error": {
    "code": "MISSING_API_KEY",
    "message": "API key required for this endpoint"
  }
}
```

**401 Unauthorized - Invalid API Key:**
```json
{
  "error": {
    "code": "INVALID_API_KEY", 
    "message": "The provided API key is invalid or has been revoked"
  }
}
```

**403 Forbidden - Insufficient Permissions:**
```json
{
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "This API key does not have permission for this operation"
  }
}
```

### Rate Limiting

API keys have different rate limits based on plan:

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded for API key",
    "details": {
      "limit": 1000,
      "window": "1h", 
      "reset_at": "2024-01-15T11:00:00Z"
    }
  }
}
```

## Testing Authentication

Test your API key setup:

```bash
# Test basic authentication
curl -H "Authorization: Bearer your-key-here" \
     https://api.smartbadge.io/v1/user/profile

# Expected response
{
  "user": {
    "email": "user@example.com",
    "plan": "pro",
    "api_key_permissions": ["read", "write"]
  }
}
```

## SDK Authentication

### JavaScript/Node.js

```javascript
import { SmartBadge } from '@smartbadge/client';

const client = new SmartBadge({
  apiKey: process.env.SMARTBADGE_API_KEY,
  environment: 'production' // or 'development'
});

// Automatic authentication handling
const analysis = await client.analyze('owner/repo');
```

### Python

```python
import os
from smartbadge import SmartBadge

client = SmartBadge(
    api_key=os.environ['SMARTBADGE_API_KEY']
)

analysis = client.analyze('owner/repo')
```

### Go

```go
import (
    "os"
    "github.com/smartbadge/go-client"
)

client := smartbadge.New(os.Getenv("SMARTBADGE_API_KEY"))
analysis, err := client.Analyze("owner/repo")
```

## Webhook Authentication

Verify webhook authenticity using signatures:

```javascript
// Verify webhook signature
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(`sha256=${expectedSignature}`)
  );
}

// Express.js example
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-smartbadge-signature'];
  
  if (verifyWebhook(req.body, signature, process.env.WEBHOOK_SECRET)) {
    // Process webhook
    res.status(200).send('OK');
  } else {
    res.status(401).send('Unauthorized');
  }
});
```

Need help with authentication setup? Check our [interactive API playground](../interactive/api-playground) or contact [support@smartbadge.io](mailto:support@smartbadge.io).