---
layout: page
title: Music
permalink: /music/
description: Some of the music I had the pleasure of being a part of creating!
nav: true
nav_order: 4
display_categories: [jazz, classical, collaborations]
horizontal: false
---

<!-- pages/music.md - YouTube Videos -->
<div class="music">
  
  <!-- Spotify Music Embeds - Automatically loaded from _data/spotify_tracks.yml -->
  {% include spotify_embeds.liquid %}

{% if site.enable_music_categories and page.display_categories %}
  <!-- Display categorized YouTube videos -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category | capitalize }}</h2>
  </a>
  {% assign categorized_videos = site.data.youtube_videos | where: "category", category %}
  {% assign sorted_videos = categorized_videos | sort: "importance" %}
  
  <!-- Videos grid -->
  <div class="videos-container" data-category="{{ category }}">
    <div class="row row-cols-1 row-cols-md-3">
      {% for video in sorted_videos %}
        {% include youtube_video.liquid %}
      {% endfor %}
    </div>
  </div>
  {% endfor %}

{% else %}

<!-- Display videos without categories -->
{% assign sorted_videos = site.data.youtube_videos | sort: "importance" %}

  <!-- Videos grid -->
  <div class="videos-container" data-category="all">
    <div class="row row-cols-1 row-cols-md-3">
      {% for video in sorted_videos %}
        {% include youtube_video.liquid %}
      {% endfor %}
    </div>
  </div>
{% endif %}
</div>

<style>
.category {
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
  color: #495057;
}

.videos-container {
  margin-bottom: 3rem;
}

/* Smooth animations for video cards */
.video-container {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

/* Loading animation for thumbnails */
.video-thumbnail {
  transition: opacity 0.3s ease;
}

.video-thumbnail[loading] {
  opacity: 0.7;
}

.video-thumbnail:not([loading]) {
  opacity: 1;
}


</style>
