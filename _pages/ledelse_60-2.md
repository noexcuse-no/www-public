---
class: product
layout: page
title: "Ledelse 60:2 — Orientering for ledergruppen"
description: "Tidseffektiv orientering for ledergruppen — 60 diagnostiske spørsmål, 2 timer, felles retningsvalg."
permalink: /ledelse-60-2/
name: "Ledelse 60:2"
short_description: "Enkel, kunnskapsbasert orientering for ledergruppen. Sett av 2 timer for 60 diagnostiske spørsmål, finn retningen."
url: "/ledelse-60-2/"
hero:
  image: /assets/images/hero-illustration.webp
  alt: "Ledelse 60:2"
  title: "Ledelse 60:2"
  intro: "Enkel, kunnskapsbasert orientering for ledergruppen. 60 spørsmål på 2 timer."
hero_effect: parallax-fade
story: "«Ledelse 60:2» er vår tilnærming til å bruke en enkel vitenskapelig metode for å sammenlikne etterprøvbare beskrivelser av ledelsesfunksjonen på et gitt nivå i en virksomhet. Virksomhetens utbytte er å få et bedre beslutningsgrunnlag for å prioritere forbedringer av hvordan ledelsen fungerer, og forbedring av administrative støttefunksjoner for styring og kontroll. Vår motivasjon er å bidra til utviklingen ny kunnskap om nordisk ledelses- og styringspraksis, noe som vi tror vil være viktig for norske virksomheters konkurranseevne."
image: "assets/images/hero-illustration.webp"
tags: "#ledelse #orientering #analyse #ledelse60-2"
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

{% capture cta_buttons_body %}
[Bestill Ledelse 60:2](https://outlook.office.com/book/ledelse@noexcuse.no/?ismsaljsauthenabled){: .product-cta}
[Hvordan fungerer det? ↓](#hvordan){: .product-cta .product-cta--spaced}
{% endcapture %}
{% include section-container.html class="section container--narrow" style="text-align: center; padding-top: var(--space-xl);" body=cta_buttons_body markdownify_body=true %}

{% capture benefits_body %}
{% include benefit-cards.html %}
{% endcapture %}
{% include section-container.html class="landing-benefits animate-on-scroll fade-in-up" heading="Fire gode grunner" body=benefits_body %}

{% capture process_body %}
{% include step-cards.html %}
{% endcapture %}
{% include section-container.html class="landing-process animate-on-scroll fade-in-up" id="hvordan" heading="Hvordan gjør vi det?" body=process_body %}

{% capture story_body %}
{{ page.story }}

{% include framework-illustration.html image="/assets/images/banners/ledelse-60-2-t2-prosessflyt.webp" alt="Tretrinns prosess for ledelseskartlegging" %}
[Les mer om metoden →]({{ '/metode/' | relative_url }}){: .product-cta}
{% endcapture %}
{% include section-container.html class="landing-story animate-on-scroll fade-in-up" heading="Historien bak metoden" body=story_body markdownify_body=true %}

{% assign cases = site.pages | where: "class", "case" | where: "published", true %}
{% if cases.size > 0 %}
{% capture cases_body %}
{% include cases-cards.html %}
{% endcapture %}
{% include section-container.html class="landing-cases animate-on-scroll fade-in-up" heading="Kundecaser" body=cases_body %}
{% endif %}

{% capture final_cta_body %}
Ta en uforpliktende samtale med oss, så finner vi ut om Ledelse 60:2 er rett for dere.
[Velg et tidspunkt](https://outlook.office.com/bookwithme/user/5abd33238853466689e2b7f79805b19d%40noexcuse.no){: .product-cta .product-cta--large}
{% endcapture %}
{% include section-container.html class="landing-cta animate-on-scroll fade-in-up" heading="Hvordan jobber dere med bedre ledelse?" body=final_cta_body markdownify_body=true %}
