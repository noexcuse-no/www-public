---
class: article
layout: page
title: "Emneoversikt — Artikler om ledelse"
description: "Utforsk artikler om ledelse, organisasjonskultur, endringsledelse og mer. Sortert etter emne."
permalink: /emne/
---

<section class="frame-hero">
    <div class="frame-hero-content">
        <p class="frame-breadcrumb"><a href="{{ '/' | relative_url }}">← No Excuse</a></p>
        <h1 class="hero-title">Emneoversikt</h1>
        <p class="frame-intro hero-intro">Utforsk våre artikler sortert etter emne. Klikk på et emne for å se alle tilhørende artikler.</p>
    </div>
</section>

{% assign all_tags = "" | split: "," %}
{% assign articles = site.pages | where: "class", "article" %}
{% for p in articles %}
    {% if p.tags and p.tags.size > 0 %}
        {% assign all_tags = all_tags | concat: p.tags %}
    {% endif %}
{% endfor %}
{% assign unique_tags = all_tags | uniq | sort_natural %}

<section class="frame-section animate-on-scroll fade-in-up">
    <div class="tag-cloud">
        {% for tag in unique_tags %}
            {% assign count = 0 %}
            {% for p in articles %}
                {% if p.tags contains tag %}
                    {% assign count = count | plus: 1 %}
                {% endif %}
            {% endfor %}
            <a href="{{ '/emne/' | append: tag | slugify | relative_url }}" class="tag-cloud-item">
                <span class="tag-name">{{ tag }}</span>
                <span class="tag-count">{{ count }}</span>
            </a>
        {% endfor %}
    </div>
</section>

<section class="frame-cta animate-on-scroll fade-in-up">
    <h2>Vil du vite mer?</h2>
    <p>Vi hjelper ledergrupper med å navigere komplekse organisasjonsutfordringer. Bestill en uforpliktende samtale.</p>
    <div class="frame-cta-buttons">
        <a href="https://outlook.office.com/book/ledelse@noexcuse.no/" class="product-cta">Bestill uforpliktende samtale</a>
        <a href="{{ '/metode/' | relative_url }}" class="product-cta product-cta--secondary">Vår metodikk →</a>
    </div>
</section>
