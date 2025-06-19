export function renderBehaviorDetail(behavior) {
    return `
        <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div>
                    <h2 class="h4 mb-0">${behavior.name}</h2>
                    <small class="text-muted">Category: ${behavior.category}</small>
                </div>
                <div>
                    ${behavior.tutorial ? `
                        ${behavior.tutorial.videoId === 'coming-soon' ? `
                            <button class="btn btn-sm btn-secondary" disabled>
                                <i class="bi bi-youtube"></i> Coming Soon
                            </button>
                        ` : `
                            <a href="https://youtu.be/${behavior.tutorial.videoId}" target="_blank" class="btn btn-sm btn-primary">
                                <i class="bi bi-youtube" style="color: #ff0000; margin-right: 4px;"></i> Watch Tutorial
                            </a>
                        `}
                    ` : ''}
                </div>
            </div>
            <div class="card-body">
                <p class="lead">${behavior.description}</p>
                
                <h5 class="mt-4">Properties</h5>
                <div class="table-responsive">
                    ${renderPropertiesTable(behavior.properties)}
                </div>

                <h5 class="mt-4">Features</h5>
                ${renderFeaturesList(behavior.features)}

                <h5 class="mt-4">Related Behaviors</h5>
                ${renderRelatedBehaviors(behavior.relatedBehaviors)}

                <h5 class="mt-4">Keywords</h5>
                ${renderKeywords(behavior.keywords)}
            </div>
        </div>
    `;
}

function renderPropertiesTable(properties) {
    return `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                ${properties.map(prop => `
                    <tr>
                        <td><code>${prop.name}</code></td>
                        <td>
                            ${prop.type === 'enum' ? 
                                `<div class="list-group">
                                    ${prop.options.map(opt => {
                                        const [value, label] = opt.split('=');
                                        const isDefault = value === prop.default.toString();
                                        return `<div class="list-group-item list-group-item-action ${isDefault ? 'active' : ''}">${label}</div>`;
                                    }).join('')}
                                </div>` 
                                : `<span class="badge bg-secondary">${prop.type}</span>`
                            }
                        </td>
                        <td><code>${prop.default}</code></td>
                        <td>${prop.description}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderFeaturesList(features) {
    return `
        <ul class="list-group list-group-flush mb-4">
            ${features.map(feature => `
                <li class="list-group-item">
                    <i class="bi bi-check-circle-fill text-success me-2"></i>
                    ${feature}
                </li>
            `).join('')}
        </ul>
    `;
}

function renderRelatedBehaviors(relatedBehaviors) {
    return `
        <div class="mb-4">
            ${relatedBehaviors.map(related => `
                <a href="#${related}" class="btn btn-outline-secondary btn-sm me-2 mb-2">
                    ${related.replace(/_/g, ' ')}
                </a>
            `).join('')}
        </div>
    `;
}

function renderKeywords(keywords) {
    return `
        <div>
            ${keywords.map(keyword => 
                `<span class="badge bg-info me-2">${keyword}</span>`
            ).join('')}
        </div>
    `;
} 