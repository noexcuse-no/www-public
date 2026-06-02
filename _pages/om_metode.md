---
class: article
layout: page
title: "Om metodikk"
description: "«Ledelse 60:2» er en intervjubasert kartleggingsmetode for ledergrupper. Les om det teoretiske grunnlaget, kunnskapsproduksjon og hvorfor vi gjør dette."
permalink: /metode/
hero:
  image: /assets/images/banners/science-foundation.webp
  alt: "Vitenskapelig fundament"
  title: "Om metodikk"
  intro: "Strukturerte intervjuer for kartlegging av ledergrupper."
hero_effect: parallax-fade
json_ld:
  type: "TechArticle"
  name: "Om metodikk"
  description: "«Ledelse 60:2» er en intervjubasert kartleggingsmetode for ledergrupper. Metodikken bygger på et tverrfaglig teoretisk fundament."
  author:
    type: "Organization"
    name: "No Excuse AS"
  about:
    - type: "Thing"
      name: "Ledelse 60:2"
      description: "Intervjubasert kartlegging av ledelsesfunksjonen"
    - type: "Thing"
      name: "Bolman & Deal Four-Frame Model"
      description: "Organisasjonsanalyse og lederskap"
    - type: "Thing"
      name: "Organizational Development"
      description: "Organisasjonsutvikling og endringsledelse"
  proficiencyLevel: "Advanced"
  genre: "Methodology"
  datePublished: "2025-06-01"
  dateModified: "2025-06-01"
  sameAs:
    - "https://noexcuse.no"
---

{% include hero.html %}

<section id="teoretisk" class="science-section">
    <h2><span class="section-number">1</span> Teoretisk grunnlag for tilnærmingen</h2>
    <p>Med intervjuer samler vi da om hvordan medlemmer av ledergrupper ser på sin egen funksjon. Ved å stille 60 diagnostiske spørsmål på to timer avdekker vi viktige refleksjoner om hvordan medlemmer av en ledergruppe ser på hverandres lederfunksjon. Metodikken bygger på et tverrfaglig teoretisk fundament — fra organisasjonsteori og maktanalyse til kunnskapsproduksjon om kultur og beslutningsvitenskap - som gir den høye fleksible anvendelighet for kunden på tvers av domener og problemstillinger. Den anonymiserte datafangsten fra de de strukturerte intervjuene inngår som sammenliknende grunnlagsdata om organisasjoner.</p>
    <p>Intervjustrukturen i «Ledelse 60:2» tar direkte utgangspunkt i Lee G. Bolman og Terrence E. Deals firedelte rammeverk for organisasjonsanalyse, først presentert i <em>Reframing Organizations</em> (1984) og senere revidert i seks seks utgaver fram til 2017 (Bolman & Deal, 2017), utgitt på norsk som <em>Nytt perspektiv på organisasjon og ledelse</em> (Bolman & Deal, 2024).</p>

    <p>De fire perspektivene — eller "rammene" som det kalles på engelsk, derfor "rammeverk" — er den analytiske strukturen for de 60 spørsmålene. Med Bolman & Deal legger vi til grunn antakelsen at hvert perspektiv gir et gyldig, men ufullstendig bilde av virkeligheten. Bolman & Deals hovedpoeng er at ledere som bare ser organisasjonen med ett perspektiv, risikerer å ikke være oppmerksom på vesentlige forhold. De fire valgte perspektivene er ikke nødvendigvis de eneste, de mest riktige, uttømmende eller uten overlapp; først og fremst har vi valgt å anvende disse fire perspektivene som ordnende prinsipp fordi (a) de er relativt ukontroversielle og godt innarbeidet i domenet, and (b) perspektivene gjenspeiler en gjenkjennbarn og legitim kunnskapsontologi fra samtidens vestlige samfunn. De instrumentaliseres i moderne nyprofesjons- og fagstudier slik som <strong>Ledelse</strong> og <strong>HR</strong></p>

    <div class="section-illustration">
        <img src="{{ '/assets/images/banners/metode-t3-teori.webp' | relative_url }}" alt="Teoretisk grunnlag — fire perspektiver" class="section-illustration-img" loading="lazy">
    </div>

    <div class="card-grid card-grid--frames">
        {% assign frames = site.pages | where: "class", "frame" | sort: "weight" %}
        {% for topic in frames %}
            {% include card.html topic=topic %}
        {% endfor %}
    </div>
</section>

<section id="forskning" class="science-section">
    <h2><span class="section-number">2</span> Kunnskapsproduksjon i praksis</h2>
    <p class="lead">«Ledelse 60:2» er ikke bare en tjeneste som vi tilbyr organisasjoner for å hjelpe med å forbedre ledelsesfunksjonen, det er en metode for å <em>utvikle ny kunnskap om nordisk ledelses- og styringspraksis</em>.</p>

    <div class="section-illustration">
        <img src="{{ '/assets/images/banners/metode-t3-forskning.webp' | relative_url }}" alt="Kunnskapsproduksjon i praksis" class="section-illustration-img" loading="lazy">
    </div>

    <div class="science-highlight">
        <h3>Hver gjennomføring styrker kunnskapsgrunnlaget</h3>
        <p>Hvert intervju produserer strukturerte, sammenliknbare data som anonymiseres og inngår i et voksende datasett.</p> Dette er et viktig moment for oss, og former både salg og gjennomføring.
    </div>

    <div class="science-quote">
        <p>«NO EXCUSE AS har rett til å vederlagsfritt anvende anonymiserte data fra bistanden og arbeidsresultatet til forskning i tråd med generelle og fagspesifikke forskningsetiske retningslinjer som bestemt av De nasjonale forskningsetiske komiteene.»</p>
        <cite>— Standard avtalevilkår § 3.3</cite>
    </div>

    <div class="science-divider">
        <div class="science-divider-image">
        </div>
        <div class="science-divider-content">
            <h3>Norske forskningsetiske standarder</h3>
        </div>
    </div>

    <p>Databehandlingen følger <strong>De nasjonale forskningsetiske komiteenes (FEK) generelle forskningsetiske retningslinjer</strong> (2014).</p>

    <div class="ethics-columns">
        <div class="ethics-column">
            <img src="{{ '/assets/images/banners/metode-t4-respekt.webp' | relative_url }}" alt="" class="micro-illustration" loading="lazy" aria-hidden="true">
            <h4>Respekt</h4>
            <p>Informantene behandles med verdighet og integritet</p>
        </div>
        <div class="ethics-column">
            <img src="{{ '/assets/images/banners/metode-t4-konsekvenser.webp' | relative_url }}" alt="" class="micro-illustration" loading="lazy" aria-hidden="true">
            <h4>Gode konsekvenser</h4>
            <p>Forskningen skal ha positiv nytteverdi for deltakerne og samfunnet</p>
        </div>
        <div class="ethics-column">
            <img src="{{ '/assets/images/banners/metode-t4-rettferdighet.webp' | relative_url }}" alt="" class="micro-illustration" loading="lazy" aria-hidden="true">
            <h4>Rettferdighet</h4>
            <p>Prosjektet er rettferdig utformet og gjennomført</p>
        </div>
        <div class="ethics-column">
            <img src="{{ '/assets/images/banners/metode-t4-integritet.webp' | relative_url }}" alt="" class="micro-illustration" loading="lazy" aria-hidden="true">
            <h4>Integritet</h4>
            <p>Prosjektet følger anerkjente normer og opptrer ansvarlig</p>
        </div>
    </div>

    <p><strong>Forskningsetikkloven § 4</strong> bestemmer at "Forskere skal opptre med aktsomhet for å sikre at all forskning skjer i henhold til anerkjente forskningsetiske normer. Dette gjelder også under forberedelser til forskning, rapportering av forskning og andre forskningsrelaterte aktiviteter."</p>

    <p>Vi følger <strong>NESH-retningslinjene</strong> (2021, 5. utg.) og anvender <a href="https://noexcuse.no/assets/samtykke.pdf">et standardskjema (link)</a> for å sikre at samtykke fra personer er informert, frivillig, utvetydig og dokumentert. Det får ingen konsekvenser for den enkelte eller for virksomheten om enkeltpersoner ikke ønsker å bidra, det betyr bare at de ikke inngår som datakilde og kun eventuelt bidrar lokalt innenfor oppdraget hos virksomheten.</p>

    <div class="science-highlight">
        <h3>Metoden blir bedre jo flere som bruker den</h3>
        <p>Standard avtalevilkår § 3.1 fastslår at kunden eier resultatene av bistanden, men at No Excuse AS «kan fritt utnytte de generelle erfaringer, metoder og teknikker som opparbeides og eventuelt utvikles gjennom denne avtale». Dette er et prinsipp som kommer alle kunder til gode - slik blir vi ledere i stand til å sikkert sammenlikne seg selv med praksisen i andre organisasjoner. Metodegrunnlaget forbedres kontinuerlig — ikke gjennom teoretiske antakelser, men gjennom praktisk erfaring fra virkelige ledergrupper.</p>
    </div>
</section>

<section id="hvorfor" class="science-section">
    <h2><span class="section-number">3</span> Hvorfor vi gjør dette</h2>

    <p>No Excuse AS ble stiftet i juni 2025. Forretningsidéen kom fra erfaring med å bistå virksomheter med etterlevelse av ISO-rammeverk, lov- og kundekrav. Innsikten var at god ledelse ofte blir erstattet av tungrodd administrasjon og byråkrati. Det er et kjerneproblem dersom virksomheten skal være i stand til å møte usikkerhet og nye muligheter. Det er intensjonen bak en regel som gjør den relevant og verdifull, det er liten vits i å "simulere" moden ledelse.</p>

    <div class="section-illustration">
        <img src="{{ '/assets/images/banners/metode-t3-hvorfor.webp' | relative_url }}" alt="Hvorfor vi gjør dette" class="section-illustration-img" loading="lazy">
    </div>

    <p>Idéen bygger på en overbevisning om at ledelse må forstås fra flere perspektiver — slik Bolman & Deal har argumentert for i over 40 år. De kvalitative metodene i «Ledelse 60:2» er vårt svar på en tid preget av KI, mistillit og helautomatiske løsninger. Ved å komme mennesker i møte og legge til rette for å lære av hverandre styrker vi det unikt menneskelige. Dette gjenspeiles også i hvordan vi har en skeptisk og kritisk innstilling til bruk av maskinlæring og maskingenerert innhold i det metodiske arbeidet. En statistisk algoritme kan ikke "tenke" eller "forstå".</p>
</section>

<section id="referanser" class="science-section references">
    <h2>Referanser</h2>
    <ul>
        <li>Blanchard, K. & Barrett, C. (2011). <em>Lead with LUV: A Different Way to Create Real Success</em>. Pearson Education.</li>
        <li>Bolman, L. G. & Deal, T. E. (2017). <em>Reframing Organizations: Artistry, Choice, and Leadership</em> (6. utg.). Wiley.</li>
        <li>Bolman, L. G. & Deal, T. E. (2024). <em>Nytt perspektiv på organisasjon og ledelse</em> (6. utg., M. Skaug & K. M. Thorbjørnsen, overs.). Gyldendal.</li>
        <li>De nasjonale forskningsetiske komiteene. (2014). <em>Generelle forskningsetiske retningslinjer</em>. Hentet fra forskningsetikk.no</li>
        <li>Den nasjonale forskningsetiske komité for samfunnsvitenskap og humaniora (NESH). (2021). <em>Forskningsetiske retningslinjer</em> (5. utg.). Hentet fra forskningsetikk.no</li>
        <li>Hubbard, D. W. (2014). <em>How to Measure Anything</em> (3. utg.). Wiley.</li>
        <li>Logan, D., King, J. & Fischer-Wright, H. (2011). <em>Tribal Leadership</em>. HarperCollins.</li>
        <li>Lov om organisering av forskningsetisk arbeid (forskningsetikkloven). (2017). Hentet fra lovdara.no</li>
        <li>No Excuse AS. (2026). <em>Standard avtalevilkår — Oppdrag</em>.</li>
        <li>Pfeffer, J. (2010). <em>Power: Why Some People Have It — and Others Don't</em>. HarperBusiness.</li>
    </ul>
</section>


