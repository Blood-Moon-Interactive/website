export function renderCategoryView(category, behaviors, categoryInfo) {
    return `
        <div class="category-header mb-4">
            <h2>${category}</h2>
            <p class="lead text-muted">${categoryInfo.description}</p>
        </div>
        ${behaviors.length > 0 ? `
            <div class="row">
                ${behaviors.map(behavior => renderBehaviorCard(behavior)).join('')}
            </div>
        ` : `
            <div class="alert alert-info">
                <h4 class="alert-heading">No Behaviors Yet</h4>
                <p>This category doesn't have any behaviors documented yet. Check back soon!</p>
            </div>
        `}
    `;
}

function renderBehaviorCard(behavior) {
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <h3 class="h5 mb-0">${behavior.name}</h3>
                    ${behavior.tutorial.videoId !== 'coming-soon' 
                        ? '<a href="https://youtu.be/' + behavior.tutorial.videoId + '" target="_blank" class="btn btn-sm btn-primary"><i class="bi bi-youtube" style="color: #ff0000; margin-right: 4px;"></i> Watch Tutorial</a>'
                        : '<span class="badge bg-secondary">Coming Soon</span>'
                    }
                </div>
                <div class="card-body">
                    <p>${behavior.description}</p>
                    <div class="mb-3">
                        ${(behavior.keywords || []).slice(0, 3).map(keyword => 
                            `<span class="badge bg-secondary me-1">${keyword}</span>`
                        ).join('')}
                    </div>
                    <div class="features-preview small text-muted">
                        <strong>Key Features:</strong>
                        <ul class="list-unstyled mb-0">
                            ${(behavior.features || []).slice(0, 3).map(feature => 
                                `<li><i class="bi bi-check-circle-fill text-success"></i> ${feature}</li>`
                            ).join('')}
                        </ul>
                    </div>
                </div>
                <div class="card-footer bg-transparent">
                    <a href="#${behavior.name.toLowerCase().replace(/ /g, '_')}" 
                       class="btn btn-sm btn-primary w-100">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `;
} 