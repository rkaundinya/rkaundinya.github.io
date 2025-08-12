---
layout: page
title: Writings
permalink: /writings/
description: Some articles, blog posts, and essays I've worked on.
nav: true
nav_order: 6
display_categories: [article, engineering, philosophy]
horizontal: false
---

<!-- pages/writings.md - External Writings -->
<div class="writings">
  
  <!-- Featured Writings Section -->
  <div class="featured-section">
    <h2 class="section-title">⭐ Featured Stories</h2>
    <p class="section-description">Some pieces I'm particularly proud of!</p>
    
    <div class="featured-writings">
      <div class="row row-cols-1 row-cols-md-2">
        {% assign featured_writings = site.data.writings.featured | sort: "importance" %}
        {% for writing in featured_writings %}
          <div class="col">
            {% include writing_item.liquid writing=writing %}
          </div>
        {% endfor %}
      </div>
    </div>
  </div>

  <!-- Categorized Writings -->
  {% if page.display_categories %}
    {% for category in page.display_categories %}
      <div class="category-section" id="{{ category }}">
        <a href=".#{{ category }}" class="category-anchor">
          <h2 class="category-title">{{ category | capitalize }}</h2>
        </a>
        <p class="category-description">
          {% case category %}
            {% when 'article' %}
              Published articles
            {% else %}
              Writings on {{ category | capitalize }}
          {% endcase %}
        </p>
        
        {% assign categorized_writings = site.data.writings[category] | sort: "importance" %}
        <div class="writings-grid">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {% for writing in categorized_writings %}
              <div class="col">
                {% include writing_item.liquid writing=writing %}
              </div>
            {% endfor %}
          </div>
        </div>
      </div>
    {% endfor %}
  {% endif %}
</div>

<style>
.writings {
  margin-top: 2rem;
}

.featured-section {
  margin-bottom: 4rem;
  padding: 2rem;
  background: var(--global-bg-color);
  border-radius: 12px;
  border: 1px solid var(--global-divider-color);
}

.section-title {
  color: var(--global-text-color);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.section-description {
  color: var(--global-text-color-light);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  font-style: italic;
}

.featured-writings {
  margin-top: 1.5rem;
}

.category-section {
  margin-bottom: 4rem;
  padding-top: 2rem;
}

.category-anchor {
  text-decoration: none;
  color: inherit;
}

.category-anchor:hover {
  text-decoration: none;
  color: inherit;
}

.category-title {
  color: var(--global-text-color);
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid var(--global-theme-color);
  font-weight: 600;
  position: relative;
}

.category-title::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 50px;
  height: 3px;
  background: #ffd700;
}

.category-description {
  color: var(--global-text-color-light);
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.writings-grid {
  margin-top: 1.5rem;
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .featured-section {
    padding: 1.5rem;
    margin-bottom: 3rem;
  }
  
  .category-section {
    margin-bottom: 3rem;
    padding-top: 1.5rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .category-title {
    font-size: 1.5rem;
  }
}

/* Animation for featured section */
.featured-section {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects for category titles */
.category-title:hover::after {
  width: 80px;
  transition: width 0.3s ease;
}
</style>
