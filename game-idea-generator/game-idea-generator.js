// Game Idea Generator for GameGuru MAX
// Loads game ideas from separate JSON files for better scalability

let gameIdeas = [];
let isLoading = false;

// Load all game ideas from JSON files
async function loadGameIdeas() {
    if (isLoading) return;
    isLoading = true;
    
    try {
        const [beginnerData, intermediateData, advancedData] = await Promise.all([
            fetch('ideas-beginner.json').then(response => response.json()),
            fetch('ideas-intermediate.json').then(response => response.json()),
            fetch('ideas-advanced.json').then(response => response.json())
        ]);
        
        // Combine all ideas and add complexity property
        gameIdeas = [
            ...beginnerData.ideas.map(idea => ({ ...idea, complexity: 'beginner' })),
            ...intermediateData.ideas.map(idea => ({ ...idea, complexity: 'intermediate' })),
            ...advancedData.ideas.map(idea => ({ ...idea, complexity: 'advanced' }))
        ];
        
        console.log(`Loaded ${gameIdeas.length} game ideas`);
    } catch (error) {
        console.error('Error loading game ideas:', error);
        // Fallback to empty array if loading fails
        gameIdeas = [];
    } finally {
        isLoading = false;
    }
}

// Filter and generate game ideas
function generateGameIdea() {
    const genreFilter = document.getElementById('genreFilter').value;
    const complexityFilter = document.getElementById('complexityFilter').value;
    
    // Filter ideas based on user preferences
    let filteredIdeas = gameIdeas;
    
    if (genreFilter) {
        filteredIdeas = filteredIdeas.filter(idea => idea.genre === genreFilter);
    }
    
    if (complexityFilter) {
        filteredIdeas = filteredIdeas.filter(idea => idea.complexity === complexityFilter);
    }
    
    // If no ideas match filters, show helpful message and suggest alternatives
    if (filteredIdeas.length === 0) {
        showNoMatchesMessage(genreFilter, complexityFilter);
        return;
    }
    
    // Select random idea
    const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
    const selectedIdea = filteredIdeas[randomIndex];
    
    // Display the idea
    displayGameIdea(selectedIdea);
}

// Show message when no ideas match the filters
function showNoMatchesMessage(genreFilter, complexityFilter) {
    const ideaDisplay = document.getElementById('ideaDisplay');
    
    // Create helpful message
    let message = '<div class="alert alert-info">';
    message += '<h5><i class="bi bi-info-circle me-2"></i>No exact matches found</h5>';
    message += '<p>We couldn\'t find any ideas matching your current filters. Here are some suggestions:</p>';
    
    // Check what's available
    const availableGenres = [...new Set(gameIdeas.map(idea => idea.genre))];
    const availableComplexities = [...new Set(gameIdeas.map(idea => idea.complexity))];
    
    if (genreFilter && !availableGenres.includes(genreFilter)) {
        message += `<p><strong>Genre "${genreFilter}":</strong> Not available. Available genres: ${availableGenres.join(', ')}</p>`;
    }
    
    if (complexityFilter && !availableComplexities.includes(complexityFilter)) {
        message += `<p><strong>Complexity "${complexityFilter}":</strong> Not available. Available complexities: ${availableComplexities.join(', ')}</p>`;
    }
    
    // Show some alternatives
    message += '<h6>Try these alternatives:</h6>';
    message += '<ul>';
    
    // Show some beginner ideas if complexity was too restrictive
    if (complexityFilter === 'beginner') {
        const beginnerIdeas = gameIdeas.filter(idea => idea.complexity === 'beginner');
        message += `<li><strong>Beginner ideas:</strong> ${beginnerIdeas.length} available (try removing genre filter)</li>`;
    }
    
    // Show some horror ideas if genre was too restrictive
    if (genreFilter === 'horror') {
        const horrorIdeas = gameIdeas.filter(idea => idea.genre === 'horror');
        message += `<li><strong>Horror ideas:</strong> ${horrorIdeas.length} available (try removing complexity filter)</li>`;
    }
    
    message += '<li><strong>All ideas:</strong> Try removing both filters to see everything</li>';
    message += '</ul>';
    
    message += '<button class="btn btn-primary" onclick="generateGameIdea()">Generate Random Idea</button>';
    message += '</div>';
    
    // Update the display
    ideaDisplay.innerHTML = message;
    ideaDisplay.style.display = 'block';
    ideaDisplay.scrollIntoView({ behavior: 'smooth' });
}

// Display the selected game idea
function displayGameIdea(idea) {
    // Set title and complexity
    document.getElementById('ideaTitle').textContent = idea.title;
    document.getElementById('ideaComplexity').textContent = idea.complexity.charAt(0).toUpperCase() + idea.complexity.slice(1);
    document.getElementById('ideaComplexity').className = `badge ${getComplexityBadgeClass(idea.complexity)}`;
    
    // Set description
    document.getElementById('ideaDescription').textContent = idea.description;
    
    // Set core mechanics
    const mechanicsList = document.getElementById('coreMechanics');
    mechanicsList.innerHTML = '';
    idea.coreMechanics.forEach(mechanic => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="bi bi-check-circle text-success me-2"></i>${mechanic}`;
        mechanicsList.appendChild(li);
    });
    
    // Set suggested mechanics
    const suggestedMechanicsList = document.getElementById('suggestedMechanics');
    suggestedMechanicsList.innerHTML = '';
    idea.suggestedMechanics.forEach(mechanic => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="bi bi-puzzle text-primary me-2"></i>${mechanic}`;
        suggestedMechanicsList.appendChild(li);
    });
    
    // Set development tips
    document.getElementById('developmentTips').textContent = idea.developmentTips;
    
    // Show the display
    document.getElementById('ideaDisplay').style.display = 'block';
    
    // Scroll to the idea display
    document.getElementById('ideaDisplay').scrollIntoView({ behavior: 'smooth' });
}

// Get badge class based on complexity
function getComplexityBadgeClass(complexity) {
    switch (complexity) {
        case 'beginner':
            return 'bg-success';
        case 'intermediate':
            return 'bg-warning';
        case 'advanced':
            return 'bg-danger';
        default:
            return 'bg-secondary';
    }
}

// Initialize the generator
document.addEventListener('DOMContentLoaded', async function() {
    // Load game ideas first
    await loadGameIdeas();
    
    // Set up event listeners
    document.getElementById('generateIdea').addEventListener('click', generateGameIdea);
}); 