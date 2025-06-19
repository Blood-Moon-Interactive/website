export async function loadSubcategories(category) {
    const response = await fetch(`${category.file}?_=${Date.now()}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categoryData = await response.json();
    
    // If this category has subcategories, load them
    if (categoryData.subcategories) {
        const behaviors = {};
        
        for (const [subName, subInfo] of Object.entries(categoryData.subcategories)) {
            const subResponse = await fetch(`${subInfo.file}?_=${Date.now()}`);
            if (!subResponse.ok) {
                console.warn(`Failed to load subcategory ${subName}`);
                continue;
            }
            const subData = await subResponse.json();
            
            // Add category and subcategory to each behavior
            Object.values(subData.behaviors).forEach(behavior => {
                behavior.category = categoryData.category;
                behavior.subcategory = subName;
            });
            
            Object.assign(behaviors, subData.behaviors);
        }
        
        return { behaviors, subcategories: categoryData.subcategories };
    }
    
    // If no subcategories, return behaviors directly
    return { behaviors: categoryData.behaviors };
} 