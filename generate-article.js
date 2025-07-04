#!/usr/bin/env node

// Script to generate HTML files for articles from JSON data
// Usage: node generate-article.js [article-id]

const fs = require('fs');
const path = require('path');

// Read the articles JSON file
function readArticlesData() {
    try {
        const data = fs.readFileSync('articles/articles.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading articles.json:', error);
        process.exit(1);
    }
}

// Generate HTML file for an article
function generateArticleHTML(article) {
    // Check if template file exists
    const templatePath = 'articles/article-template.html';
    if (!fs.existsSync(templatePath)) {
        console.error(`Template file not found: ${templatePath}`);
        process.exit(1);
    }
    
    const template = fs.readFileSync(templatePath, 'utf8');
    
    // Get current date for publication
    const currentDate = new Date();
    const publicationDate = currentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long' 
    });
    
    // Generate description from preview or content
    const description = article.preview || article.description || 'Article about GameGuru MAX behaviors and game development.';
    
    // Generate dynamic content based on article data
    const gameType = ['survival horror', 'action RPG', 'puzzle', 'adventure', 'stealth'][Math.floor(Math.random() * 5)];
    const scenarioDescription = `navigate through a ${['dimly lit facility', 'dangerous wilderness', 'abandoned city', 'mysterious laboratory'][Math.floor(Math.random() * 4)]} where ${article.title.toLowerCase()} controls critical environmental elements`;
    const scenarioDetails = 'carefully manage resources while avoiding detection';
    
    // Generate features (placeholder - would need to be enhanced with actual behavior data)
    const features = [
        'versatile functionality for game development',
        'simple integration with GameGuru MAX',
        'reliable performance and optimization',
        'configurable parameters for customization',
        'seamless behavior system integration'
    ];
    
    // Generate properties (placeholder)
    const properties = [
        { name: 'CONFIGURABLE', description: 'Main configuration parameter for the behavior' },
        { name: 'ENABLED', description: 'Enable or disable the behavior functionality' },
        { name: 'RANGE', description: 'Set the effective range of the behavior' },
        { name: 'SPEED', description: 'Control the speed of behavior execution' },
        { name: 'MODE', description: 'Select the operating mode for the behavior' }
    ];
    
    // Generate related behaviors (placeholder)
    const relatedBehaviors = [
        'Behavior System',
        'Game Mechanics',
        'Object Interaction',
        'Environmental Control',
        'Player Systems'
    ];
    
    // Generate properties HTML
    const propertiesHtml = properties.map(prop => 
        `<li><strong>${prop.name}:</strong> ${prop.description}</li>`
    ).join('\n                            ');
    
    // Generate features HTML
    const featuresHtml = features.map(feature => 
        `<li>${feature}</li>`
    ).join('\n                            ');
    
    // Generate related behaviors HTML
    const relatedHtml = relatedBehaviors.map(related => 
        `<li>${related}</li>`
    ).join('\n                            ');
    
    // Generate pro tip
    const proTip = `Generated on ${currentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })} | Blood Moon Interactive GameGuru MAX Behavior Library`;
    
    // Define all replacements
    const replacements = {
        'ARTICLE_TITLE': article.title,
        'ARTICLE_DESCRIPTION': description.length > 160 ? description.substring(0, 160) + '...' : description,
        'PUBLICATION_DATE': publicationDate,
        'CATEGORY': article.category || 'General',
        'ARTICLE_LEAD_PARAGRAPH': description,
        'BEHAVIOR_NAME': article.title,
        'GAME_TYPE': gameType,
        'SCENARIO_DESCRIPTION': scenarioDescription,
        'FEATURE_1': features[0],
        'FEATURE_2': features[1],
        'FEATURE_3': features[2],
        'SPECIFIC_GAMEPLAY_ELEMENT': `${(article.category || 'General').toLowerCase()} mechanics and environmental interaction`,
        'SCENARIO_DETAILS': scenarioDetails,
        'PROPERTY_NAME': properties[0].name,
        'PRIMARY_FEATURE': features[0],
        'SECONDARY_FEATURE': features[1],
        'PRO_TIP_TEXT': proTip,
        'PROPERTY_1: Description of what this property controls': propertiesHtml,
        'Feature description 1': featuresHtml,
        'Related Behavior 1': relatedHtml
    };
    
    // Apply all replacements
    let html = template;
    for (const [placeholder, value] of Object.entries(replacements)) {
        html = html.replace(new RegExp(placeholder, 'g'), value);
    }
    
    return html;
}

// Main function
function main() {
    const articlesData = readArticlesData();
    const articleId = process.argv[2];
    
    console.log('🎯 Article Generator for Blood Moon Interactive');
    console.log('==============================================\n');
    
    if (articleId) {
        // Generate specific article
        const article = articlesData.articles.find(a => a.id === articleId);
        if (!article) {
            console.error(`❌ Article with ID "${articleId}" not found`);
            console.log('\nAvailable articles:');
            articlesData.articles.forEach(art => {
                console.log(`  - ${art.id}: ${art.title}`);
            });
            process.exit(1);
        }
        
        console.log(`📝 Generating article: ${article.title}`);
        const html = generateArticleHTML(article);
        const filename = `articles/${articleId}.html`;
        fs.writeFileSync(filename, html);
        console.log(`✅ Generated: ${filename}`);
        console.log(`📅 Category: ${article.category}`);
        console.log(`📄 Preview: ${article.preview?.substring(0, 100)}...`);
        
    } else {
        // Generate all articles
        console.log(`🔄 Generating ${articlesData.articles.length} articles...\n`);
        
        articlesData.articles.forEach((article, index) => {
            console.log(`[${index + 1}/${articlesData.articles.length}] Generating: ${article.title}`);
            const html = generateArticleHTML(article);
            const filename = `articles/${article.id}.html`;
            fs.writeFileSync(filename, html);
            console.log(`   ✅ ${filename}`);
        });
        
        console.log(`\n🎉 Successfully generated ${articlesData.articles.length} articles!`);
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { generateArticleHTML, readArticlesData }; 