import { loadSubcategories } from './subcategories.js';

export async function fetchBehaviors() {
    try {
        // First fetch the main index file
        const response = await fetch(`behaviors.json?_=${Date.now()}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const indexData = await response.json();
        
        // Fetch all category files
        const categories = indexData.categories;
        const behaviors = {};
        
        for (const [categoryName, categoryInfo] of Object.entries(categories)) {
            try {
                const categoryResponse = await fetch(`${categoryInfo.file}?_=${Date.now()}`);
                if (!categoryResponse.ok) {
                    throw new Error(`Failed to load category ${categoryName}`);
                }
                const categoryData = await categoryResponse.json();
                
                // Add behaviors from this category
                if (categoryData.behaviors) {
                    Object.entries(categoryData.behaviors).forEach(([id, behavior]) => {
                        // Store the behavior with its category
                        behaviors[id] = {
                            ...behavior,
                            category: categoryName
                        };
                    });
                }
            } catch (error) {
                console.warn(`Failed to load category ${categoryName}:`, error);
            }
        }
        
        return { behaviors, categories: indexData.categories };
    } catch (error) {
        console.error('Error fetching behaviors:', error);
        throw error;
    }
}

export function findBehaviorById(behaviors, id) {
    // First try direct ID match
    let behavior = behaviors[id];
    
    // If not found, try case-insensitive name match
    if (!behavior) {
        const normalizedId = id.toLowerCase();
        const entry = Object.entries(behaviors).find(([_, b]) => 
            b.name.toLowerCase().replace(/ /g, '_') === normalizedId
        );
        if (entry) behavior = entry[1];
    }
    
    return behavior;
}

export function searchBehaviors(behaviors, query) {
    const results = [];
    const searchQuery = query.toLowerCase();
    
    Object.entries(behaviors).forEach(([id, behavior]) => {
        const searchableText = [
            behavior.name,
            behavior.description,
            behavior.category,
            behavior.subcategory || '',
            ...(behavior.keywords || []),
            ...(behavior.features || []),
            ...(behavior.properties || []).map(p => p.name + ' ' + p.description)
        ].join(' ').toLowerCase();
        
        if (searchableText.includes(searchQuery)) {
            results.push({
                ...behavior,
                id: id
            });
        }
    });
    
    return results;
}

export function getBehaviorsByCategory(behaviors, category) {
    if (!behaviors || !category) return [];
    
    return Object.values(behaviors)
        .filter(behavior => behavior && behavior.category === category)
        .sort((a, b) => a.name.localeCompare(b.name));
}

export function getBehaviorsBySubcategory(behaviors, category, subcategory) {
    return Object.values(behaviors)
        .filter(behavior => behavior.category === category && behavior.subcategory === subcategory)
        .sort((a, b) => a.name.localeCompare(b.name));
} 