# B-roll prototype (#36)

Throwaway capture for [#36](https://github.com/robdhyman/fire-tv/issues/36) on map [#25](https://github.com/robdhyman/fire-tv/issues/25). Four 5 s clips from Runway Gen-4 Turbo (`rw_4_video`, via Figma Weave), 1280:720, 24 fps, H.264, no audio. 30 Weave credits each, 120 in all (balance 1,610 → 1,490). Generated 4 Nov 2026 (UTC).

Rob's rule (4 Nov): hero art stays the Unsplash placeholders, and generated art is episodic only, so every clip starts from the placeholder hero. Clip 1 predates the rule and is kept as evidence only.

| Clip | First frame | Seed | Render | Size | What went wrong |
|---|---|---|---|---|---|
| `the-drowned-court-from-generated-hero.mp4` | generated `hero.jpg` (#41), 1920x1071 | 90518 | ~25 s | 1.5 MB | Faint green spires flare to neon crystals by 1 s and stay; both sisters' faces drift toward profile by 2 s; fog and blacks lift; push-in barely shows |
| `ringfall-from-placeholder.mp4` | `art-12.jpg` cropped 16:9 at 50% 35% | 36001 | ~25 s | 1.4 MB | A blue dome grows on the craft from ~2 s; the craft sinks onto the helmet by 5 s |
| `ember-hollow-from-placeholder.mp4` | `art-06.jpg` cropped 16:9 at 50% 45% | 36002 | ~27 s | 1.9 MB | Cleanest: the stag's pose shifts slightly and the antlers soften; smoke and embers barely show |
| `the-drowned-court-from-placeholder-art-04.mp4` | `art-04.jpg` cropped 16:9 at 50% 35% | 36003 | ~31 s | 4.2 MB | Grade swings from sepia to teal by 3 s; the lower sister opens her eyes and smiles at the camera; a raised arm appears behind the upper sister at 1–2 s |

Render time runs from the `weave_run_model` call to the output's upload timestamp. `*-frames.jpg` are frames at 0, 1, 2, 3, 4 and 5 s. `first-frames/` holds the 16:9 crops Weave fetched. Prompts and the shipped files are in `public/art/<show>/` on the #36 PR.

Lesson for the autoplay map: don't ask the model to change light ("pulses once" made the spires flare). Faces drift, and the grade drifts on bright scenes. Scenes without faces held best.
