# devis-c2mt — The Béné diner's

Plateforme de commande en ligne (HTML/CSS/JS statique + Firebase Realtime Database) pour un fast-food. Voir `index.html`, `menu.html`, `admin.html`, `display.html`.

## Prospection de restaurants via data.gouv.fr

Pour trouver des restaurants à qui présenter ce système de commande, utilise l'API officielle **Recherche d'Entreprises** (alimentée par la base SIRENE de l'INSEE, exposée sur data.gouv.fr) :

```
https://recherche-entreprises.api.gouv.fr/search?q=<nom ou mot-clé>&activite_principale=56.10A,56.10B,56.10C&etat_administratif=A&code_postal=<code postal ou ville>
```

- `activite_principale` = codes NAF restauration :
  - `56.10A` restauration traditionnelle
  - `56.10B` cafétérias et libres-services
  - `56.10C` restauration rapide
- `etat_administratif=A` ne garde que les établissements actifs (évite de prospecter des fermés).
- La réponse JSON contient nom, SIRET, adresse complète, et coordonnées (pas de téléphone/email — ce n'est pas dans SIRENE).

Pour valider/compléter une adresse trouvée, utiliser l'**API Adresse (BAN)** :
```
https://api-adresse.data.gouv.fr/search/?q=<adresse>
```

Ces deux domaines sont autorisés dans `.claude/settings.json` pour que Claude Code puisse les interroger directement via WebFetch sans demander confirmation à chaque fois.
