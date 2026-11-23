# Matrix™ — Landing page

Landing page de Matrix™, la machine à RDV B2B multicanale (LinkedIn, cold call, warm call, SDR/BDR externalisé).
Site statique, sans framework ni build : ce qui est dans le repo est ce qui est servi.

**Production :** https://matrix-incubateur.be (déploiement automatique à chaque push sur `main`)

## Structure

```
.
├── index.html              # Landing page (structure + contenu uniquement)
├── legal/                  # Pages légales (ne pas modifier le texte sans validation juridique)
│   ├── mentions-legales.html
│   ├── conditions-generales.html
│   ├── politique-de-confidentialite.html
│   ├── politique-cookies.html
│   └── avertissement-resultats.html
├── assets/
│   ├── css/
│   │   ├── main.css        # Design system + styles de la landing
│   │   └── legal.css       # Styles communs aux pages légales
│   ├── js/
│   │   └── main.js         # Interactions : reveal, compteurs, cookies, sticky CTA, progression
│   └── img/                # Images WebP optimisées + favicons + og-image
├── docs/
│   └── design-system.md    # Référence DA : tokens, typo, composants, règles
├── .github/
│   └── pull_request_template.md
├── vercel.json             # Headers sécurité (CSP, HSTS), redirections, cache
├── CHANGELOG.md            # Historique des évolutions
├── .editorconfig
├── .gitignore
├── robots.txt
├── sitemap.xml
└── README.md
```

## Modifier le site

| Je veux…                          | Fichier à modifier |
|-----------------------------------|--------------------|
| Changer un texte de la landing    | `index.html` |
| Changer couleurs / typo / espacements | `assets/css/main.css` (variables `:root` en tête de fichier) |
| Modifier une animation ou le cookie banner | `assets/js/main.js` |
| Ajouter une image                 | Convertir en WebP, déposer dans `assets/img/`, référencer en `/assets/img/nom.webp` avec `width`/`height` |
| Modifier une page légale          | `legal/*.html` (texte à faire valider avant) |
| Ajouter une redirection / un header | `vercel.json` |

## Règles du design system

- Couleurs, espacements (grille 8pt), rayons et polices sont des variables CSS dans `:root` (`assets/css/main.css`). Toujours les utiliser, jamais de valeurs en dur. Référence complète : [`docs/design-system.md`](docs/design-system.md).
- Polices : Sora (titres, boutons) et Inter (texte), chargées via Google Fonts.
- Images : WebP uniquement, max 1600px de large, toujours avec `width`/`height` et `loading="lazy"` (sauf le visuel hero).
- Pas d'emoji, pas de tirets cadratins dans la copy.
- Animations en `transform`/`opacity` uniquement, désactivées par `prefers-reduced-motion`.

## KPI autorisés dans la copy

Source de référence : le deck « Matrix Presentation References » + le suivi « Mes clients ». Ne rien inventer.

- Global : +412 000 € de CA généré · +293 RDV qualifiés · 27 entreprises accompagnées · 67 % meilleur taux de réponse · TOP 20 Favikon Belgium (Sales).
- Riseup Consulting : +64 RDV en 30 jours · 13 000 € signés le 1er mois · 67 %.
- LandQuire : 280 000 $ signés · +7 RDV en 2 semaines · 45 %.
- France IA (au 23/11/2026) : 162 RDV posés · 19 ventes · 32 350 € de CA client · record 17 RDV/jour.
- Wattlift : 50 appels/jour · ~670 appels · 10 RDV le 1er mois · mission renouvelée.
- Grind Agency : +1 client sur 4 sites. Inskip : panier 2 à 5 k€, C-level.

Toute preuve chiffrée doit renvoyer vers `/legal/avertissement-resultats`.

## Déploiement

1. Travailler sur une branche, ouvrir une PR vers `main`.
2. Vercel construit une préversion automatiquement sur chaque PR.
3. Merge sur `main` = mise en production immédiate.

Vérifications après mise en prod : page d'accueil, une page légale, l'iframe iClosed, et `curl -I https://matrix-incubateur.be` (headers CSP/HSTS présents).
