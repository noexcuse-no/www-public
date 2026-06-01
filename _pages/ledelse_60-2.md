---
layout: page
title: "Ledelse 60:2 — Orientering for ledergruppen"
permalink: /ledelse-60-2/
hero:
  image: /assets/images/hero-illustration.webp
  alt: "Ledelse 60:2"
  title: "Ledelse 60:2"
  intro: "Enkel, kunnskapsbasert orientering for ledergruppen. 60 spørsmål på 2 timer."
hero_effect: parallax-fade
json_ld:
  type: "Service"
  name: "Ledelse 60:2"
  description: "Tidseffektiv orientering for ledergruppen — 60 diagnostiske spørsmål, 2 timer, felles retningsvalg."
  provider:
    type: "Organization"
    name: "No Excuse AS"
    url: "https://noexcuse.no"
    logo: "https://noexcuse.no/assets/images/noexcuse-logo-azure.webp"
    contactPoint:
      contactType: "booking"
      url: "https://outlook.office.com/book/ledelse@noexcuse.no/?ismsaljsauthenabled"
  url: "https://noexcuse.no/ledelse-60-2/"
  areaServed: "NO"
  serviceType: "Leadership Assessment"
  offers:
    type: "Offer"
    priceCurrency: "NOK"
    description: "Orientering for ledergruppen"
  hasOfferCatalog:
    type: "OfferCatalog"
    name: "Ledelse 60:2 Tjenester"
    itemListElement:
      - type: "Offer"
        itemOffered:
          type: "Service"
          name: "Ledelse 60:2 Grunnpakke"
          description: "60 diagnostiske spørsmål, 2 timers intervju, rapport og anbefalinger"
      - type: "Offer"
        itemOffered:
          type: "Service"
          name: "Katalysator"
          description: "Kontinuerlig oppfølging og coaching for organisasjonsvekst"
---

{% include hero.html %}

<section>
        <div class="landing-hero-buttons">
            <a href="https://outlook.office.com/book/ledelse@noexcuse.no/?ismsaljsauthenabled" class="product-cta">Bestill Ledelse 60:2</a>
            <a href="#hvordan" class="product-cta">Hvordan fungerer det? ↓</a>
        </div>
</section>

<section class="landing-benefits animate-on-scroll fade-in-up">
    <h2>Fire gode grunner</h2>
    <div class="card-grid card-grid--benefits">
        {% assign benefits = site.topics | where: "category", "benefit" %}
        {% for topic in benefits %}
            {% include card.html topic=topic %}
        {% endfor %}
    </div>
</section>

<section id="hvordan" class="landing-process animate-on-scroll fade-in-up">
    <h2>Hvordan gjør vi det?</h2>
    <div class="card-grid card-grid--steps">
        {% assign steps = site.topics | where: "category", "step" | sort: "step_number" %}
        {% for topic in steps %}
            {% include card.html topic=topic %}
        {% endfor %}
    </div>
</section>

<section class="landing-story animate-on-scroll fade-in-up">
    <h2>Historien bak metoden</h2>
    <p>«Ledelse 60:2» er vår tilnærming til å bruke en enkel kunnskapsbasert metode for å sammenlikne etterprøvbare beskrivelser av ledelsesfunksjonen på et gitt nivå i en virksomhet.</p>
    <a href="{{ '/metode/' | relative_url }}" class="product-cta">Les mer om metoden →</a>
</section>

{% if site.cases.size > 0 %}
<section class="landing-cases animate-on-scroll fade-in-up">
    <h2>Kundecaser</h2>
    <div class="landing-cases-grid stagger-parent" style="--stagger-delay: 100ms;">
        {% for case in site.cases %}
        <div class="case-card animate-on-scroll fade-in-up stagger">
            <h3>{{ case.title }}</h3>
            <p>{{ case.description }}</p>
            {% if case.result %}
            <p class="case-result"><strong>Resultat:</strong> {{ case.result }}</p>
            {% endif %}
            {% if case.customer %}
            <p class="case-customer">— {{ case.customer }}</p>
            {% endif %}
        </div>
        {% endfor %}
    </div>
</section>
{% endif %}

<section class="landing-cta animate-on-scroll fade-in-up">
    <h2>Hvordan jobber dere med bedre ledelse?</h2>
    <p>Ta en uforpliktende samtale med oss, så finner vi ut om Ledelse 60:2 er rett for dere.</p>
    <div class="landing-hero-content">
        <a href="https://outlook.office.com/bookwithme/user/5abd33238853466689e2b7f79805b19d%40noexcuse.no" class="product-cta product-cta--large">Velg et tidspunkt</a>
    </div>
</section>
