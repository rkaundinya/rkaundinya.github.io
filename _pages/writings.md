---
layout: page
title: Writings
permalink: /writings/
description: A collection of my articles, blog posts, and writings published on external platforms like Medium.
nav: true
nav_order: 7
display_categories: [technical, industry, personal]
horizontal: false
---

<!-- pages/writings.md - External Writings -->
<div class="writings">
  
  <!-- Featured Writings Section -->
  <div class="featured-section">
    <h2 class="section-title">⭐ Featured Stories</h2>
    <p class="section-description">Highlighted articles that I'm particularly proud of</p>
    
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
            {% when 'technical' %}
              Technical articles, tutorials, and deep dives into programming and technology
            {% when 'industry' %}
              Industry insights, trends, and analysis of the tech landscape
            {% when 'personal' %}
              Personal reflections, career advice, and life lessons from my journey
            {% else %}
              Articles and insights on {{ category | capitalize }}
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
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  border: 1px solid #dee2e6;
}

.section-title {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.section-description {
  color: #6c757d;
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
  color: #495057;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #3498db;
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
  color: #6c757d;
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
