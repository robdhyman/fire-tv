# Ringfall: generated art prompts

Batch art for issue #34, in the house style locked by The Drowned Court (#33): HS-1 with this show's palette (void black, gunmetal grey, rust brown and frost white) and accent (pale violet ring-light), still template v2, a seed per file (show code × 1000 + 1 for the hero, + 2 for the key art, + season × 10 + episode for each still).

The hero was generated fresh from text with its subject right of centre (Rob, 3 Nov) and is the reference image for the key art and every still. It is not wired into the catalogue: hero art stays the Unsplash placeholder (Rob, 4 Nov, on #36), and the generated art is episodic only. The stills are each episode's `still` in `src/data/catalogue.json`.

The b-roll clip beside these files (`broll.mp4`, #36) starts from the placeholder hero; its prompt is in [broll.md](broll.md).

Model: fal-ai/nano-banana-2 (Nano Banana 2.1, via Figma Weave). House-style suffix HS-1. Generated 2026-11-04 (UTC). Machine-readable copy: [../prompts.json](../prompts.json).

## hero.jpg

Seed 11001, 16:9 at 2K, thinking High, no reference image.

```
Ringfall, a sci-fi series. Two hundred years after the first colony ships left Earth, a salvage pilot on a dead moon finds a ring that was never supposed to exist. Every government in the system wants her silent before she can say where it points.
Establishing image of the series' world with its central figure held right of centre, between 45% and 75% of the frame width: a lone salvage pilot in a battered pressure suit standing on the grey dust of a dead moon beside the nose of her small salvage ship, looking up at a vast thin ring of pale violet light hanging in the black sky above her; wide shot, horizon in the lower third, headroom above; the left 40% of the frame only black sky and grey moon dust with no figures and no detail, nothing essential near the right edge, no cropped faces, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## key-art.jpg

Seed 11002, 2:3 at 2K, thinking High, reference image `hero.jpg`.

```
Ringfall, a sci-fi series. Two hundred years after the first colony ships left Earth, a salvage pilot on a dead moon finds a ring that was never supposed to exist. Every government in the system wants her silent before she can say where it points.
Key art, vertical: a woman salvage pilot in a scuffed pressure suit seen from the chest up, helmet under her arm, looking up, the thin arc of a vast violet-lit ring reflected in her eyes, lit from one side by the ring's glow; the lower two-thirds carry the image and the scene itself continues upward and falls away into darkness in the top third, with no hard edge, no band and no detail, no signage and no writing anywhere in the frame. Full-frame 2:3, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x1.jpg

Seed 11011, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x1 "Salvage Rights": Ines Varga tows a derelict hauler off Callisto and finds a passenger who has been dead for two centuries.
Single moment: inside the dark hold of a derelict cargo hauler, a woman in a pressure suit with a helmet lamp finding a frosted sleeper pod with a desiccated figure inside; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x2.jpg

Seed 11012, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x2 "The Quiet Ring": The hauler's log points to a structure in orbit around Uranus that no chart has ever shown.
Single moment: a woman pilot in a cramped cockpit lit by a dark navigation display showing only a faint ring of light, the pale blue curve of Uranus through the canopy; mid shot, no readable text on any display, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x3.jpg

Seed 11013, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x3 "Tariff": A Belt union inspector boards the salvage ship and discovers the cargo is worth more than the ship.
Single moment: a uniformed union inspector in a grey coat standing in a salvage ship's cargo bay before an open crate glowing faintly from inside, the pilot watching from a gantry above; mid-wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x4.jpg

Seed 11014, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x4 "Burn": A Martian frigate matches course. Ines has nine hours of fuel and one lie left.
Single moment: a small salvage ship firing its engine against the black, a sleek grey warship sliding into view behind it; wide shot, deep space, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x5.jpg

Seed 11015, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x5 "Protocol Seven": Earth's intelligence service wakes a sleeper on Ceres whose only job is to make the ring go away.
Single moment: a man in an ordinary worker's jacket waking in a narrow bunk in a dim rock-hewn habitat, a sealed metal case on the shelf above him; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x6.jpg

Seed 11016, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x6 "Perihelion": The ring opens for the first time in two hundred years, with three navies watching.
Single moment: a vast ring in space with its centre beginning to glow pale violet, three distant clusters of warship lights holding station around it; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x1.jpg

Seed 11021, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x1 "Other Side": The crew wakes on the far side of the ring under a star that has no name.
Single moment: three crew in pressure suits at a ship's viewport looking out at a single unfamiliar amber star in an empty sky; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x2.jpg

Seed 11022, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x2 "Dead Reckoning": With no charts and failing water, the ship follows a signal that answers in their own voices.
Single moment: a woman in a sweat-stained flight suit holding a near-empty water bottle in a dim cockpit, one hand on her headset, listening; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x3.jpg

Seed 11023, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x3 "The Colony": A settlement of the lost first fleet is still here, and it has been expecting them.
Single moment: a small salvage ship landed on a barren plain beside a settlement of old patched colony domes with their lights on, figures waiting in the open; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x4.jpg

Seed 11024, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x4 "Founders' Day": The colony's governor offers Ines a seat at the table. The price is her ship.
Single moment: a long table in a colony dome hall under old lamps, an older governor in a faded uniform reaching a hand across it to a woman pilot; mid-wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x5.jpg

Seed 11025, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x5 "Escape Velocity": Mars sends a second expedition through, and the colony closes its gates.
Single moment: massive colony dome blast doors grinding shut at dusk, a second ship's landing lights descending through the haze beyond; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x6.jpg

Seed 11026, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x6 "Homeward": Ines carries the colony's only message back to a solar system that has already declared war.
Single moment: a small salvage ship emerging alone from a glowing violet ring, distant flashes of battle near a planet beyond; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-3x1.jpg

Seed 11031, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 3x1 "Blockade": Earth and Mars seal the ring. The Belt decides it is tired of asking permission.
Single moment: a line of grey warships strung across the face of a vast ring, small battered mining ships gathering in the foreground with their lamps lit; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-3x2.jpg

Seed 11032, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 3x2 "The Lantern": A second ring lights up near Neptune and the balance of power tips in a day.
Single moment: a second ring of pale violet light igniting near the deep blue curve of Neptune, a tiny observation ship in the foreground; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-3x3.jpg

Seed 11033, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 3x3 "Chain of Command": A mutiny aboard the Martian flagship puts Ines in a room with the admiral who hunted her.
Single moment: a stark metal stateroom aboard a warship, a grey-haired admiral seated at a bare table across from a woman pilot standing with her arms crossed, guards at the door; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-3x4.jpg

Seed 11034, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 3x4 "Tidal": The rings begin to move, and the orbits of three moons move with them.
Single moment: three small moons hanging out of line in the black sky above a cratered surface, a ring tilted overhead, a lone figure in a pressure suit watching; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-3x5.jpg

Seed 11035, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 3x5 "What the Ring Wants": The colony governor returns with an offer that would end the war and the human species' independence with it.
Single moment: a colony governor in a long coat standing on a ship's ramp in violet ring-light, holding out a small dark object to a woman pilot; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-3x6.jpg

Seed 11036, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 3x6 "Ringfall": Ines makes the one choice every navy agreed she would never be allowed to make.
Single moment: a woman pilot alone in her cockpit with her hand on a single lever, a ring filling the whole canopy with pale violet light; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of void black, gunmetal grey, rust brown and frost white with a single accent of pale violet ring-light, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```
