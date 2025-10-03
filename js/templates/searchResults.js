export function renderSearchResults(results) {
    if (results.length === 0) {
        return '<div class="alert alert-info">No behaviors found matching your search.</div>';
    }

    return `
        <h3 class="mb-4">Search Results</h3>
        <div class="row">
            ${results.map((behavior, index) => renderBehaviorCard(behavior, index)).join('')}
        </div>
    `;
}

function renderBehaviorCard(behavior) {
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100">
                <div class="card-header">
                    <h3 class="h5 mb-0">${behavior.name}</h3>
                    <small class="text-muted">Category: ${behavior.category}</small>
                </div>
                <div class="card-body">
                    <p>${behavior.description}</p>
                    <div class="mb-3">
                        ${behavior.keywords.slice(0, 3).map(keyword => 
                            `<span class="badge bg-secondary me-1">${keyword}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="card-footer bg-transparent">
                    <a href="#${behavior.id}" 
                       class="btn btn-sm btn-primary w-100">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `;
} 