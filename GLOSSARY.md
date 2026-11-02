# Glossary

Vocabulary for the NBCU FireTV rebuild. Use these terms in tickets, code, the style guide and the benchmarks doc.

## Brand

One of the two network skins the app can wear: **SYFY** (yellow accent, condensed display face) or **USA** (red accent, wide geometric display face). A brand changes logo, accent, display face and nothing structural. Not "theme" in the light/dark sense; the app is always dark.

## Catalogue

The invented set of shows, seasons and episodes that stands in for NBCU IP, paired with the placeholder art. One file, the only source of show data in the app.

## Show

A series in the catalogue: title, logline, hero art, tile art, one or more seasons. Not "title" (ambiguous with the show's name) and not "program".

## Episode

One entry in a season, labelled on screen as `E<n> <name>` and in copy as `S<season> E<n>`.

## Logline

The one-to-two-line premise shown under a show's title on the hero and the show page.

## Hero

The full-width featured panel at the top of Home and the full-bleed header of a show page: art, title, logline. "Billboard" is Netflix's word; avoid it here except in the benchmarks doc.

## Row

A horizontal strip of tiles with a label (`up next`, `recently added`, a show's name on the watchlist, a season on the show page). "Rail" and "shelf" are synonyms other services use; avoid.

## Tile

One item in a row: episode still or show key art with a label and optional badge.

## Badge

The small corner tag on a tile: `new` or `expiring`.

## Focus

The single item that the D-pad currently points at. Focus is spatial: arrow keys move it between neighbours; Enter selects it; Back leaves the screen. Mouse hover moves focus too. Distinct from browser focus-visible styling, which is how focus is drawn.

## D-pad

The directional pad of a Fire TV remote (up, down, left, right, select). In the browser demo, the arrow keys and Enter.

## Back

The remote's back button; Esc or Backspace in the browser. Reverses the last navigation, including any shared-element morph.

## Remote overlay

The summonable on-screen Fire TV remote that reviewers can show and hide on desktop and TV. Hidden on phone and tablet.

## Up Next

The row of episodes the viewer is mid-way through or due to watch next, on Home and at the top of the Watchlist. Also the 15-second next-episode countdown card at the end of playback.

## Watchlist

The screen listing shows the viewer has added (the `+` on a hero or show page), one row per show plus Up Next.

## Tools

The settings screen: language options, sign out, reload, about, terms, FAQs, contact, captions, audio description. The original's name; not "settings".

## Player

The playback screen: full-bleed picture, title overlay, timeline with elapsed and total time, captions icon, credits ticker, Up Next countdown.

## Timeline

The thin progress line on the Player with the elapsed time on the left and the total on the right. Not "scrubber" (that is the handle) and not "progress bar".

## Stage

The fixed 1920x1080 canvas the app is laid out on, scaled to fit the window and letterboxed in black. Every layout number in the screens is a 1080p pixel from the source screenshots.

## Lane

A horizontal band of focusables at about the same height (a nav bar, a row of tiles, a grid row). Up and Down move focus to the nearest lane, then to the item in it nearest in x.

## Device class

One of the three contexts the benchmarks doc compares: **connected TV** (Fire TV, Roku, Apple TV, smart TV), **desktop** (web in a browser) and **mobile** (phone and tablet apps). Also the three layouts of the rebuilt app: TV, tablet, phone.

## Placeholder art

The 14 Unsplash photos used in place of show IP. Each show's hero and tile art come from this set.
