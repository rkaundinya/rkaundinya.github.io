# Writings Page - How to Add New Articles

This document explains how to add new external writings (Medium articles, blog posts, etc.) to your Writings page.

## Overview

The Writings page displays external articles organized by categories, with a featured section at the top. It follows the same structure as your Music page for consistency.

## File Structure

- `_data/writings.yml` - Contains all writing data
- `_pages/writings.md` - The main Writings page
- `_includes/writing_item.liquid` - Template for displaying individual writings

## Adding New Writings

### 1. Edit the Data File

Open `_data/writings.yml` and add new entries under the appropriate category:

```yaml
# Featured Writings (displayed prominently at top)
featured:
  - title: "Your Article Title"
    description: "A brief description of your article"
    url: "https://medium.com/@username/your-article-url"
    source: "Medium"
    date: "2024-12-01"
    read_time: "8 min read"
    importance: 1
    featured: true

# Technical Articles
technical:
  - title: "Another Article Title"
    description: "Description here"
    url: "https://medium.com/@username/another-article"
    source: "Medium"
    date: "2024-11-15"
    read_time: "10 min read"
    importance: 2
    featured: false
```

### 2. Required Fields

- `title`: Article title
- `description`: Brief summary/description
- `url`: Full URL to the article
- `source`: Platform name (e.g., "Medium", "Substack", "Personal Blog")
- `date`: Publication date in YYYY-MM-DD format
- `read_time`: Estimated reading time
- `importance`: Sorting order (lower numbers appear first)
- `featured`: Set to `true` for featured articles, `false` for regular ones

### 3. Categories

Current categories:

- `featured` - Special articles displayed at the top
- `technical` - Programming, technology, tutorials
- `industry` - Industry insights, trends, analysis
- `personal` - Personal reflections, career advice

You can add new categories by:

1. Adding them to `_data/writings.yml`
2. Updating `display_categories` in `_pages/writings.md`

## Example Entry

```yaml
- title: "Building a Jekyll Blog with GitHub Pages"
  description: "Step-by-step guide to creating a professional blog using Jekyll and GitHub Pages"
  url: "https://medium.com/@username/jekyll-github-pages-guide"
  source: "Medium"
  date: "2024-12-15"
  read_time: "12 min read"
  importance: 1
  featured: false
```

## Styling

The Writings page includes:

- Responsive grid layout
- Hover effects and animations
- Featured article highlighting
- Category-based organization
- Mobile-friendly design

## Navigation

The Writings page is set to `nav_order: 7` in the navigation menu. If you need to change this, update the `nav_order` in `_pages/writings.md` and adjust other pages accordingly.

## Tips

1. **Importance Ordering**: Use lower numbers for more important articles
2. **Featured Articles**: Limit featured articles to 2-3 for best visual impact
3. **Descriptions**: Keep descriptions concise but informative
4. **Dates**: Use consistent date formatting
5. **Read Times**: Provide realistic reading time estimates

## Troubleshooting

- **Page not showing**: Check that `nav: true` is set in the front matter
- **Articles not displaying**: Verify YAML syntax in `_data/writings.yml`
- **Styling issues**: Check that all CSS classes are properly defined
- **Navigation problems**: Ensure `nav_order` values are unique
