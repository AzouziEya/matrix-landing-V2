# Design system Matrix™

Référence de la direction artistique. Toute nouvelle section doit réutiliser ces tokens et composants, jamais des valeurs en dur.

## Tokens (`assets/css/main.css` → `:root`)

| Rôle | Variable | Valeur |
|------|----------|--------|
| Fond | `--bg` | `#0a0714` |
| Fond surélevé | `--bg-elev` | `#130c22` |
| Accent primaire | `--accent` | `#6c47ff` |
| Accent clair | `--accent-2` | `#9b7bff` |
| Texte | `--fg` | `#f5f3ff` |
| Texte secondaire | `--muted` | `#b3aacb` |
| Succès | `--green` | `#4ade80` |
| Alerte | `--red` | `#f87171` |

Espacements : échelle 8pt (`--s1` = 8px … `--s12` = 96px). Rayons : `--r-sm` / `--r-md` / `--r-lg`.

## Typographie

- **Display (titres, boutons, tags, eyebrow)** : `Sora` — 600 / 700 / 800.
- **Body** : `Inter` — 400 / 500 / 600 / 700.
- Hiérarchie : hero `h1` clamp jusqu'à 72px, `h2` jusqu'à 42px, `h3` 19px, body 16px.

## Composants réutilisables

| Composant | Classe | Usage |
|-----------|--------|-------|
| Eyebrow numéroté | `.eyebrow` (+ `.eyebrow-center`) | Repère de progression en tête de chaque section |
| Card glassmorphism | `.card` | Base de toutes les cartes, hover inclus |
| CTA primaire | `.btn.btn-primary` (`.btn-lg` / `.btn-sm`) | Un seul CTA visible par écran |
| Micro-réassurance | `.cta-reassure` | Sous chaque CTA (durée · gratuité · engagement) |
| Rareté honnête | `.scarcity` | Places limitées, sans faux compte à rebours |
| Transition de scroll | `.section-bridge` | Dernière phrase de chaque section |
| Sticky CTA | `.sticky-cta` | Mobile permanent, desktop après scroll |
| Barre de progression | `.scroll-progress` | Lecture, pilotée en JS (transform) |

## Règles

- **Un seul CTA primaire** par écran, formulé en bénéfice (« Voir si mon activité est éligible »).
- **Zéro emoji**, zéro tiret cadratin dans la copy.
- **Tutoiement**, phrases courtes, bénéfice avant fonctionnalité.
- Animations : `transform` / `opacity` uniquement, coupées par `prefers-reduced-motion`.
- Contraste maximal réservé au bouton primaire ; tout le reste en retrait.
