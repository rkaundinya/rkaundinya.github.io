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
  
  <!-- Progressive loading container -->
  <div class="videos-container" data-category="{{ category }}" data-total="{{ sorted_videos.size }}">
    <!-- Initial batch of videos -->
    {% assign initial_batch = sorted_videos | slice: 0, 6 %}
    <div class="row row-cols-1 row-cols-md-3" id="videos-{{ category }}-initial">
      {% for video in initial_batch %}
        {% include youtube_video.liquid %}
      {% endfor %}
    </div>
    
    <!-- Load more button for additional videos -->
    {% if sorted_videos.size > 6 %}
      <div class="text-center mt-4 mb-5">
        <button class="btn btn-outline-primary load-more-btn" 
                data-category="{{ category }}" 
                data-loaded="6" 
                data-total="{{ sorted_videos.size }}">
          Load More {{ category | capitalize }} Videos
          <span class="badge bg-secondary ms-2">{{ sorted_videos.size | minus: 6 }}</span>
        </button>
      </div>
      
      <!-- Hidden container for remaining videos -->
      <div class="remaining-videos" id="videos-{{ category }}-remaining" style="display: none;">
        <div class="row row-cols-1 row-cols-md-3">
          {% for video in sorted_videos %}
            {% if forloop.index > 6 %}
              {% include youtube_video.liquid %}
            {% endif %}
          {% endfor %}
        </div>
      </div>
    {% endif %}
  </div>
  {% endfor %}

{% else %}

<!-- Display videos without categories -->
{% assign sorted_videos = site.data.youtube_videos | sort: "importance" %}

  <!-- Progressive loading for uncategorized videos -->
  <div class="videos-container" data-category="all" data-total="{{ sorted_videos.size }}">
    <!-- Initial batch -->
    {% assign initial_batch = sorted_videos | slice: 0, 9 %}
    <div class="row row-cols-1 row-cols-md-3" id="videos-all-initial">
      {% for video in initial_batch %}
        {% include youtube_video.liquid %}
      {% endfor %}
    </div>
    
    <!-- Load more button -->
    {% if sorted_videos.size > 9 %}
      <div class="text-center mt-4 mb-5">
        <button class="btn btn-outline-primary load-more-btn" 
                data-category="all" 
                data-loaded="9" 
                data-total="{{ sorted_videos.size }}">
          Load More Videos
          <span class="badge bg-secondary ms-2">{{ sorted_videos.size | minus: 9 }}</span>
        </button>
      </div>
      
      <!-- Hidden container for remaining videos -->
      <div class="remaining-videos" id="videos-all-remaining" style="display: none;">
        <div class="row row-cols-1 row-cols-md-3">
          {% for video in sorted_videos %}
            {% if forloop.index > 9 %}
              {% include youtube_video.liquid %}
            {% endif %}
          {% endfor %}
        </div>
      </div>
    {% endif %}
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

.load-more-btn {
  transition: all 0.3s ease;
  border-radius: 25px;
  padding: 0.75rem 2rem;
}

.load-more-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.remaining-videos {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.remaining-videos.show {
  opacity: 1;
}

.videos-container {
  margin-bottom: 3rem;
}

/* Loading animation for load more button */
.load-more-btn.loading {
  pointer-events: none;
  opacity: 0.7;
}

.load-more-btn.loading::after {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s ease-in-out infinite;
  margin-left: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

<script>
// Progressive loading for music videos
document.addEventListener('DOMContentLoaded', function() {
  const loadMoreBtns = document.querySelectorAll('.load-more-btn');
  
  loadMoreBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const category = this.dataset.category;
      const currentLoaded = parseInt(this.dataset.loaded);
      const total = parseInt(this.dataset.total);
      
      // Show loading state
      this.classList.add('loading');
      this.textContent = 'Loading...';
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        // Show remaining videos
        const remainingContainer = document.getElementById(`videos-${category}-remaining`);
        if (remainingContainer) {
          remainingContainer.style.display = 'block';
          remainingContainer.classList.add('show');
          
          // Update button state
          this.textContent = `All ${category === 'all' ? 'Videos' : category.charAt(0).toUpperCase() + category.slice(1)} Loaded`;
          this.classList.remove('btn-outline-primary');
          this.classList.add('btn-success');
          this.disabled = true;
          
          // Hide load more button
          this.style.display = 'none';
        }
      }, 800);
    });
  });
  
  // Preload next batch of videos when user scrolls near load more button
  const observerOptions = {
    rootMargin: '100px 0px',
    threshold: 0.1
  };
  
  const preloadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const btn = entry.target;
        const category = btn.dataset.category;
        
        // Preload remaining videos in background
        const remainingContainer = document.getElementById(`videos-${category}-remaining`);
        if (remainingContainer) {
          // Trigger lazy loading for videos in the remaining container
          const videoContainers = remainingContainer.querySelectorAll('.video-container[data-video-id]');
          videoContainers.forEach(container => {
            // Preload thumbnail images
            const thumbnail = container.querySelector('.video-thumbnail');
            if (thumbnail) {
              thumbnail.src = thumbnail.src; // Trigger image load
            }
          });
        }
        
        preloadObserver.unobserve(btn);
      }
    });
  }, observerOptions);
  
  loadMoreBtns.forEach(btn => {
    preloadObserver.observe(btn);
  });
});
</script>
