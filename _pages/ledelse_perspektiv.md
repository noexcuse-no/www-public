---
class: article
layout: page
title: "Fire perspektiver — Multiframe thinking som lederferdighet"
description: "Hvorfor en-rame-tenkning feiler, og hvordan multiframe thinking gir bedre diagnostikk. Det egentlige argumentet for 'no scoring'."
permalink: /perspektiv/
tags: ["multiframe thinking", "ledelsesdiagnostikk", "organisasjonskultur"]
json_ld:
  type: "Article"
  name: "Fire perspektiver — Multiframe thinking som lederferdighet"
  description: "Hvorfor en-rame-tenkning feiler, og hvordan multiframe thinking gir bedre diagnostikk. Det egentlige argumentet for 'no scoring'."
  author:
    type: "Organization"
    name: "No Excuse AS"
  citation:
    - "@type": "Book"
      name: "Reframing Organizations: Artistry, Choice, and Leadership"
      author:
        - "Lee G. Bolman"
        - "Terrence E. Deal"
      datePublished: "2017"
      publisher: "Jossey-Bass"
    - "@type": "Book"
      name: "How to Measure Anything: Finding the Value of Intangibles in Business"
      author: "Douglas W. Hubbard"
      datePublished: "2014"
      publisher: "Wiley"
    - "@type": "Book"
      name: "Tribal Leadership: Leveraging Natural Groups to Build a Thriving Organization"
      author:
        - "Dave Logan"
        - "John King"
        - "Halee Fischer-Wright"
      datePublished: "2011"
      publisher: "Harper Business"
    - "@type": "Book"
      name: "Power: Why Some People Have It — and Others Don't"
      author: "Jeffrey Pfeffer"
      datePublished: "2010"
      publisher: "Harper Business"
  about:
    - type: "Thing"
      name: "Bolman og Deals fire rammeverk"
    - type: "Thing"
      name: "Multiframe thinking"
    - type: "Thing"
      name: "Ledelsesdiagnostikk"
questions:
  - "Hvilket rammeverk strekker du deg først etter når noe går galt — struktur, mennesker, politikk eller symboler?"
  - "Når endret du sist mening fordi du så situasjonen fra et annet perspektiv?"
  - "Har teamet ditt en «utpekt skeptiker» for hvert rammeverk — noen som aktivt utfordrer det dominerende perspektivet?"
  - "Hva ville ditt største problem sett ut som gjennom linsen du bruker minst?"
  - "Hvilket rammeverk mangler i ledergruppens naturlige samtale — og hva koster det dere å ikke ha det med?"
---

{% include hero.html
  show_frame_nav=true
  hero_effect=page.hero_effect
  image="/assets/images/banners/hero-perspektiv.webp"
  image_alt="Abstrakt illustrasjon av fire overlappende linser — et prisme som splitter lys"
  breadcrumb="← No Excuse AS"
  title="Fire perspektiver — se mer enn du ser"
  intro="De fleste ledere ser verden gjennom ett filter. De beste ser gjennom fire — og vet hvilket som passer når. Multiframe thinking er ikke teori, det er en ferdighet."
%}

{% capture intro_body %}
En ingeniør som blir leder ser strukturelle problemer: uklare roller, manglende prosesser, feil rapporteringslinjer. En HR-sjef ser menneskelige problemer: motivasjon, trivsel, relasjoner. En politisk aktør ser maktdynamikk: allianser, agendaer, budsjettkamper. En markedsfører ser symboler: historier, identitet, mening.

Alle har rett. Og alle tar feil — fordi de ser bare én side.

Bolman og Deal (2017) kaller dette for enrammetenking — «the tendency to see only what our training and experience have taught us to see.»[^bolman2017] De fleste ledere har ett dominerende perspektiv, ett filter de bruker på alle situasjoner. Problemet er at organisasjonslivet ikke er enkelt nok til å forstås gjennom ett filter.

Denne artikkelen handler ikke om de fire rammeverkene — hvert av dem har sin egen artikkel ([struktur]({{ '/struktur/' | relative_url }}), [mennesker]({{ '/mennesker/' | relative_url }}), [påvirkning]({{ '/påvirkning/' | relative_url }}), [identitet]({{ '/identitet/' | relative_url }})). Den handler om ferdigheten å bevege seg mellom dem — multiframe thinking — og hvorfor dette er den faktiske kjernekompetansen i ledelse.
{% endcapture %}
{% include section-wrapper.html body=intro_body %}

{% include framework-illustration.html
  image="/assets/images/banners/perspektiv-t2-fire-perspektiver.webp"
  alt="Fire overlappende linser som representerer de fire perspektivene i multiframe thinking"
%}

{% capture enrammefellen_intro %}
Enrammefellen er ikke at du har et favorittperspektiv. Det har alle. Fellen er at du bruker det samme perspektivet på alle problemer, uavhengig av hva situasjonen krever.
{% endcapture %}

{% capture enrammefellen_box1 %}
En leder som alltid starter med omorganisering, nye prosesser og rapporteringslinjer, kan skape kaos i en organisasjon som egentlig trenger kulturell trygghet. Strukturelle løsninger på menneskelige problemer skaper mer byråkrati uten å løse grunnårsaken.
{% endcapture %}

{% capture enrammefellen_box2 %}
En leder som alltid spør «hvordan har du det?» og aldri tar upopulære beslutninger, kan skape en hyggelig kultur som ikke presterer. Menneskerettede løsninger på strukturelle problemer gir gode samtaler, men ingen endring.
{% endcapture %}

{% capture enrammefellen_box3 %}
En leder som alltid analyserer maktforhold og aldri handler, kan lamme organisasjonen. Politisk analyse uten strukturell gjennomføring blir spill og posisjonering — ikke ledelse.
{% endcapture %}

{% capture enrammefellen_box4 %}
En leder som alltid snakker om verdier og kultur og aldri tar strukturelle grep, mister troverdighet. Symbolsk ledelse uten innhold blir PR — ikke ledelse.
{% endcapture %}

{% capture enrammefellen_tail %}
Konsekvensen er ikke bare at du tar feil avgjørelser. Konsekvensen er at du ikke ser at du ser for snevert. Du forklarer dårlige resultater med at verden er kaotisk, i stedet for å innse at verktøykassen din er for liten.
{% endcapture %}

{% capture enrammefellen_body %}
{{ enrammefellen_intro }}

{% include info-box.html heading="Når struktur blir tvangstrøye" illustration="/assets/images/banners/perspektiv-t3-strukturfellen.webp" illustration_alt="Illustrasjon av strukturfellen — et system av regler og prosesser uten fleksibilitet" illustration_float="left" body=enrammefellen_box1 %}

{% include info-box.html heading="Når mennesker blir overfladisk" illustration="/assets/images/banners/perspektiv-t3-menneskefellen.webp" illustration_alt="Illustrasjon av menneskefellen — harmoni uten retning" illustration_float="right" body=enrammefellen_box2 %}

{% include info-box.html heading="Når politikk blir kynisme" illustration="/assets/images/banners/perspektiv-t3-politisk-felle.webp" illustration_alt="Illustrasjon av politisk felle — maktspill uten handling" illustration_float="left" body=enrammefellen_box3 %}

{% include info-box.html heading="Når symbolikk blir tom" illustration="/assets/images/banners/perspektiv-t3-symbolfellen.webp" illustration_alt="Illustrasjon av symbolfellen — verdier uten substans" illustration_float="right" body=enrammefellen_box4 %}

{{ enrammefellen_tail }}
{% endcapture %}

{% include section-container.html class="section container--wide animate-on-scroll fade-in-up" heading="Enrammefellen — når ett filter blir hele bildet" body=enrammefellen_body %}

{% capture multiframe_intro %}
Multiframe thinking er ikke å kjenne til fire teorier. Det er å ha fire mentale linser du kan skifte mellom, ofte i løpet av minutter. Det er en ferdighet, ikke kunnskap.
{% endcapture %}

{% capture multiframe_box1 %}
Multiframe thinking handler ikke om å analysere ett perspektiv av gangen. Det handler om å holde alle fire i hodet samtidig og spørre: «Hvilket perspektiv forklarer mest av det jeg ser akkurat nå?» Bolman og Deal sammenligner det med en jazzmusiker som må holde melodi, harmoni, rytme og samspill i hodet samtidig — ikke sekvensielt.[^bolman2017]
{% endcapture %}

{% capture multiframe_box2 %}
Forskjellen mellom en ideologisk leder og en diagnostisk leder er enkel: Ideologen har én forklaring på alt. Diagnostikeren har fire og velger den som passer situasjonen. Den diagnostiske disiplinen er å spørre: «Hvilket rammeverk gir mest innsikt her — og hva ville de andre avslørt som jeg ikke ser?»
{% endcapture %}

{% capture multiframe_box3 %}
Å reframe en situasjon tar to minutter. Effekten kan vare i måneder. Når en leder i en vanskelig samtale stopper opp og sier: «La oss se på dette fra et annet perspektiv,» er det multiframe thinking i praksis. Når et team som sitter fast i en konflikt, blir enige om å analysere problemet gjennom en annen linse, er det multiframe thinking i praksis.
{% endcapture %}

{% capture multiframe_tail %}
Ingeniøren som lærer å se maktspill. HR-sjefen som lærer å se strukturelle feil. Gründeren som lærer å se symbolske behov i organisasjonen. Det er dette som skiller gode ledere fra effektive ledere.
{% endcapture %}

{% capture multiframe_body %}
{{ multiframe_intro }}

{% include info-box.html heading="Samtidighet, ikke sekvens" body=multiframe_box1 %}

{% include info-box.html heading="Diagnostisk disiplin, ikke ideologi" body=multiframe_box2 %}

{% include info-box.html heading="Praktisk, ikke akademisk" body=multiframe_box3 %}

{{ multiframe_tail }}
{% endcapture %}

{% include section-container.html class="section container--wide animate-on-scroll fade-in-up" heading="Hva multiframe thinking faktisk er" body=multiframe_body %}

{% capture noscoring_box1 %}
Douglas Hubbard, forfatteren av *How to Measure Anything*, argumenterer for at den største feilen i måling er å tro at du måler presist når du ikke gjør det. «The most important measurement is knowing what you don't know — and quantifying that uncertainty.»[^hubbard2014]

En poengsum på 67 av 100 på «tillit» er presis i tall, upresis i mening. Betyr det at 67% av ansatte stoler på lederen? At lederen skårer 67% av maksimal tillit? At organisasjonen er 67% av veien til en tillitskultur? Uten kontekst og uten å vite hva 67 faktisk innebærer, er talltrygghet en illusjon.
{% endcapture %}

{% capture noscoring_box2 %}
Logans kulturstadier i *Tribal Leadership* er et beskrivende rammeverk. «Kulturen din viser Stage 3-mønstre» er en observasjon, ikke en karakter. Poenget er ikke å fastslå at Stage 3 er dårlig — det er å gi ledergruppen et språk for å gjenkjenne hvor de er og hvor de kan gå.[^logan2011]

Ledelse 60:2 følger samme logikk. Intervjuet avdekker mønstre i hvordan ledergruppen tenker om makt, struktur, mennesker og identitet. Det gir gjenkjennelse, ikke poeng. [Triader-artikkelen]({{ '/triader/' | relative_url }}) viser for eksempel hvordan beskrivende analyse av relasjonsmønstre gir mer handlingsrom enn en poengsum på «teamsamhold.»
{% endcapture %}

{% capture noscoring_box3 %}
Jeffrey Pfeffer, forskeren bak mye av forståelsen av [makt i organisasjoner]({{ '/makt/' | relative_url }}), advarer: «Numbers are political. They are used to persuade, to claim credit, and to deflect blame.»[^pfeffer2010]

En poengsum på tillit blir umiddelbart et politisk verktøy. Lederen med lav skår må forsvare seg. Lederen med høy skår får makt. Samtalen handler ikke lenger om utvikling — den handler om posisjonering. Ved å ikke score, holder Ledelse 60:2 samtalen der den hører hjemme: i diagnostikk og utvikling.
{% endcapture %}

{% capture noscoring_box4 %}
Scoring forutsetter en enkelt dimensjon. Organisasjoner er flerdimensjonale. Tillit kan være høy i én relasjon og lav i en annen. Struktur kan fungere i én avdeling og ikke i neste. En poengsum fanger ikke dette — den reduserer kompleksitet til et tall som skjuler mer enn det avslører.

Alternativet er mønstergjenkjenning: «Ledergruppen din viser sterke strukturelle reflekser, men svak politisk bevissthet. Her er hva det betyr for beslutningstakingen deres.» Det er mer presist, mer handlingsrettet, og mindre spillbart enn en poengsum.
{% endcapture %}

{% capture noscoring_body %}
Hvorfor har Ledelse 60:2 ingen poengsum, ingen karakter, ingen rangering? Er ikke det mindre presist?

Kort svar: Nei. Det er mer presist. Her er hvorfor.

{% include info-box.html heading="Hubbard: Det viktigste er å vite hva du ikke vet" body=noscoring_box1 %}

{% include info-box.html heading="Logan: Beskrivende, ikke evaluerende" body=noscoring_box2 %}

{% include info-box.html heading="Pfeffer: Tall er politiske" body=noscoring_box3 %}

{% include info-box.html heading="Multi-dimensionalitet" body=noscoring_box4 %}
{% endcapture %}

{% include section-container.html class="section container--wide animate-on-scroll fade-in-up" heading="«No scoring» — det filosofiske argumentet" body=noscoring_body %}

{% capture cases_box1 %}
En mellomstor teknologibedrift vokste fra 30 til 120 ansatte på to år. Strukturen som fungerte i oppstartsfasen, bremset nå beslutningstaking. En enrammet leder ville startet med ny organisasjonskart.

Multiframe-tilnærmingen starter med fire spørsmål: Hvilken struktur tjener strategien (struktur)? Hvem har uformell makt som må hensyntas (politikk)? Hvordan oppleves endringen for de ansatte (mennesker)? Hvilken historie forteller vi om hvorfor vi endrer oss (symboler)?

Rekkefølgen betyr noe: Struktur først, deretter politikk (hvem vinner/hvem taper), deretter mennesker (støtte og utvikling), til slutt symboler (mening og identitet).[^bolman2017]
{% endcapture %}

{% capture cases_box2 %}
To like store selskaper slås sammen. En enrammet leder ville kjørt due diligence på tallene og deretter implementert ny struktur. Feilen: Ingen spurte om de ansatte i selskap A følte seg som tapere, om kulturene var kompatible, eller om maktdynamikken mellom de to ledergruppene ville blokkere samarbeid.

Multiframe-tilnærmingen starter med symboler: Hvem er vi nå? Hvilken historie forteller vi om fusjonen? Deretter politikk: Hvem får hvilke posisjoner? Deretter struktur: Hvordan organiserer vi det nye selskapet? Til slutt mennesker: Hvordan sikrer vi at ansatte føler seg sett i prosessen?
{% endcapture %}

{% capture cases_box3 %}
En leder våkner til en krise: en større kunde har trukket seg, en nøkkelperson har sagt opp, og styret krever svar innen 48 timer. I en krise har du ikke tid til sekvensiell analyse. Multiframe thinking betyr at du intuitivt vurderer alle fire dimensjoner samtidig.

Struktur: Hvem må gjøre hva de neste 48 timene? Politikk: Hvem må informeres, og hvem kan bli en alliert? Mennesker: Hvem er mest påvirket og trenger støtte? Symboler: Hvilken historie forteller vi — både internt og eksternt?
{% endcapture %}

{% capture cases_body %}
Teori er én ting. Slik ser multiframe thinking ut i virkelige situasjoner:

{% include info-box.html heading="Case 1: Omorganisering" body=cases_box1 %}

{% include info-box.html heading="Case 2: Fusjon" body=cases_box2 %}

{% include info-box.html heading="Case 3: Krise" body=cases_box3 %}

Felles for alle tre casene: Multiframe thinking gir ikke «det rette svaret.» Det gir bedre spørsmål. Og i en kompleks verden er bedre spørsmål ofte mer verdifullt enn raske svar.
{% endcapture %}

{% include section-container.html class="section container--wide animate-on-scroll fade-in-up" heading="Integrering i praksis — tre caser" body=cases_body %}

{% capture practice_box1 %}
Gjør det til en vane å stoppe opp og si: «La oss se på dette fra et annet perspektiv.» Tving deg selv og teamet til å vurdere minst to rammeverk før dere konkluderer. Still spørsmålet: «Hva ville dette sett ut som gjennom linsen vi bruker minst?»
{% endcapture %}

{% capture practice_box2 %}
I ledergruppen: tilordn hvert rammeverk til en person som har ansvar for å bringe det perspektivet inn i diskusjonen. Ruller slik at alle får trene på alle perspektiver. «Du har struktur denne uken — pass på at vi ikke glemmer å spørre hvordan ting henger sammen.»
{% endcapture %}

{% capture practice_box3 %}
Ledere som leser innenfor én disiplin utvikler enrammetenking. Utfordringen: En ingeniør bør lese om makt (Pfeffer). En HR-leder bør lese om struktur (Bolman & Deal, kapittel 3). En markedsfører bør lese om psykologisk trygghet (Edmondson). Multiframetenkning krever bredde.
{% endcapture %}

{% capture practice_box4 %}
60:2-intervjuet er i seg selv en multiframe-øvelse. Spørsmålene tvinger ledergruppen til å skifte perspektiv — fra struktur til mennesker, fra politikk til symboler — i løpet av en times samtale. Ikke fordi poenget er å bli flink til å bytte rammeverk, men fordi det enkelte spørsmålet gir mening bare innenfor ett rammeverk av gangen.
{% endcapture %}

{% capture practice_body %}
Multiframe thinking er en ferdighet som kan trenes. Her er fire konkrete praksiser:

{% include info-box.html heading="1. Eksplisitt reframing i møter" body=practice_box1 %}

{% include info-box.html heading="2. Rullerende perspektiver" body=practice_box2 %}

{% include info-box.html heading="3. Tverrfaglig lesing" body=practice_box3 %}

{% include info-box.html heading="4. Ledelse 60:2 som multiframe-praksis" body=practice_box4 %}
{% endcapture %}

{% include section-container.html class="section container--wide animate-on-scroll fade-in-up" heading="Hvordan utvikle multiframe-kapabilitet" body=practice_body %}

{% include question-list.html %}

{% include cta-section.html
  heading="Få kartlagt ledergruppens perspektivbredde"
  body="Ledelse 60:2 kartlegger ikke bare hva ledergruppen din mener — den avdekker hvilke perspektiver som dominerer og hvilke som mangler. Bestill en uforpliktende samtale for å lære mer."
  secondary_url="/"
  secondary_text="Les mer om Ledelse 60:2 →"
%}

{% capture refs_body %}
Artikkelen bygger på Bolman & Deal (2017) sin forskning på rammeverk og organisasjonsanalyse, Douglas Hubbard (2014) sitt arbeid med måling av komplekse fenomener, Dave Logan (2011) om beskrivende kulturanalyse, og Jeffrey Pfeffer (2010) om makt og politikk i organisasjoner.
{% endcapture %}
{% include about-section.html class="story" heading="Referanser" body=refs_body %}

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Hva er multiframe thinking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Multiframe thinking er evnen til å se organisasjonsproblemer gjennom fire perspektiver samtidig — strukturelt, menneskelig, politisk og symbolsk. Det er en diagnostisk ferdighet, ikke teoretisk kunnskap."
      }
    },
    {
      "@type": "Question",
      "name": "Hvorfor bruker ikke Ledelse 60:2 poengskala?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fordi poengsummer reduserer kompleksitet til et tall som skjuler mer enn det avslører. De blir politiske verktøy og flytter fokus fra utvikling til posisjonering. Ledelse 60:2 bruker mønstergjenkjenning i stedet for scoring — det er mer presist og mer handlingsrettet."
      }
    },
    {
      "@type": "Question",
      "name": "Hvordan utvikler man multiframe-kapabilitet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gjennom fire praksiser: eksplisitt reframing i møter (stopp opp og velg et nytt perspektiv), rullerende perspektiver i teamet (tilordn rammeverk til ulike personer), tverrfaglig lesing (utfordre eget dominerende perspektiv), og bruk av verktøy som Ledelse 60:2 som tvinger perspektivbytte."
      }
    }
  ]
}
</script>

[^bolman2017]: Bolman, L. G. & Deal, T. E. (2017). *Reframing Organizations: Artistry, Choice, and Leadership* (6. utg.). Jossey-Bass. Fire rammeverk for organisasjonsanalyse: strukturelt, menneskelig, politisk og symbolsk.

[^hubbard2014]: Hubbard, D. W. (2014). *How to Measure Anything: Finding the Value of Intangibles in Business* (3. utg.). Wiley. «The most important measurement is knowing what you don't know — and quantifying that uncertainty.»

[^logan2011]: Logan, D., King, J., & Fischer-Wright, H. (2011). *Tribal Leadership: Leveraging Natural Groups to Build a Thriving Organization* (2. utg.). Harper Business. Kulturstadier som beskrivende rammeverk for ledergrupper.

[^pfeffer2010]: Pfeffer, J. (2010). *Power: Why Some People Have It — and Others Don't*. Harper Business. «Numbers are political. They are used to persuade, to claim credit, and to deflect blame.»
