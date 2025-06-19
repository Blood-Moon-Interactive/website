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
        
        // Load initial content
        const firstCategory = Object.keys(categoriesData)[0] || 'Effects';
        loadCategoryBehaviors(firstCategory);
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