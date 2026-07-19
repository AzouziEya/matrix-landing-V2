# Matrix™ — Landing page

Landing page du système d'acquisition LinkedIn B2B Matrix™.
Site statique, sans framework ni build : ce qui est dans le repo est ce qui est servi.

**Production :** https://matrix-tm.vercel.app (déploiement automatique à chaque push sur `main`)

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

Uniquement ces 4 chiffres (ne rien inventer d'autre) :
+3 ans d'expertise B2B · +400 000 € générés · +64 RDV qualifiés en 1 mois · +20 clients accompagnés.
Toute preuve chiffrée doit renvoyer vers `/legal/avertissement-resultats`.

## Déploiement

1. Travailler sur une branche, ouvrir une PR vers `main`.
2. Vercel construit une préversion automatiquement sur chaque PR.
3. Merge sur `main` = mise en production immédiate.

Vérifications après mise en prod : page d'accueil, une page légale, l'iframe iClosed, et `curl -I https://matrix-tm.vercel.app` (headers CSP/HSTS présents).
