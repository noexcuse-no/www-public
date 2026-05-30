---
layout: page
title: "Om oss"
permalink: /om-oss/
hero_effect: parallax-fade
json_ld:
  type: "Organization"
  name: "No Excuse AS"
  description: "Vi hjelper ledergrupper med å bli bedre — uten byråkrati. Forbedrer internkultur og kommunikasjon i bedrifter."
  url: "https://noexcuse.no"
  logo: "https://noexcuse.no/assets/images/noexcuse-logo-azure.webp"
  image: "https://noexcuse.no/assets/images/og-image.webp"
  foundingDate: "2025-06"
  foundingLocation: "Norge"
  areaServed: "Norge"
  contactPoint:
    type: "ContactPoint"
    contactType: "customer service"
    email: "firmapost@noexcuse.no"
    availableLanguage: "Norwegian"
  sameAs:
    - "https://www.linkedin.com/company/noexcuse"
---

<section class="about-hero"{% if page.hero_effect %} data-hero-effect="{{ page.hero_effect }}"{% endif %}>
    <div class="about-hero-image hero-image">
        <img src="{{ '/assets/images/banners/banner-om-oss.webp' | relative_url }}" alt="No Excuse AS - Vi hjelper ledergrupper">
    </div>
    <div class="about-hero-content">
        <h1 class="hero-title">Om oss</h1>
        <p class="about-tagline hero-intro">Vi hjelper ledergrupper å få bedre blikk for mennesker, identitet, struktur og påvirkning.</p>
    </div>
</section>

<section class="about-story animate-on-scroll fade-in-up">
    <h2>Hvorfor No Excuse?</h2>
    <p>No Excuse AS ble grunnlagt i juni 2025. Vi så et behov for å forbedre ledelsesfunksjonen i norske virksomheter uten dyre konsulentrapporter og unødvendig kompleksitet.</p>
    <p>Vår tilnærming bygger på anerkjent organisasjonsteori (Bolman & Deals fire perspektiver) og er utviklet for å gi konkrete, handlingsrettede innsikter som ledergrupper kan bruke umiddelbart. Vi tror på tillitsbasert ledelse, refleksjon fremfor skjemaer, og at de beste svarene ofte finnes internt — om man stiller de riktige spørsmålene.</p>
</section>

<section class="about-values animate-on-scroll fade-in-up">
    <div class="about-values-visual">
        <img src="{{ '/assets/images/banners/banner-verdier.webp' | relative_url }}" alt="Abstrakt fremstilling av våre tre kjerneverdier: ansvarlighet, tillit og ærlighet" class="about-values-banner">
        <div class="about-values-cards">
            <div class="value-card">
                <span class="value-icon" aria-hidden="true">●</span>
                <h3>Ansvarlighet</h3>
                <p>Vi får frem styrkene som ligger i ansvarlig og tillitsbasert ledelse</p>
            </div>
            <div class="value-card">
                <span class="value-icon" aria-hidden="true">●</span>
                <h3>Tillit</h3>
                <p>Vårt mål er å gjøre organisasjoner mer bærekraftige ved å styrke tillitsgrunnlaget</p>
            </div>
            <div class="value-card">
                <span class="value-icon" aria-hidden="true">●</span>
                <h3>Ærlighet</h3>
                <p>Våre metoder fokuserer på mennesker, vektlegger ærlighet og produserer målbare resultater</p>
            </div>
        </div>
    </div>
</section>

<section class="about-legal animate-on-scroll fade-in-up">
    <h2>Standard avtalevilkår</h2>
    <p>Du finner våre standard avtalevilkår <a href="/avtale/">her</a>.</p>
</section>

<section class="about-team animate-on-scroll fade-in-up">
    <h2>Kontaktinformasjon</h2>
    {% include profiles.html %}
</section>

<section class="about-cta animate-on-scroll fade-in-up">
    <h2>Vil du vite mer?</h2>
    <p>Ta en uforpliktende samtale med oss — vi snakker om ledelse, ikke salg.</p>
    <a href="https://outlook.office.com/bookwithme/user/5abd33238853466689e2b7f79805b19d%40noexcuse.no" class="about-cta-button">Book en samtale</a>
</section>
