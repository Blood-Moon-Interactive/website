/**
 * Affiliate Links Manager
 * Centralized management of affiliate links for Blood Moon Interactive
 */

const AFFILIATE_LINKS = {
    gameDesign: [
        {
            title: "Half-Real by Jesper Juul",
            url: "https://amzn.to/4nuO0FD",
            category: "theory"
        },
        {
            title: "Game Mechanics by Adams & Dormans",
            url: "https://amzn.to/4ksCkjT",
            category: "systems"
        },
        {
            title: "Art of Game Design by Schell",
            url: "https://amzn.to/3U3PadD",
            category: "comprehensive"
        },
        {
            title: "Game Design Workshop by Fullerton",
            url: "https://amzn.to/3GvAhOg",
            category: "practical"
        },
        {
            title: "Rules of Play by Salen & Zimmerman",
            url: "https://amzn.to/4lc6VU1",
            category: "framework"
        },
        {
            title: "Level Up! The Guide to Great Video Game Design by Scott Rogers",
            url: "https://amzn.to/3Gbkd4f",
            category: "industry"
        },
        {
            title: "Video Game Storytelling by Evan Skolnick",
            url: "https://amzn.to/44gE1fH",
            category: "narrative"
        }
    ],
    business: [
        // Future business/marketing affiliate links
    ],
    tools: [
        // Future tool/software affiliate links
    ]
};

/**
 * Renders affiliate links section
 * @param {string} category - The category of links to display
 * @param {string} containerId - The ID of the container to render into
 */
function renderAffiliateLinks(category = 'gameDesign', containerId = 'affiliate-links-container') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Affiliate links container with ID '${containerId}' not found`);
        return;
    }

    const links = AFFILIATE_LINKS[category];
    if (!links || links.length === 0) {
        console.warn(`No affiliate links found for category '${category}'`);
        return;
    }

    const html = `
        <div class="card mb-4">
            <div class="card-header">
                <h5><i class="bi bi-heart me-2 text-danger"></i>Support the Site</h5>
            </div>
            <div class="card-body">
                <p class="small mb-3">These are affiliate links. When you make a purchase through these links, it helps support Blood Moon Interactive and keeps our content free for everyone. Thank you for your support!</p>
                <ul class="list-unstyled small">
                    ${links.map(link => `
                        <li class="mb-2">
                            <a href="${link.url}" class="text-decoration-none" target="_blank" rel="noopener noreferrer">
                                ${link.title}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

/**
 * Adds affiliate links to the sidebar of a page
 * @param {string} category - The category of links to display
 */
function addAffiliateLinksToSidebar(category = 'gameDesign') {
    // Find the sidebar (usually the second column in the main row)
    const mainRow = document.querySelector('.row');
    if (!mainRow) return;

    const sidebar = mainRow.querySelector('.col-lg-4');
    if (!sidebar) return;

    // Create container for affiliate links
    const affiliateContainer = document.createElement('div');
    affiliateContainer.id = 'affiliate-links-container';
    
    // Insert before the last element in sidebar (usually before bottom ad)
    const lastElement = sidebar.lastElementChild;
    if (lastElement) {
        sidebar.insertBefore(affiliateContainer, lastElement);
    } else {
        sidebar.appendChild(affiliateContainer);
    }

    // Render the affiliate links
    renderAffiliateLinks(category, 'affiliate-links-container');
}

/**
 * Auto-detect page type and add appropriate affiliate links
 */
function autoAddAffiliateLinks() {
    const path = window.location.pathname;
    
    // Game design related pages
    if (path.includes('game-design-principles') || 
        path.includes('core-gameplay-loops') ||
        path.includes('player-motivation') ||
        path.includes('feedback-systems') ||
        path.includes('difficulty-balancing') ||
        path.includes('player-agency') ||
        path.includes('emergent-gameplay') ||
        path.includes('flow-theory') ||
        path.includes('feedback-loops') ||
        path.includes('risk-vs-reward') ||
        path.includes('reward-systems') ||
        path.includes('game-genres-mechanics') ||
        path.includes('juice') ||
        path.includes('rule-clarity-constraints') ||
        path.includes('accessibility-design') ||
        path.includes('performance-optimization') ||
        path.includes('prototyping-strategies') ||
        path.includes('pacing-and-progression') ||
        path.includes('emergent-vs-scripted') ||
        path.includes('replayability') ||
        path.includes('playtesting-and-iteration') ||
        path.includes('onboarding-and-first-time-user-experience')) {
        addAffiliateLinksToSidebar('gameDesign');
    }
    // Add more categories as needed
    // else if (path.includes('business') || path.includes('marketing')) {
    //     addAffiliateLinksToSidebar('business');
    // }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AFFILIATE_LINKS, renderAffiliateLinks, addAffiliateLinksToSidebar, autoAddAffiliateLinks };
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    autoAddAffiliateLinks();
}); 