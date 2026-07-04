# 🍔 PROCESSUS — Menu QR Code pour Snack / Restaurant

> Playbook complet pour créer un menu QR code vendable à un snack.
> Référence : le premier client réalisé était **Le 444** (Marseille) — voir les fichiers `exemple-*` de ce dossier.
> Temps total : ~30 min si toutes les infos sont fournies.

---

## 📥 ÉTAPE 0 — Infos à demander au propriétaire (checklist)

- [ ] **Nom du snack** (+ slogan éventuel)
- [ ] **Adresse complète**
- [ ] **Téléphone**
- [ ] **Horaires d'ouverture**
- [ ] **Halal ?** (badge à afficher)
- [ ] **Moyens de paiement** (CB, Amex, Apple Pay, TR, espèces...)
- [ ] **La carte complète** : soit un site existant à scraper, soit des photos de la carte papier
- [ ] **Images** (fournies par Amine, générées par IA style "le 444") :
  - 1 image **fond d'écran** (ambiance, nourriture autour, centre sombre) — paysage 1536×1024
  - 1 photo **façade** du snack (pour le footer)
  - 1 image **par catégorie** (bannières) — avec le néon du nom du snack dedans

## 🔎 ÉTAPE 1 — Récupérer le menu

**Cas A — Le snack a un site Restomalin** (comme snack-le444.fr) :
- Les pages catégories sont server-rendered à `/livraison/<ville>/<categorie>/<num_ville>/<num_resto>/<num_cat>/`
- La liste des catégories est dans le HTML de la home (`div_carte`)
- Utiliser `exemple-scraper-restomalin.py` (adapter les URLs) → produit un `menu.json`

**Cas B — Photos de la carte** : transcrire manuellement en JSON même format :
```json
[{"category": "Nos Burgers", "items": [{"name": "...", "desc": "ingrédients", "price": "6.50"}]}]
```

⚠️ Corriger les fautes d'orthographe du menu source ("ognons" → "oignons").

## 🎨 ÉTAPE 2 — Générer le site

Adapter `exemple-generateur-le444.py` (script Python qui génère un `index.html` autonome) :
- **Design par défaut** : fond sombre `#0d0f14`, or `#f5b942`, rouge `#e63946`, polices Bebas Neue + Montserrat (Google Fonts)
- Structure de la page :
  1. `#bg` : fond d'écran fixe (image ambiance) + voile sombre radial
  2. `.frame > .panel` : panneau central semi-transparent (le menu "flotte" sur le fond)
  3. Hero : nom du snack en énorme + badges (halal, adresse)
  4. Nav sticky : pills par catégorie (scroll + surlignage auto au scroll)
  5. Sections : **bannière image par catégorie** (170px mobile / 210px desktop, dégradé sombre vers le bas, titre doré par-dessus) + liste des produits (nom, pointillés, prix doré, ingrédients dessous)
  6. Footer : photo façade avec dégradé + caption "RETROUVEZ-NOUS AU..." + adresse/tél/horaires/paiements
- ⚠️ PAS de `overflow:hidden` sur `.panel` (casse le sticky nav) — le mettre sur `.facade-wrap` uniquement
- Aucune commande possible : menu consultation uniquement

**Images** : convertir avec Pillow (`pip install pillow`) :
- Bannières catégories : `thumbnail((1200,1200))`, JPEG qualité 78 → `<slug>-cat-<categorie>.jpg`
- Fond + façade : JPEG qualité 82

## 📱 ÉTAPE 3 — Page QR code

Copier/adapter la page `qrcode.html` du 444 (dans le repo Menu-444) :
- Librairie : `https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js`
- Carte blanche imprimable : nom du snack, QR 240px correctLevel H, "📱 SCANNEZ-MOI", badge halal
- Boutons : Imprimer / Télécharger PNG / Voir la carte (cachés en `@media print`)
- L'URL du QR = l'adresse GitHub Pages (puis le domaine custom plus tard)

## ✅ ÉTAPE 4 — Vérifier avant livraison

Screenshots avec le Chromium préinstallé (`/opt/pw-browsers/` + playwright-core) :
- Mobile 430×932 : haut de page, une bannière catégorie, le footer façade
- Desktop 1280×900 : vérifier le fond d'écran visible autour du panneau

## 🚀 ÉTAPE 5 — Mise en ligne (1 repo GitHub par client)

⚠️ Claude ne peut PAS créer de repo ni pousser hors des repos de la session.
1. **Amine crée le repo** : github.com/new → nom `menu-<snack>` → **Public** → Create
2. Deux options pour pousser :
   - Amine ajoute le repo à la session Claude (au démarrage d'une session) → Claude pousse tout
   - OU Claude prépare un **ZIP** (SendUserFile) → Amine glisse-dépose les fichiers sur GitHub (bouton "Add file → Upload files") — ⚠️ les FICHIERS extraits, PAS le zip !
3. **Activer Pages** : Settings → Pages → Source "Deploy from a branch" → Branch **main** + **/ (root)** → Save
4. Vérifier avec curl que `https://amine13127lespins-rgb.github.io/<repo>/` et chaque image répondent 200
5. Champ "Custom domain" : **laisser vide** tant que le domaine n'est pas acheté

## 💰 ÉTAPE 6 — Vente & domaine (dans CET ordre)

1. **Démo gratuite** au client sur téléphone avec l'URL GitHub (coût 0€) + QR imprimé pour l'effet démo
2. Client dit oui → **encaisser la mise en place** : 150-300€
3. **Puis seulement** acheter le domaine chez OVH (~7€/an), ex `menu-le444.fr`, au nom d'AMINE (jamais au client — levier maintenance)
4. DNS chez OVH :
   - CNAME `www` → `amine13127lespins-rgb.github.io.`
   - 4 enregistrements A racine : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
5. GitHub Settings → Pages → Custom domain → le domaine → Save → cocher "Enforce HTTPS" (~1h après)
6. **Régénérer le QR code** avec la nouvelle URL + réimprimer
7. **Abonnement client** : 15-20€/mois (domaine + hébergement + 2-3 modifs prix/produits par mois incluses)

## 📁 Clients réalisés

| Client | Repo | URL | Domaine | Statut |
|---|---|---|---|---|
| Le 444 (Marseille 13003) | `Menu-444` | amine13127lespins-rgb.github.io/Menu-444/ | — | Démo prête, à vendre |
