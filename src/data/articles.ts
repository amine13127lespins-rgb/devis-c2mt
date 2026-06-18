// ============================================================
//  ARTICLES DU BLOG SEO – Coupe du Monde 2026
//  Ajoutez vos articles ici pour alimenter le blog
// ============================================================

export interface Article {
  id: string
  slug: string           // URL /blog/[slug]
  title: string          // Balise <title> SEO
  description: string    // Meta description
  category: string       // Catégorie
  tags: string[]         // Tags SEO
  publishedAt: string    // Date publication ISO
  updatedAt?: string
  author: string
  readingTime: number    // minutes
  featured: boolean
  image?: string
  content: string        // HTML/Markdown du contenu
}

export const articles: Article[] = [
  {
    id: '1',
    slug: 'calendrier-france-coupe-du-monde-2026',
    title: 'Calendrier France Coupe du Monde 2026 : tous les matchs des Bleus',
    description: 'Retrouvez le calendrier complet de l\'équipe de France à la Coupe du Monde 2026 : dates, horaires en France, adversaires et stades de tous les matchs.',
    category: 'Calendrier',
    tags: ['France', 'calendrier', 'Coupe du Monde 2026', 'matchs France', 'horaires'],
    publishedAt: '2026-06-01',
    updatedAt: '2026-06-17',
    author: 'Rédaction MondialFoot',
    readingTime: 5,
    featured: true,
    content: `
<h2>Le calendrier complet de la France à la Coupe du Monde 2026</h2>
<p>L'équipe de France, championne du monde 2018, dispute la Coupe du Monde 2026 dans le <strong>Groupe A</strong> aux côtés de l'Australie, du Nigeria et du Mexique. Voici le calendrier détaillé des Bleus avec les horaires en heure française (CEST, UTC+2).</p>

<h3>Phase de groupes – Groupe A</h3>
<table>
  <tr><th>Date</th><th>Match</th><th>Heure (France)</th><th>Stade</th><th>Score</th></tr>
  <tr><td>12 juin 2026</td><td>🇫🇷 France vs Australie 🇦🇺</td><td>21h00</td><td>MetLife Stadium (New York)</td><td>4-1</td></tr>
  <tr><td>17 juin 2026</td><td>🇫🇷 France vs Nigeria 🇳🇬</td><td>21h00</td><td>Rose Bowl (Los Angeles)</td><td>2-0</td></tr>
  <tr><td>22 juin 2026</td><td>🇲🇽 Mexique vs France 🇫🇷</td><td>21h00</td><td>SoFi Stadium (Los Angeles)</td><td>À venir</td></tr>
</table>

<h2>Analyse du groupe A</h2>
<p>Avec 6 points en 2 matchs, la France est déjà qualifiée pour les huitièmes de finale avant même de jouer contre le Mexique. Kylian Mbappé a déjà inscrit <strong>3 buts</strong> en 2 matchs et est le meilleur buteur du tournoi avec d'autres attaquants.</p>

<h2>Comment suivre les matchs de la France en direct ?</h2>
<p>Les matchs de l'équipe de France sont diffusés sur <strong>TF1</strong> (en clair) et <strong>beIN Sports 1</strong>. La chaîne TF1+ permet également le streaming gratuit pour les résidents en France.</p>

<h2>Les prochains matchs de la France</h2>
<p>Si la France se qualifie en tant que première de groupe (ce qui est quasiment acquis), elle affrontera le 2ème du Groupe B ou un meilleur 3ème en huitièmes de finale autour du <strong>4-7 juillet 2026</strong>.</p>

<h2>Pronostic France Coupe du Monde 2026</h2>
<p>Avec un effectif exceptionnel emmené par Mbappé, Griezmann, Tchouaméni et Maignan, la France fait partie des grandes favorites aux côtés de l'Argentine, de l'Angleterre et du Brésil. Notre pronostic : <strong>la France va au moins en demi-finale</strong>.</p>
    `,
  },
  {
    id: '2',
    slug: 'heure-match-maroc-coupe-du-monde-2026',
    title: 'À quelle heure joue le Maroc à la Coupe du Monde 2026 ?',
    description: 'Tous les horaires des matchs du Maroc à la Coupe du Monde 2026 en heure française. Calendrier, résultats et prochaines rencontres des Lions de l\'Atlas.',
    category: 'Calendrier',
    tags: ['Maroc', 'horaires', 'matchs Maroc', 'Lions de l\'Atlas', 'groupe E'],
    publishedAt: '2026-06-02',
    updatedAt: '2026-06-17',
    author: 'Rédaction MondialFoot',
    readingTime: 4,
    featured: true,
    content: `
<h2>Les matchs du Maroc à la Coupe du Monde 2026</h2>
<p>Le Maroc, demi-finaliste de Qatar 2022, évolue dans le <strong>Groupe E</strong> avec l'Allemagne, la Colombie et l'Arabie Saoudite. Les Lions de l\'Atlas font partie des équipes les plus attendues du tournoi.</p>

<h3>Calendrier et horaires des matchs du Maroc</h3>
<table>
  <tr><th>Date</th><th>Match</th><th>Heure France</th><th>Stade</th><th>Score</th></tr>
  <tr><td>14 juin 2026</td><td>🇲🇦 Maroc vs Colombie 🇨🇴</td><td>18h00</td><td>MetLife Stadium, New York</td><td>1-0 ✅</td></tr>
  <tr><td>19 juin 2026</td><td>🇩🇪 Allemagne vs Maroc 🇲🇦</td><td>21h00</td><td>BC Place, Vancouver</td><td>À venir</td></tr>
  <tr><td>24 juin 2026</td><td>🇲🇦 Maroc vs Arabie Saoudite 🇸🇦</td><td>21h00</td><td>À confirmer</td><td>À venir</td></tr>
</table>

<h2>Le Maroc peut-il répéter l\'exploit de 2022 ?</h2>
<p>Walid Regragui a maintenu sa philosophie de jeu : défense solide avec Achraf Hakimi, créativité avec Hakim Ziyech et efficacité avec Youssef En-Nesyri. Après avoir battu la Colombie 1-0 en ouverture, le Maroc est bien parti pour sortir du groupe.</p>

<h2>Sur quelles chaînes voir les matchs du Maroc ?</h2>
<p>En France, les matchs du Maroc sont diffusés sur <strong>beIN Sports 1</strong> et parfois <strong>TF1</strong> lorsqu\'ils constituent des affiches majeures. Pensez à vérifier le programme avant chaque match.</p>
    `,
  },
  {
    id: '3',
    slug: 'classement-groupe-france-coupe-du-monde-2026',
    title: 'Classement Groupe A France – Coupe du Monde 2026 en direct',
    description: 'Suivez le classement du Groupe A en temps réel : France, Mexique, Nigeria, Australie. Points, buts marqués, différence de buts et statut de qualification.',
    category: 'Groupes',
    tags: ['classement', 'groupe A', 'France', 'Coupe du Monde 2026', 'points'],
    publishedAt: '2026-06-11',
    updatedAt: '2026-06-17',
    author: 'Rédaction MondialFoot',
    readingTime: 3,
    featured: true,
    content: `
<h2>Classement du Groupe A – Mise à jour au 17 juin 2026</h2>
<p>La France et le Mexique ont toutes les deux 6 points après 2 journées et sont d'ores et déjà qualifiées pour les huitièmes de finale de la Coupe du Monde 2026.</p>

<h3>Tableau du Groupe A</h3>
<table>
  <tr><th>Équipe</th><th>J</th><th>V</th><th>N</th><th>D</th><th>BP</th><th>BC</th><th>Diff</th><th>Pts</th></tr>
  <tr><td>🇫🇷 France</td><td>2</td><td>2</td><td>0</td><td>0</td><td>6</td><td>1</td><td>+5</td><td><strong>6</strong></td></tr>
  <tr><td>🇲🇽 Mexique</td><td>2</td><td>2</td><td>0</td><td>0</td><td>3</td><td>1</td><td>+2</td><td><strong>6</strong></td></tr>
  <tr><td>🇳🇬 Nigeria</td><td>2</td><td>0</td><td>0</td><td>2</td><td>1</td><td>4</td><td>-3</td><td><strong>0</strong></td></tr>
  <tr><td>🇦🇺 Australie</td><td>2</td><td>0</td><td>0</td><td>2</td><td>1</td><td>5</td><td>-4</td><td><strong>0</strong></td></tr>
</table>

<h2>Qui est qualifié dans le Groupe A ?</h2>
<p>✅ <strong>France</strong> – Qualifiée (6 pts, +5 de différence de buts)<br>✅ <strong>Mexique</strong> – Qualifié (6 pts, +2 de différence de buts)<br>❌ Nigeria – Éliminé<br>❌ Australie – Éliminée</p>

<h2>Quel adversaire pour la France en huitièmes ?</h2>
<p>En tant que 1ère ou 2ème du Groupe A, la France affrontera le 2ème ou 1er du Groupe B (Brésil, Suisse, Serbie, Cameroun). Le 3ème match France-Mexique déterminera la position finale.</p>
    `,
  },
  {
    id: '4',
    slug: 'comment-regarder-coupe-du-monde-2026-france',
    title: 'Comment regarder la Coupe du Monde 2026 en France ? TV, streaming, replay',
    description: 'Tout savoir sur les droits TV de la Coupe du Monde 2026 en France : TF1, beIN Sports, M6, TF1+, streaming légal, replays et applications officielles.',
    category: 'Guide',
    tags: ['TV', 'streaming', 'regarder', 'TF1', 'beIN Sports', 'Coupe du Monde 2026'],
    publishedAt: '2026-05-20',
    updatedAt: '2026-06-10',
    author: 'Rédaction MondialFoot',
    readingTime: 6,
    featured: true,
    content: `
<h2>Sur quelles chaînes voir la Coupe du Monde 2026 ?</h2>
<p>En France, les droits de diffusion de la Coupe du Monde 2026 sont partagés entre <strong>TF1</strong>, <strong>M6</strong> et <strong>beIN Sports</strong>. Voici le détail :</p>

<h3>🆓 En clair (gratuit)</h3>
<ul>
  <li><strong>TF1</strong> – Matchs de l'équipe de France + matchs clés + phases finales</li>
  <li><strong>M6</strong> – Matchs sélectionnés de la phase de groupes et certains matchs éliminatoires</li>
  <li><strong>TF1+</strong> (streaming gratuit) – Replay et diffusion en direct via l'application TF1+</li>
  <li><strong>6play</strong> (streaming gratuit) – Replay et direct pour les matchs M6</li>
</ul>

<h3>💰 En abonnement</h3>
<ul>
  <li><strong>beIN Sports</strong> (abonnement mensuel) – Tous les matchs du tournoi en direct HD</li>
  <li><strong>Canal+</strong> – Certains matchs en exclusivité selon le calendrier</li>
</ul>

<h2>Comment streamer légalement depuis la France ?</h2>
<p>Pour regarder légalement en streaming :</p>
<ol>
  <li>Téléchargez l'application <strong>TF1+</strong> (gratuit, disponible sur iOS, Android, Smart TV)</li>
  <li>Abonnez-vous à <strong>beIN Sports Connect</strong> pour tous les matchs</li>
  <li>Utilisez <strong>myCANAL</strong> si vous êtes abonné Canal+</li>
</ol>

<h2>Programme TV du jour</h2>
<p>Consultez notre section <a href="/live">matchs en direct</a> pour connaître les horaires TV de chaque match et les chaînes de diffusion en temps réel.</p>

<h2>Regarder la Coupe du Monde à l'étranger</h2>
<p>Si vous êtes à l'étranger, vous pouvez utiliser un VPN légal pour accéder aux services de streaming français (TF1+, 6play). Vérifiez la légalité dans votre pays de résidence.</p>

<h2>Application officielle FIFA</h2>
<p>L'application officielle <strong>FIFA+</strong> propose des highlights, des statistiques et certains matchs en streaming selon votre région. Disponible gratuitement sur iOS et Android.</p>
    `,
  },
  {
    id: '5',
    slug: 'pronostic-france-vs-mexique-coupe-du-monde-2026',
    title: 'Pronostic France vs Mexique – Coupe du Monde 2026 (22 juin)',
    description: 'Notre pronostic pour France vs Mexique le 22 juin 2026 : analyse, composition probable, cotes, forme des équipes et prédiction du score.',
    category: 'Pronostics',
    tags: ['pronostic', 'France', 'Mexique', 'Groupe A', 'analyse', 'cotes'],
    publishedAt: '2026-06-20',
    author: 'Rédaction MondialFoot',
    readingTime: 7,
    featured: false,
    content: `
<h2>France vs Mexique – Analyse avant-match (22 juin 2026)</h2>
<p>Ce match du Groupe A oppose deux équipes déjà qualifiées pour les huitièmes de finale. L'enjeu : déterminer qui sera 1er du groupe et donc potentiellement éviter le Brésil ou l'Argentine jusqu\'en quart de finale.</p>

<h3>Forme récente</h3>
<p><strong>🇫🇷 France</strong> : 2 victoires en 2 matchs (4-1 vs Australie, 2-0 vs Nigeria). Mbappé au top avec 3 buts. Maignan infranchissable.</p>
<p><strong>🇲🇽 Mexique</strong> : 2 victoires en 2 matchs (2-1 vs Nigeria, 1-0 vs Australie). L'élan d'une équipe qui joue sur ses terres nord-américaines.</p>

<h3>Compositions probables</h3>
<p><strong>France (4-3-3)</strong> : Maignan – Pavard, Upamecano, Saliba, T. Hernandez – Tchouaméni, Camavinga, Griezmann – Dembélé, Mbappé, Thuram</p>
<p><strong>Mexique (4-4-2)</strong> : Ochoa – Sánchez, Montes, Moreno, Gallardo – Lozano, Herrera, Guardado, Antuna – Giménez, Jiménez</p>

<h3>Notre pronostic</h3>
<p>Malgré la motivation mexicaine sur leurs terres, la supériorité technique française devrait s\'imposer. Avec Mbappé en grande forme, nous prédisons une victoire française.</p>
<p>⚽ <strong>Score prédit : France 2-1 Mexique</strong></p>
<p>🎯 <strong>Buteur pressenti : Kylian Mbappé (France)</strong></p>

<blockquote>⚠️ Ces pronostics sont fournis à titre informatif et de divertissement uniquement. Le jeu d\'argent doit rester un loisir. Si vous pariez, faites-le de manière responsable via des opérateurs agréés ANJ.</blockquote>
    `,
  },
  {
    id: '6',
    slug: 'stades-coupe-du-monde-2026',
    title: 'Les 16 stades de la Coupe du Monde 2026 : USA, Canada, Mexique',
    description: 'Présentation complète des 16 stades de la Coupe du Monde 2026 aux États-Unis, au Canada et au Mexique : capacités, villes, histoire et matchs prévus.',
    category: 'Stades',
    tags: ['stades', 'USA', 'Canada', 'Mexique', 'MetLife', 'Azteca', 'Coupe du Monde 2026'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-06-05',
    author: 'Rédaction MondialFoot',
    readingTime: 8,
    featured: false,
    content: `
<h2>Les stades de la Coupe du Monde 2026</h2>
<p>Pour la première fois de l'histoire, la Coupe du Monde est organisée dans <strong>3 pays hôtes</strong> : les États-Unis (11 stades), le Canada (2 stades) et le Mexique (3 stades). Voici les 16 stades du tournoi.</p>

<h3>États-Unis – 11 stades</h3>
<ul>
  <li>🏟️ <strong>MetLife Stadium</strong> (New York) – 82 500 places – Accueille la FINALE</li>
  <li>🏟️ <strong>Rose Bowl</strong> (Los Angeles) – 90 888 places</li>
  <li>🏟️ <strong>SoFi Stadium</strong> (Los Angeles) – 70 240 places</li>
  <li>🏟️ <strong>AT&T Stadium</strong> (Dallas) – 80 000 places</li>
  <li>🏟️ <strong>Arrowhead Stadium</strong> (Kansas City) – 76 416 places</li>
  <li>🏟️ <strong>NRG Stadium</strong> (Houston) – 72 220 places</li>
  <li>🏟️ <strong>Lumen Field</strong> (Seattle) – 69 000 places</li>
  <li>🏟️ <strong>Lincoln Financial Field</strong> (Philadelphie) – 67 594 places</li>
  <li>🏟️ <strong>Bank of America Stadium</strong> (Charlotte) – 74 867 places</li>
  <li>🏟️ <strong>Hard Rock Stadium</strong> (Miami) – 65 326 places</li>
</ul>

<h3>Canada – 2 stades</h3>
<ul>
  <li>🏟️ <strong>BC Place</strong> (Vancouver) – 54 500 places</li>
  <li>🏟️ <strong>BMO Field</strong> (Toronto) – 45 500 places (agrandi)</li>
</ul>

<h3>Mexique – 3 stades</h3>
<ul>
  <li>🏟️ <strong>Estadio Azteca</strong> (Mexico) – 87 523 places – Match d'ouverture</li>
  <li>🏟️ <strong>Estadio Akron</strong> (Guadalajara) – 49 850 places</li>
  <li>🏟️ <strong>Estadio BBVA</strong> (Monterrey) – 51 348 places</li>
</ul>

<h2>Le stade de la finale : MetLife Stadium</h2>
<p>La finale de la Coupe du Monde 2026 se déroulera le <strong>19 juillet 2026</strong> au MetLife Stadium de New York. Ce stade de 82 500 places est le domicile des New York Giants et des New York Jets de la NFL. C'est le plus grand stade de la NFL et il sera transformé pour accueillir la plus grande finale de football de l'histoire.</p>
    `,
  },
  {
    id: '7',
    slug: 'meilleures-equipes-coupe-du-monde-2026',
    title: 'Quelles sont les meilleures équipes de la Coupe du Monde 2026 ?',
    description: 'Notre classement des 10 meilleures équipes de la Coupe du Monde 2026 : analyse des effectifs, des forces en présence et de nos favoris pour le titre.',
    category: 'Analyse',
    tags: ['favoris', 'France', 'Argentine', 'Brésil', 'Angleterre', 'analyse', 'pronostic titre'],
    publishedAt: '2026-06-08',
    updatedAt: '2026-06-15',
    author: 'Rédaction MondialFoot',
    readingTime: 10,
    featured: false,
    content: `
<h2>Top 10 des favoris à la Coupe du Monde 2026</h2>

<h3>1. 🇦🇷 Argentine – Championne en titre</h3>
<p>Classée n°1 FIFA, l'Argentine de Messi et Scaloni défend son titre avec la même colonne vertébrale qu'au Qatar. Julián Álvarez, De Paul et Rodrigo De Paul forment un collectif redoutable.</p>

<h3>2. 🇫🇷 France – La machine Mbappé</h3>
<p>Avec Mbappé au sommet de son art au Real Madrid, la France possède l'attaquant numéro 1 mondial. Griezmann en soutien, Tchouaméni au milieu et Maignan dans les buts : un effectif de très haut niveau.</p>

<h3>3. 🇧🇷 Brésil – En quête du 6ème titre</h3>
<p>Vinicius Jr, Rodrygo, Paquetá... Le Brésil retrouve sa flamboyance offensive. La Seleção veut effacer la déception des dernières Coupes du Monde.</p>

<h3>4. 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Angleterre – Kane et Bellingham</h3>
<p>Harry Kane pour les buts, Jude Bellingham pour la magie : l'Angleterre a tout pour briser sa malédiction de 60 ans sans titre mondial.</p>

<h3>5. 🇩🇪 Allemagne – La nouvelle génération</h3>
<p>Wirtz et Musiala représentent la nouvelle génération allemande. La Mannschaft sous Nagelsmann retrouve le jeu offensif de ses glorieuses années.</p>

<h3>6. 🇪🇸 Espagne – Championne d'Europe en titre</h3>
<p>Les Espagnols champions d'Europe 2024 ont le collectif pour aller très loin. Pedri, Gavi et Dani Olmo au milieu composent l'une des meilleures lignes médiane du monde.</p>

<h3>7. 🇵🇹 Portugal – Le dernier tournoi de Ronaldo ?</h3>
<p>Cristiano Ronaldo, à 41 ans, joue probablement sa dernière Coupe du Monde. Motivé par un ultime sacre, il peut emmener le Portugal très loin avec Bruno Fernandes et Leão.</p>

<h3>8. 🇳🇱 Pays-Bas – L'Oranje veut son titre</h3>
<p>Après 3 finales sans titre (1974, 1978, 2010), les Pays-Bas ont enfin les joueurs pour conquérir le monde : Van Dijk derrière, Gakpo et Depay devant.</p>

<h3>9. 🇲🇦 Maroc – L'Afrique peut aller en finale</h3>
<p>Les Lions de l'Atlas ont prouvé en 2022 qu'ils pouvaient battre n'importe qui. Hakimi, Ziyech et En-Nesyri sont une force redoutable.</p>

<h3>10. 🇺🇾 Uruguay – La surprise Bielsa</h3>
<p>Avec Bielsa coach et Valverde + Darwin Núñez, l'Uruguay peut créer la surprise comme en 2010.</p>

<h2>Notre pronostic pour le titre</h2>
<p>🏆 <strong>France vs Argentine en finale</strong> – avec une victoire française 2-1 après prolongation. Mbappé vainqueur du Ballon d'Or du tournoi.</p>
    `,
  },
  {
    id: '8',
    slug: 'resultats-coupe-du-monde-2026',
    title: 'Résultats Coupe du Monde 2026 : tous les scores en direct',
    description: 'Tous les résultats et scores de la Coupe du Monde 2026 mis à jour en temps réel. Phase de groupes, huitièmes, quarts, demi-finales et finale.',
    category: 'Résultats',
    tags: ['résultats', 'scores', 'Coupe du Monde 2026', 'live', 'en direct'],
    publishedAt: '2026-06-11',
    updatedAt: '2026-06-18',
    author: 'Rédaction MondialFoot',
    readingTime: 3,
    featured: false,
    content: `
<h2>Résultats de la Coupe du Monde 2026</h2>
<p>Retrouvez sur cette page tous les résultats des matchs de la Coupe du Monde 2026 mis à jour en temps réel.</p>

<h3>Journée 7 – 18 juin 2026</h3>
<p>🔴 EN DIRECT : Brésil 1-1 Suisse (67'), Belgique 1-1 Corée du Sud (45')</p>
<p>✅ TERMINÉ : Cameroun 0-2 Serbie</p>

<h3>Journée 6 – 17 juin 2026</h3>
<p>✅ France 2-0 Nigeria | Rose Bowl, Los Angeles</p>
<p>✅ Australie 0-1 Mexique | Hard Rock Stadium, Miami</p>

<h3>Journée 5 – 16 juin 2026</h3>
<p>✅ Argentine 2-0 Ghana | Rose Bowl, Los Angeles</p>
<p>✅ Canada 0-1 Croatie | BMO Field, Toronto</p>
<p>✅ Pays-Bas 3-0 Tunisie | Estadio Azteca, Mexico</p>
<p>✅ Uruguay 1-1 Danemark | Estadio Akron, Guadalajara</p>
    `,
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}

export function getFeaturedArticles(): Article[] {
  return articles.filter(a => a.featured)
}

export function getArticlesByCategory(category: string): Article[] {
  return articles.filter(a => a.category === category)
}

export const ARTICLE_CATEGORIES = ['Calendrier', 'Résultats', 'Groupes', 'Équipes', 'Stades', 'Pronostics', 'Analyse', 'Guide']
