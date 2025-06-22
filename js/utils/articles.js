// Article management utilities for AI-generated content

export async function fetchArticles() {
    // Log current location to help debug
    console.log('Current location:', window.location.href);
    console.log('Current pathname:', window.location.pathname);
    console.log('Current origin:', window.location.origin);
    
    // Try the most likely path first
    const path = 'articles/articles.json';
    
    try {
        console.log(`Trying to fetch articles from: ${path}`);
        const response = await fetch(path, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (response.ok) {
            console.log(`Successfully fetched articles from: ${path}`);
            return await response.json();
        } else {
            console.log(`HTTP ${response.status} for ${path}`);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.log(`Failed to fetch from ${path}:`, error.message);
        throw error;
    }
}

export function getFeaturedArticle(articles) {
    return articles.find(article => article.featured) || articles[0];
}

export function getArticlesByCategory(articles, category) {
    return articles.filter(article => article.category === category);
}

export function getArticlesByTag(articles, tag) {
    return articles.filter(article => article.tags.includes(tag));
}

export function sortArticlesByDate(articles, ascending = false) {
    return [...articles].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return ascending ? dateA - dateB : dateB - dateA;
    });
}

export function renderArticlePreview(article) {
    const date = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });
    
    return `
        <div class="article-card card">
            <div class="card-body">
                <h4 class="card-title">${article.title}</h4>
                <p class="card-text text-muted">
                    <small><i class="bi bi-calendar3 me-2"></i>${date}</small>
                    <small class="ms-3"><i class="bi bi-person me-2"></i>${article.author}</small>
                </p>
                <p class="card-text">
                    ${article.preview}
                </p>
                <div class="article-tags mb-3">
                    ${article.tags.map(tag => `<span class="badge bg-secondary me-1">${tag}</span>`).join('')}
                </div>
                <a href="articles/${article.id}.html" class="btn btn-primary">Read More</a>
            </div>
        </div>
    `;
}

export function renderArticleContent(article) {
    const date = new Date(article.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const sectionsHtml = article.content.sections.map(section => {
        let sectionHtml = `
            <h2>${section.title}</h2>
            <p>${section.content}</p>
        `;
        
        if (section.list) {
            const listType = section.listType === 'ordered' ? 'ol' : 'ul';
            sectionHtml += `
                <${listType}>
                    ${section.list.map(item => `<li>${item}</li>`).join('')}
                </${listType}>
            `;
        }
        
        return sectionHtml;
    }).join('');
    
    const tipHtml = article.content.tip ? `
        <div class="alert alert-info">
            <h5><i class="bi bi-lightbulb me-2"></i>${article.content.tip.title}</h5>
            <p class="mb-0">${article.content.tip.content}</p>
        </div>
    ` : '';
    
    const relatedArticlesHtml = article.content.relatedArticles ? `
        <h5>Related Articles</h5>
        <ul class="list-unstyled">
            ${article.content.relatedArticles.map(related => 
                `<li><a href="${related.url}" class="text-decoration-none">${related.title}</a></li>`
            ).join('')}
        </ul>
    ` : '';
    
    return `
        <header class="article-header mb-4">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="../index.html">Home</a></li>
                    <li class="breadcrumb-item active">Articles</li>
                </ol>
            </nav>
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta text-muted">
                <i class="bi bi-calendar3 me-2"></i>${date}
                <i class="bi bi-person me-2 ms-3"></i>${article.author}
                <i class="bi bi-tag me-2 ms-3"></i>${article.category}
            </div>
        </header>

        <div class="article-body">
            <p class="lead">${article.content.lead}</p>
            ${sectionsHtml}
            ${tipHtml}
        </div>

        <footer class="article-footer mt-5 pt-4 border-top">
            <div class="row">
                <div class="col-md-6">
                    ${relatedArticlesHtml}
                </div>
                <div class="col-md-6 text-md-end">
                    <a href="../index.html" class="btn btn-outline-primary">
                        <i class="bi bi-arrow-left me-2"></i>Back to Home
                    </a>
                </div>
            </div>
        </footer>
    `;
}

// Function to generate article HTML file content
export function generateArticleHTML(article) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${article.title} - Blood Moon Interactive</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="../index.html">Blood Moon Interactive</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="ms-auto">
                    <div class="input-group">
                        <input type="text" class="form-control" id="searchBehaviors" placeholder="Search behaviors...">
                        <button class="btn btn-outline-light" type="button" id="searchButton">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <div class="container mt-5 pt-4">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <article class="article-content" id="articleContent">
                    <!-- Article content will be loaded here -->
                </article>
            </div>
        </div>
    </div>

    <footer class="footer mt-auto py-3 bg-dark">
        <div class="container text-center">
            <p class="text-light mb-0">Created by Blood Moon Interactive</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script type="module">
        import { fetchArticles, renderArticleContent } from '../js/utils/articles.js';
        
        async function loadArticle() {
            try {
                const data = await fetchArticles();
                const articleId = window.location.pathname.split('/').pop().replace('.html', '');
                const article = data.articles.find(a => a.id === articleId);
                
                if (article) {
                    document.getElementById('articleContent').innerHTML = renderArticleContent(article);
                } else {
                    document.getElementById('articleContent').innerHTML = '<div class="alert alert-danger">Article not found</div>';
                }
            } catch (error) {
                console.error('Error loading article:', error);
                document.getElementById('articleContent').innerHTML = '<div class="alert alert-danger">Error loading article</div>';
            }
        }
        
        loadArticle();
    </script>
</body>
</html>`;
} 