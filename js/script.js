import { renderBehaviorDetail } from './templates/behaviorDetail.js';
import { renderSearchResults } from './templates/searchResults.js';
import { renderCategoryView } from './templates/categoryView.js';
import { fetchBehaviors, findBehaviorById, searchBehaviors, getBehaviorsByCategory } from './utils/api.js';
import { setupCategoryToggles, showContent, setInnerHTML, addClickHandlers, generateCategorySidebar } from './utils/dom.js';

let behaviorsData = null;
let categoriesData = null;

document.addEventListener('DOMContentLoaded', async function() {
    try {
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
        
        // Show landing page by default (content is already in HTML)
        showContent('default');
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

    // Modal functionality
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        // Reset form when modal is hidden
        contactModal.addEventListener('hidden.bs.modal', function () {
            const form = document.getElementById('contactForm');
            if (form) {
                form.reset();
                // Remove any existing messages
                const existingMessage = form.querySelector('.contact-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
            }
        });
    }

    // Use event delegation for category and behavior links
    document.addEventListener('click', function(e) {
        // Category headers - load category view
        if (e.target.closest('.category-toggle')) {
            e.preventDefault();
            const categoryToggle = e.target.closest('.category-toggle');
            const category = categoryToggle.getAttribute('data-category');
            if (category) {
                loadCategoryBehaviors(category);
            }
        }
        
        // Behavior links - load behavior detail
        if (e.target.closest('.sub-nav .nav-link')) {
            e.preventDefault();
            const link = e.target.closest('.sub-nav .nav-link');
            const behaviorId = link.getAttribute('href').substring(1);
            loadBehaviorContent(behaviorId);
        }
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
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
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
    
    // Prepare email content
    const emailBody = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
    const emailSubject = `Contact Form: ${subject}`;
    
    // Create mailto link
    const mailtoLink = `mailto:bloodmooninteractive@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Try to open default email client
    try {
        window.location.href = mailtoLink;
        
        // Show success message
        setTimeout(() => {
            showContactMessage('Thank you for your message! Your email client should have opened. If it didn\'t, please email us directly at bloodmooninteractive@gmail.com', 'success');
            form.reset();
        }, 1000);
        
    } catch (error) {
        showContactMessage('Unable to open email client. Please email us directly at bloodmooninteractive@gmail.com', 'error');
    }
    
    // Reset button
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }, 2000);
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