# Hand-off: Home hero becomes a sliding carousel again (Rob's review, 2 Nov)

For a fresh session. Repo `robdhyman/fire-tv`, branch from `main` (at `e03f21d` or later). Live: https://robdhyman.github.io/fire-tv/. Tickets [#9 motion](https://github.com/robdhyman/fire-tv/issues/9) and [#10 remote](https://github.com/robdhyman/fire-tv/issues/10) stay open until Rob approves; map is [#1](https://github.com/robdhyman/fire-tv/issues/1).

## Rob's feedback (verbatim)

> The central hero tile should be slightly larger than all others.
> The tiles should actually move when I navigate left/right Between Ringfall and Ember Hollow as well as all the other hero shows.
> There should be a white boarder around the focused hero!!

## What it means

1. **Slide, not crossfade.** This reverses the "hero changes by crossfade with slow Ken Burns rather than a slide" direction from #9. Left/Right on the hero moves the whole strip of hero panels sideways on a spring (the 2017 recording at t04.50 shows the shape, `docs/motion/before/t04.50.jpg`), with the neighbours' edges peeking at both screen edges. A press mid-slide retargets, never queues. Keep it for every hero show, not just the first two.
2. **Centre panel slightly larger.** The current panel sits at the hero rectangle (x 117, y 130, 1686x672 on the stage); neighbours are smaller (start at about 0.92 scale, dimmed to 40%) and grow as they slide into the centre. Add the neighbour scale as a token.
3. **White border on the focused hero.** Added in PR #21 and live now (white 3px ring on the focus spring, `HERO_RING` in `src/components/Hero.tsx`). Rob reviewed #20, before it landed. Keep it on the centre panel while it slides, and confirm it is clearly visible on the live site; if it still reads as missing, make it the same weight as the tile ring.

## Where things are

- `src/components/Hero.tsx`: today one panel; art is the full-bleed image clipped to the hero rectangle (`HERO_CLIP`) so the morph to the show page is the clip opening up; copy crossfades in an `AnimatePresence`; Ken Burns on the art; peeks are 92px slivers. The focusable is the hero rectangle, `onKey` consumes Left/Right.
- `src/motion/tokens.ts` / `useMotion.ts`: every spring and duration; `spring.strip` (260/32/1) is the sideways spring; reduced motion makes moves instant. ADR `docs/adr/002-motion-tokens-and-stage-morph.md`.
- Morph contract to keep: on Enter, `morph.hero = { showId, kenBurns, title }` with the title box in stage pixels (`stageRect`), and the show page opens its clip from `HERO_CLIP`. When the strip is at rest the centre panel is exactly the hero rectangle, so the morph still starts there; if Enter lands mid-slide, measure the live panel box instead of assuming `HERO_CLIP`. Back plays it in reverse (`morphIn` in Hero).
- Ken Burns: decide whether it survives on the centre panel only; reduced motion turns it off either way.
- Checks: `npm run build && npm run preview`, then `node scripts/motion-frames.mjs http://localhost:4173/fire-tv` (17 checks; also `--reduced` and `--size=1280x720`). Update the `1-hero-crossfade` strip and its checks for the slide; add one for "neighbour is smaller than the centre" and "strip moved by one panel pitch".
- Stage is keyboard-only (`pointer-events: none`); only the remote overlay takes the mouse.

## Done looks like

PR to `main` with the sliding, centre-larger hero and the ring, verified by keyboard at 1920x1080, 1280x720 and with reduced motion; Rob merges or approves the merge; then update `.scratch/motion/handoff-review.md` and put the approval to Rob. On approval: resolution comments on #9 (final tokens and before/after) and #10 (trigger: corner button + R, starts hidden, hidden under 768px; buttons: D-pad ring, Select, Back, Home, Menu, Rewind, Play/Pause, Fast-forward, wired as keydowns, lit by physical keys; placement: bottom-right, draggable; form: classic), close both, and append one line per ticket to "Decisions so far" in #1's body (edit the existing body with `gh issue edit 1 --body-file`, don't replace the rest). Commit messages end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Merging to `main` needs Rob's go-ahead.

## Rob's standing rules (verbatim)

- When work is finished, end with "Done. Next: <step>". Decide small leftovers (formats, defaults, wording) yourself, record them, and mention them in one clause at most. Never end by listing undecided items or asking whether to ask.
- If a decision is genuinely Rob's, put it in an AskUserQuestion form immediately: recommended option first, evidence and alternatives beside each option. This applies in every session, whatever the brief's scope.
- A brief written for another session carries the rules above verbatim, including the consent rule below.
- A hand-off or note for Rob is written inside the repo (`.scratch/<feature>/handoff-<slug>.md`), linked in the message, and sent with SendUserFile. Never only in a folder outside the repo.
- Consent before monitoring. Before asking Rob to install, enable, or keep running any software that records his activity (window titles, keystrokes, screen, browser history, location, audio, files, time tracking, analytics on his own use), stop and put it to him in an AskUserQuestion form that states in plain words: what it records, where the data is stored, who can read it, when it runs, and how to remove it. Do this before the install step, never after, and never as a line inside a longer guide. This holds in every session and every brief, with no expiry.
