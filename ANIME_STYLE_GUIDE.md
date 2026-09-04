# 90s Anime Couple — Content Style Guide

Read this before writing any new batch prompts for the anime project. This is a separate
persona/pipeline from Samara (see `STYLE_GUIDE.md` + `batches/avatar-variations.json`) —
don't mix the two. This project has no real-person reference image; every job is a pure
text-to-image generation.

## Concept

Couple-focused illustrated scenes rendered like a screencap pulled from a late-80s/early-90s
Japanese OVA or TV anime — the era before digital cel painting made everything glossy and
flat-clean. Think the visual texture of that period (muted film-print color, soft grain,
hand-painted backgrounds, slightly imperfect linework) — not modern anime, not glossy digital
illustration, not photoreal.

- Mood: dark, moody, intimate, a little melancholic or quietly romantic — not bright/cheerful
  shoujo energy.
- Subjects: always a couple (two characters), framed together in the scene — avoid solo-character
  shots for this project.
- Settings: **night only, locked.** Daytime/pastoral scenes drift toward a Ghibli look regardless
  of style keywords in the prompt — don't write daytime scenes for this project at all, since the
  model will fight the style rather than follow it.
- Liminal urban night spaces are the setting bank: alleys, rooftops, laundromats, parking garages,
  stairwells. These consistently outperform (see Framing & composition below) — draw from this
  list rather than open/scenic locations.

## Framing & composition (locked — from analytics)

- **Close or medium framing wins.** Intimate couple shots with the emotional beat readable in the
  first second dramatically outperform wide establishing shots (1,000+ views vs. under 500 on wide
  shots). Faces/upper bodies should fill most of the frame — this is not optional, it's the single
  biggest performance lever.
- **Physical closeness/touch is required**: leaning heads, held hands, foreheads touching, pressed-close
  framing. Distant or separately-posed figures underperform even in the right setting.
- **Static camera, subtle motion only.** If/when this pipeline extends to video, keep motion strength
  low (20–30%) for intimate/still scenes — over-animation breaks the aesthetic. For the current
  text-to-image jobs, describe the shot as still/static, not mid-action.
- **What underperforms** (avoid): wide shots where subjects read small in frame; anything where the
  emotional beat isn't legible immediately on scroll-stop.
- **Single dominant light source per scene** — neon blue, warm orange, or sickly green. Pick one per
  job and name it explicitly in the prompt; don't mix multiple light colors in one scene.

## Visual style (bake into every prompt)

Every job's `prompt` should include language covering all of these — don't rely on the model's
defaults:

- **Cel-shaded, flat color, thick clean-but-slightly-imperfect linework** (not modern digital
  vector-clean lines).
- **Muted, desaturated color palette** — nothing oversaturated or candy-bright.
- **Deep moody shadows / dim atmospheric lighting** — night scenes, practical light sources
  (streetlamps, neon signs, table lamps, window light), not flat even lighting.
- **Grainy analog film texture, subtle scan-line/VHS artifacting** — this is what sells the "old
  screencap" read, not a clean modern render.
- **Hand-painted background quality** — backgrounds should feel painted, not photo-composited or
  3D-rendered.
- Era touchstone (for internal direction, not to copy specific character designs): the general
  visual register of late-80s/90s OVA and TV anime — soft film grain, muted palettes, moody
  night cinematography (the kind of look associated with shows like Cowboy Bebop, Ghost in the
  Shell, Perfect Blue, Trigun).

## Prompt template (locked)

**Style descriptors always go first, before the scene/subject** — not appended at the end. Order:

> 1990s Japanese anime screencap, dark moody atmosphere, night, cel-shaded, hand-painted
> backgrounds, grainy film texture, muted desaturated colors, subtle VHS scan lines, subtle
> chromatic aberration, single dominant [neon blue / warm orange / sickly green] light source,
> [scene — pick from the liminal-space bank], [subject — close/medium framing, physical touch,
> static camera]

Note on aspect ratio / stylization: don't write `--ar 9:16` or `--style raw` into the prompt text —
those are Midjourney flags and this pipeline runs on WaveSpeed's API, which doesn't parse them; they'd
just render as literal garbled text in the image. The 9:16 framing is already handled by the `size`
field (`"832*1472"`) and a moderate `guidance_scale` keeps it from over-stylizing — see Technical
settings below.

## Captions (locked pattern)

One-line, love-letter style, understated. Examples: "I'd lose every game just to watch you win,"
"wherever you're taking me, I already feel safe." Avoid generic/descriptive captions (no "date night
✨" type lines) — the caption should read like an intimate thought, not a description of the image.

## Technical settings

- **Model**: `wavespeed-ai/flux-dev` — general-purpose text-to-image Flux model, $0.012/image.
  Not anime-dedicated (unlike `wavespeed-ai/prefect-pony-xl`, tried first and swapped out) — leans
  more painterly/photoreal on the same prompts, so watch for style drift and lean harder on the
  cel-shaded/hand-painted/grain language in the prompt if it starts looking too clean or too real.
  Do NOT use `google/nano-banana-pro/edit` or `wavespeed-ai/flux-kontext-dev` — those are the
  photoreal editing models used for Samara.
- Text-to-image only — this model does not take a source `image` input. Every job is generated
  from the prompt alone.
- `size`: `"832*1472"` (9:16 portrait, close approximation — SDXL needs multiples of 64).
- `output_format`: `"png"` — flat cel-shaded color blocks compress poorly to jpeg (banding/blocking
  on flat regions); png keeps edges clean.
- `negative_prompt` (set in `defaults`, override per-job only if needed): keep modern-anime and
  photoreal artifacts out — see `batches/anime-couple.json` for the current wording.
- `seed: -1` for variety across a batch; pin a specific seed only when you want to iterate on one
  composition.

## Process reminder

Before finalizing a batch, check every prompt against the visual-style checklist above (cel-shading,
muted palette, moody lighting, grain/scan-lines, hand-painted backgrounds) and confirm both
characters are actually in frame together. Rewrite before showing the cost breakdown if a prompt
reads as a single-character shot or as clean/bright modern anime.
