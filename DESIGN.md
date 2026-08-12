# Design

<!-- impeccable:design-schema 1 -->

Recorded from the built artifact, not from intention.

**Source of truth: the shipped site** — `index.html`, `src/input.css` (tokens and components),
`assets/js/main.js`. The design originated as a Paper canvas
(https://app.paper.design/file/01KZVA20D8F06F0DWGN3PRAC6Z/1-0, artboards *Come Away — Desktop*
1440 and *Come Away — Mobile* 390). **The Paper file is now out of date** — it still shows paid
ticket tiers and a link-out CTA, both of which the built site has dropped. Read the code, not
the canvas.

The direction contract lives at `.impeccable/direction-contract.md` and is also embedded as an
HTML comment at the top of `<body>`, so it survives into the served page.

## The world

Blue hour, high country. Every colour is taken from one scene — a storm sitting on bare rock an
hour after sunset — so the page reads as a single place rather than an assembled palette. The
page runs inky for four sections and then inverts once, at Register, to a full field of pale
horizon light. That inversion is the whole colour strategy: the only place the light arrives is
the place the visitor commits.

The component language is hairline rules and information sitting directly on the surface.
**There are no cards anywhere on this page, and adding one would break the system.** Depth is
never used; separation is done with 1px rules and generous space.

## Colour tokens

| Token | Value | Object it came from | Where it is used |
|---|---|---|---|
| `--color-ground` | `#0C1015` | wet slate | page ground; Hero, Sermons, Travel, Footer |
| `--color-raise` | `#151C24` | storm-cloud shadow | Location section only — the one raised band |
| `--color-hairline` | `#2A343F` | rock seam | every rule and border on dark |
| `--color-muted` | `#93A1B0` | fog on glass | section labels, field keys, secondary caps |
| `--color-text` | `#E9ECEF` | limestone dust | primary text on dark |
| `--color-accent` | `#BFD3E6` | last cold light at the horizon | Register field, CTA fills, accent caps |
| `--color-accent-ink` | `#0C1015` | — | type and rules on the accent field |

Secondary values used on the built page but not tokenised: `#A8B4C1` (lead paragraphs on dark),
`#C3CDD8` (session lines), `#7A8896` (annotations on dark), `#3B4956` / `#46535E` / `#26333F`
(the ink-side text ramp on the accent field). On the accent field, hairlines are
`rgba(12,16,21,0.22)` and secondary hairlines `rgba(12,16,21,0.16)`.

**Contrast rule that governs this palette:** the dark ground is deep enough that muted text
clears AA comfortably, but the accent field is bright, so nothing on `#BFD3E6` may be lighter
than `#46535E`. Placeholder text on the accent field is `#46535E`, not a lighter gray.

## Type

| Token | Family | Used for |
|---|---|---|
| `--font-display` | **EB Garamond** | every headline, lead, body, session line, fact value, and form value |
| `--font-mark` | **Archivo** (weight 200) | the wordmark's first line only |
| `--font-label` | **Archivo Narrow** (600 / 700) | nav, section labels, dates, field labels, button labels, annotations |

One serif carries all the reading; one condensed sans carries all the labelling. There is no
third voice.

Scale (desktop → mobile): display 96/60 → 52/36 · lead 21 → 19 · body 20 → 18 · fact value 22 →
19 · label 13/12 → 12/11 · micro 11 → 10.

Tracking: `-0.018em` on the 96px display, `-0.01em` on 60px headings, `0.18em` on all uppercase
labels, `0.20em` on button labels and the date line, `0.20em` on the wordmark's first line and
`0.66em` on its second.

**The wordmark is a justified stack.** COME AWAY in Archivo 200 at 42px/0.20em sits directly
above CONFERENCE in Archivo Narrow 600 at 27px/0.66em, and the two lines are tuned to the same
optical width (~320px). Any change to one line requires retuning the other; the equal width is
the mark.

## Layout

Desktop: 1440 wide, 100px gutters, 1240px content. One lane pair used throughout — **560 + 80 + 600**
(Sermons, Location, and Register: heading left, form right). Section vertical padding is 130px top and
bottom; 96px separates a section head from its body.

Mobile: 390 wide, 24px gutters, 342px content. Sections are 64px top / 72px bottom. Every desktop
two-lane row collapses to a single stack in the same reading order.

Repeated rows (fact rows, speaker rows) hold their vertical lanes with fixed-width slots —
`w-[132px] shrink-0` on the key, never `gap` alone. A lane that depends on content width breaks
the moment one label runs long. *(In the Paper file the same rule applies but is stricter: Paper
text nodes auto-size and ignore `width` outright, so the slot must be a Frame wrapping the Text.)*

## Section markers

Each section is introduced by a full-width rule with the section name at its **right** end and
optional metadata at its left (coordinates, "MOST PEOPLE DRIVE", the closing date). The name is
never placed above the heading — a tracked label sitting over a display heading is a kicker, and
this system does not use kickers. Headings stand alone at the left of their lane.

## Photography

Full-bleed rasters, never gradients standing in for an image. Three grades, and staying inside
them is what keeps the page one place:

- **Landscape:** `saturate(0.30–0.40) contrast(1.10–1.12) brightness(0.62–1.02)` — cool and
  nearly monochrome, never fully desaturated.
- **Interiors:** `grayscale(1) contrast(1.24) brightness(0.40) sepia(0.18) hue-rotate(175deg)` —
  the hue-rotate is what pulls a warm daylight interior back into blue hour. A daylight interior
  dropped in ungraded is the one thing that visibly leaves this world.
- **Portraits:** `grayscale(1) contrast(1.02) brightness(1.32)` — lifted, because these sources
  are already dark and sit on a dark ground.

Hero scrims are two stacked linear-gradients: a vertical one for the nav and scroll cue, and a
101° horizontal one carrying the type side. Any caption laid over a bright region needs its own
bottom scrim band reaching `rgba(12,16,21,0.94)`.

## Components

- **Section marker** — rule with right-aligned name, described above.
- **Fact row** — fixed-width key slot in tracked caps, EB Garamond value, 1px bottom rule.
- **Speaker, keynote** — 560×620 portrait, 40px name, tracked role, 23px session line.
- **Speaker, list row** — 132×176 portrait in a fixed slot, 29px name, tracked role, 19px session
  line, rules above and below.
- **Button** — solid fill, no radius, tracked 15px label, optional 26×10 arrow. Accent fill with
  ink label on dark; ink fill with accent label on the accent field.
- **Form field** — tracked caps label above an EB Garamond value, 1px bottom rule. **Focused
  state:** the rule becomes 2px solid ink and the label goes to full ink. **Error state:** the
  rule and label go to `#7A2230` and a tracked-caps message appears beneath, naming the problem
  and the recovery ("That email is missing an @ or a domain — check it and try again"). There is
  no box, no fill, and no radius on any input. Heavier rule = active is the one state convention
  this system uses.
- **Annotation** — 18–22px accent or gray tick followed by an 11px tracked caps line. Used for
  deadlines and for every placeholder disclosure.

## Corner and border language

Nothing on this page has a corner radius except the section dots. Borders are
1px, or 2px only to mean active. Coloured left-borders, offset shadows, and glass are not part of
this system.

## Placeholder disclosure

Invented commercial and factual content carries a visible annotation in the design itself, in the
annotation component: the ridge plate, the speaker roster, and the Register form each declare what
must be replaced. Any future section that invents names, faces, dates, or claims inherits this
obligation. The full replacement list is in README.md.

## Behaviour

Three things JavaScript adds, all of which degrade to a complete, readable page when it is
blocked:

- **Scroll reveal** — the one authored motion moment. Sections settle 22px upward on an
  exponential ease-out. Opt-in from JS (`.js-reveal` on `<html>`), so a failed script never
  leaves content invisible. The hero's reveals play on load rather than on scroll: a short
  laptop viewport would otherwise hide the primary action until the visitor scrolled.
- **Scroll spy** — right-edge dots and the desktop nav track the current section. A separate
  sentinel on the hero adds `.is-stuck` to the top bar once it passes.
- **Top bar states.** Over the hero the bar is transparent and sits on the photograph's own
  scrim. Past it, `.is-stuck` gives it the ground of the section it is over and shrinks the
  wordmark to a bar-height lockup; without this the wordmark lands illegibly on running text.
  Over Register, `.is-on-accent` flips it to a pale field with ink type.

**Cascade-layer trap:** both top-bar overrides live *unlayered* at the end of `src/input.css`.
Tailwind's utilities sit in a later cascade layer than `@layer components`, so a component-layer
rule loses to a `text-[…]` utility no matter how specific it is. Unlayered styles beat every
layer. Any future override of a utility-set property must go in that same unlayered block.

## Registration

The form asks four things — name, email, how many people, and an optional church or group.
**There is no pricing anywhere on the page and no payment step**; attendance is free, and
Register says so in the copy where a price would normally sit. Do not reintroduce tiers,
totals, or a checkout.

Submissions POST as JSON to `FORM_ENDPOINT` in `assets/js/main.js`. While that constant is
empty the form validates and shows its success state but states on screen that nothing was
sent — an honest empty state rather than a lie.

## Known gaps

- **The Paper file is stale.** It still shows paid tiers, a summary column and a link-out CTA.
  If it is ever the deliverable again it needs rebuilding from this document.
- The photographs are hotlinked from Unsplash rather than vendored into `assets/img/`.
- The scroll cue in the hero is static; it reads as an affordance but does not animate.
- No 404 page, and no confirmation page — success is announced inline via `role="status"`.
