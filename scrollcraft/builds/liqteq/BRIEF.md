# BRIEF — Liqteq (Liquid Technologies)

Interviewed (aesthetic, experience, primary action and brand-assets asked live).
Not self-authored. Real brand facts from public sources (liqteq.com is egress-
blocked, so gathered via search); logo/colours to be pasted by the client and
swapped into the accent tokens.

## The brand

Liquid Technologies (Liqteq) — an AI-native software house. Houston, TX, founded
2018, 51–200 people. Designs, builds and deploys custom AI, software and data
products: custom platforms, ML pipelines and enterprise solutions for energy,
healthcare and beyond. Services: AI, custom software, mobile (iOS / Android /
cross-platform), web & design, data, cloud, brand and digital marketing.
Approach: human-centered design, data-driven delivery. Real contact used on the
page: info@liqteq.com, (832) 579-0715, 10190 Katy Freeway, Suite 350, Houston TX;
linkedin.com/company/liqteq, facebook.com/liqteq. No invented statistics.

## The eight answers

1. **Vibe:** dark, precise, confident, AI-native, "liquid". References: an
   engineering console at night; a research-lab manifesto wall; type that behaves
   like a fluid. *(chosen: Dark, deep violet)*
2. **Scroll journey:** land on the name at enormous scale, flowing → the plain
   claim of what they are → the capabilities arriving as lines → the core promise
   at the biggest scale (peak) → the quiet proof (since 2018, Houston, how they
   work) → an inverted quiet close with "Start a project".
3. **Energy curve:** loud and arresting at the open and the peak, quiet in the
   proof and the close. Manifesto pacing: scale is the instrument.
4. **Feeling, stage by stage + peak:** see the curve below. The one moment: the
   promise fills the screen at a scale nothing else on the page reaches, and the
   letters wipe into being.
5. **One thing no other site does:** the giant type is *liquid* — the hero word's
   weight flows toward the pointer and undulates with scroll, so the wordmark
   behaves like a fluid. *(signature move; ties to the name)*
6. **Distance from premium-minimal:** bold manifesto, dark. *(chosen)*
7. **One world or scenes:** distinct type-scenes (a poster sequence), not one
   continuous world. → Typographic poster grammar.
8. **Assets:** logo/colours to be pasted by the client; built now with a clean
   placeholder wordmark and a deep-violet accent held in swappable tokens.

## Feeling curve (written before the acts)

```
1  Arrest        the name at enormous scale, flowing under the cursor
2  Confidence    the plain claim, assembling line by line
3  Breadth       the capabilities arrive, one scale-step at a time
4  Conviction    the promise at the biggest scale on the page, wiped into being (PEAK)
5  Trust         the proof drops to quiet: since 2018, Houston, how they work
6  Readiness     the smallest type on the site, one underlined way in
```

No two adjacent feelings repeat. The peak (act 4) is the only maximal-scale act;
act 3 steps up to it and act 5 drops hard away from it, so it has both a run-up
and silence after.

## The peak

Tell-a-friend sentence: **"It's the site where the giant word goes liquid under
your cursor, and then the whole promise wipes onto the screen bigger than
anything else."** Lives in act 4. Gets the largest span, the biggest type, and a
clip-path wipe across the letterforms; act 5 immediately shrinks to the quietest
type, so the drop is the resolution.

## Tell-someone sentence

> It's the site where the huge headline behaves like a liquid and flows toward
> your cursor.

The signature move and the peak are related but distinct moments: the liquid type
is the hero (act 1) and the wipe is the peak (act 4). Both are memory hooks; the
liquid type carries the name, the wipe carries the promise.

## Grammar: Typographic poster (uniqueness.md §2.5)

Chosen because Liqteq's asset is a claim, not a catalogue, and a bold manifesto
was the brief. Type is the imagery; scale contrast does the work photography
would. Wordmark set at composition scale; hero is one line at extreme scale with
a real `<h1>`; the close inverts to the smallest type with the CTA as a plain
underlined link. Leans on kinetic, pin-with-scale from `--sc-p`, reveal as a wipe
across letterforms, and drift across the dark-violet family. Bans scrub, pan
rails, tilt, parallax on text.

Why the other seven lost:
- **Filmic one-shot / Continuous world** — no footage, no journey-through-place;
  and the default we avoid.
- **Chaptered editorial** — this is a manifesto, not long-form to read.
- **Live surface** — strong for AI, but the brief asked for a bold manifesto, and
  a poster is more robust and more distinct from Coarts.
- **Gallery / catalog** — that is exactly the Coarts build; the fingerprint gate
  forbids repeating it.
- **Split stage** — no single two-sided comparison carries the whole page.
- **Rhythmic cutlist** — the energy is confident and scale-driven, not a pulse of
  hard cuts.

## Update after the client sent the animated logo

The client provided their real **animated logo** (a blue phoenix in a swirl) and
asked to keep its colour scheme and to bring the apps they have shipped into play
on scroll. Two changes followed:

- **World recoloured to the logo:** dark navy ground (`#080d16`, matched to the
  logo so the GIF blends via `mix-blend-mode: screen`) with electric-azure accents
  (`#1958a7 → #3e96d2 → #6cc1ef`), replacing the earlier violet.
- **Hero is now the animated logo** plus the wordmark and thesis, and the
  signature move changed from liquid type to the app rack below.

## Signature move (revised again on client feedback: "iPhone screens, one app
per scroll")

`appScenes` — each real shipped app (Vitalog, Vidan, Preview ID, Roam Trips) gets
its **own scroll scene**: an Apple-style iPhone (dynamic island, status bar, app
header) whose screen **scrubs the app flow** as you travel the act — the inner
screen is translated from the act's `--sc-p`, so scrolling the section scrolls the
app. Copy (tag, name, description, features) cues in beside it; the layout
alternates side to side down the page. Placeholder screens are branded stand-ins;
a real screenshot drops in by adding `has-shot` to the `.iphone` and an
`<img class="shot">`, which then pans the full screenshot with scroll. Pure CSS
off `--sc-p` plus engine cues; the engine is untouched. Distinct from Coarts's
dimmer and from a kit device.

## Fingerprint gate

Against row 1 (Coarts): differs on grammar (poster vs gallery), nav (composition
wordmark + one link vs slim bar + jump index), hero (extreme-scale liquid type vs
lit object), act-sequence (scale/kinetic/reveal/scale/flow/quiet vs
pin/pan/pin/flow/flow/pin), close (inverted quiet underlined link vs pinned
inquiry plate), signature (liquid type vs colour dimmer) and world (dark violet vs
light cream). 7 of 6 dimensions differ — clears the gate.

## Score table (device per beat)

| # | Beat | Act device | Star device | Why |
|---|------|-----------|-------------|-----|
| 1 | Arrest | `pin` | scale + liquid variable type | The name at extreme scale is the strongest open a poster has; the liquid response makes it the signature. |
| 2 | Confidence | `pin` | `kinetic` lines | The claim assembling line by line reads as being stated, not displayed. |
| 3 | Breadth | `pin` | `reveal` per capability | A wipe is a change of state; each capability becoming present is a change of state. |
| 4 | Conviction (peak) | `pin` | scale + `reveal` wipe across letterforms | The promise at the biggest scale, wiped into being. Largest span. |
| 5 | Trust | `flow` + `in` | staggered facts + `count` (2018) | Real facts as quiet type; the one real number (founded 2018) counts. |
| 6 | Readiness | `pin` | held, inverted | Smallest type on the site; "Start a project" as an underlined link. Holds. |

Families: scale, kinetic, reveal, flow+in, count, plus the bespoke liquid type —
≥4, none repeated adjacently. Zero scrub/pan/tilt (banned by the grammar). One
maximal act (the peak). Total within the 8–14vh budget.

## Authored silence

The end of act 4 (after the promise lands) and the top of act 5 are deliberately
quiet — the ground settles to its darkest and the type drops to its smallest —
so the peak has silence after it, not a fade to nothing.
