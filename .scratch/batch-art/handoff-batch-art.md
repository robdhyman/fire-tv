# Batch art (#34): what was made and where it is

Branch `claude/batch-art-52c278`. Generated 4 Nov 2026 (UTC) with Nano Banana 2.1 through Figma Weave, in HS-1 with still template v2.

## What's in the branch

- **Twelve shows** in `public/art/<show>/`: a hero, 2:3 key art and one still per episode (123 stills). Slow Burn ran first as the pilot; you kept its look for the rest.
- **Ten posters** in `public/art/coming-soon/`, each with its title in the image. Eight are new: Saltmarsh, Second Sun, The Glasswright and Deadlight (SYFY), and Fourth Quarter, Clean Room, The Appraiser and Hard Shoulder (USA). Low Orbit and The Night Desk were re-made with the same prompt and seed plus a title line. All ten titles were spelled right on the first take.
- **Catalogue**: every episode of the twelve shows has its `still`, and `movies` holds all ten posters. Hero and tile art stay the Unsplash placeholders, as you ruled on 4 Nov ("we are keeping those placeholders as hero art"). The generated heroes are the stills' reference image, kept in each folder but not wired.
- **Prompts**: every file's prompt is in `public/art/<show>/prompts.md` and `public/art/prompts.json`. The generator is `build-prompts.mjs` plus `scenes.mjs` beside this note.
- **Screens**: `docs/screens/` and `docs/screens/mobile/` are re-captured.

Review sheets: [Slow Burn](review/slow-burn.jpg), [Ringfall](review/ringfall.jpg), [Ember Hollow](review/ember-hollow.jpg), [Feedback](review/feedback.jpg), [Veil](review/veil.jpg), [Homemaker](review/homemaker.jpg), [Last Town Standing](review/last-town-standing.jpg), [Whiteout](review/whiteout.jpg), [The Long Dry](review/the-long-dry.jpg), [Pale Street](review/pale-street.jpg), [Sandbox](review/sandbox.jpg), [The Summer People](review/the-summer-people.jpg), [posters](review/coming-soon.jpg).

## Spend and size

- **1,211 Weave credits** (about $12): the 1,201 quote plus one 10-credit retake. The Whiteout hero had an Oakley-style logo on the helmet; the retake asks for plain, unbranded gear. Balance went from 1,490 to 279.
- **157 JPGs, 28 MB**, every one under 400 KB: stills 17.0 MB (1180 px edge, about 141 KB each), heroes 3.4 MB, key art 3.7 MB, posters 3.5 MB.

## Small calls I made

- **Palettes**: four colours plus one accent per show, written in `scenes.mjs` and each `prompts.md`.
- **Seeds**: show code × 1000 + 1 for the hero, + 2 for the key art, + season × 10 + episode for each still.
- **Poster titles** sit in the top third but below its top 15%, clear of the row's `coming soon` badge, which covers the top 13% of a tile (#35).
- **Kept, not retaken**:
  - Homemaker's key art is close to its hero.
  - The Long Dry 2x1 shows a newspaper whose columns are unreadable.
  - Sandbox 1x3 has an abstract data wall behind the keynote.

## Follow-ups

- [The Drowned Court's hero goes back to its placeholder](https://github.com/robdhyman/fire-tv/issues/50) is its own ticket and is not in this PR.
- Key art isn't wired anywhere yet, as with The Drowned Court.
- Thirteen Unsplash photos are still referenced, as hero and tile art. `art-04` becomes the fourteenth once #50 lands.
