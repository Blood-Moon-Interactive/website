import { renderBehaviorDetail } from './templates/behaviorDetail.js';
import { renderSearchResults } from './templates/searchResults.js';
import { renderCategoryView } from './templates/categoryView.js';
import { fetchBehaviors, findBehaviorById, searchBehaviors, getBehaviorsByCategory } from './utils/api.js';
import { setupCategoryToggles, showContent, setInnerHTML, addClickHandlers, generateCategorySidebar } from './utils/dom.js';
import { fetchArticles, getFeaturedArticle, renderArticlePreview } from './utils/articles.js';

let behaviorsData = null;
let categoriesData = null;
let isInitialized = false;

document.addEventListener('DOMContentLoaded', async function() {
    try {
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
        try {
            console.log('Attempting to load articles...');
            const articlesData = await fetchArticles();
            console.log('Articles data loaded:', articlesData);
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
            console.error('Could not load featured article:', error);
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

    // Category links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const behaviorId = this.getAttribute('href').substring(1);
            loadBehaviorContent(behaviorId);
        });
    });
}

async function loadBehaviorContent(behaviorId) {
    try {
        const behavior = findBehaviorById(behaviorsData, behaviorId);
        if (!behavior) {
            throw new Error('Behavior not found');
        }
        
        showContent('default');
        setInnerHTML('defaultContent', renderBehaviorDetail(behavior));
        
        // Add click handlers to related behavior links
        addClickHandlers('a[href^="#"]', function(e) {
            e.preventDefault();
            const relatedId = this.getAttribute('href').substring(1);
            loadBehaviorContent(relatedId);
        });
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
        
        // Add click handlers to behavior cards
        addClickHandlers('.card-footer a', function(e) {
            e.preventDefault();
            const behaviorId = this.getAttribute('href').substring(1);
            loadBehaviorContent(behaviorId);
        });
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
        
        // Add click handlers to search result cards
        addClickHandlers('.card-footer a', function(e) {
            e.preventDefault();
            const behaviorId = this.getAttribute('href').substring(1);
            loadBehaviorContent(behaviorId);
        });
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