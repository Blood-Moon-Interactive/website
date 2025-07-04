# Article Template Guide

## Overview
This guide explains how to use the `article-template.html` file to create new articles for the Blood Moon Interactive website. The template follows the established structure and includes all necessary sections with placeholder content.

## Template Structure

### Ad Integration
The template includes multiple ad spaces for monetization:
- **Top Content Ad**: Above the article content
- **Sidebar Ad**: In the right sidebar
- **Inline Ad**: Between content sections
- **Bottom Sidebar Ad**: At the bottom of the sidebar

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
- `PUBLICATION_DATE` - Date in format "Month YYYY" (e.g., "December 2024")
- `CATEGORY` - The behavior category (e.g., "HUDs", "RPG", "Effects")

#### **Content Section**
- `ARTICLE_LEAD_PARAGRAPH` - Opening paragraph that summarizes the article
- `BEHAVIOR_NAME` - Name of the behavior being documented
- `GAME_TYPE` - Type of game (e.g., "survival horror", "action RPG", "puzzle")
- `SCENARIO_DESCRIPTION` - Description of the game scenario
- `FEATURE_1`, `FEATURE_2`, `FEATURE_3` - Key features of the behavior
- `SPECIFIC_GAMEPLAY_ELEMENT` - Specific gameplay element created
- `SCENARIO_DETAILS` - Additional scenario details
- `PROPERTY_NAME` - Name of a key property
- `PRIMARY_FEATURE` - Main feature of the behavior
- `SECONDARY_FEATURE` - Secondary feature of the behavior
- `PRO_TIP_TEXT` - Pro tip content

#### **Properties Section**
- `PROPERTY_1` through `PROPERTY_5` - Property names and descriptions
- Format: `PROPERTY_NAME: Description of what this property controls`

#### **Features Section**
- Replace the 8 feature placeholders with actual behavior features
- Each feature should be a complete sentence describing functionality

#### **Related Behaviors Section**
- Replace the 5 related behavior placeholders with actual related behaviors
- These should be behaviors that work well together or are similar in function

### Optional Sections

#### **Video Tutorial Section**
```html
<!-- Uncomment and modify this section if you have a tutorial video -->
<div class="mb-4">
    <div class="ratio ratio-16x9">
        <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Tutorial Video" allowfullscreen></iframe>
    </div>
</div>
```
- Replace `VIDEO_ID` with the YouTube video ID (the part after `v=` in the URL)

#### **Key Takeaway Alert**
```html
<!-- Uncomment and modify this section for important takeaways -->
<div class="alert alert-info">
    <h5><i class="bi bi-lightbulb me-2"></i>Key Takeaway</h5>
    <p class="mb-0">KEY_TAKEAWAY_TEXT</p>
</div>
```

## Content Guidelines

### **Lead Paragraph**
- Should be 2-3 sentences
- Summarize what the behavior does
- Mention key features and benefits
- Use engaging language

### **Creative Game Scenario**
- Create an immersive scenario
- Use specific game types and genres
- Mention key features naturally
- Make it relatable to developers

### **Why It Works**
- Explain the technical benefits
- Focus on game design advantages
- List specific use cases
- Emphasize integration benefits

### **Key Properties**
- List 5 most important properties
- Use UPPER_CASE for property names
- Provide clear, concise descriptions
- Focus on what developers need to know

### **Features**
- List 6-8 key features
- Use complete sentences
- Be specific about functionality
- Include both basic and advanced features

### **Related Behaviors**
- List 5 behaviors that work well together
- Include behaviors from the same category
- Consider complementary behaviors
- Use actual behavior names from the library

### **Implementation Notes**
- Provide step-by-step instructions
- Include the standard 5-step process
- Add specific notes about the behavior
- Mention category-specific considerations

### **Pro Tip**
- Provide actionable advice
- Focus on best practices
- Include specific tips for the behavior
- Keep it concise and helpful

## File Naming Convention
- Use lowercase with underscores: `behavior_name.html`
- Match the behavior ID from the JSON data
- Keep names descriptive but concise

## Integration with articles.json
After creating the HTML file, add an entry to `articles.json`:

```json
{
  "id": "behavior_name",
  "title": "Behavior Name",
  "preview": "Brief description for preview...",
  "date": "YYYY-MM-DD",
  "author": "Blood Moon Interactive",
  "category": "Category",
  "tags": ["tag1", "tag2", "tag3"],
  "featured": false,
  "filename": "behavior_name.html"
}
```

## Example Usage

### Before (Template):
```html
<h1 class="article-title">ARTICLE_TITLE</h1>
<div class="article-meta text-muted">
    <i class="bi bi-calendar3 me-2"></i>PUBLICATION_DATE
    <i class="bi bi-person me-2 ms-3"></i>Blood Moon Interactive
    <i class="bi bi-tag me-2 ms-3"></i>CATEGORY
</div>
```

### After (Completed):
```html
<h1 class="article-title">Adaptive Crosshair</h1>
<div class="article-meta text-muted">
    <i class="bi bi-calendar3 me-2"></i>July 2025
    <i class="bi bi-person me-2 ms-3"></i>Blood Moon Interactive
    <i class="bi bi-tag me-2 ms-3"></i>HUDs
</div>
```

## Best Practices

1. **Consistency**: Follow the established format and style
2. **Completeness**: Fill in all required sections
3. **Accuracy**: Ensure all information is correct and up-to-date
4. **Clarity**: Write clear, concise descriptions
5. **SEO**: Use descriptive titles and meta descriptions
6. **Links**: Ensure all internal links work correctly
7. **Testing**: Test the page after creation

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
For questions about using this template, refer to existing articles or contact the development team. 