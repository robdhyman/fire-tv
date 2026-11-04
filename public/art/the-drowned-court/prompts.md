# The Drowned Court: generated art prompts

Every image in this folder, and every run that was not kept, with the prompt sent verbatim. Generated 3 Nov 2026 for [Style lock](https://github.com/robdhyman/fire-tv/issues/33) on the [FireTV round 2](https://github.com/robdhyman/fire-tv/issues/25) map. This file is the only prompt record for the show; there is no repo-wide `prompts.json`.

- **Model**: Nano Banana 2.1 (Weave model `bebebed5-50c1-4701-98b3-86929db21585`, fal `fal-ai/nano-banana-2/edit`), through the Figma Weave tools in a Claude Code session.
- **House-style suffix**: `HS-1`, pasted verbatim at the end of every prompt. This show's palette: lake-black, bottle green, tarnished brass and bone white; accent: cold rowan-berry red.
- **Style lock** (Rob, 3 Nov 2026): hero candidate H1, seed **418203**, HS-1 kept as written. Key art is the hero file itself (`tileArt` = `heroArt`).
- **Stills**: edits of the hero. Same seed as the hero copies its glowing foreground spires into any scene with water in front (9 of 12 first takes). The fix that held (8 of 8) is the hero as reference with a **fresh seed per still**, recorded per file below. The batch rule is `hero seed + 100 x season + episode`, plus `Full-frame 16:9, no black bars.` at the end of the scene line.
- **Converted** with `scripts/convert-generated-art.mjs`: hero 1920 px, stills 1180 px, JPEG under 400 KB.
- **Cost**: 2K with High thinking is 10 credits a run, 1K with Minimal is 7. This show took 40 (heroes) + 84 (first stills) + 28 (second takes) + 28 (fix tests) + 42 (third takes) = 222 credits.

## Files in this folder

### `hero.jpg`: Hero and key art (candidate H1, locked)

- Seed: 418203
- Params: 2K, 16:9, thinking High, png
- Reference: none
- Suffix: HS-1
- Output: 2752x1536, converted to 1920x1071
- Run: `c58c1ff6-1c94-4db3-a3ed-b7b4685af41b`, 10 credits

```text
The Drowned Court, a fantasy series. Beneath the lake lies a kingdom that drowned a thousand years ago and never stopped ruling. Two sisters from the shore town are summoned to serve at its court, and only one of them is meant to come back up.
Establishing image of the series' world with its central figure or object held in the middle third of the frame: two young women in wet wool coats standing waist-deep at the lake edge at night, the spires of a sunken court faintly lit green beneath the surface in front of them, a rowan branch floating between them; mid-shot, horizon in the lower third, headroom above, fog and black water in the outer thirds, nothing essential near the left or right edge, no cropped faces, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s1e1.jpg`: Still, S1 E1 "The Summons" (take 1)

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x1 "The Summons": On the night of the spring tide, a rowan branch washes up at the Marlowe sisters' door with their names cut into the bark.
Single moment: the open door of a stone shore cottage on the night of the spring tide, a wet rowan branch heavy with red berries lying across the threshold with marks cut into its bark, the two sisters from the reference in shawls looking down at it from the doorway, lamplight behind them; mid-shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s1e2.jpg`: Still, S1 E2 "Below" (take 3, fresh seed)

- Seed: 418305
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x2 "Below": Wren and Ada descend and find a court that speaks their language as it was spoken a thousand years ago.
Single moment: the two sisters from the reference walking down a submerged stone stair into a vast drowned hall, green light filtering from the surface far above, drowned courtiers in ancient robes waiting at the foot of the stair; wide shot, subject in the central third, no action at the frame edge. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s1e3.jpg`: Still, S1 E3 "The Berry Tithe" (take 3, fresh seed)

- Seed: 418306
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x3 "The Berry Tithe": Every servant of the court must eat from the rowan. Wren refuses and the lake begins to rise over the town.
Single moment: a long stone table in a drowned hall lit green from above, a bowl of red rowan berries pushed away by a young woman's hand, courtiers in sodden finery turned toward her; wide shot, subject in the central third, no action at the frame edge. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s1e4.jpg`: Still, S1 E4 "The Queen's Mirror" (take 1)

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x4 "The Queen's Mirror": Ada is chosen as the drowned queen's reflection and starts forgetting the shape of the sun.
Single moment: Ada, the sister in the brown coat from the reference, now in a drowned court gown of tarnished brass, standing before a tall mirror of still black water in a brass frame, her reflection a pale crowned queen who does not match her pose; mid-shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s1e5.jpg`: Still, S1 E5 "Low Water" (take 3, fresh seed)

- Seed: 418308
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x5 "Low Water": A drought on the surface exposes the court's spires, and the shore town comes down with boats and hooks.
Single moment: the lake shrunk to grey mud flats at first light, the court's green-stained spires standing exposed above the low water, rowing boats of townsfolk with lanterns and iron hooks closing on them; wide shot, subject in the central third, no action at the frame edge. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s1e6.jpg`: Still, S1 E6 "One Comes Up" (take 3, fresh seed)

- Seed: 418309
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x6 "One Comes Up": The sisters learn which of them the court intends to keep, and make their own choice instead.
Single moment: the two sisters from the reference face to face on the floor of a drowned throne room, hands clasped between them, an empty brass throne behind them, a single shaft of moonlight falling from the surface far above; mid-shot, subject in the central third, no action at the frame edge. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s2e1.jpg`: Still, S2 E1 "Shore Leave" (take 1)

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x1 "Shore Leave": Wren returns to a town that has aged thirty years in the week she was gone.
Single moment: Wren, the sister in the dark coat from the reference, alone and soaked, walking up the shore road at dawn into a town of weathered, overgrown cottages, an old woman watching her from a lit window; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s2e2.jpg`: Still, S2 E2 "The Drowned Prince" (take 2)

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x2 "The Drowned Prince": A boy from the court walks the shore road in daylight, and the water follows him.
Single moment: a pale boy in sodden antique court clothes walking along the shore road under a heavy storm-dark sky at the end of the day, a thin sheet of lake water creeping over the road behind his footsteps; wide shot, subject in the central third, no action at the frame edge. Take only the look from the reference image, not its objects: leave out its glowing spires, its rowan branch and its foreground water unless this scene names them. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s2e3.jpg`: Still, S2 E3 "Salt" (fix test, fresh seed)

- Seed: 731905
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x3 "Salt": The lake turns to brine overnight and the court's old enemy, the sea, sends an envoy.
Single moment: the lake at night crusted white with salt along its edges, a tall cloaked envoy in barnacled armour standing on the water at its centre, Wren in her dark coat watching from the shore with a lantern; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s2e4.jpg`: Still, S2 E4 "Ada" (take 3, fresh seed)

- Seed: 418407
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x4 "Ada": Ada rules the court as queen, and her first decree is a war on the surface.
Single moment: Ada on a drowned brass throne wearing the brass crown, her face cold, courtiers kneeling before her in green underwater light, one hand raised to give an order; mid-shot, subject in the central third, no action at the frame edge. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s2e5.jpg`: Still, S2 E5 "The Rowan Pact" (take 3, fresh seed)

- Seed: 418408
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x5 "The Rowan Pact": Wren bargains with the sea to break the court's hold, and the price is every memory she has of her sister.
Single moment: Wren in her dark coat knee-deep in a black tide on a rocky sea shore at night, holding out a rowan branch to a shape of foam and dark water rising before her, red berries scattering into the waves; mid-shot, subject in the central third, no action at the frame edge. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### `s2e6.jpg`: Still, S2 E6 "Still Water" (fix test, fresh seed)

- Seed: 268441
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Output: 1376x768, converted to 1180x658
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x6 "Still Water": The lake goes flat and silent for the first time in a thousand years. Something beneath it is listening.
Single moment: the lake perfectly flat and mirror-still at night, a single small rowing boat at its centre with Wren seated in it, the faint green glow of the court far below, a vast dark shape beneath the surface under the boat; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## Runs not kept

### Hero candidate H2, blue hour

- Seed: 77131
- Params: 2K, 16:9, thinking High, png
- Reference: none
- Suffix: HS-1
- Cost: 10 credits

```text
The Drowned Court, a fantasy series. Beneath the lake lies a kingdom that drowned a thousand years ago and never stopped ruling. Two sisters from the shore town are summoned to serve at its court, and only one of them is meant to come back up.
Establishing image of the series' world with its central figure or object held in the middle third of the frame: two young women in wet wool coats standing waist-deep at the lake edge at blue hour, the last cold daylight low behind the far hills, the spires of a sunken court faintly lit green beneath the surface in front of them, a rowan branch floating between them; mid-shot, horizon in the lower third, headroom above, mist and dark water in the outer thirds, nothing essential near the left or right edge, no cropped faces, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### Hero candidate H3, close two-shot (came back pillarboxed)

- Seed: 902457
- Params: 2K, 16:9, thinking High, png
- Reference: none
- Suffix: HS-1
- Cost: 10 credits

```text
The Drowned Court, a fantasy series. Beneath the lake lies a kingdom that drowned a thousand years ago and never stopped ruling. Two sisters from the shore town are summoned to serve at its court, and only one of them is meant to come back up.
Close two-shot held in the middle third of the frame: two young women in wet wool coats, waist-deep in black water at night, seen in three-quarter profile, their faces lit from below by green light rising from the spires of a sunken court just beneath the surface, a rowan branch floating between them; chest-up, eyes lowered to the water, headroom above, darkness in the outer thirds, nothing essential near the left or right edge, no cropped faces, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### Hero candidate H4, wide

- Seed: 265519
- Params: 2K, 16:9, thinking High, png
- Reference: none
- Suffix: HS-1
- Cost: 10 credits

```text
The Drowned Court, a fantasy series. Beneath the lake lies a kingdom that drowned a thousand years ago and never stopped ruling. Two sisters from the shore town are summoned to serve at its court, and only one of them is meant to come back up.
Wide establishing image of the series' world: a vast still lake at night, the towers and spires of a drowned court glowing faint green beneath the surface across the middle of the frame, two small figures in wool coats waist-deep at the near shore in the centre, a rowan branch floating beside them; horizon in the upper third over low black hills, fog on the water in the outer thirds, nothing essential near the left or right edge, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S1 E2 take 1: copied the hero's foreground spires

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x2 "Below": Wren and Ada descend and find a court that speaks their language as it was spoken a thousand years ago.
Single moment: the two sisters from the reference walking down a submerged stone stair into a vast drowned hall, green light filtering from the surface far above, drowned courtiers in ancient robes waiting at the foot of the stair; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S1 E3 take 1: copied the hero's foreground spires

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x3 "The Berry Tithe": Every servant of the court must eat from the rowan. Wren refuses and the lake begins to rise over the town.
Single moment: a long stone table in a drowned hall lit green from above, a bowl of red rowan berries pushed away by a young woman's hand, courtiers in sodden finery turned toward her; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S1 E5 take 1: letterboxed and copied the spires

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x5 "Low Water": A drought on the surface exposes the court's spires, and the shore town comes down with boats and hooks.
Single moment: the lake shrunk to grey mud flats at first light, the court's green-stained spires standing exposed above the low water, rowing boats of townsfolk with lanterns and iron hooks closing on them; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S1 E6 take 1: copied the hero's foreground spires

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x6 "One Comes Up": The sisters learn which of them the court intends to keep, and make their own choice instead.
Single moment: the two sisters from the reference face to face on the floor of a drowned throne room, hands clasped between them, an empty brass throne behind them, a single shaft of moonlight falling from the surface far above; mid-shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S2 E2 take 1: daylight-bright and copied the spires

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x2 "The Drowned Prince": A boy from the court walks the shore road in daylight, and the water follows him.
Single moment: a pale boy in sodden antique court clothes walking along the shore road under a heavy grey sky, a thin sheet of lake water creeping over the road behind his footsteps; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S2 E3 take 1: copied the hero's foreground spires

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x3 "Salt": The lake turns to brine overnight and the court's old enemy, the sea, sends an envoy.
Single moment: the lake at night crusted white with salt along its edges, a tall cloaked envoy in barnacled armour standing on the water at its centre, Wren in her dark coat watching from the shore with a lantern; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S2 E4 take 1: copied the hero's foreground spires

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x4 "Ada": Ada rules the court as queen, and her first decree is a war on the surface.
Single moment: Ada on a drowned brass throne wearing the brass crown, her face cold, courtiers kneeling before her in green underwater light, one hand raised to give an order; mid-shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S2 E5 take 1: copied the hero's foreground spires

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x5 "The Rowan Pact": Wren bargains with the sea to break the court's hold, and the price is every memory she has of her sister.
Single moment: Wren in her dark coat knee-deep in a black tide on a rocky sea shore at night, holding out a rowan branch to a shape of foam and dark water rising before her, red berries scattering into the waves; mid-shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S2 E6 take 1: copied the hero's foreground spires

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x6 "Still Water": The lake goes flat and silent for the first time in a thousand years. Something beneath it is listening.
Single moment: the lake perfectly flat and mirror-still at night, a single small rowing boat at its centre with Wren seated in it, the faint green glow of the court far below, a vast dark shape beneath the surface under the boat; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S1 E5 take 2: the "take only the look" line did not stop the spire copies

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 1x5 "Low Water": A drought on the surface exposes the court's spires, and the shore town comes down with boats and hooks.
Single moment: the lake shrunk to grey mud flats at first light, the court's green-stained spires standing exposed above the low water, rowing boats of townsfolk with lanterns and iron hooks closing on them; wide shot, subject in the central third, no action at the frame edge. Take only the look from the reference image, not its objects: leave out its glowing spires, its rowan branch and its foreground water unless this scene names them. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S2 E3 take 2: the "take only the look" line did not stop the spire copies

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x3 "Salt": The lake turns to brine overnight and the court's old enemy, the sea, sends an envoy.
Single moment: the lake at night crusted white with salt along its edges, a tall cloaked envoy in barnacled armour standing on the water at its centre, Wren in her dark coat watching from the shore with a lantern; wide shot, subject in the central third, no action at the frame edge. Take only the look from the reference image, not its objects: leave out its glowing spires, its rowan branch and its foreground water unless this scene names them. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S2 E5 take 2: the "take only the look" line did not stop the spire copies

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: `hero.jpg` (the locked hero H1, full frame, as the Weave asset of run `c58c1ff6`)
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x5 "The Rowan Pact": Wren bargains with the sea to break the court's hold, and the price is every memory she has of her sister.
Single moment: Wren in her dark coat knee-deep in a black tide on a rocky sea shore at night, holding out a rowan branch to a shape of foam and dark water rising before her, red berries scattering into the waves; mid-shot, subject in the central third, no action at the frame edge. Take only the look from the reference image, not its objects: leave out its glowing spires, its rowan branch and its foreground water unless this scene names them. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S2 E3 fix test, cropped reference: clean, but the fresh-seed take matched the hero's grade better

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: H1 cropped to its top 640 px (above the spires): `.scratch/style-lock/reference/hero-h1-crop.jpg` on branch `prototype/style-lock`
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x3 "Salt": The lake turns to brine overnight and the court's old enemy, the sea, sends an envoy.
Single moment: the lake at night crusted white with salt along its edges, a tall cloaked envoy in barnacled armour standing on the water at its centre, Wren in her dark coat watching from the shore with a lantern; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

### S2 E6 fix test, cropped reference: clean, but the fresh-seed take matched the hero's grade better

- Seed: 418203
- Params: 1K, 16:9, thinking Minimal, png
- Reference: H1 cropped to its top 640 px (above the spires): `.scratch/style-lock/reference/hero-h1-crop.jpg` on branch `prototype/style-lock`
- Suffix: HS-1
- Cost: 7 credits

```text
Same series, same world, same lens and grade as the reference image. New scene for episode 2x6 "Still Water": The lake goes flat and silent for the first time in a thousand years. Something beneath it is listening.
Single moment: the lake perfectly flat and mirror-still at night, a single small rowing boat at its centre with Wren seated in it, the faint green glow of the court far below, a vast dark shape beneath the surface under the boat; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```
