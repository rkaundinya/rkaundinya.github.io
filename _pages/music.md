---
layout: page
title: Music
permalink: /music/
description: A collection of music I've been involved with creating!
nav: true
nav_order: 3
display_categories: [jazz, classical, collaborations]
horizontal: false
---

<!-- pages/music.md -->
<div class="music">
  
  <!-- Spotify Music Embeds - Automatically loaded from _data/spotify_tracks.yml -->
  {% include spotify_embeds.liquid %}

{% if site.enable_music_categories and page.display_categories %}
  <!-- Display categorized music -->
  {% for category in page.display_categories %}
  <a id="{{ category }}" href=".#{{ category }}">
    <h2 class="category">{{ category }}</h2>
  </a>
  {% assign categorized_music = site.music | where: "category", category %}
  {% assign sorted_music = categorized_music | sort: "importance" %}
  <!-- Generate cards for each music piece -->
  {% if page.horizontal %}
  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for music in sorted_music %}
      {% include music_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for music in sorted_music %}
      {% include music.liquid %}
    {% endfor %}
  </div>
  {% endif %}
  {% endfor %}

{% else %}

<!-- Display music without categories -->

{% assign sorted_music = site.music | sort: "importance" %}

  <!-- Generate cards for each music piece -->

{% if page.horizontal %}

  <div class="container">
    <div class="row row-cols-1 row-cols-md-2">
    {% for music in sorted_music %}
      {% include music_horizontal.liquid %}
    {% endfor %}
    </div>
  </div>
  {% else %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for music in sorted_music %}
      {% include music.liquid %}
    {% endfor %}
  </div>
  {% endif %}
{% endif %}
</div>
