# BRIEF — Coarts Lighting

Interviewed (4 of the 8 questions asked live via AskUserQuestion; the rest
inferred from the brand and marked below). Not self-authored.

## The brand

Coarts Lighting — Pakistan's premium lighting brand (Karachi). Sells LED,
solar, fancy/decorative, neon, outdoor and architectural lighting plus home
automation: pendants, ceiling and COB downlights, track lights, wall sconces,
floor and table lamps, LED strips, solar and outdoor fixtures. Positioning
from their own copy: "brightening millions of lives with sustainable,
energy-efficient luminaries." Real channels (used in the footer, not invented):
instagram.com/coartslighting, facebook.com/CoartsLightingsolutions,
youtube.com/@coartslighting, pk.linkedin.com/company/coarts-lighting.

Product names on the page are illustrative fixture names for a redesign concept
(the client fills the real catalogue). No prices — the model is browse + enquire
(quote-based), so there are no invented numbers anywhere. The only numerals on
the page are real colour-temperature Kelvin values (2700K/4000K/6500K), which
are physics, not brand statistics.

## The eight answers

1. **Vibe (3–5 words):** warm, premium, boutique, lit-from-within. Reference
   points: a lighting showroom at dusk; a jeweller's velvet-lined case; the warm
   pool of a single good lamp in a dark room.
2. **Scroll journey:** arrive in a warm boutique with one fixture already lit →
   the collection walks past sideways → one fixture blooms and lights the whole
   room (peak) → the craft and the colour-temperature idea explained → browse the
   range and add pieces to an enquiry → a quiet invitation to enquire / visit.
3. **Energy curve:** low and warm throughout, one lift at the bloom, settle to a
   calm close. Inviting, never loud. *(chosen: "Warm & inviting")*
4. **Feeling, stage by stage + the one moment:** see the feeling curve below.
   The one moment: the fixture blooms and the whole cream room warms and lifts
   around it, and the reader realises the dimmer in the corner did that.
5. **One thing no other site does:** a colour-temperature + brightness dimmer,
   fixed in the corner, that re-lights the ENTIRE page at once — every product's
   glow, the room's ground, and the accent shift together, warm↔cool and
   soft↔bright, like dialling a real showroom. *(chosen signature move)*
6. **Distance from premium-minimal:** warm boutique, light ground (not the dark
   premium-minimal default). *(chosen: "Warm boutique cream")*
7. **One world or distinct scenes:** distinct objects in a walkable collection —
   a catalogue, not one continuous flight. → Gallery/catalog grammar.
8. **Assets they have:** logo + socials + a real product range (client-side). No
   footage, no photo library available to this build and no image-generation key,
   so the world is rendered from CSS/SVG light — glows, filaments, light pools,
   fixture silhouettes — which suits a brand whose actual product IS light.

## Feeling curve (written before the acts)

```
1  Welcome      a warm room, one pendant already glowing, the dimmer within reach
2  Delight      the collection drifts past sideways, each fixture lit, breadth
3  Awe (PEAK)   one fixture blooms; the whole room warms and lifts around it
4  Reassurance  the craft named plainly, and the colour-temperature idea shown
5  Consideration the range laid out to walk, each piece labelled, pieces collected
6  Invitation   the room quiets to a single warm line: come and see it lit
```

No two adjacent feelings repeat. The peak (act 3) is the only loud act; act 2
before it is calm breadth, so the bloom has quiet to arrive from.

## The peak

Tell-a-friend sentence: **"It's the lighting site where you dim the whole
showroom with a slider in the corner, and one lamp blooms and lights the entire
room as you scroll."** Lives in act 3. Gets the largest pinned dwell span, the
biggest single visual change (the light bloom), and the quietest act in front of
it.

## Tell-someone sentence

> It's the site where you dial a dimmer in the corner and every lamp on the page
> changes colour temperature and brightness with you.

The signature move and the peak point at the same moment — the dimmer is what
makes the bloom land — so they are merged, per feel.md §3.

## Grammar: Gallery / catalog (uniqueness.md §2.6)

Chosen because the brief is literally "browse the range and enquire": the
visitor's real question is "what are the options", not "should I believe you".
Objects in a walkable collection, museum-label schema (fact, not pitch), pan as
the spine, reveal per object, an index of objects for nav, the collection
starting at the top (object one already lit, no separate title stage), and a
close typeset as an inquiry plate in the same label schema.

Why the other seven lost:
- **Filmic one-shot** — carries a burden of proof; this is a catalogue to walk,
  not one linear argument to be carried through. Also the default we must avoid.
- **Chaptered editorial** — no long-form to read; the product is the range.
- **Live surface** — there is no software product to operate.
- **Continuous world** — no real geography, no footage; a single flight is the
  most fragile build and there is no travel story here.
- **Typographic poster** — the products, rendered as light, are the imagery; a
  type-only page would hide the range.
- **Split stage** — there is no two-sided comparison.
- **Rhythmic cutlist** — the chosen energy is warm and calm, the inverse of a
  pulse of hard cuts.

## Signature move

`kelvinDimmer` — a fixed corner control (colour-temperature 2200K↔6500K plus a
brightness handle) that writes `--room-warm` and `--room-bright` on `:root`; the
theme derives the accent hue, every product glow, the light pools and the cream
ground's warmth/brightness from those two numbers, so one drag re-lights the
whole page. Bespoke JS reading/writing custom properties; the engine is
untouched. Not spotlight/magnet (both banned by this grammar) and not a kit
parameter change — it is "one control that regrades the whole page"
(uniqueness.md §3). Choice persists in localStorage (guarded).

## Fingerprint gate

Registry is empty (first build for this workspace) — nothing to clear. Row
appended in FINGERPRINTS.md after ship.

## Score table (device per beat)

| # | Beat | Act device | Star device | Why this one |
|---|------|-----------|-------------|--------------|
| 1 | Welcome | `pin` | CSS light + cue | The room holds while a warm greeting states itself over one lit pendant; a held frame is the right open for calm. |
| 2 | Delight | `pan` | rail + reveal-per-item | Lateral travel reads as *breadth* — the range walking past — which is exactly a collection. |
| 3 | Awe (peak) | `pin` | `reveal` (iris/up) + light bloom | A wipe is a change of state; the fixture becoming a lit room is a change of state. Largest span, biggest change. |
| 4 | Reassurance | `flow` + `in` | staggered reveal + real Kelvin scale | Facts as museum labels read as document, which is where trust lives; the Kelvin scale ties back to the dimmer. |
| 5 | Consideration | `flow` | `reveal` per object + `tilt` | The browse grid; objects the visitor would pick up get a tilt; reveal differs from the flow before it. |
| 6 | Invitation | `pin` | held cue | The room quiets to one warm line and the enquiry, typeset as a label. Close resolves and holds. |

Families used: pin, pan, reveal, flow+in, tilt (pointer), plus the bespoke
dimmer — six, ≥4 required. No family twice in a row: pin, pan, reveal, flow,
reveal, pin. Zero `scrub` acts (no footage / no generation key) — a fully
CSS-rendered world, a first-class route per SKILL.md. At most one loud act (the
peak). Total pinned span ≈ 2.2 + 4.6(pan, navigational) + 3.4 + 1.3 ≈ within the
8–14vh budget once the two flow sections are added.

## Authored silence

The tail of act 2 (after the last rail item settles) and the first quarter of
act 3 are deliberately quiet — the room dims slightly — so the bloom has
darkness to bloom from. This is authored, not dead scroll.
