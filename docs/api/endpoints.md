# API Endpoints

Complete reference for all SmartBadge API endpoints with examples and parameters.

## Badge Generation Endpoints

### Generate Badge SVG

Generate a badge in SVG format (recommended for web use).

```http
GET https://smartbadge.io/badge/{owner}/{repo}/{type}.svg
```

**Parameters:**
- `owner` (required) - GitHub repository owner
- `repo` (required) - GitHub repository name  
- `type` (required) - Badge type: `semantic`, `language`, `framework`, `maturity`

**Query Parameters:**
- `style` - Badge style: `flat`, `flat-square`, `for-the-badge`, `social`
- `color` - Color: `blue`, `green`, `red`, `yellow`, `orange`, `purple`, `gray`, or hex
- `label` - Custom label text (URL encoded)

**Example:**
```bash
curl "https://smartbadge.io/badge/facebook/react/semantic.svg?style=for-the-badge&color=blue"
```

### Generate Badge PNG

Generate a badge in PNG format (for compatibility).

```http
GET https://smartbadge.io/badge/{owner}/{repo}/{type}.png
```

Same parameters as SVG endpoint.

### Badge Metadata

Get badge metadata without generating image.

```http
GET https://smartbadge.io/badge/{owner}/{repo}/{type}.json
```

**Response:**
```json
{
  "badge": {
    "label": "Classification",
    "message": "Web Application", 
    "color": "blue",
    "style": "flat"
  },
  "analysis": {
    "confidence": 0.94,
    "technologies": ["React", "TypeScript"]
  },
  "urls": {
    "svg": "https://smartbadge.io/badge/facebook/react/semantic.svg",
    "png": "https://smartbadge.io/badge/facebook/react/semantic.png"
  }
}
```

## Analysis API Endpoints

### Get Repository Analysis

Retrieve detailed semantic analysis for a repository.

```http
GET https://api.smartbadge.io/v1/analyze/{owner}/{repo}
```

**Headers:**
- `Authorization: Bearer {api_key}` (required for detailed analysis)

**Response:**
```json
{
  "repository": "facebook/react",
  "analysis": {
    "classification": "Library",
    "confidence": 0.98,
    "category": "Frontend Framework",
    "technologies": ["JavaScript", "TypeScript", "React"],
    "maturity": "Mature",
    "complexity": "High",
    "primary_language": "JavaScript",
    "framework": "React",
    "architecture": "Component-Based"
  },
  "metadata": {
    "analyzed_at": "2024-01-15T10:30:00Z",
    "cached_until": "2024-01-16T10:30:00Z",
    "analysis_version": "2.1.0"
  },
  "badges": {
    "semantic": "https://smartbadge.io/badge/facebook/react/semantic.svg",
    "language": "https://smartbadge.io/badge/facebook/react/language.svg", 
    "framework": "https://smartbadge.io/badge/facebook/react/framework.svg",
    "maturity": "https://smartbadge.io/badge/facebook/react/maturity.svg"
  }
}
```

### Refresh Analysis

Force refresh of cached analysis data.

```http
POST https://api.smartbadge.io/v1/analyze/{owner}/{repo}/refresh
```

**Headers:**
- `Authorization: Bearer {api_key}` (required)

**Response:**
```json
{
  "message": "Analysis refresh initiated",
  "estimated_completion": "2024-01-15T10:35:00Z",
  "job_id": "refresh_12345"
}
```

### List Repository Badges

Get all available badges for a repository.

```http
GET https://api.smartbadge.io/v1/repositories/{owner}/{repo}/badges
```

**Response:**
```json
{
  "repository": "facebook/react",
  "available_badges": [
    {
      "type": "semantic",
      "label": "Classification", 
      "message": "Library",
      "confidence": 0.98,
      "url": "https://smartbadge.io/badge/facebook/react/semantic.svg"
    },
    {
      "type": "language",
      "label": "Language",
      "message": "JavaScript", 
      "confidence": 0.95,
      "url": "https://smartbadge.io/badge/facebook/react/language.svg"
    }
  ]
}
```

## Batch Operations

### Batch Analyze

Analyze multiple repositories in a single request.

```http
POST https://api.smartbadge.io/v1/batch/analyze
```

**Headers:**
- `Authorization: Bearer {api_key}` (required)
- `Content-Type: application/json`

**Request Body:**
```json
{
  "repositories": [
    "facebook/react",
    "vuejs/vue", 
    "angular/angular"
  ],
  "types": ["semantic", "language"],
  "webhook_url": "https://your-app.com/webhook"  
}
```

**Response:**
```json
{
  "batch_id": "batch_67890",
  "status": "processing",
  "total_repositories": 3,
  "estimated_completion": "2024-01-15T10:40:00Z"
}
```

### Batch Status

Check status of batch analysis operation.

```http
GET https://api.smartbadge.io/v1/batch/status/{batch_id}
```

**Response:**
```json
{
  "batch_id": "batch_67890", 
  "status": "completed",
  "progress": {
    "total": 3,
    "completed": 3,
    "failed": 0
  },
  "results": [
    {
      "repository": "facebook/react",
      "status": "completed",
      "analysis": { /* analysis data */ }
    }
  ]
}
```

## Search & Discovery

### Search Repositories  

Search for repositories by classification or technology.

```http
GET https://api.smartbadge.io/v1/search/repositories
```

**Query Parameters:**
- `classification` - Filter by semantic classification
- `technology` - Filter by detected technology
- `language` - Filter by primary language
- `maturity` - Filter by project maturity
- `limit` - Results per page (max 100)
- `offset` - Pagination offset

**Example:**
```bash
curl "https://api.smartbadge.io/v1/search/repositories?classification=Web%20Application&technology=React&limit=20"
```

**Response:**
```json
{
  "total": 1542,
  "results": [
    {
      "repository": "facebook/react",
      "classification": "Library",
      "technologies": ["JavaScript", "TypeScript"],
      "stars": 225000,
      "badges": {
        "semantic": "https://smartbadge.io/badge/facebook/react/semantic.svg"
      }
    }
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "has_next": true
  }
}
```

## Webhook Endpoints

### Create Webhook

Register a webhook endpoint for notifications.

```http
POST https://api.smartbadge.io/v1/webhooks
```

**Headers:**
- `Authorization: Bearer {api_key}` (required)

**Request Body:**
```json
{
  "url": "https://your-app.com/webhook",
  "events": ["analysis.completed", "analysis.failed"],
  "repositories": ["owner/repo"],  // Optional: specific repos
  "secret": "webhook_secret"       // Optional: for signature verification
}
```

### List Webhooks

Get all registered webhooks.

```http
GET https://api.smartbadge.io/v1/webhooks
```

### Delete Webhook

Remove a webhook registration.

```http
DELETE https://api.smartbadge.io/v1/webhooks/{webhook_id}
```

## Rate Limits & Quotas

All API endpoints respect rate limits based on your plan:

**Headers in all responses:**
- `X-RateLimit-Limit` - Requests allowed per window
- `X-RateLimit-Remaining` - Requests remaining in window  
- `X-RateLimit-Reset` - Unix timestamp when window resets

**429 Rate Limit Response:**
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded",
    "retry_after": 60
  }
}
```

Ready to start building? Check out our [Authentication](./authentication) guide and interactive [API Playground](../interactive/api-playground)!