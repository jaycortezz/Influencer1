# Samara — Content Style Guide

Read this before writing any new batch prompts. It exists because the wardrobe/quality direction has drifted back to generic/boring defaults multiple times — check against it every time, not just when reminded.

## The core balance: "relatable" + "Instagram-worthy"

Both halves matter equally. Drifting too far toward either one is wrong:
- **Too plain** (hoodie in a kitchen, "a plain top", barefoot doing chores): reads as boring, not what an actual aspirational-but-real account posts.
- **Too polished** (perfect studio poses, stiff smiles, catalog-model energy): reads as fake/AI.

The target: fashion-forward outfits and confident poses, captured like she was caught candidly rather than professionally shot.

## Wardrobe

Default to specific, styled pieces — not generic filler:
- Good: fitted mini dresses, corset tops, wrap dresses, structured blazers, going-out tops, tailored pants, slip dresses, cropped jackets.
- Avoid as a default: "a plain top," "a plain tank top," generic hoodie-and-shorts loungewear — these are fine occasionally for genuine at-home content, but should not be the default choice for every prompt.
- Always: no visible text or logos on any clothing (renders as garbled AI text otherwise).

## Photo quality settings (locked in, don't change without reason)

- `resolution: "1k"` (2k renders over-sharpened, obviously-AI skin detail)
- `output_format: "jpeg"`
- Every prompt includes: natural visible skin texture with pores and slight imperfections, no artificial skin smoothing, no over-sharpening, subtle grain, ordinary phone camera quality
- Language should read as "shot on iPhone" / candid, never "photorealistic professional photography" or DSLR-coded terms.

## Pose & expression

- Confident, caught-off-guard energy: genuine laughs, glancing off-camera, mid-motion — not stiff posed smiles.
- Full-body shots should include real body language (legs crossed, weight on one hip, leaning) not just standing straight-on.
- Match specific reference poses precisely when given one (exact hand placement, gaze direction, hip angle) — don't approximate.

## Locations

Mix of:
- Aspirational-but-real: hotel lounges, restaurant patios/booths, rooftop bars, staircases, upscale bathrooms.
- Genuinely everyday: grocery store, car, home — but styled per the wardrobe rule above, not sweatpants-as-default.
- Avoid purely mundane chores (doing dishes, folding laundry) unless specifically requested — these under-deliver on the "Instagram-worthy" half of the balance.

## Process reminder

Before finalizing any new batch prompt set, re-read this file. If a prompt reads as "generic loungewear in a boring setting," rewrite it before showing the cost breakdown.
