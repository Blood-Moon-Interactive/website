export function setupCategoryToggles() {
    document.querySelectorAll('.category-toggle').forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            const icon = toggle.querySelector('.toggle-icon');
            if (toggle.getAttribute('aria-expanded') === 'true') {
                icon.classList.remove('bi-chevron-down');
                icon.classList.add('bi-chevron-right');
            } else {
                icon.classList.remove('bi-chevron-right');
                icon.classList.add('bi-chevron-down');
            }
        });
    });
}

export function updateChevronIcons(activeToggle) {
    document.querySelectorAll('.category-toggle').forEach(function(toggle) {
        const icon = toggle.querySelector('.toggle-icon');
        if (toggle === activeToggle) {
            // Toggle the clicked item's icon
            if (toggle.getAttribute('aria-expanded') === 'true') {
                icon.classList.remove('bi-chevron-down');
                icon.classList.add('bi-chevron-right');
            } else {
                icon.classList.remove('bi-chevron-right');
                icon.classList.add('bi-chevron-down');
            }
        } else {
            // Reset other icons to right chevron
            icon.classList.remove('bi-chevron-down');
            icon.classList.add('bi-chevron-right');
        }
    });
}

export function showContent(content) {
    const defaultContent = document.getElementById('defaultContent');
    const searchResults = document.getElementById('searchResults');
    
    if (content === 'search') {
        searchResults.style.display = 'block';
        defaultContent.style.display = 'none';
    } else {
        searchResults.style.display = 'none';
        defaultContent.style.display = 'block';
    }
}

export function setInnerHTML(elementId, html) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = html;
    }
}

export function addClickHandlers(selector, handler) {
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener('click', handler);
    });
}

export function generateCategorySidebar(categories, behaviors) {
    const sidebarContent = Object.entries(categories).sort(([a], [b]) => a.localeCompare(b)).map(([category, info]) => {
        const categoryId = category.toLowerCase().replace(/\s+/g, '-');
        const iconClass = getCategoryIcon(category);
        const categoryBehaviors = getBehaviorsByCategory(behaviors, category);
        
        return `
            <li class="nav-item category-header">
                <a href="#" class="category-toggle" data-bs-toggle="collapse" data-bs-target="#${categoryId}Collapse" aria-expanded="false" aria-controls="${categoryId}Collapse">
                    <h5>
                        <i class="bi ${iconClass}"></i>
                        ${category}
                        <span class="badge bg-secondary">${categoryBehaviors.length}</span>
                        <i class="bi bi-chevron-right toggle-icon"></i>
                    </h5>
                </a>
                <div class="category-description text-muted small px-3">${info.description}</div>
                <ul class="nav flex-column sub-nav collapse" id="${categoryId}Collapse" data-bs-parent="#categoryAccordion">
                    ${categoryBehaviors.map(behavior => `
                        <li class="nav-item">
                            <a class="nav-link" href="#${behavior.name.toLowerCase().replace(/\s+/g, '_')}">
                                ${behavior.name}
                                ${behavior.tutorial.videoId !== 'coming-soon' ? '<i class="bi bi-play-circle text-success"></i>' : ''}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            </li>
        `;
    }).join('');

    return sidebarContent;
}

function getCategoryIcon(category) {
    const iconMap = {
        'Effects': 'bi-stars',
        'FX': 'bi-magic',
        'Mechanical': 'bi-gear',
        'Object Interaction': 'bi-hand-index-thumb',
        'Doors': 'bi-door-open',
        'Misc': 'bi-puzzle',
        'Movement': 'bi-arrow-left-right',
        'NPCs': 'bi-people',
        'Proximity': 'bi-broadcast',
        'UI': 'bi-window',
        'Global': 'bi-globe',
        'Animals': 'bi-bug',
        'Horror': 'bi-emoji-dizzy',
        'HUDs': 'bi-display',
        'People': 'bi-person'
    };
    return iconMap[category] || 'bi-circle';
}

function getBehaviorsByCategory(behaviors, category) {
    return Object.values(behaviors).filter(behavior => behavior.category === category)
        .sort((a, b) => a.name.localeCompare(b.name));
} 