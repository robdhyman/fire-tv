# The Drowned Court: generated art prompts

Style lock for issue #33. The lock hero (seed 90517, centred) is the reference image every still and the key art pass as `images[0]`; the shipped hero is a right-of-centre re-take (seed 90518), described below.

Still template v2 replaced the research doc's v1 opening ("Same series, same world, same lens and grade as the reference image"), which made the model paste the hero's sunken spires into the bottom of 10 of 12 stills. v2 limits the reference to grade, grain, lens and light, uses a seed per still (905SE), and bans signage and writing. The 1x1 scene asks for "knife-cut marks" rather than names, because "names cut into the bark" rendered as legible text.

Model: fal-ai/nano-banana-2 (Nano Banana 2.1, via Figma Weave). House-style suffix HS-1. Generated 2026-11-03. Machine-readable copy: [../prompts.json](../prompts.json).

## hero.jpg

Seed 90518, 16:9 at 2K, thinking High, no reference image. Right-of-centre hero (Rob, 3 Nov): the left 40% stays clear for the TV logline; artFocus 72% keeps both sisters in the phone crops. It replaces the centred lock hero (seed 90517, the original template, picked from seeds 48213, 90517, 17742, 63390), which stays the reference image for the key art and stills. A run with that hero as reference ignored the move and stayed centred.

```
The Drowned Court, a fantasy series. Beneath the lake lies a kingdom that drowned a thousand years ago and never stopped ruling. Two sisters from the shore town are summoned to serve at its court, and only one of them is meant to come back up.
Establishing image of the series' world with its central figures held right of centre, between 45% and 75% of the frame width: two young women in wet wool coats standing waist-deep at the lake edge at night, the spires of a sunken court faintly lit green beneath the surface in front of them, a rowan branch floating between them; mid-shot, horizon in the lower third, headroom above, the left 40% of the frame only fog and black water with no figures and no detail, nothing essential near the right edge, no cropped faces, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## key-art.jpg

Seed 90517, 2:3 at 2K, thinking High, reference image `hero.jpg`.

```
The Drowned Court, a fantasy series. Beneath the lake lies a kingdom that drowned a thousand years ago and never stopped ruling. Two sisters from the shore town are summoned to serve at its court, and only one of them is meant to come back up.
Key art, vertical: a young woman in a drowned queen's brass crown seen from the chest up, eyes closed, black water at her collarbone and a second face reflected beneath the surface, lit from one side by green light from below; the lower two-thirds carry the image and the top third is a dark quiet gradient of lake-black with no detail.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x1.jpg

Seed 90511, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 1x1 "The Summons": On the night of the spring tide, a rowan branch washes up at the Marlowe sisters' door with their names cut into the bark.
Single moment: a rowan branch with deep knife-cut marks in its bark lying on the wet stone threshold of a cottage door at night, a young woman's hand reaching down to it, the black lake behind; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x2.jpg

Seed 90512, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 1x2 "Below": Wren and Ada descend and find a court that speaks their language as it was spoken a thousand years ago.
Single moment: two sisters in wet wool coats walking down a flooded stone stair into a vast green-lit hall beneath the lake, courtiers in drowned finery waiting at the foot of the stair; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x3.jpg

Seed 90513, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 1x3 "The Berry Tithe": Every servant of the court must eat from the rowan. Wren refuses and the lake begins to rise over the town.
Single moment: a long stone table in a drowned hall lit green from above, a bowl of red rowan berries pushed away by a young woman's hand, courtiers in sodden finery turned toward her; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x4.jpg

Seed 90514, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 1x4 "The Queen's Mirror": Ada is chosen as the drowned queen's reflection and starts forgetting the shape of the sun.
Single moment: a young woman standing before a tall tarnished brass mirror in a drowned chamber, her reflection wearing a queen's crown while her own face is pale and still; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x5.jpg

Seed 90515, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 1x5 "Low Water": A drought on the surface exposes the court's spires, and the shore town comes down with boats and hooks.
Single moment: the tips of the court's spires breaking through a shrunken lake at dusk, townsfolk in small rowing boats with hooks and lanterns circling them; wide shot, last daylight, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x6.jpg

Seed 90516, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 1x6 "One Comes Up": The sisters learn which of them the court intends to keep, and make their own choice instead.
Single moment: two sisters in a shaft of pale light falling through dark water, one reaching upward, the other holding her hand and looking down toward the court; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x1.jpg

Seed 90521, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 2x1 "Shore Leave": Wren returns to a town that has aged thirty years in the week she was gone.
Single moment: a young woman in a still-damp wool coat standing in the grey street of a shore town with weathered, aged shopfronts, an old woman in a doorway staring at her; wide shot, overcast morning, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x2.jpg

Seed 90522, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 2x2 "The Drowned Prince": A boy from the court walks the shore road in daylight, and the water follows him.
Single moment: a pale boy in sodden courtly clothes walking the shore road in flat daylight, a thin line of lake water running along the road behind his bare feet; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x3.jpg

Seed 90523, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 2x3 "Salt": The lake turns to brine overnight and the court's old enemy, the sea, sends an envoy.
Single moment: the lake shore crusted white with salt at dawn among dead reeds, a tall robed envoy wrapped in kelp standing at the water's edge; wide shot, cold dawn light, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x4.jpg

Seed 90524, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 2x4 "Ada": Ada rules the court as queen, and her first decree is a war on the surface.
Single moment: a young woman crowned in tarnished brass seated on a throne of drowned stone in the green-lit court, courtiers kneeling below her; mid-wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x5.jpg

Seed 90525, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 2x5 "The Rowan Pact": Wren bargains with the sea to break the court's hold, and the price is every memory she has of her sister.
Single moment: a young woman kneeling in the surf at night holding out a rowan branch to a dark wave rising in front of her; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x6.jpg

Seed 90526, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures, spires or layout. New scene from the same series, episode 2x6 "Still Water": The lake goes flat and silent for the first time in a thousand years. Something beneath it is listening.
Single moment: the lake perfectly flat and mirror-still under a grey sky, an empty rowing boat in the middle, a faint green glow deep beneath it; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## broll.mp4

B-roll prototype for #36. Runway Gen-4 Turbo (`rw_4_video`, via Figma Weave), image to video, 5 s, ratio 1280:720, seed 36003, 30 Weave credits, rendered in about 31 s. Generated 2026-11-04 (UTC).

First frame: the show's placeholder hero `../art-04.jpg`, not the generated `hero.jpg`. Rob, 4 Nov: hero art stays the placeholders, and every clip starts from the placeholder that is the hero shot. The frame is cropped full width to 16:9 at the pre-#41 artFocus (50% 35%), 1371x771 from y = 402. Weave's 1280x720 output was 4.2 MB, so it was re-encoded to 960x540 H.264 with `avconvert` Preset960x540 (2.75 MB) to fit the 3 MB limit. The original is on the `prototype/broll` branch.

```
Very slow push-in over five seconds, no camera shake, no cut, no zoom burst. Small bubbles rise slowly through the green water, the two women's hair drifts in a gentle current, the rowan berries sway on their stem, fine particles float past. Faces and hands hold still; nothing enters or leaves the frame; lighting and colour unchanged from the first frame; no text.
```

Flaws: the grade swings from warm sepia to teal by 3 s; the lower sister opens her eyes, turns to the camera and smiles; a raised arm appears behind the upper sister at 1–2 s. An earlier run from the generated `hero.jpg` (seed 90518) flared the spires to neon green and drifted both faces. It is kept on `prototype/broll` as evidence only.
