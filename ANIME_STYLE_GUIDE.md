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
- Settings: night scenes, rain, neon reflections, dim interiors, quiet in-between moments (walking,
  sitting, waiting) rather than high-action.

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

## Standard suffix

Append this (or a close variation) to the end of every prompt so the style stays consistent:

> 1990s Japanese anime screencap style, cel-shaded flat color, thick imperfect linework, muted
> desaturated color palette, deep moody shadows, dim atmospheric lighting, grainy analog film
> texture, subtle scan-line artifacting, hand-painted background art, retro OVA aesthetic

## Technical settings

- **Model**: `wavespeed-ai/prefect-pony-xl` — WaveSpeed's dedicated anime/illustration model
  (SDXL-based). Do NOT use `google/nano-banana-pro/edit` or `wavespeed-ai/flux-kontext-dev` for
  this project — those are the photoreal models used for Samara.
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
