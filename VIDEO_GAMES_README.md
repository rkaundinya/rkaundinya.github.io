# Video Games Page Setup

This document explains how to use the new video games page system that creates a vertical scrollable list of video game projects.

## Overview

The video games page (`/video_games/`) displays video game projects in a vertical list format, unlike the projects page which uses a grid layout with categories. Each video game is displayed as a card with an image, title, description, metadata, and links.

## File Structure

```
_pages/video_games.md          # Main video games page
_includes/video_game_item.liquid  # Template for individual game items
_layouts/video_game.liquid     # Layout for individual game pages
_video_games/                  # Directory containing game markdown files
  ├── 1_game.md
  ├── 2_game.md
  └── 3_game.md
```

## Adding New Video Games

1. Create a new markdown file in the `_video_games/` directory
2. Use the following front matter structure:

```yaml
---
layout: video_game
title: "Game Title"
description: "Game description"
img: assets/img/game_image.jpg
importance: 1
category: action
github: https://github.com/username/game-repo
itch: https://username.itch.io/game
steam: https://store.steampowered.com/app/123456/game
platforms: [PC, Mac, Linux]
engine: Unity
release_date: 2024-01-15
status: Released
team_size: 5
role: Lead Developer
---
```

3. Add your game content below the front matter

## Front Matter Fields

- **layout**: Should be `video_game`
- **title**: Game title
- **description**: Short description (displayed in the list)
- **img**: Path to game thumbnail image
- **importance**: Sorting order (lower numbers appear first)
- **category**: Game category (optional, for organization)
- **github**: Link to source code (optional)
- **itch**: Link to Itch.io page (optional)
- **steam**: Link to Steam page (optional)
- **platforms**: Array of supported platforms
- **engine**: Game engine used
- **release_date**: Release date in YYYY-MM-DD format
- **status**: Development status (e.g., "Released", "Early Access", "In Development")
- **team_size**: Number of team members
- **role**: Your role on the project

## Styling

The video games page uses custom CSS defined in `_sass/_layout.scss`. The layout is responsive and will stack vertically on mobile devices.

## Features

- **Vertical List Layout**: Games are displayed in a single column for easy scrolling
- **Responsive Design**: Adapts to different screen sizes
- **Hover Effects**: Cards have subtle animations on hover
- **Metadata Display**: Shows engine, platforms, status, and other relevant information
- **Multiple Link Types**: Support for GitHub, Itch.io, and Steam links
- **Individual Game Pages**: Each game can have its own detailed page

## Customization

You can customize the appearance by modifying the CSS in `_sass/_layout.scss`. The main classes are:

- `.video-games` - Main container
- `.video-game-item` - Individual game card
- `.video-game-content` - Card content layout
- `.video-game-image` - Image container
- `.video-game-details` - Text content area
- `.video-game-meta` - Metadata section
- `.video-game-links` - Action buttons

## Example Usage

See the sample games in `_video_games/` for examples of how to structure your game entries.
