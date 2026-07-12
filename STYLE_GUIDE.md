# Samara — Content Style Guide

Read this before writing any new batch prompts. It exists because the wardrobe/quality direction has drifted back to generic/boring defaults multiple times — check against it every time, not just when reminded.

## Character

Samara is mid-20s, single, confident and flirtatious. She loves going out with her girls and getting dressed up. She's a high-fashion, trendy girl — not a low-key homebody. Every prompt should read like it was written for this specific person, not a generic "influencer."

- Confident and flirtatious personality — comfortable being looked at, not shy or demure.
- Loves getting dressed up to go out with friends.
- Thinks her feet are pretty and likes showing them off (heels, sandals, bare feet in frame) — this is a genuine part of her style, not incidental.
- Clear, clean-skin face — minimal blemish/texture emphasis beyond the natural-skin-texture quality rule below.
- Occasionally poses a subtle thirst trap — comfortable with a little sultriness, not exclusively "cute."
- Also has a playful, funny, relatable side (oversized graphic tee, glasses, goofy expression) — she isn't sultry 100% of the time. Mix it in.

## Wardrobe — Samara's actual taste

- **Favorite pieces**: low-cut tees, tank tops, crop tops. These should show up constantly, not occasionally.
- **Color palette**: black and white, overwhelmingly. Denim (blue/tan) is fine for bottoms. **No patterns** — solid colors only.
- Necklines run low-cut/cropped by default, not conservative or covered-up.
- Reference silhouettes she actually wears: fitted crop tank + wide-leg/baggy jeans + belly chain; cropped wrap top + mini skirt; low plunge tank + straight-leg jeans + belt; lace-trim cami + shorts; oversized graphic tee for off-duty/funny moments.
- **At home / lazy mode**: baggy/oversized tee is her go-to when relaxing at home — this is the one time loose/oversized fits are correct, not a fallback for every setting.
- **Every dress/top description must explicitly state the neckline** ("low-cut," "plunging," "scoop neck") — don't rely on generic terms like "fitted going-out dress" alone. Without an explicit neckline word, the model defaults to a conservative high round neckline (a real miss we've hit before — reads as a formal/conservative dress, not her style at all).

## The core balance: "relatable" + "Instagram-worthy"

Both halves matter equally. Drifting too far toward either one is wrong:
- **Too plain** (hoodie in a kitchen, "a plain top", barefoot doing chores): reads as boring, not what an actual aspirational-but-real account posts.
- **Too polished** (perfect studio poses, stiff smiles, catalog-model energy): reads as fake/AI.

The target: fashion-forward outfits and confident poses, captured like she was caught candidly rather than professionally shot.

## Wardrobe

Default to specific, styled pieces — not generic filler:
- Good: fitted mini dresses, corset tops, wrap dresses, structured blazers, going-out tops, tailored pants, slip dresses, cropped jackets.
- Avoid as a default: "a plain top," generic hoodie-and-shorts loungewear — fine occasionally, but should not be the default choice for every prompt. Baggy/oversized tee is the correct at-home choice instead (see Wardrobe section) — hoodies and shorts are not her go-to.
- Always: no visible text or logos on any clothing (renders as garbled AI text otherwise).

## Photo quality settings (locked in, don't change without reason)

- `resolution: "1k"` (2k renders over-sharpened, obviously-AI skin detail)
- `output_format: "jpeg"`
- Every prompt includes: natural visible skin texture with pores and slight imperfections, no artificial skin smoothing, no over-sharpening, subtle grain, ordinary phone camera quality
- Language should read as "shot on iPhone" / candid, never "photorealistic professional photography" or DSLR-coded terms.

## Camera logic — who's actually taking the photo

Before writing a shot, decide who's holding the camera and make the pose consistent with that:
- **Selfie-style shots** (car/rideshare, most solo candid shots): her arm must be extended out in front of her as if holding the phone up, not raised up toward her face. Don't describe a selfie setup and then pose her with both hands free/at her sides — that reads as a third-person photo with no photographer, which doesn't make sense.
- **Mirror selfies specifically**: the phone should be visible in the mirror reflection, held in her hand — that's the one case where the phone itself should appear in frame, since you're photographing the reflection.
- **Non-mirror selfies (direct front-camera shots)**: do NOT describe the phone as a visible object in frame. Physically, the phone sits behind/at the camera's own lens from the viewer's perspective — you'd see her raised arm, not the phone itself. Say "arm extended out in front of her as if taking a selfie," not "holding the phone" when there's no mirror involved.
- **Third-person candid shots** (a friend took this, a stranger snapped it, a paparazzi-style street shot): fine to have both hands free for posing, since someone else is holding the camera. Only use this framing when it's specified or clearly implied (e.g. a club photo where a friend is obviously taking it) — default to selfie logic otherwise, since most of this content is meant to be self-shot.
- **Propped-phone shots** (a fourth valid option, use freely): phone propped on a nightstand/dresser/shelf/vanity, out of frame, taking the photo hands-free (self-timer style). This gives full pose freedom — both hands are free to do anything — while still being self-shot. Explicitly say the phone is "propped up on [surface] out of frame" and "both hands completely free." Good default when you want a full-body pose with both hands doing something specific, without the constraint of one arm being raised.
- **When the user says "no phone showing" or similar**: avoid mirror selfies entirely for that batch (the one setup where the phone is supposed to be visible) and lean on raised-arm handheld shots + propped-phone shots instead. State explicitly in the prompt that the phone is not visible / propped out of frame — don't just omit mentioning it, since omission doesn't reliably prevent the model from rendering one.
- **Don't confuse the photo's aesthetic style with a physical prop in her hand.** "Shot on a digital point-and-shoot camera, direct flash photography" describes what the *resulting image* should look like (flash-lit, slight digital grain) — it does NOT mean she should be holding an actual point-and-shoot camera. If a mirror selfie needs the device visible, call it **her phone**, not a camera, regardless of which camera-aesthetic style is applied to the image.

## Pose & expression

- Confident, caught-off-guard energy: genuine laughs, glancing off-camera, mid-motion — not stiff posed smiles.
- Full-body shots should include real body language (legs crossed, weight on one hip, leaning) not just standing straight-on.
- **Never default to "arms/hands at her sides"** — it's boring and reads as a mugshot. Give her something to do with her hands: touching her hair, adjusting a strap, holding a drink/bag/phone, hand on hip, leaning on a railing/wall, hand near her face. Stay realistic — don't force a pose that fights the setting — but always give a specific, deliberate hand placement.
- Match specific reference poses precisely when given one (exact hand placement, gaze direction, hip angle) — don't approximate.
- **Facial expression variety — this is where confirmed-good batches earned it.** A plain "genuine smile" is not the default. Mix expressions across a batch: seductive/sultry, tasteful smirk, confident smoulder, occasional duck lips, alongside genuine smiles/laughs. She's flirtatious — the face should carry that as often as the pose does, not just fall back on "candid smile" every time.

## Hairstyles

Two established "hair up" looks, pick based on context:
- **Sleek/polished**: hair slicked back with a center part into a low bun or ponytail, smooth with no flyaways — reads as put-together/elevated (going out, professional, elegant settings).
- **Casual/voluminous**: looser bun or ponytail with some face-framing pieces out — reads as everyday/relaxed (errands, home, daytime).
Default to sleek/polished unless the setting calls for something more casual.

**Frequency**: hair up should show up in roughly half of any given batch, not as a rare exception. Don't let hair-down-in-loose-waves become the silent default for every shot — actively alternate.

## Locations

Mix of:
- Aspirational-but-real: hotel lounges, restaurant patios/booths, rooftop bars, staircases, upscale bathrooms.
- Genuinely everyday: grocery store, car, home — but styled per the wardrobe rule above, not sweatpants-as-default.
- Avoid purely mundane chores (doing dishes, folding laundry) unless specifically requested — these under-deliver on the "Instagram-worthy" half of the balance.

## Process reminder

Before finalizing any new batch prompt set, re-read this file. If a prompt reads as "generic loungewear in a boring setting," rewrite it before showing the cost breakdown.
