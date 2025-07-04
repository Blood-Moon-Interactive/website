# Game Design Template Guide

## Overview
This guide explains how to use the `game-design-template.html` file to create new game design principle articles for the Blood Moon Interactive website. This template is specifically designed for indie game developers and covers core game design concepts that apply across all game development platforms.

## Template Structure

### Ad Integration
The template includes multiple ad spaces for monetization:
- **Top Content Ad**: Above the article content
- **Inline Ad**: Between content sections
- **Bottom Sidebar Ad**: At the bottom of the sidebar (sticky positioning)

All ad spaces use the `ad-container` and `ad-placeholder` CSS classes for consistent styling.

### Analytics Integration
The template includes Google Analytics tracking:
- **Google Tag Manager**: G-LX742FRW91
- **Google AdSense**: ca-pub-7908718257772872
- **Cache Control**: Optimized for content delivery

### Required Placeholder Variables
Replace these placeholders with actual content:

#### **Header Section**
- `ARTICLE_TITLE` - The main title of the article
- `ARTICLE_DESCRIPTION` - Meta description for SEO

#### **Content Section**
- `ARTICLE_LEAD_PARAGRAPH` - Opening paragraph that summarizes the article
- `CONCEPT_DESCRIPTION` - Detailed explanation of the game design concept
- `ADAPTATION_REASON` - Why this concept is important for game adaptation
- `PRINCIPLE_1` through `PRINCIPLE_5` - Core principles with descriptions
- `PRO_TIP_TEXT` - Pro tip content

### Content Sections

#### **Understanding the Concept**
- Explain the game design principle in detail
- Provide context for why it matters
- Make it accessible to entry-level developers

#### **Why This Matters for Indie Developers**
- Focus on the unique challenges indie developers face
- Emphasize resource constraints and market competition
- Provide motivation for learning the concept

#### **Core Principles**
- List 5 key principles related to the concept
- Use clear, actionable language
- Provide specific examples where possible

#### **Practical Applications**
- List 6 practical ways to apply the concept
- Include specific game genres or scenarios
- Make suggestions actionable

#### **Common Mistakes to Avoid**
- List 5 common pitfalls
- Explain why these mistakes happen
- Provide guidance on how to avoid them

#### **Implementation Tips**
- Provide a 5-step implementation process
- Focus on practical workflow integration
- Emphasize iteration and testing

## Content Guidelines

### **Target Audience**
- **Entry-level indie developers**: Focus on foundational concepts
- **Cross-platform applicability**: Don't tie concepts to specific engines
- **Practical focus**: Emphasize real-world application over theory

### **Lead Paragraph**
- Should be 2-3 sentences
- Summarize the concept and its importance
- Mention key benefits for indie developers
- Use engaging, accessible language

### **Concept Description**
- Explain the principle in simple terms
- Use analogies or examples when helpful
- Connect to familiar game experiences
- Avoid overly technical jargon

### **Indie Developer Focus**
- Address specific challenges (limited resources, time constraints)
- Emphasize efficiency and impact
- Discuss market positioning
- Consider technical limitations

### **Core Principles**
- List 5 fundamental aspects of the concept
- Use clear, descriptive language
- Provide brief explanations for each
- Focus on actionable insights

### **Practical Applications**
- List 6 specific ways to use the concept
- Include different game genres
- Provide concrete examples
- Make suggestions implementable

### **Common Mistakes**
- List 5 frequent errors
- Explain the reasoning behind each mistake
- Provide clear guidance on avoidance
- Use real examples when possible

### **Implementation Process**
- Provide a clear 5-step process
- Focus on practical workflow integration
- Emphasize testing and iteration
- Include quality assurance steps

### **Pro Tip**
- Provide actionable advice
- Focus on efficiency or quality improvements
- Include specific tips for indie developers
- Keep it concise and memorable

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
  "date": "YYYY-MM-DD",
  "author": "Blood Moon Interactive",
  "category": "Game Design",
  "tags": ["game-design", "indie", "principles", "concept"],
  "featured": false,
  "filename": "concept_name.html"
}
```

## Example Usage

### Before (Template):
```html
<h1 class="article-title">ARTICLE_TITLE</h1>
<div class="article-meta text-muted">
    <i class="bi bi-person me-2"></i>Blood Moon Interactive
    <i class="bi bi-tag me-2 ms-3"></i>Game Design
</div>
```

### After (Completed):
```html
<h1 class="article-title">The Core Gameplay Loop</h1>
<div class="article-meta text-muted">
    <i class="bi bi-person me-2"></i>Blood Moon Interactive
    <i class="bi bi-tag me-2 ms-3"></i>Game Design
</div>
```

## Best Practices

1. **Accessibility**: Write for entry-level developers
2. **Practicality**: Focus on actionable advice over theory
3. **Cross-platform**: Avoid engine-specific language
4. **Examples**: Use familiar games as references
5. **SEO**: Use descriptive titles and meta descriptions
6. **Consistency**: Follow the established format
7. **Testing**: Test the page after creation

## Content Themes for Game Design Articles

### **Core Concepts**
- Core Gameplay Loops
- Player Motivation
- Feedback Systems
- Difficulty Balancing
- Progression Systems

### **Design Principles**
- Player Agency
- Emergent Gameplay
- Risk vs. Reward
- Accessibility Design
- Narrative Integration

### **Technical Design**
- Performance Optimization
- Scalability
- Modular Design
- Data-Driven Design
- Prototyping Strategies

### **Business & Marketing**
- Target Audience Analysis
- Market Positioning
- Monetization Strategies
- Community Building
- Launch Planning

## Troubleshooting

### Common Issues:
- **Missing placeholders**: Ensure all placeholders are replaced
- **Broken links**: Check that all href attributes are correct
- **Inconsistent styling**: Use the provided CSS classes
- **Missing content**: Fill in all required sections

### Validation:
- Check HTML validity
- Ensure responsive design works
- Test navigation functionality
- Verify search integration

## Support
For questions about using this template, refer to existing game design articles or contact the development team. 