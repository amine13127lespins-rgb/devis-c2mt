# Repo d'Amine (amine13127lespins@gmail.com)

Ce repo contient plusieurs projets :
- **The Béné diner's** : menu en ligne avec commandes Firebase (menu.html, admin.html, display.html, script.js) + jeux (game.html, runner.html)
- **Le 444** : premier client "menu QR code" (le444.html, qrcode-444.html) — version de démo, la version vendue vit dans le repo séparé `Menu-444`
- **outil-menu-qr/** : ⭐ PLAYBOOK réutilisable pour créer des menus QR code pour des snacks

## Activité principale d'Amine

Amine vend des **menus QR code** à des snacks/restaurants (création + abonnement mensuel).
👉 **Si Amine envoie des images et infos d'un nouveau snack, lire IMMÉDIATEMENT `outil-menu-qr/PROCESSUS.md`** et dérouler le processus complet sans reposer de questions déjà couvertes par la checklist.

Langue : toujours répondre en français. Amine n'est pas développeur : donner des instructions pas-à-pas très simples pour tout ce qu'il doit faire lui-même (GitHub, OVH...).

## Déploiement

- GitHub Pages sur branche `main` de chaque repo (1 repo par client, créé par Amine)
- Cette session ne peut pousser QUE sur les repos ajoutés à la session — sinon préparer un ZIP (SendUserFile) et guider l'upload manuel

## Compétences installées (`.claude/skills/`)

Les 7 skills de [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) (MIT) sont
committées dans ce repo, donc chargées automatiquement à chaque session :
`ui-ux-pro-max`, `design`, `design-system`, `ui-styling`, `banner-design`, `brand`, `slides`.

👉 **Les utiliser pour tous les menus QR code** (palettes, typographies, règles UX) et les visuels marketing.

⚠️ L'environnement d'exécution est éphémère : tout ce qui est hors du repo (`~/.claude`, npm global,
plugins installés à la volée) disparaît à la fin de la session. **Seul ce qui est commité survit.**

---

# Monventilo — boutique Shopify (2ᵉ activité d'Amine)

Dropshipping de ventilateurs. Fournisseur **DSers** (pas CJ Dropshipping malgré ce qu'Amine peut dire).

## La boutique

- Domaine : `i1c5z0-3k.myshopify.com` — devise EUR
- Thème live : **Horizon**. Une copie retravaillée existe : **« Horizon - Monventilo FR »**
  (carrousel produit + miniatures, textes en français, bannière, grille 3 colonnes, coins arrondis).
- Emplacement de stock : `dsers-fulfillment-service`
- Canaux à publier : `Boutique en ligne` et `Shop`

## Les 3 produits

| Produit | Prix | Coût | Variantes |
|---|---|---|---|
| Mini Ventilateur Portable (écran LED, 8h) | 12,99 € | ~4,50 € | 4 coloris |
| Ventilateur de Cou Sans Lames | 22,99 € | ~14 € | 3 coloris (5 sur les visuels ⚠️) |
| Mini Climatiseur 3-en-1 | 49,99 € | ~30 € | 1 coloris, stock fournisseur faible |

## ⚠️ Pièges rencontrés — vérifier systématiquement

1. **DSers écrase les prix** à chaque synchro. Si un prix redevient bizarre (26,80 €, 4,53 €…), c'est ça.
   → Amine doit désactiver la **Pricing Rule** dans DSers (Setting → Pricing Rule).
2. **Shopify crée tout en « non publié »** : produits ET collections. Un produit ou une collection
   invisible sur le site = presque toujours un problème de publication, pas de thème.
   → Vérifier `resourcePublicationsV2` et publier via `publishablePublish`.
3. **Les imports DSers arrivent en anglais** avec des photos AliExpress marquées (logos Xiaomi, texte
   anglais) → toujours retitrer/redécrire en français et nettoyer les images.
4. **Aligner les descriptions sur les infographies** d'Amine : il fournit des visuels avec des specs
   précises (vitesses, autonomie, dimensions). Une contradiction texte/image = litige client.

## Stratégie commerciale (décidée avec Amine)

- **Google Ads n'est PAS rentable** sous ~35 € de prix de vente : ~1 € le clic × 1-2 % de conversion
  = 50-70 € de pub par vente, pour 9 € de marge. → **TikTok organique** est le levier retenu.
- Produits 100 % saisonniers : la demande s'effondre mi-septembre.
  → **Pivot hiver prévu** : chauffage d'appoint soufflant, humidificateur, absorbeur d'humidité.
- Piste gros panier : brumisateur de terrasse pro (~120 € achat / ~299 € vente) à vendre **aux
  restaurants clients des menus QR code** — synergie directe entre les deux activités d'Amine.
