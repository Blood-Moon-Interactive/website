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
    const template = fs.readFileSync('articles/template.html', 'utf8');
    
    // Replace the title placeholder
    const html = template.replace(
        '<title>Article Title - Blood Moon Interactive</title>',
        `<title>${article.title} - Blood Moon Interactive</title>`
    );
    
    return html;
}

// Main function
function main() {
    const articlesData = readArticlesData();
    const articleId = process.argv[2];
    
    if (articleId) {
        // Generate specific article
        const article = articlesData.articles.find(a => a.id === articleId);
        if (!article) {
            console.error(`Article with ID "${articleId}" not found`);
            process.exit(1);
        }
        
        const html = generateArticleHTML(article);
        const filename = `articles/${articleId}.html`;
        fs.writeFileSync(filename, html);
        console.log(`Generated: ${filename}`);
    } else {
        // Generate all articles
        articlesData.articles.forEach(article => {
            const html = generateArticleHTML(article);
            const filename = `articles/${article.id}.html`;
            fs.writeFileSync(filename, html);
            console.log(`Generated: ${filename}`);
        });
    }
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { generateArticleHTML, readArticlesData }; 