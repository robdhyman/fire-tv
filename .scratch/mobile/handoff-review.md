# Mobile and tablet layout: review note for Rob (issue 13, PR #24)

PR: https://github.com/robdhyman/fire-tv/pull/24 (branch `claude/gracious-varahamihira-b1cc9e`, built on main at the style-guide merge). Once merged and Pages is green, open **https://robdhyman.github.io/fire-tv/** on your phone. Until then, screenshots are in `docs/screens/mobile/` on the branch.

## Breakpoints

| class | width | what you get |
|---|---|---|
| phone | under 768px | touch document, bottom tab bar, portrait hero |
| tablet | 768 to 1279px | same layout; 16:9 hero, wider tiles, 3 to 4 grid columns, two-column show page and Tools |
| TV | 1280px and up | the keyboard-only 1920x1080 stage, exactly as before |

A touch-only screen wider than 1279px (iPad Pro landscape) gets the tablet layout, since the stage ignores touch. Add `?device=phone` to any URL to force a class on the desktop.

## Per-screen reflow rules

- **Home**: the hero is a strip of full-width panels you swipe, 3:4 crop on a phone with the page colour fading up, 16:9 on a tablet; title, logline (3 lines), play / resume and + watchlist over it; dots under it; logo top-left. Rows become rails: 16:9 tiles about two-thirds of the width (under a third on a tablet), scroll-snap, label under the tile, badge in the corner.
- **Shows**: lowercase screen title with the brand mark at the right (the 2017 nav's wording); tabs shows / movies / editor's choice; key-art grid 2 columns on a phone, 3 on a tablet, 4 from 1024px.
- **Show page**: 4:5 header (21:9 on a tablet) with a back button; title, logline, play S*n* E*n* (or resume, where Up Next left off) and + watchlist; season tabs stick to the top as the episode list scrolls; episodes as rows of still + E*n* title, length, two lines of synopsis (two columns on a tablet).
- **Player**: 16:9 picture letterboxed in portrait, full height in landscape. Tap the picture for the chrome: back, show and episode title, captions; skip back 10s, play/pause, skip forward 10s; a timeline you drag to scrub (time bubble while dragging), elapsed and total under it. Chrome hides 3s after the last touch while playing and stays while paused. In the credits the roll plays and the Up Next card rises with the 15s ring, play now and back to show. Same 20x simulation as TV.
- **Watchlist**: Up Next rail, then a rail per saved show; the + on a show page manages it (no manage hint on touch).
- **Tools**: a settings list: captions (switch, font size segmented, colour swatches, sample), audio description (switch, language), brand (segmented), then the menu rows; a row's note opens under it. Two columns on a tablet.
- **Search**: a search field over the same grid.
- **Everywhere**: no on-screen remote, no arrow-key hint, no focus engine. Screens fade in on arrival; tiles and buttons shrink slightly on press; reduced motion takes the same path as TV.

## What to try on the phone

1. Home: swipe the hero left and right; tap the art to open a show; tap play.
2. Scroll the rails sideways; tap an Up Next tile to play it.
3. On a show page scroll down and watch the season tabs stick; switch seasons; tap + to toggle the watchlist and check it on the Watchlist tab.
4. Player: tap to show and hide the chrome; skip 10s; drag the timeline to the end and let the Up Next card count down (or tap play now / back to show). Rotate the phone for a full-height picture.
5. Tools: flip the brand to USA and look at Home again; turn captions on and open the Player.
6. On the desktop at full width, confirm the TV stage still behaves as before (arrows, Enter, Esc, R for the remote).

## Decided along the way

- Breakpoints are Tailwind's `md` (768) and `xl` (1280), so the mobile screens use only those two prefixes.
- Tap feedback is 0.97 scale on the `focusIn` spring; mobile captions render at half the TV size; the touch skip is 10s and the D-pad scrub stays five minutes.
- The prototype skill's "several variants" step was skipped: the design was settled from the benchmarks in the ticket, and three days did not allow seven screens three times over. Your review on the phone is the human check.
- No iOS Simulator is installed on this Mac, so the phone checks were Chrome's device emulation in the in-app browser plus `scripts/mobile-screens.mjs` (iPhone 13 and iPad). The real-phone check is yours.

## After approval

Resolution comment on #13 with the breakpoints, rules and the phone and tablet screenshots; close it; one line in #1's "Decisions so far".
