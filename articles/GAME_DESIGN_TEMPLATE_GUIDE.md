# Game Design Template Guide

## Overview
This guide explains how to create new game design principle articles for the Blood Moon Interactive website by following the exact structure used by existing articles. This template is specifically designed for indie game developers and covers core game design concepts that apply across all game development platforms.

## IMPORTANT: Use Existing Articles as Templates

**DO NOT use the theoretical template below. Instead, copy an existing article and modify it.**

### Recommended Template Articles:
- **`replayability.html`** - Use this as your primary template (most recent structure)
- **`player-motivation.html`** - Alternative template (older structure)

## Actual Article Structure (Based on Replayability.html)

### Required HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LX742FRW91"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-LX742FRW91');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Article Title - Blood Moon Interactive</title>
    <meta name="description" content="SEO description here">
    <link rel="icon" type="image/x-icon" href="../bm_logo.png">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../styles.css">
    
    <style>
        /* Your custom CSS here */
    </style>
</head>
<body>
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=G-LX742FRW91"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="../index.html">
                <img src="../bm_logo.png" alt="Blood Moon Interactive" height="30">
                Blood Moon Interactive
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html#behaviors">Behaviors</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="game-design-principles.html">Game Design</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="past-articles.html">Articles</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-4">
        <div class="row">
            <!-- Main Content -->
            <div class="col-lg-8">
                <!-- Breadcrumb -->
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="../index.html">Home</a></li>
                        <li class="breadcrumb-item"><a href="game-design-principles.html">Game Design</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Article Title</li>
                    </ol>
                </nav>

                <!-- Article Header -->
                <header class="mb-4">
                    <h1>Article Title</h1>
                </header>

                <!-- Top Content Ad -->
                <div class="ad-container text-center my-4">
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7908718257772872" crossorigin="anonymous"></script>
                    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7908718257772872" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
                    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                </div>

                <!-- Lead Paragraph -->
                <p class="lead">Your lead paragraph here...</p>

                <!-- Key Takeaway Alert -->
                <div class="alert alert-info">
                    <h5><i class="bi bi-lightbulb me-2"></i>Key Takeaway</h5>
                    <p class="mb-0">Your key takeaway here...</p>
                </div>

                <!-- Understanding the Concept -->
                <h2>Understanding the Concept</h2>
                <p>Your concept explanation here...</p>

                <!-- Visual Diagram (if needed) -->
                <div class="your-diagram-class">
                    <!-- Your diagram content -->
                </div>

                <!-- Why This Matters for Indie Developers -->
                <h2>Why This Matters for Indie Developers</h2>
                <p>Your explanation here...</p>
                <ul>
                    <li><strong>Point 1:</strong> Description...</li>
                    <li><strong>Point 2:</strong> Description...</li>
                    <!-- Continue for 4-5 points -->
                </ul>

                <!-- Core Principles -->
                <h2>Core Principles</h2>
                <ul>
                    <li><strong>Principle 1:</strong> Description...</li>
                    <li><strong>Principle 2:</strong> Description...</li>
                    <!-- Continue for 5 principles -->
                </ul>

                <!-- Inline Ad Space -->
                <div class="ad-container text-center my-4">
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7908718257772872" crossorigin="anonymous"></script>
                    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7908718257772872" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
                    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                </div>



                <!-- Practical Applications -->
                <h2>Practical Applications</h2>
                
                <div class="game-example">
                    <h5><i class="bi bi-controller me-2"></i>Action Games</h5>
                    <p><strong>Focus:</strong> What to focus on for this genre</p>
                    <p><strong>Implementation:</strong> How to implement for this genre</p>
                    <p><strong>Examples:</strong> Specific game examples</p>
                </div>

                <div class="game-example">
                    <h5><i class="bi bi-puzzle me-2"></i>RPG Games</h5>
                    <p><strong>Focus:</strong> What to focus on for this genre</p>
                    <p><strong>Implementation:</strong> How to implement for this genre</p>
                    <p><strong>Examples:</strong> Specific game examples</p>
                </div>

                <!-- Continue for 6 game genres total -->

                <!-- Common Mistakes to Avoid -->
                <h2>Common Mistakes to Avoid</h2>
                <ul>
                    <li><strong>Mistake 1:</strong> Description and how to avoid it</li>
                    <li><strong>Mistake 2:</strong> Description and how to avoid it</li>
                    <!-- Continue for 5 mistakes -->
                </ul>

                <!-- Implementation Tips -->
                <h2>Implementation Tips</h2>
                <ol>
                    <li><strong>Step 1:</strong> First step description</li>
                    <li><strong>Step 2:</strong> Second step description</li>
                    <!-- Continue for 5 steps -->
                </ol>

                <!-- Pro Tip -->
                <div class="alert alert-success">
                    <h5><i class="bi bi-lightbulb me-2"></i>Pro Tip</h5>
                    <p class="mb-0">Your actionable advice here...</p>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="col-lg-4">
                <!-- Game Design Articles -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-book me-2"></i>Game Design Articles</h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mb-0">
                            <li><a href="core-gameplay-loops.html">Core Gameplay Loops</a></li>
                            <li><a href="player-motivation.html">Player Motivation</a></li>
                            <li><a href="feedback-systems.html">Feedback Systems</a></li>
                            <li><a href="difficulty-balancing.html">Difficulty Balancing</a></li>
                            <li><a href="flow-theory.html">Flow Theory</a></li>
                            <li><a href="prototyping-strategies.html">Prototyping Strategies</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Quick Reference -->
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="bi bi-lightning me-2"></i>Quick Reference</h5>
                    </div>
                    <div class="card-body">
                        <ul class="list-unstyled mb-0">
                            <li><strong>Key Point 1:</strong> Brief description</li>
                            <li><strong>Key Point 2:</strong> Brief description</li>
                            <li><strong>Key Point 3:</strong> Brief description</li>
                            <li><strong>Key Point 4:</strong> Brief description</li>
                            <li><strong>Key Point 5:</strong> Brief description</li>
                        </ul>
                    </div>
                </div>

                <!-- Bottom Sidebar Ad -->
                <div class="ad-container text-center">
                    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7908718257772872" crossorigin="anonymous"></script>
                    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7908718257772872" data-ad-slot="1234567890" data-ad-format="auto" data-full-width-responsive="true"></ins>
                    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="article-footer mt-5 pt-4 border-top">
            <div class="row">
                <div class="col-md-8">
                    <h5>Related Articles</h5>
                    <ul class="list-unstyled">
                        <li><a href="related-article-1.html">Related Article 1</a></li>
                        <li><a href="related-article-2.html">Related Article 2</a></li>
                        <li><a href="related-article-3.html">Related Article 3</a></li>
                        <li><a href="related-article-4.html">Related Article 4</a></li>
                    </ul>
                </div>
                <div class="col-md-4 text-end">
                    <a href="game-design-principles.html" class="btn btn-outline-primary">
                        <i class="bi bi-arrow-left me-2"></i>Back to Game Design
                    </a>
                </div>
            </div>
        </footer>
    </div>

    <footer class="footer mt-auto py-3 bg-dark">
        <div class="container text-center">
            <p class="text-light mb-0">Created by Blood Moon Interactive</p>
            <p class="text-light mb-0 small">&copy; <span id="currentYear">2025</span> Blood Moon Interactive. All rights reserved.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../js/affiliateLinksStandalone.js"></script>
    <script>
        // Update copyright year automatically
        document.addEventListener('DOMContentLoaded', function() {
            const currentYear = new Date().getFullYear();
            const yearElements = document.querySelectorAll('#currentYear');
            yearElements.forEach(element => {
                element.textContent = currentYear;
            });
        });
    </script>
</body>
</html>
```

## Required Content Sections (In Order)

1. **Lead Paragraph** - Engaging 2-3 sentence summary
2. **Key Takeaway Alert** - Important insight for indie developers
3. **Understanding the Concept** - Detailed explanation with visual diagram (if needed)
4. **Why This Matters for Indie Developers** - Practical benefits and business impact
5. **Core Principles** - 5 key principles as a bulleted list
6. **Inline Ad Space** - After Core Principles section
7. **Practical Applications** - 6 game genres with specific examples
8. **Common Mistakes to Avoid** - 5 pitfalls as bulleted list
9. **Implementation Tips** - 5-step process with explanations
10. **Pro Tip** - Actionable advice in success alert

## CSS Styling Guidelines

### Standard CSS Classes to Use:
```css
.game-example {
    background: #f8f9fa;
    color: #2c3e50;
    padding: 15px;
    border-radius: 10px;
    margin: 10px 0;
    border: 1px solid #dee2e6;
}

.your-diagram-class {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 15px;
    padding: 20px;
    color: white;
    margin: 20px 0;
}

.your-card-class {
    border: 2px solid #e9ecef;
    border-radius: 10px;
    padding: 15px;
    margin: 15px 0;
    background: #f8f9fa;
}

.your-card-class.variant1 { border-left-color: #28a745; }
.your-card-class.variant2 { border-left-color: #17a2b8; }
.your-card-class.variant3 { border-left-color: #ffc107; }
.your-card-class.variant4 { border-left-color: #dc3545; }
```

## Critical Requirements

### ✅ **MUST DO:**
1. **Copy an existing article** (preferably `replayability.html`) as your starting point
2. **Use Bootstrap 5.1.3** (not 5.3.0)
3. **Use regular navbar** (not fixed-top)
4. **Include Google Tag Manager noscript**
5. **Use `container mt-4`** for main container
6. **Use `game-example` class** for practical applications
7. **Include proper breadcrumb navigation**
8. **Use standard ad slot numbers** (1234567890)
9. **Include proper footer with copyright script**
10. **Include affiliate links script** (`../js/affiliateLinksStandalone.js`)

### ❌ **MUST NOT DO:**
1. **Don't use fixed-top navbar**
2. **Don't use Bootstrap 5.3.0**
3. **Don't add publication dates** to article headers
4. **Don't use custom ad slot numbers**
5. **Don't create new CSS classes** without checking existing patterns
6. **Don't add visual checklists** or wheels (not used in current articles)
7. **Don't use `mt-5 pt-4`** for main container

## File Naming Convention
- Use lowercase with underscores: `concept_name.html`
- Make names descriptive and SEO-friendly
- Keep names concise but clear

## Integration with articles.json
After creating the HTML file, add an entry to `articles.json`:

```json
{
  "id": "concept_name",
  "title": "Concept Name",
  "preview": "Brief description for preview...",
  "date": "2024-12-19",
  "author": "Blood Moon Interactive",
  "category": "Game Design",
  "tags": ["game-design", "indie", "principles", "concept"],
  "featured": false,
  "filename": "concept_name.html"
}
```

## Quality Assurance Checklist

### Before Publishing:
- [ ] Copied from existing article template (replayability.html)
- [ ] All required sections are present and complete
- [ ] Custom CSS follows existing patterns
- [ ] Ad spaces use standard slot numbers
- [ ] Meta description is SEO-optimized
- [ ] Article is added to articles.json
- [ ] Navigation structure matches existing articles
- [ ] Bootstrap version is 5.1.3
- [ ] No publication date in header
- [ ] Practical applications use `game-example` class
- [ ] No visual checklists or wheels
- [ ] Footer includes copyright script
- [ ] **Affiliate links script is included** (`../js/affiliateLinksStandalone.js`)
- [ ] **CRITICAL: Update "Coming Soon" buttons in game-design-principles.html**

## Common Implementation Issues

### Style Inconsistencies:
**Problem**: Article doesn't match site styling
**Solution**: Always copy from `replayability.html` and modify, don't create from scratch

### Navigation Issues:
**Problem**: Wrong navbar structure
**Solution**: Use regular navbar with logo, not fixed-top with search

### Bootstrap Version Issues:
**Problem**: Styling looks different
**Solution**: Use Bootstrap 5.1.3, not 5.3.0

### Ad Integration Issues:
**Problem**: Ads don't display properly
**Solution**: Use standard ad slot numbers (1234567890)

### "Coming Soon" Button Issues:
**Problem**: New articles still show "Coming Soon" buttons in game-design-principles.html
**Solution**: ALWAYS update the corresponding button in game-design-principles.html when creating a new article. Change `<a href="#" class="btn btn-outline-primary btn-sm">Coming Soon</a>` to `<a href="your-article.html" class="btn btn-outline-primary btn-sm">Read Article</a>`

## Best Practices

1. **Always copy from existing article** - Don't create new structure
2. **Follow established patterns** - Use existing CSS classes
3. **Test consistency** - Compare with other articles
4. **Use standard components** - Don't invent new layouts
5. **Maintain visual hierarchy** - Follow established spacing and typography

## Support
For questions about using this template, refer to existing game design articles, particularly `replayability.html` as the primary reference. Always test your article against existing ones to ensure consistency. 