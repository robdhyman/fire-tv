# Style lock for The Drowned Court (#33): what was made and what's left for Rob

Branch `claude/style-lock-drowned-court`. Generated 3 Nov 2026 with Nano Banana 2.1 through Figma Weave. Total spend was 258 Weave credits (about $2.58); 1,892 are left.

## What's in the branch

- `public/art/the-drowned-court/`: the hero (seed 90517, which you picked from four candidates), 2:3 key art, and 12 episode stills. Each is under 400 KB and was converted by `scripts/convert-show-art.mjs`, the per-show version of `convert-art.mjs`.
- `public/art/coming-soon/`: the Low Orbit (SYFY) and The Night Desk (USA) posters, title clear, for #35 to use.
- Prompts: `public/art/<folder>/prompts.md` has each prompt word for word. `public/art/prompts.json` is the machine-readable record (model, seed, suffix, reference, date).
- Code: `Episode.still` is optional. `stillArt(ref)` returns the episode's still or falls back to the show's art, and every episode tile (TV and mobile: Home, show page, Watchlist, Player) now uses it. The other twelve shows are unchanged.

Review screens: [TV show page](review-tv-show.jpg), [TV episodes](review-tv-show-episodes.jpg), [phone](review-phone-show.jpg).

## What changed from the research doc

1. **Still template v2.** The doc's v1 opening ("Same series, same world, same lens and grade as the reference image") plus the shared seed made the model paste the hero's sunken spires into the bottom of 10 of the 12 stills. v2 opens "Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout", uses one seed per still (905SE), and bans signage and writing. All 12 v2 stills came back clean, so #34 should start from v2.
2. **The prompt is the text risk, not the model.** "Names cut into the bark" rendered as legible (wrong) names. Scene lines must not ask for anything written.
3. **Poster tops.** "A dark quiet gradient" in the top third gave a hard flat band. "The scene continues upward and falls away into darkness" fixed it.
4. **Title in image works.** Nano Banana rendered "LOW ORBIT" correctly spelled and legible on the first try (not kept).

## Decisions for Rob (the ticket's four, plus one found)

- **House style**: HS-1 as written (dark, anamorphic, one motivated light, lifted blacks, a muted 4-colour palette with one accent). Recommend: keep it.
- **Poster titles**: Recommend: keep them title clear, so the app sets the title in the brand face. In-image text is reliable, but it can't follow the brand switch.
- **Hero vs key art**: they are different images. The hero is the 16:9 world shot; the key art is the 2:3 crowned-queen portrait. Recommend: keep them separate. Key art isn't wired anywhere yet; it is the natural poster tile if shows ever get a 2:3 row.
- **Per-show palette rule**: four muted colours plus one accent, fixed at lock and pasted into HS-1. Recommend: keep it.
- **Found: TV show-page overlap.** The hero centres its subject (the portrait-safe rule), so on TV the logline sits over the left sister. Options: generate TV heroes with the subject in the right two-thirds, or accept the scrim. This affects every show in #34.

Done when Rob approves the style and this PR merges. #34 (batch) and #35 (Coming Soon) are unblocked by it.

## Rob's answers (3 Nov 2026)

He approved HS-1 with still template v2, title-clear posters, separate hero and key art, and the four-plus-one palette rule. TV heroes move the subject into the right two-thirds. Next: re-generate The Drowned Court hero to that rule (about 10 credits), swap it in, and merge #41.

Hero swapped (3 Nov, Rob picked B): seed 90518, no reference image, sisters at 62–84% of the width, artFocus `72% 50%` for the phone crops. A re-take using the old hero as reference ignored the move and stayed centred, so in #34 TV heroes are generated fresh from text, not edited. Spend for the re-take: 20 credits (278 total).
