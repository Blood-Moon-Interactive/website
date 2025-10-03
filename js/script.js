import { renderBehaviorDetail } from './templates/behaviorDetail.js';
import { renderSearchResults } from './templates/searchResults.js';
import { renderCategoryView } from './templates/categoryView.js';
import { fetchBehaviors, findBehaviorById, searchBehaviors, getBehaviorsByCategory } from './utils/api.js';
import { setupCategoryToggles, showContent, setInnerHTML, addClickHandlers, generateCategorySidebar } from './utils/dom.js';
import { fetchArticles, getFeaturedArticle, renderArticlePreview } from './utils/articles.js';
import './utils/affiliateLinks.js';

// Fallback article data in case fetch fails
const fallbackArticleData = {
    articles: [
        {
            id: "getting-started-guide",
            title: "Getting Started with GameGuru MAX Behaviors",
            preview: "GameGuru MAX offers a powerful behavior system that allows you to create complex interactions without writing code. In this guide, we'll explore the fundamentals of behavior implementation, from basic object interactions to advanced AI systems...",
            date: "2024-12-01",
            author: "Blood Moon Interactive",
            category: "Tutorials",
            tags: ["beginner", "tutorial", "behaviors", "gameguru"],
            featured: true
        }
    ]
};

let behaviorsData = null;
let categoriesData = null;
let isInitialized = false;

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Update copyright year automatically
        updateCopyrightYear();
        
        // Initialize EmailJS
        emailjs.init("9iWDbIq3IAJUhZP-l");
        
        // Initialize behaviors data
        const data = await fetchBehaviors();
        behaviorsData = data.behaviors;
        categoriesData = data.categories;
        
        // Generate and populate sidebar
        const categoryAccordion = document.getElementById('categoryAccordion');
        categoryAccordion.innerHTML = generateCategorySidebar(categoriesData, behaviorsData);
        
        // Setup UI
        setupCategoryToggles();
        setupEventListeners();
        
        // Load and display featured article
        console.log('Starting article loading process...');
        let articlesData = null;
        
        // Check if we're in development or production
        const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        console.log('Environment:', isDevelopment ? 'Development' : 'Production');
        console.log('Hostname:', window.location.hostname);
        
        try {
            console.log('Attempting to load articles...');
            articlesData = await fetchArticles();
            console.log('Articles data loaded:', articlesData);
        } catch (error) {
            console.error('Could not fetch articles, using fallback data:', error);
            articlesData = fallbackArticleData;
        }
        
        try {
            const featuredArticle = getFeaturedArticle(articlesData.articles);
            if (featuredArticle) {
                console.log('Featured article found:', featuredArticle.title);
                const articlePreviewHtml = renderArticlePreview(featuredArticle);
                const articleContainer = document.getElementById('featuredArticleContainer');
                if (articleContainer) {
                    articleContainer.innerHTML = articlePreviewHtml;
                } else {
                    console.error('Featured article container not found');
                }
            } else {
                console.warn('No featured article found');
                const articleContainer = document.getElementById('featuredArticleContainer');
                if (articleContainer) {
                    articleContainer.innerHTML = `
                        <div class="article-card card">
                            <div class="card-body">
                                <h4 class="card-title">Getting Started with GameGuru MAX Behaviors</h4>
                                <p class="card-text text-muted">
                                    <small><i class="bi bi-calendar3 me-2"></i>December 2024</small>
                                    <small class="ms-3"><i class="bi bi-person me-2"></i>Blood Moon Interactive</small>
                                </p>
                                <p class="card-text">
                                    GameGuru MAX offers a powerful behavior system that allows you to create complex interactions without writing code. In this guide, we'll explore the fundamentals of behavior implementation, from basic object interactions to advanced AI systems...
                                </p>
                                <div class="article-tags mb-3">
                                    <span class="badge bg-secondary me-1">beginner</span>
                                    <span class="badge bg-secondary me-1">tutorial</span>
                                    <span class="badge bg-secondary me-1">behaviors</span>
                                    <span class="badge bg-secondary me-1">gameguru</span>
                                </div>
                                <a href="articles/getting-started-guide.html" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Error rendering featured article:', error);
            const articleContainer = document.getElementById('featuredArticleContainer');
            if (articleContainer) {
                articleContainer.innerHTML = `
                    <div class="article-card card">
                        <div class="card-body">
                            <h4 class="card-title">Getting Started with GameGuru MAX Behaviors</h4>
                            <p class="card-text text-muted">
                                <small><i class="bi bi-calendar3 me-2"></i>December 2024</small>
                                <small class="ms-3"><i class="bi bi-person me-2"></i>Blood Moon Interactive</small>
                            </p>
                            <p class="card-text">
                                GameGuru MAX offers a powerful behavior system that allows you to create complex interactions without writing code. In this guide, we'll explore the fundamentals of behavior implementation, from basic object interactions to advanced AI systems...
                            </p>
                            <div class="article-tags mb-3">
                                <span class="badge bg-secondary me-1">beginner</span>
                                <span class="badge bg-secondary me-1">tutorial</span>
                                <span class="badge bg-secondary me-1">behaviors</span>
                                <span class="badge bg-secondary me-1">gameguru</span>
                            </div>
                            <a href="articles/getting-started-guide.html" class="btn btn-primary">Read More</a>
                        </div>
                    </div>
                `;
            }
        }
        
        // Show landing page by default (content is already in HTML)
        showContent('default');
        
        // Prevent any automatic category loading by ensuring we stay on landing page
        // Only load specific content if there's a hash in the URL
        const hash = window.location.hash.substring(1);
        if (hash) {
            // Handle hash navigation if needed
            const behavior = findBehaviorById(behaviorsData, hash);
            if (behavior) {
                loadBehaviorContent(hash);
            }
        } else {
            // Explicitly ensure we're showing the landing page
            showContent('default');
        }
        
        // Mark as initialized to prevent any automatic redirects
        isInitialized = true;
    } catch (error) {
        console.error('Initialization error:', error);
        setInnerHTML('defaultContent', `
            <div class="alert alert-danger">
                <h4 class="alert-heading">Error</h4>
                <p>${error.message}</p>
            </div>
        `);
    }
});

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchBehaviors');
    const searchButton = document.getElementById('searchButton');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Use event delegation for navigation - this will work for all current and future links
    document.addEventListener('click', function(e) {
        console.log('Click detected on:', e.target);
        console.log('Click target classes:', e.target.className);
        
        // Check if the clicked element is a navigation link, navbar brand, logo link, or button with href
        const link = e.target.closest('.nav-link, .navbar-brand, .sidebar-brand a, a[href^="#"]');
        
        console.log('Closest link found:', link);
        
        if (link) {
            const href = link.getAttribute('href');
            
            console.log('Navigation link clicked:', href);
            console.log('Link element:', link);
            console.log('Link classes:', link.className);
            console.log('Is category toggle:', link.classList.contains('category-toggle'));
            
            // Only handle internal links (but not category toggles)
            if (href && href.startsWith('#') && !link.classList.contains('category-toggle')) {
                e.preventDefault();
                const targetId = href.substring(1);
                
                console.log('Target ID:', targetId);
                console.log('Target ID length:', targetId.length);
                
                // Skip empty target IDs (href="#")
                if (!targetId) {
                    console.log('Skipping empty target ID');
                    return;
                }
                
                // Handle home link
                if (targetId === 'home') {
                    console.log('Returning to home page');
                    returnToHomePage();
                    return;
                }
                
                // Check if this is a category link (starts with category-)
                if (href.startsWith('#category-')) {
                    const category = targetId.replace('category-', '').replace(/-/g, ' ');
                    // Convert back to proper category name (capitalize first letter of each word)
                    const categoryName = category.split(' ').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ');
                    console.log('Loading category:', categoryName);
                    loadCategoryBehaviors(categoryName);
                } else {
                    // This is a behavior link
                    console.log('Loading behavior:', targetId);
                    loadBehaviorContent(targetId);
                }
            } else {
                console.log('Link ignored - not a valid navigation link');
            }
        } else {
            console.log('No navigation link found for this click');
        }
    });
}

async function loadBehaviorContent(behaviorId) {
    try {
        console.log('Trying to load behavior with ID:', behaviorId);
        console.log('Available behaviors:', Object.keys(behaviorsData));
        
        const behavior = findBehaviorById(behaviorsData, behaviorId);
        console.log('Found behavior:', behavior);
        
        if (!behavior) {
            throw new Error('Behavior not found');
        }
        
        showContent('default');
        setInnerHTML('defaultContent', renderBehaviorDetail(behavior));
        
        // Event delegation handles all navigation links, no need for individual handlers
    } catch (error) {
        console.error('Error loading behavior:', error);
        setInnerHTML('defaultContent', `
            <div class="alert alert-danger">
                Error loading behavior: ${error.message}
            </div>
        `);
    }
}

function loadCategoryBehaviors(category) {
    // Prevent automatic category loading during initialization
    if (!isInitialized) {
        return;
    }
    
    try {
        const behaviors = getBehaviorsByCategory(behaviorsData, category);
        const categoryInfo = categoriesData[category];
        
        showContent('default');
        setInnerHTML('defaultContent', renderCategoryView(category, behaviors, categoryInfo));
        
        // Event delegation handles all navigation links, no need for individual handlers
    } catch (error) {
        console.error('Error loading category:', error);
        setInnerHTML('defaultContent', `
            <div class="alert alert-danger">
                Error loading category: ${error.message}
            </div>
        `);
    }
}

function performSearch() {
    const searchInput = document.getElementById('searchBehaviors');
    const query = searchInput.value.trim();
    
    if (!query) {
        showContent('default');
        return;
    }

    try {
        const results = searchBehaviors(behaviorsData, query);
        
        showContent('search');
        setInnerHTML('searchResults', renderSearchResults(results));
        
        // Clear the search box
        searchInput.value = '';
        
        // Event delegation handles all navigation links, no need for individual handlers
    } catch (error) {
        console.error('Search error:', error);
        setInnerHTML('searchResults', `
            <div class="alert alert-danger">
                <h4 class="alert-heading">Search Error</h4>
                <p>${error.message}</p>
                <hr>
                <p class="mb-0">Please try again with different search terms.</p>
            </div>
        `);
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('user_name').trim();
    const email = formData.get('user_email').trim();
    const subject = formData.get('subject');
    const message = formData.get('message').trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showContactMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showContactMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
    
    // Submit to EmailJS
    // Note: If you switch to a different email service, update this service ID
    emailjs.send('service_t1r4avk', 'template_s8og17x', {
        user_name: name,
        user_email: email,
        subject: subject,
        message: message
    })
    .then(response => {
        console.log('EmailJS Success:', response);
        if (response.status === 200) {
            showContactMessage('Thank you for your message! We\'ll get back to you within 24-72 hours.', 'success');
            form.reset();
        } else {
            throw new Error('Failed to send message');
        }
    })
    .catch(error => {
        console.error('Contact form error details:', error);
        console.error('Error type:', typeof error);
        console.error('Error message:', error.message);
        console.error('Error status:', error.status);
        showContactMessage('Sorry, there was an error sending your message. Please try again or email us directly at bloodmooninteractive@gmail.com', 'error');
    })
    .finally(() => {
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    });
}

function showContactMessage(message, type) {
    const form = document.getElementById('contactForm');
    const existingMessage = form.querySelector('.contact-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `contact-message ${type}`;
    messageDiv.innerHTML = `
        <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i>
        ${message}
    `;
    
    form.insertBefore(messageDiv, form.firstChild);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function returnToHomePage() {
    // Show default content area
    showContent('default');
    
    // Reset the default content to the original landing page HTML
    const defaultContent = document.getElementById('defaultContent');
    defaultContent.innerHTML = `
        <div class="landing-page">
            <div class="welcome-section mb-4">
                <h1>Welcome to Blood Moon Interactive</h1>
                <p class="lead">Your comprehensive resource for GameGuru MAX behaviors and tutorials.</p>
            </div>

            <div class="row mb-4">
                <div class="col-md-9">
                    <div class="intro-text">
                        <h3>Getting Started</h3>
                        <p>Welcome to Blood Moon Interactive's comprehensive GameGuru MAX behavior library. Whether you're a beginner looking to understand the basics or an experienced developer seeking advanced techniques, you'll find detailed documentation, step-by-step tutorials, and practical examples for every behavior in our collection.</p>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quick-links card">
                        <div class="card-header">
                            <h4>Quick Links</h4>
                        </div>
                        <div class="card-body">
                            <ul class="list-unstyled">
                                <li><a href="#" class="quick-link">Popular Behaviors</a></li>
                                <li><a href="#" class="quick-link">Recent Tutorials</a></li>
                                <li><a href="#" class="quick-link">Community Submissions</a></li>
                                <li><a href="#" class="quick-link" data-bs-toggle="modal" data-bs-target="#contactModal">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-9">
                    <div class="article-section">
                        <h3>Latest Article</h3>
                        <div id="featuredArticleContainer">
                            <!-- Featured article will be loaded here -->
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <!-- Bottom Right Ad Space - aligned with article and extending to footer -->
                    <div class="ad-container ad-sidebar text-center">
                        <ins class="adsbygoogle"
                             style="display:block"
                             data-ad-client="ca-pub-7908718257772872"
                             data-ad-slot="5812492004"
                             data-ad-format="auto"
                             data-full-width-responsive="true"></ins>
                        <script>
                             (adsbygoogle = window.adsbygoogle || []).push({});
                        </script>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Reload the featured article
    loadFeaturedArticle();
}

async function loadFeaturedArticle() {
    try {
        console.log('Loading featured article...');
        let articlesData = null;
        
        try {
            articlesData = await fetchArticles();
        } catch (error) {
            console.error('Could not fetch articles, using fallback data:', error);
            articlesData = fallbackArticleData;
        }
        
        const featuredArticle = getFeaturedArticle(articlesData.articles);
        if (featuredArticle) {
            console.log('Featured article found:', featuredArticle.title);
            const articlePreviewHtml = renderArticlePreview(featuredArticle);
            const articleContainer = document.getElementById('featuredArticleContainer');
            if (articleContainer) {
                articleContainer.innerHTML = articlePreviewHtml;
            }
        }
    } catch (error) {
        console.error('Error loading featured article:', error);
    }
}

function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
} 