#!/usr/bin/env python3
"""
Script to generate an HTML article for a randomly selected GameGuru MAX behavior.
Reads all category JSON files, selects a random behavior, and creates an HTML article.
Appends article metadata to articles/articles.json for homepage integration.
"""

import json
import os
import random
from pathlib import Path
from datetime import datetime
import re

def load_all_behaviors():
    """Load all behaviors from all category JSON files."""
    current_dir = Path.cwd()
    categories_dir = current_dir / "categories"
    
    all_behaviors = []
    
    # Loop through all JSON files in the categories folder
    for json_file in categories_dir.glob("*.json"):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            # Extract behaviors from the JSON file
            if 'behaviors' in data:
                category = data.get('category', 'Unknown')
                for behavior_key, behavior_data in data['behaviors'].items():
                    # Add category info to the behavior data
                    behavior_data['category'] = category
                    behavior_data['key'] = behavior_key
                    behavior_data['source_file'] = json_file.name
                    
                    all_behaviors.append(behavior_data)
                    
        except Exception as e:
            print(f"Error reading {json_file}: {e}")
    
    return all_behaviors

def generate_html_article(behavior_data, article_date):
    """Generate an HTML article for the selected behavior using the template."""
    
    # Extract behavior information
    name = behavior_data.get('name', 'Unknown Behavior')
    description = behavior_data.get('description', 'No description available.')
    file_path = behavior_data.get('file', 'Unknown file')
    category = behavior_data.get('category', 'Unknown Category')
    properties = behavior_data.get('properties', [])
    features = behavior_data.get('features', [])
    keywords = behavior_data.get('keywords', [])
    related_behaviors = behavior_data.get('relatedBehaviors', [])
    tutorial = behavior_data.get('tutorial', {})
    
    # Read the template file
    template_path = Path('articles/article-template.html')
    try:
        with open(template_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print(f"Error: Template file not found at {template_path}")
        return None
    
    # Generate video HTML if available
    video_html = ""
    video_id = tutorial.get('videoId')
    if video_id and video_id != 'coming-soon':
        # If it's a YouTube ID, embed it
        if len(video_id) == 11 and all(c.isalnum() or c in ['-', '_'] for c in video_id):
            video_html = f'''<div class="mb-4"><div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/{video_id}" title="Tutorial Video" allowfullscreen></iframe></div></div>'''
        # If it's a full URL, embed or link it
        elif video_id.startswith('http'):
            if 'youtube.com' in video_id or 'youtu.be' in video_id:
                # Try to extract the YouTube ID from the URL
                yt_match = re.search(r'(?:v=|be/)([\w-]{11})', video_id)
                if yt_match:
                    yt_id = yt_match.group(1)
                    video_html = f'''<div class="mb-4"><div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/{yt_id}" title="Tutorial Video" allowfullscreen></iframe></div></div>'''
                else:
                    video_html = f'<div class="mb-4"><a href="{video_id}" target="_blank" rel="noopener">Watch Tutorial Video</a></div>'
            else:
                video_html = f'<div class="mb-4"><a href="{video_id}" target="_blank" rel="noopener">Watch Tutorial Video</a></div>'
    
    # Generate dynamic content for template placeholders
    game_type = random.choice(['survival horror', 'action RPG', 'puzzle', 'adventure', 'stealth'])
    scenario_description = f"navigate through a {random.choice(['dimly lit facility', 'dangerous wilderness', 'abandoned city', 'mysterious laboratory'])} where {name.lower()} controls critical environmental elements"
    scenario_details = f"carefully manage resources while avoiding detection"
    
    # Get first few features for template
    feature_list = features[:3] if features else ['versatile functionality', 'simple integration', 'reliable performance']
    feature_1 = feature_list[0] if len(feature_list) > 0 else 'versatile functionality'
    feature_2 = feature_list[1] if len(feature_list) > 1 else 'simple integration'
    feature_3 = feature_list[2] if len(feature_list) > 2 else 'reliable performance'
    
    # Get primary and secondary features
    primary_feature = features[0] if features else 'versatile functionality'
    secondary_feature = features[1] if len(features) > 1 else 'simple integration'
    
    # Get property name for template
    property_name = properties[0]['name'] if properties else 'configurable'
    
    # Generate properties HTML
    properties_html = ""
    if properties:
        for i, prop in enumerate(properties[:5]):
            properties_html += f'<li><strong>{prop["name"]}:</strong> {prop["description"]}</li>\n                            '
    else:
        properties_html = '<li><strong>CONFIGURABLE:</strong> No specific properties available</li>'
    
    # Generate features HTML
    features_html = ""
    if features:
        for feature in features[:8]:
            features_html += f'<li>{feature}</li>\n                            '
    else:
        features_html = '<li>No specific features listed</li>'
    
    # Generate related behaviors HTML
    related_html = ""
    if related_behaviors:
        for related in related_behaviors[:5]:
            related_html += f'<li>{related.replace("_", " ").title()}</li>\n                            '
    else:
        related_html = '<li>No related behaviors specified</li>'
    
    # Generate pro tip
    pro_tip = f"Generated on {article_date.strftime('%B %d, %Y')} | Blood Moon Interactive GameGuru MAX Behavior Library"
    
    # Replace template placeholders
    replacements = {
        'ARTICLE_TITLE': name,
        'ARTICLE_DESCRIPTION': description[:160] + '...' if len(description) > 160 else description,
        'PUBLICATION_DATE': article_date.strftime('%B %Y'),
        'CATEGORY': category,
        'ARTICLE_LEAD_PARAGRAPH': description,
        'BEHAVIOR_NAME': name,
        'GAME_TYPE': game_type,
        'SCENARIO_DESCRIPTION': scenario_description,
        'FEATURE_1': feature_1,
        'FEATURE_2': feature_2,
        'FEATURE_3': feature_3,
        'SPECIFIC_GAMEPLAY_ELEMENT': f'{category.lower()} mechanics and environmental interaction',
        'SCENARIO_DETAILS': scenario_details,
        'PROPERTY_NAME': property_name,
        'PRIMARY_FEATURE': primary_feature,
        'SECONDARY_FEATURE': secondary_feature,
        'PRO_TIP_TEXT': pro_tip,
        'PROPERTY_1: Description of what this property controls': properties_html.strip(),
        'Feature description 1': features_html.strip(),
        'Related Behavior 1': related_html.strip()
    }
    
    # Apply replacements
    for placeholder, value in replacements.items():
        html_content = html_content.replace(placeholder, str(value))
    
    # Handle video tutorial section
    if video_html:
        # Uncomment and replace the video section
        video_placeholder = '<!-- <div class="mb-4">\n                            <div class="ratio ratio-16x9">\n                                <iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Tutorial Video" allowfullscreen></iframe>\n                            </div>\n                        </div> -->'
        html_content = html_content.replace(video_placeholder, video_html)
    
    return html_content

def update_articles_json(article_entry):
    """Update articles.json with the new article entry."""
    articles_json_path = Path.cwd() / "articles" / "articles.json"
    
    # Load existing articles.json or create new structure
    if articles_json_path.exists():
        with open(articles_json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    else:
        # Create new articles.json structure
        data = {
            "articles": [],
            "config": {
                "articlesPerPage": 5,
                "defaultCategory": "Tutorials",
                "sortBy": "date"
            }
        }
    
    # Check for duplicates (same behavior on same day)
    today = article_entry['date']
    for art in data['articles']:
        if art.get('title') == article_entry['title'] and art.get('date') == today:
            print(f"Article for {art['title']} already exists for today. Skipping JSON update.")
            return
    
    # Add the new article entry
    data['articles'].append(article_entry)
    
    # Write back to file
    with open(articles_json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Article entry added to articles.json: {article_entry['title']}")

def main():
    """Main function to generate the article."""
    
    # Load all behaviors
    print("Loading behaviors from category files...")
    all_behaviors = load_all_behaviors()
    
    if not all_behaviors:
        print("No behaviors found!")
        return
    
    # Display simple list
    print(f"\nFound {len(all_behaviors)} behaviors:")
    print("-" * 40)
    for i, behavior in enumerate(all_behaviors[:10], 1):  # Show first 10
        print(f"{i}. {behavior.get('name', 'Unknown')} ({behavior.get('category', 'Unknown')})")
    if len(all_behaviors) > 10:
        print(f"... and {len(all_behaviors) - 10} more")
    
    # Randomly select a behavior
    selected_behavior = random.choice(all_behaviors)
    print(f"\n🎲 Randomly selected: {selected_behavior.get('name', 'Unknown')} ({selected_behavior.get('category', 'Unknown')})")
    
    # Get current date
    today = datetime.now()
    today_str = today.strftime('%Y-%m-%d')
    
    # Generate the HTML article
    print("Generating HTML article...")
    html_content = generate_html_article(selected_behavior, today)
    
    # Create articles directory if it doesn't exist
    articles_dir = Path.cwd() / "articles"
    articles_dir.mkdir(exist_ok=True)
    
    # Generate filename based on behavior name
    behavior_name = selected_behavior.get('name', 'unknown_behavior')
    safe_name = behavior_name.lower().replace(' ', '_').replace('-', '_')
    filename = f"{safe_name}.html"
    filepath = articles_dir / filename
    
    # Write the HTML article
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✅ HTML article generated: {filepath}")
    print(f"📝 Behavior: {selected_behavior.get('name')}")
    print(f"📁 Category: {selected_behavior.get('category')}")
    print(f"📄 File: {selected_behavior.get('file')}")
    
    # Prepare article entry for articles.json with proper structure
    article_entry = {
        "id": safe_name,  # Used for the "Read More" link
        "title": selected_behavior.get('name', 'Unknown Behavior'),
        "preview": selected_behavior.get('description', '')[:200] + "...",
        "date": today_str,
        "author": "Blood Moon Interactive",
        "category": selected_behavior.get('category', 'Unknown Category'),
        "tags": [],
        "featured": False,  # New articles are not featured by default
        "filename": filename  # Keep reference to the HTML file
    }
    
    # Generate tags from keywords and category
    if selected_behavior.get('keywords'):
        article_entry['tags'].extend(selected_behavior['keywords'][:3])  # First 3 keywords
    article_entry['tags'].append(selected_behavior.get('category', 'Unknown').lower())
    article_entry['tags'].append('behavior')
    article_entry['tags'].append('gameguru')
    
    update_articles_json(article_entry)

if __name__ == "__main__":
    main() 