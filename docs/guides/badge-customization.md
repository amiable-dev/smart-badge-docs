# Badge Customization

Learn how to customize SmartBadge badges to match your project's branding and style.

## URL Parameters

SmartBadge supports various URL parameters for customization:

### Style Options

```
?style=flat           # Default flat style
?style=flat-square    # Square corners
?style=for-the-badge  # Bold, prominent style
?style=social         # GitHub-style social badges
```

### Color Options

```
?color=blue      # Default blue
?color=green     # Success/positive
?color=red       # Error/important
?color=yellow    # Warning/attention
?color=orange    # Creative/energetic
?color=purple    # Innovative/unique
?color=gray      # Neutral/balanced
?color=ff0000    # Custom hex color (without #)
```

### Custom Labels

```
?label=Custom+Label  # Override default label
```

## Complete Examples

```markdown
<!-- Flat blue semantic badge (default) -->
[![Semantic](https://smartbadge.io/badge/facebook/react/semantic.svg)](https://smartbadge.io)

<!-- Bold green framework badge -->
[![Framework](https://smartbadge.io/badge/facebook/react/framework.svg?style=for-the-badge&color=green)](https://smartbadge.io)

<!-- Custom purple language badge -->
[![Language](https://smartbadge.io/badge/microsoft/typescript/language.svg?color=purple&label=Tech+Stack)](https://smartbadge.io)
```

## Best Practices

### Design Consistency
- Use the same style across all badges in your project
- Choose colors that complement your brand
- Keep custom labels short and descriptive

### Accessibility
- Ensure sufficient contrast for readability
- Use standard colors when possible
- Include meaningful alt text in markdown

### Performance
- SVG format ensures fast loading
- Badges are cached for optimal performance
- Mobile-optimized for all device sizes