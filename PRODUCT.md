# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, Tailwind CSS v4 (built ahead of time, output committed), and vanilla JavaScript — no framework and no runtime build, so the site deploys to GitHub Pages as-is. The design originated as a Paper (MCP) canvas; the HTML implementation is now the current artifact and the Paper file lags behind it.

## Users

Primary: people connected to (or curious about) the host church who are deciding whether to attend its annual conference. Most arrive on a phone, from an Instagram story or a friend's text, in a spare two minutes. They are weighing a real cost — travel, lodging, three days away, though not a ticket price — so they need to know quickly what the gathering is, who is speaking, when and where it happens, what it takes to get there, and how to register.

Secondary: returning attendees who come back to the same page to re-check dates, venue, and lodging details.

## Product Purpose

A single-page site for the church's annual conference. Success is a completed registration. Attending costs nothing, so the page is not overcoming a price objection — it is overcoming the cost of three days away. Its job is to make the gathering feel worth the trip and then remove every practical unknown standing between the visitor and the form.

## Positioning

The conference's premise is rest, not intensity — a gathering built around stillness and unhurried worship rather than a packed schedule. The page must feel like the thing it is selling: spacious, quiet, and unhurried. This is the one claim a neighboring conference page could not truthfully copy, and it governs every design decision downstream.

## Operating Context

- One page, anchor-scrolled. No sub-pages, no routing.
- Sections, fixed by the client: **Main** (hero) · **Sermons** · **Location** · **Travel** · **Register**.
- **Attendance is free and open to anyone.** The church covers the venue, food and coffee. There is no ticket, no pricing tier and no payment step anywhere in the experience.
- Registration happens **on the page**: name, email, how many people, and an optional church or group. Its only purpose is knowing how many seats and meals to prepare.
- Read overwhelmingly on mobile; must hold up equally at desktop width.

## Capabilities and Constraints

- No accounts, no CMS, no backend. Interactivity is limited to scroll, anchor navigation, the mobile menu, and the registration form (text entry, validation, submit to a third-party endpoint).
- Content is thin by design: five sections, one job each. Resist adding sections.
- Settled: attendance is free, so pricing, refunds and payment handling are out of scope permanently — do not reintroduce them.
- Undecided and not to be invented later without asking: childcare, accessibility accommodations at the venue, and what happens when registrations exceed the 480-seat capacity.

## Brand Commitments

- **Name and identity are invented for this engagement, at the client's request.** All of the following is placeholder and must be swapped before any public use:
  - Conference: **COME AWAY**
  - Host church: **Kingsfield Church**
  - Location: Asheville, North Carolina
  - Dates: March 6–8, 2026
  - Venue: Kingsfield Hall, 118 Haywood Street, Asheville, NC
- The name comes from Mark 6:31 — "Come away by yourselves to a desolate place and rest a while." This verse is the source of the conference's premise and may be quoted.
- **Binding visual reference, supplied by the client:** the Linger Conference page (`Come Away Conference Web Page.png`). Its established language — full-bleed cinematic photography, a wide letterspaced wordmark, a serif hero headline over condensed uppercase navigation, a pale accent CTA, right-edge section dots — is the agreed direction.

## Evidence on Hand

- One reference screenshot of the Linger Conference page (visual direction only — none of its copy, dates, or facts carry over).
- **Nothing else.** There is no real congregation, no speaker roster, no photography, no sermon archive, no testimonials, no attendance figures, and no pricing. Every such detail in the design is invented placeholder and is labeled as such. Future work must not present any of it as fact.

## Product Principles

1. **The page must feel like rest.** Whitespace, slow pacing, and restraint are the product, not decoration. If a section feels busy, it is wrong regardless of how well it performs.
2. **Photography carries the emotion; type carries the meaning.** Never make type work harder to compensate for a weak image, and never crowd an image with type.
3. **Every section answers one practical question.** A visitor scrolling once should finish knowing what, who, when, where, how to get there, and how to register — nothing more.
4. **Register is always reachable.** The commitment is the point of the page; it should never be more than a scroll or a tap away.
5. **Never fabricate a fact.** Placeholder content stays visibly placeholder until the client supplies the real thing.

## Accessibility & Inclusion

No client-specific requirement was established. The dark, photographic treatment makes text-over-image contrast the standing risk; all body and navigation text must clear WCAG AA against its actual backdrop, using scrims rather than lighter type where an image is busy.
