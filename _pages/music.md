---
layout: page
title: Music
permalink: /music/
description: A collection of YouTube music videos organized by category!
nav: true
nav_order: 3
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
  <!-- Generate cards for each video -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for video in sorted_videos %}
      {% include youtube_video_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for video in sorted_videos %}
      {% include youtube_video.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display videos without categories -->

{% assign sorted_videos = site.data.youtube_videos | sort: "importance" %}

  <!-- Generate cards for each video -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for video in sorted_videos %}
      {% include youtube_video_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for video in sorted_videos %}
      {% include youtube_video.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
