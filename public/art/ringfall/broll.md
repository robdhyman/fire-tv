# Ringfall: b-roll prompt

B-roll prototype for #36. Runway Gen-4 Turbo (`rw_4_video`, via Figma Weave), image to video, 5 s, ratio 1280:720, seed 36001, 30 Weave credits, rendered in about 25 s. Output 1280x720 H.264, no audio, 1.4 MB. Generated 2026-11-04 (UTC).

First frame: the placeholder hero `../art-12.jpg` (Rob, 4 Nov: hero art stays the placeholders, and every clip starts from the placeholder that is the hero shot), cropped full width to 16:9 at artFocus 50% 35%, 1536x864 from y = 370.

```
Very slow push-in over five seconds, locked horizon, no camera shake, no cut, no zoom burst. The ringed craft overhead turns slowly on its axis, a glint of sunlight travels along its rim, thin clouds drift behind it, the astronaut's suit fabric shifts slightly. The astronaut holds still; nothing enters or leaves the frame; lighting and colour unchanged from the first frame; no text.
```

Flaws: a blue dome that isn't in the first frame grows on top of the craft from about 2 s; the craft drifts down and overlaps the astronaut's helmet by 5 s, so the push-in reads as the craft moving rather than the camera.

Kept beside `broll.mp4` rather than in a `prompts.md`, because Batch art (#34) writes this show's `prompts.md`.
