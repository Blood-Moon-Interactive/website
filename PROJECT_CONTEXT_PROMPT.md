# Blood Moon Interactive - Project Context & Instructions

## Project Overview
Blood Moon Interactive is a comprehensive documentation and tutorial website for GameGuru MAX behaviors. The site serves as a centralized resource for game developers using the GameGuru MAX engine, providing detailed documentation, tutorials, and examples for various game behaviors.

## GameGuru MAX Software Overview

### What is GameGuru MAX?
GameGuru MAX is a revolutionary 3D game creation software designed to democratize game development. It follows a "no coding required" philosophy while offering advanced Lua scripting capabilities for experienced developers.

### Core Features
- **Visual Editor**: Powerful 3D scene editor with real-time preview and intuitive controls
- **Drag & Drop Interface**: Intuitive object placement and manipulation without programming
- **Visual Logic System**: Create game mechanics using flowcharts instead of code
- **Behavior System**: Pre-built behaviors that can be attached to objects for instant functionality
- **Storyboard Editor**: Create cinematic sequences and cutscenes for narrative-driven games
- **Terrain Generator**: Procedural landscape creation tools
- **Character Creator**: Advanced character customization tools

### Asset Library
- Over 1,200 pre-built assets including characters, environments, objects, audio, and visual effects
- Extensive library of characters, NPCs, environments, objects, props, audio assets, and visual effects

### Game Genres Supported
While GameGuru MAX has a strong FPS foundation, it supports multiple genres:
- **Puzzle Games**: Logic challenges and brain-teasing experiences
- **RPG Games**: Character progression, quest systems, inventory management
- **Horror Games**: Atmospheric experiences with advanced lighting and sound design
- **Adventure Games**: Exploration-focused storytelling and interactive environments
- **Action Games**: Fast-paced gameplay with various mechanics

### Development Workflow
- **Rapid Prototyping**: Instant preview capabilities without compilation
- **Real-time Editing**: See changes immediately in the editor
- **Streamlined Workflow**: Visual logic, behavior system, asset management
- **Built-in Testing**: Debugging and testing tools included

### Technical Requirements
- **OS**: Windows 10+ (64-bit versions only)
- **Minimum**: 16GB RAM, GTX 970/R9 Fury, 30GB storage
- **Recommended**: 32GB RAM, RTX 2070/5700 XT, 30GB storage
- **Network**: Broadband Internet connection required

### Community & Support
- **Discord Community**: Active server with advice, script support, showcases, asset sharing
- **GitHub Issues Board**: Official support channel for bugs and feature requests
- **Built-in Tutorials**: Extensive learning resources and documentation

### Target Audience
- **Beginners**: No programming experience required, intuitive visual interface
- **Experienced Developers**: Lua scripting for advanced customization, rapid prototyping
- **Indie Developers**: Professional-grade tools with accessible pricing
- **Educators**: Great for teaching game development concepts

## Site Structure

### Core Files
- `index.html` - Main landing page with welcome section, featured articles, and contact form
- `styles.css` - Complete styling with Bootstrap 5 integration and custom theming
- `js/script.js` - Main JavaScript with initialization, search, and navigation logic
- `behaviors.json` - Master index file listing all categories and their file paths

### Key Directories
- `categories/` - JSON files for each behavior category (Effects, Doors, Mechanical, etc.)
- `js/utils/` - API functions, DOM utilities, and article management
- `js/templates/` - Rendering templates for behaviors, categories, and search results
- `articles/` - Tutorial and guide content
- `effects/`, `objects/`, `markers/`, `puzzle/`, `rpg/` - Lua behavior files with corresponding images

## JSON Data Structure

### Category Files Format (e.g., `categories/effects.json`)
```json
{
  "category": "Category Name",
  "description": "Category description",
  "behaviors": {
    "behavior_id": {
      "name": "Behavior Name",
      "file": "path/to/behavior.lua",
      "description": "Detailed description",
      "properties": [
        {
          "name": "PROPERTY_NAME",
          "type": "string|number|boolean|dropdown|enum",
          "range": "min-max" (for numbers),
          "default": "default_value",
          "description": "Property description"
        }
      ],
      "features": ["Feature 1", "Feature 2"],
      "keywords": ["keyword1", "keyword2"],
      "tutorial": {
        "videoId": "youtube_id_or_coming-soon",
        "timestamp": "0:00"
      },
      "relatedBehaviors": ["related_behavior1", "related_behavior2"]
    }
  }
}
```

### Property Types
- **string**: Text input field
- **number**: Numeric input (with optional range specification)
- **boolean**: True/false toggle
- **dropdown**: Selection from predefined options array
- **enum**: Special dropdown with "value=label" format in options

### Data Consistency Requirements
- Property names must be UPPER_CASE
- File paths must match actual Lua file locations
- Tutorial videoId should be YouTube ID or "coming-soon"
- Related behaviors should reference actual behavior IDs
- Keywords should be lowercase and comma-separated
- Features should be complete sentences describing functionality

## JavaScript Architecture

### Main Components
- `js/script.js` - Initialization, event handling, search, contact form
- `js/utils/api.js` - Data fetching, search functions, behavior lookup
- `js/utils/dom.js` - DOM manipulation, sidebar generation, content display
- `js/utils/articles.js` - Article management and featured content
- `js/templates/behaviorDetail.js` - Individual behavior page rendering
- `js/templates/categoryView.js` - Category listing page rendering
- `js/templates/searchResults.js` - Search results display

### Key Functions
- `fetchBehaviors()` - Loads all category JSON files
- `searchBehaviors()` - Full-text search across behaviors
- `renderBehaviorDetail()` - Creates detailed behavior pages
- `generateCategorySidebar()` - Builds navigation sidebar
- `setupEventListeners()` - Handles user interactions

## CSS Structure
- Bootstrap 5 framework integration
- Custom CSS variables for theming
- Responsive sidebar navigation
- Card-based content layout
- Ad placement containers
- Contact form styling
- Mobile-responsive design

## Site Features
1. **Search System**: Real-time search across behavior names, descriptions, keywords, features
2. **Tutorial Integration**: YouTube video links for each behavior
3. **Responsive Design**: Mobile-friendly layout with collapsible sidebar
4. **Contact System**: EmailJS integration for contact form processing
5. **Ad Integration**: Multiple ad placement areas throughout the site
6. **Article System**: Featured articles and tutorial content
7. **Category Navigation**: Collapsible accordion with behavior counts

## Categories (More may be added)
1. Effects - Visual, audio, and gameplay effects
2. Doors - Door and portal behaviors
3. Mechanical - Machinery and mechanical systems
4. Object Interaction - Interactive object behaviors
5. Misc - Miscellaneous and utility behaviors
6. Movement - Movement and locomotion behaviors
7. Proximity - Distance-based behaviors
8. UI - User interface and menu behaviors
9. Global - Global game state management
10. Animals - Animal and creature AI behaviors
11. Horror - Horror and supernatural elements
12. HUDs - Heads-up displays and UI elements
13. People - Human characters and NPCs

## Working Instructions

### When Adding New Behaviors
1. Add behavior entry to appropriate category JSON file
2. Follow exact property structure and naming conventions
3. Ensure file path matches actual Lua file location
4. Add corresponding images (`.png` and `_2.png` variants)
5. Update behavior count in sidebar generation

### When Reading Lua Files for Properties
1. **ALWAYS check DESCRIPTION comments first** - These show the intended default values for the behavior system
2. **Use the format**: `[PROPERTY_NAME=default_value(range_min,range_max)]` from description comments as the authoritative source
3. **Do NOT use initialization function values** - These may be fallback values, outdated, or internal implementation details
4. **Cross-reference if needed** - If there's a discrepancy, the description comment is usually correct
5. **Look for property specifications** in the format: `[PROPERTY=default(range_min,range_max)]` or `[@PROPERTY=default(option1, option2)]`

### When Modifying Existing Behaviors
1. Maintain consistent property naming (UPPER_CASE)
2. Preserve existing property types and structures
3. Update related behaviors if needed
4. Ensure tutorial links remain valid

### When Working with Search
1. Search covers: name, description, category, keywords, features, property names/descriptions
2. Results are displayed in dedicated search results section
3. Search is case-insensitive and includes partial matches

### When Working with Navigation
1. Sidebar is generated dynamically from category data
2. Categories are sorted alphabetically
3. Behavior counts are displayed for each category
4. Tutorial availability is indicated with play icons

## Common Tasks
- Adding new behaviors to categories
- Updating behavior documentation
- Modifying property structures
- Adding tutorial videos
- Updating related behavior references
- Maintaining data consistency across files
- Debugging search functionality
- Styling adjustments
- Contact form modifications

## File Dependencies
- `behaviors.json` references all category files
- Category files reference Lua behavior files
- JavaScript modules import from each other
- CSS classes are used across multiple components
- Images are referenced in behavior documentation

This context should provide all necessary information to work effectively with the Blood Moon Interactive website project without needing to re-examine the codebase structure each time. 