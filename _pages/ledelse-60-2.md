---
layout: landing
title: "Ledelse 60:2 — Modenhetsanalyse for ledergruppen"
permalink: /ledelse-60-2/
json_ld:
  type: "Service"
  name: "Ledelse 60:2"
  description: "Tidseffektiv modenhetsanalyse for ledergruppen — 60 diagnostiske spørsmål, 2 timer, felles retningsvalg."
  provider:
    type: "Organization"
    name: "No Excuse AS"
    url: "https://noexcuse.no"
    logo: "https://noexcuse.no/assets/images/noexcuse-logo-azure.png"
    contactPoint:
      contactType: "booking"
      url: "https://outlook.office.com/bookwithme/user/5abd33238853466689e2b7f79805b19d%40noexcuse.no"
  url: "https://noexcuse.no/ledelse-60-2/"
  areaServed: "NO"
  serviceType: "Leadership Assessment"
  offers:
    type: "Offer"
    priceCurrency: "NOK"
    description: "Modenhetsanalyse for ledergruppen"
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

<section class="landing-hero">
    <div class="landing-hero-content">
        <h1>Ledelse 60:2</h1>
        <p class="landing-hero-description">Enkel, kunnskapsbasert orientering for ledergruppen — 60 diagnostiske spørsmål, 2 timer, felles retningsvalg.</p>
        <a href="https://outlook.office.com/bookwithme/user/5abd33238853466689e2b7f79805b19d%40noexcuse.no" class="product-cta">Book en uforpliktende samtale</a>
        <a href="#hvordan" class="landing-scroll-link">Hvordan fungerer det? ↓</a>
    </div>
    <div class="landing-hero-image">
        <img src="{{ '/assets/images/hero-illustration.png' | relative_url }}" alt="Ledelse 60:2">
    </div>
</section>

<section class="landing-benefits">
    <h2>Fire grunner til å velge Ledelse 60:2</h2>
    <div class="landing-benefits-grid">
        <div class="benefit-card" style="box-shadow: var(--box-shadow-light);">
            <img src="{{ '/assets/images/banners/benefit-control.png' | relative_url }}" alt="Få kontroll uten byråkrati" class="benefit-banner">
            <h3>Få kontroll uten byråkrati</h3>
            <p>Styrk den tillitsbaserte ledelsen fremfor rutiner og skjema.</p>
        </div>
        <div class="benefit-card" style="box-shadow: var(--box-shadow-light);">
            <img src="{{ '/assets/images/banners/benefit-ai.png' | relative_url }}" alt="Oppnå målbare gevinster med KI" class="benefit-banner">
            <h3>Oppnå målbare gevinster med KI</h3>
            <p>KI vil ikke gjøre ansatte overflødige, men de må ledes annerledes.</p>
        </div>
        <div class="benefit-card" style="box-shadow: var(--box-shadow-light);">
            <img src="{{ '/assets/images/banners/benefit-future.png' | relative_url }}" alt="Bli forberedt på en usikker fremtid" class="benefit-banner">
            <h3>Bli forberedt på en usikker fremtid</h3>
            <p>Styr unna uønskede hendelser og fang mulighetene som byr seg.</p>
        </div>
        <div class="benefit-card" style="box-shadow: var(--box-shadow-light);">
            <img src="{{ '/assets/images/banners/benefit-anchoring.png' | relative_url }}" alt="Forankre initiativer i ledergruppen" class="benefit-banner">
            <h3>Forankre initiativer i ledergruppen</h3>
            <p>Ledere som ser saken fra ulike perspektiver har større gjennomføringskraft.</p>
        </div>
    </div>
</section>

<section id="hvordan" class="landing-process">
    <h2>Hvordan gjør vi Ledelse 60:2?</h2>
    <div class="landing-process-steps">
        <div class="process-step" style="box-shadow: var(--box-shadow-light);">
            <div class="process-step-number">1</div>
            <img src="{{ '/assets/images/banners/step-talk.png' | relative_url }}" alt="Uforpliktende samtale" class="process-banner">
            <h3>Uforpliktende samtale</h3>
            <p>Vi konkretiserer hva dere vil oppnå med modenhetsanalysen.</p>
        </div>
        <div class="process-step" style="box-shadow: var(--box-shadow-light);">
            <div class="process-step-number">2</div>
            <img src="{{ '/assets/images/banners/step-interview.png' | relative_url }}" alt="To timers strukturert intervju" class="process-banner">
            <h3>To timers strukturert intervju</h3>
            <p>60 diagnostiske spørsmål med inntil fem ledere.</p>
        </div>
        <div class="process-step" style="box-shadow: var(--box-shadow-light);">
            <div class="process-step-number">3</div>
            <img src="{{ '/assets/images/banners/step-report.png' | relative_url }}" alt="Rapport og anbefalinger" class="process-banner">
            <h3>Rapport og anbefalinger</h3>
            <p>Sammenlikning med best practice og konkrete tiltak.</p>
        </div>
    </div>
</section>

<section class="landing-story">
    <h2>Historien bak metoden</h2>
    <p>«Ledelse 60:2» er vår tilnærming til å bruke en enkel vitenskapelig metode for å sammenlikne etterprøvbare beskrivelser av ledelsesfunksjonen på et gitt nivå i en virksomhet.</p>
    <a href="{{ '/vitenskapelig-grunnlag/' | relative_url }}" class="landing-science-link">Les det vitenskapelige grunnlaget →</a>
</section>

{% if site.cases.size > 0 %}
<section class="landing-cases">
    <h2>Resultater fra virkelige virksomheter</h2>
    <div class="landing-cases-grid">
        {% for case in site.cases %}
        <div class="case-card" style="box-shadow: var(--box-shadow-light);">
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

<section class="landing-cta">
    <h2>Klar for en mer moden ledelse?</h2>
    <p>Book en uforpliktende samtale, så finner vi ut om Ledelse 60:2 er rett for dere.</p>
    <a href="https://outlook.office.com/bookwithme/user/5abd33238853466689e2b7f79805b19d%40noexcuse.no" class="product-cta product-cta--large">Book samtale</a>
</section>
