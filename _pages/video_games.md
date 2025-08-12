---
layout: page
permalink: /video_games/
title: Video Games
description: Some great games I had the pleasure of working on!
nav: true
nav_order: 3
---

<!-- pages/video_games.md -->
<div class="video-games">
  {% assign sorted_video_games = site.video_games | sort: "importance" %}
  
  <div class="video-games-list">
    {% for game in sorted_video_games %}
      {% include video_game_item.liquid %}
    {% endfor %}
  </div>
</div>