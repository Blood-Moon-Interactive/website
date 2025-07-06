# Article Integration Guide

## Overview
This guide ensures that the article system is properly integrated and prevents the issue where old hardcoded content appears instead of dynamic articles.

## Key Components

### 1. HTML Structure Requirements
The `index.html` file MUST include:
```html
<div id="featuredArticleContainer">
    <!-- Loading indicator -->
    <div class="text-center">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-muted">Loading featured article...</p>
    </div>
</div>
```

### 2. Required Files
- `articles/articles.json` - Article data
- `js/utils/articles.js` - Article utilities
- `js/script.js` - Main script with article loading logic

### 3. JavaScript Integration
The main script (`js/script.js`) MUST include:
- Import of article utilities
- Article loading logic with fallbacks
- Error handling for article loading failures

## Prevention Checklist

### Before Deploying Changes:
1. ✅ Verify `articles/articles.json` exists and contains valid data
2. ✅ Ensure `#featuredArticleContainer` exists in `index.html`
3. ✅ Check that article loading logic is present in `js/script.js`
4. ✅ Test article loading on localhost
5. ✅ Verify fallback content works if article loading fails

### Common Issues to Avoid:
1. **Missing Container**: Ensure `#featuredArticleContainer` exists in HTML
2. **Hardcoded Content**: Remove old "Features" and "Latest Updates" sections
3. **Path Issues**: Verify `articles/articles.json` path is correct
4. **Missing Imports**: Ensure article utilities are imported in script.js

## Testing

### Local Testing:
1. Start local server: `python -m http.server 8000`
2. Open `http://localhost:8000`
3. Check browser console for article loading logs
4. Verify featured article appears
5. Test fallback content by temporarily removing articles.json

### Debug Tools:
- Use `test-articles.html` to test article loading independently
- Check browser console for error messages
- Verify network requests in browser dev tools

## Error Recovery

If articles fail to load:
1. Check browser console for errors
2. Verify `articles/articles.json` exists and is valid JSON
3. Ensure all required JavaScript files are loaded
4. Check for CORS issues in development
5. Verify file paths are correct

## Maintenance

### Regular Checks:
- Test article loading after any HTML changes
- Verify article data structure in `articles.json`
- Check that new articles are properly formatted
- Ensure fallback content is up-to-date

### Adding New Articles:
1. Add article data to `articles/articles.json`
2. Set `"featured": true` for the main article
3. Create corresponding HTML file if needed
4. Test article loading locally
5. Update this guide if needed

## Emergency Fallback

If article system completely fails:
1. The fallback article data in `script.js` will display
2. Users will still see relevant content
3. No blank page or broken functionality
4. System gracefully degrades

## File Structure
```
/
├── index.html (with #featuredArticleContainer)
├── articles/
│   ├── articles.json
│   └── getting-started-guide.html
├── js/
│   ├── script.js (with article loading logic)
│   └── utils/
│       └── articles.js
└── styles.css (with article card styles)
```

This guide ensures the article system works reliably and prevents the old hardcoded content issue from recurring. 