# Feedback: generated art prompts

Batch art for issue #34, in the house style locked by The Drowned Court (#33): HS-1 with this show's palette (cathode grey, nicotine beige, dust blue and tube white) and accent (signal green), still template v2, a seed per file (show code × 1000 + 1 for the hero, + 2 for the key art, + season × 10 + episode for each still).

The hero was generated fresh from text with its subject right of centre (Rob, 3 Nov) and is the reference image for the key art and every still. It is not wired into the catalogue: hero art stays the Unsplash placeholder (Rob, 4 Nov, on #36), and the generated art is episodic only. The stills are each episode's `still` in `src/data/catalogue.json`.

Model: fal-ai/nano-banana-2 (Nano Banana 2.1, via Figma Weave). House-style suffix HS-1. Generated 2026-11-04 (UTC). Machine-readable copy: [../prompts.json](../prompts.json).

## hero.jpg

Seed 13001, 16:9 at 2K, thinking High, no reference image.

```
Feedback, a horror anthology series. An anthology of hauntings that travel through the things we plug in. Each season follows one signal from the first flicker to the last person left watching.
Establishing image of the series' world with its central figure held right of centre, between 45% and 75% of the frame width: a woman alone at night in a dark archive room, seated before an old flatbed scanner whose raised lid glows pale green from within, dark shelves of old radios and photograph boxes around her; mid shot, desk line in the lower third, headroom above; the left 40% of the frame only darkness and dim shelving with no figures and no detail, nothing essential near the right edge, no cropped faces, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## key-art.jpg

Seed 13002, 2:3 at 2K, thinking High, reference image `hero.jpg`.

```
Feedback, a horror anthology series. An anthology of hauntings that travel through the things we plug in. Each season follows one signal from the first flicker to the last person left watching.
Key art, vertical: a woman seen from the chest up, eyes lowered, her face lit pale green from below by the glass of a flatbed scanner, a faint second face visible in the glass beneath her; the lower two-thirds carry the image and the scene itself continues upward and falls away into darkness in the top third, with no hard edge, no band and no detail, no signage and no writing anywhere in the frame. Full-frame 2:3, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x1.jpg

Seed 13011, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x1 "Scan": A library archivist digitising old family photos finds a face in the scanner bed that is not in the print.
Single moment: a woman archivist lifting the lid of a flatbed scanner in a dim library workroom, a faint pale face pressed against the glass from beneath where there is no photo; close mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x2.jpg

Seed 13012, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x2 "300 DPI": Every copy of the scan is different, and every copy is closer.
Single moment: a long worktable covered in rows of identical photo prints, each showing a faint figure standing a little nearer than in the last, a woman's hand spreading them out; mid shot, overhead lamp, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x3.jpg

Seed 13013, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x3 "The Negative": The archivist traces the photo to a 1970s portrait studio whose clients all died within a year of sitting.
Single moment: a dusty 1970s portrait studio with a painted backdrop, a stool and an old large-format camera on a tripod, a woman with a flashlight standing in the doorway; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x4.jpg

Seed 13014, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x4 "Flatbed": The scanner starts running on its own, and the output tray is never empty in the morning.
Single moment: a scanner on a desk in a dark office running by itself, its pale green light sweeping, the output tray overflowing with prints spilling face down onto the floor; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x5.jpg

Seed 13015, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x5 "Exposure": A security guard who watched the footage of the archive wakes with a stranger's mouth.
Single moment: a night security guard in uniform sitting bolt upright in bed, his hand raised to his mouth in horror, lit by a bathroom light; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-1x6.jpg

Seed 13016, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 1x6 "Last Copy": The archivist destroys every scan but one, and keeps it where no one would look: her own face.
Single moment: a woman in a dark room holding a single photograph up beside her own face, the face in the print identical to hers; close mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x1.jpg

Seed 13021, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x1 "Dial Tone": A late-night radio host takes a call from a listener who died on air in 1983.
Single moment: a woman radio host in headphones leaning into a microphone in a small dim studio at night, a small plain red bulb glowing above the door, listening; mid shot, no text on any equipment, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x2.jpg

Seed 13022, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x2 "Dead Air": The station's transmitter starts broadcasting a show that is not on the schedule.
Single moment: a tall radio transmitter mast on a hill at night with its warning lights blinking, a small station hut glowing pale green below; wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x3.jpg

Seed 13023, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x3 "Call-In": Listeners across the county report the same voice telling them to leave their doors open.
Single moment: a quiet suburban street at night with every front door standing open and warm light spilling onto the lawns; wide shot, no house numbers, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x4.jpg

Seed 13024, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x4 "Frequency": An engineer isolates the signal and finds it is coming from the host's own apartment.
Single moment: an engineer in a cardigan crouched over an oscilloscope and a tangle of cables in a cramped apartment, an old radio on the shelf above him glowing; mid shot, no readable text on any screen, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x5.jpg

Seed 13025, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x5 "Request Hour": The caller asks for one song, and every radio in the county plays it at once.
Single moment: a dark farmhouse kitchen with an old radio glowing on the counter, and through the window the lights of neighbouring houses each with a radio lit in its window; mid-wide shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

## still-2x6.jpg

Seed 13026, 16:9 at 1K, thinking Minimal, reference image `hero.jpg`.

```
Use the reference image only for colour grade, film grain, lens and lighting; reproduce none of its objects, figures or layout. New scene from the same series, episode 2x6 "Sign-Off": The host reads the final sign-off from a script she did not write, in a voice that is not hers.
Single moment: a woman radio host at the microphone reading from blank sheets of paper with glazed eyes, her shadow on the studio wall the wrong shape; mid shot, subject in the central third, no action at the frame edge, no signage and no writing anywhere in the frame. Full-frame 16:9, no black bars.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of cathode grey, nicotine beige, dust blue and tube white with a single accent of signal green, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```
