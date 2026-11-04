# Slow Burn: generated art prompts

Batch art for issue #34, in the house style locked by The Drowned Court (#33): HS-1 with this show's palette (soot black, ash grey, nicotine cream and scorched umber) and accent (ember orange), still template v2, a seed per file (show code × 1000 + 1 for the hero, + 2 for the key art, + season × 10 + episode for each still).

The hero was generated fresh from text with its subject right of centre (Rob, 3 Nov) and is the reference image for the key art and every still. It is not wired into the catalogue: hero art stays the Unsplash placeholder (Rob, 4 Nov, on #36), and the generated art is episodic only. The stills are each episode's `still` in `src/data/catalogue.json`.

Model: fal-ai/nano-banana-2 (Nano Banana 2.1, via Figma Weave). House-style suffix HS-1. Generated 2026-11-04 (UTC). Machine-readable copy: [../prompts.json](../prompts.json).

## hero.jpg

Seed 24001, 16:9 at 2K, thinking High, no reference image.

```
Slow Burn, a prestige drama series. A fire investigator returns to the apartment block she grew up in, the week before it is condemned. Every tenant remembers the night it burned differently, and one of them remembers her.
Establishing image of the series' world with its central figure held right of centre, between 45% and 75% of the frame width: a woman fire investigator in a worn canvas work jacket standing on the landing of a scorched stairwell in an old apartment block, a flashlight in her hand, its beam catching ash drifting in the air, a burned banister and blistered paint around her; mid-shot, floor line in the lower third, headroom above; the left 40% of the frame only smoke and dark scorched wall with no figures and no detail, nothing essential near the right edge, no cropped faces, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of soot black, ash grey, nicotine cream and scorched umber with a single accent of ember orange, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## key-art.jpg

Seed 24002, 2:3 at 2K, thinking High, reference image `hero.jpg`.

```
Slow Burn, a prestige drama series. A fire investigator returns to the apartment block she grew up in, the week before it is condemned. Every tenant remembers the night it burned differently, and one of them remembers her.
Key art, vertical: a woman in a worn canvas work jacket seen from the chest up, eyes lowered to a struck match held close in her fingers, its small flame lighting half her face, smoke curling past her, a dark burned doorway behind her, lit from one side by the match; the lower two-thirds carry the image and the scene itself continues upward and falls away into darkness in the top third, with no hard edge, no band and no detail, no signage and no writing anywhere in the frame. Full-frame 2:3, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of soot black, ash grey, nicotine cream and scorched umber with a single accent of ember orange, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x1.jpg

Seed 24011, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x1 "Notice to Vacate": Lena Castellanos takes a routine condemnation inspection and recognises the stairwell from a night she has spent twenty years not remembering.
Single moment: a woman in a canvas work jacket with a folder under her arm pausing at the foot of a narrow tenement stairwell, one hand on the scarred banister, looking up into the dark stairs, grey daylight from a grimy window; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of soot black, ash grey, nicotine cream and scorched umber with a single accent of ember orange, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x2.jpg

Seed 24012, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x2 "Fourth Floor": A tenant who has not left her apartment since 2004 keeps a box of the fire's original evidence.
Single moment: an elderly woman in a cardigan in a cluttered, dim apartment holding open a cardboard box of soot-stained plain bags and a melted lamp, a woman investigator kneeling beside her; mid shot, lamplight, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of soot black, ash grey, nicotine cream and scorched umber with a single accent of ember orange, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x3.jpg

Seed 24013, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x3 "Accelerant": The original report named faulty wiring. The wiring was replaced the week before.
Single moment: a woman's gloved hands drawing a length of clean new electrical wire out of an opened wall cavity beside old charred joists, a flashlight beam on it; close mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of soot black, ash grey, nicotine cream and scorched umber with a single accent of ember orange, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x4.jpg

Seed 24014, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x4 "The Super": The building's superintendent is the same man, and he knows exactly which apartment Lena lived in.
Single moment: an older heavyset man in a work shirt holding a ring of keys in a dim corridor outside a plain apartment door, a woman investigator facing him a few steps away; mid shot, one bare bulb overhead, no door numbers, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of soot black, ash grey, nicotine cream and scorched umber with a single accent of ember orange, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x5.jpg

Seed 24015, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x5 "Smoke": The city moves the demolition forward, and Lena finds out who signed the order.
Single moment: a woman standing alone on a wet street at dusk before an empty apartment block wrapped in plain demolition fencing, an excavator parked at the kerb with its arm raised; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of soot black, ash grey, nicotine cream and scorched umber with a single accent of ember orange, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x6.jpg

Seed 24016, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x6 "Point of Origin": Lena stands in the apartment where it started and finally remembers who lit the match.
Single moment: a woman standing in the middle of a gutted, blackened apartment room, a single beam of light through a boarded window falling on the charred floor where the fire began; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of soot black, ash grey, nicotine cream and scorched umber with a single accent of ember orange, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```
