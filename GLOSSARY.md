# Glossary

Vocabulary for the NBCU FireTV rebuild. Use these terms in tickets, code, the style guide and the benchmarks doc.

## Brand

One of the two network skins the app can wear: **SYFY** (yellow accent, condensed display face) or **USA** (red accent, wide geometric display face). A brand changes logo, accent, display face and nothing structural. Not "theme" in the light/dark sense; the app is always dark.

## Catalogue

The invented set of shows, seasons and episodes that stands in for NBCU IP, paired with the placeholder art. One file, the only source of show data in the app.

## Show

A series in the catalogue: title, logline, hero art, tile art, one or more seasons. Not "title" (ambiguous with the show's name) and not "program".

## Movie

A catalogue entry with key art and a logline and no seasons. Every movie in the catalogue is coming soon: it has a detail page but nothing to play.

## Coming Soon

The Home row of movies, and the badge on their tiles.

## Episode

One entry in a season, labelled on screen as `E<n> <name>` and in copy as `S<season> E<n>`.

## Logline

The one-to-two-line premise shown under a show's title on the hero and the show page.

## Hero

The full-width featured panel at the top of Home and the full-bleed header of a show page: art, title, logline. On Home the heroes form a strip that slides sideways; the centre panel is full size and its neighbours peek in, smaller and dimmed. "Billboard" is Netflix's word; avoid it here except in the benchmarks doc.

## Row

A horizontal strip of tiles with a label (`up next`, `recently added`, a show's name on the watchlist, a season on the show page). "Rail" and "shelf" are synonyms other services use; avoid.

## Tile

One item in a row: episode still or show key art with a label and optional badge.

## Badge

The small corner tag on a tile: `new`, `expiring` or `coming soon`.

## Dwell

Focus resting on a tile without moving for about a second. A dwell on an episode tile reveals the tile overlay.

## Tile overlay

What a dwell reveals on an episode tile: `info`, `play` and `add` buttons and the episode's synopsis. `info` opens the show page, `play` the Player, `add` toggles the show in the watchlist.

## Watch position

How far into an episode the viewer has got, remembered per episode across visits. The Player saves it; zero for an episode never started or finished (reaching the credits finishes it, and Up Next moves on to the next episode).

## Progress stroke

The 2px white line along the bottom edge of an episode tile whose width, as a fraction of the tile, is the watch position as a fraction of the runtime. Absent when the watch position is zero.

## Focus

The single item that the D-pad currently points at. Focus is spatial: arrow keys move it between neighbours; Enter selects it; Back leaves the screen. The mouse does not move focus; only the keyboard and the remote overlay do. Distinct from browser focus-visible styling, which is how focus is drawn.

## D-pad

The directional pad of a Fire TV remote (up, down, left, right, select). In the browser demo, the arrow keys and Enter.

## Back

The remote's back button; Esc or Backspace in the browser. Reverses the last navigation, including any shared-element morph.

## Remote overlay

The summonable on-screen Fire TV remote that reviewers can show and hide on desktop and TV. Hidden on phone and tablet.

## Nav sounds

The short synthesised sounds the app makes as focus moves: a tick on each move, a pop on select, a lower pop on Back, and a bump on an **edge bump** (a move with no neighbour in that direction). On by default.

## Sound toggle

The chip beside the remote overlay's chip that mutes and unmutes the nav sounds. Remembered between visits.

## Up Next

The row of episodes the viewer is mid-way through or due to watch next, on Home and at the top of the Watchlist. Also the 15-second next-episode countdown card at the end of playback.

## Watchlist

The screen listing shows the viewer has added (the `+` on a hero or show page), one row per show plus Up Next.

## Nav

The top bar: logo, `shows`, `watchlist` and `search` on the left; a gear and the account avatar flush right. The gear and the avatar both open Tools. On a show page the nav is shown while focus is on the `+` and hidden while focus is below it.

## Tools

The settings screen: language options, sign out, reload, about, terms, FAQs, contact, captions, audio description, nav sounds. The original's name; not "settings". Reached from the gear and the avatar in the nav.

## Player

The playback screen: full-bleed picture, title overlay, timeline with elapsed and total time, captions icon, credits ticker, Up Next countdown.

## Timeline

The thin progress line on the Player with the elapsed time on the left and the total on the right. Not "scrubber" (that is the handle) and not "progress bar".

## Stage

The fixed 1920x1080 canvas the app is laid out on, scaled to fit the window and letterboxed in black. Every layout number in the screens is a 1080p pixel from the source screenshots.

## Lane

A horizontal band of focusables at about the same height (a nav bar, a row of tiles, a grid row). Up and Down move focus to the nearest lane, then to the item in it nearest in x.

## Device class

One of the three contexts the benchmarks doc compares: **connected TV** (Fire TV, Roku, Apple TV, smart TV), **desktop** (web in a browser) and **mobile** (phone and tablet apps). Also the three layouts of the rebuilt app, picked by window width: **phone** below 768px, **tablet** from 768px to 1279px, **TV** (the stage) from 1280px up (ADR 003). Phone and tablet share one touch layout; tablet widens the tiles and adds columns.

## Tab bar

The bottom bar of five destinations (home, shows, watchlist, search, tools) on phone and tablet, in place of the TV's top nav. Hidden on the Player.

## Rail

On phone and tablet, a row rendered as a horizontally swipeable strip with scroll-snap. The same row data as on TV; only the interaction differs. Elsewhere, keep saying "row".

## Placeholder art

The 14 Unsplash photos used in place of show IP, the art the app shipped with. Being replaced by generated art.

## Generated art

Images made by an image model for the catalogue: one hero per show, one still per episode, one poster per movie, all in one house style so a show's stills read as one series. The prompts live in the repo beside the art.

## Still

The image on an episode tile. One generated still per episode.

## B-roll

A short generated video clip of a show, meant one day to play on the hero after a dwell. The app does not play video yet.

## Morph

The shared-element transition from Home's hero to a show page: the hero art opens out to full bleed and the title flies to its place on the show page while the nav holds and the season row rises. Back plays it in reverse. Its timings are the `morph` tokens in `src/motion/tokens.ts`.
