# Desktop

[Index](/docs/benchmarks) · [Connected TV](/docs/benchmarks/connected-tv) · [Desktop](/docs/benchmarks/desktop) · [Mobile](/docs/benchmarks/mobile) · [Best practices](/docs/benchmarks/best-practices)

Apple TV+ (tv.apple.com and the Mac app), HBO Max and Netflix in a desktop browser. In the rebuilt app this is the browser demo, where mouse hover moves focus and the arrow keys stand in for the D-pad. Researched 2 Nov 2026. Full sources: [Apple TV+](/docs/research/benchmark-apple-tv), [HBO Max](/docs/research/benchmark-hbo-max), [Netflix](/docs/research/benchmark-netflix).

Desktop is the least documented device class for Apple TV+: Apple publishes the Mac app guide and resolution limits for the web, but **not** the web player chrome, keyboard shortcuts or hover behaviour on tv.apple.com.

## Verdicts at a glance

| Criterion | Take from | Verdict |
|---|---|---|
| Home and hero | HBO Max | A visible Autoplay Previews switch; all three autoplay a hero, which we do not copy. |
| Browse rows and hover | Apple TV+ | Hover reveals Play and More; Netflix's fan-out menu causes mis-presses. |
| Show page | Netflix (with a fix) | Season dropdown works; do not list season 1 first by default. |
| Player | Netflix | The only fully documented keyboard set. |
| Lists | HBO Max | One three-dot menu with Add to My List. |
| Search | Netflix | Instant results; language browsing. |
| Captions and accessibility | HBO Max | In-app caption style plus full keyboard navigation. |
| Motion | none | Nothing specified for desktop; hover-grow is the shared idiom. |

## Home and hero

- **Apple TV+:** sidebar on Mac and Windows with the search field inside it; the same featured hero with a Next button; the same rows plus Shared with You.
- **HBO Max:** hero plus rows; a Browse menu upper left holds Home and Categories; Settings has an Autoplay Previews toggle.
- **Netflix:** full-width hero that autoplays a clip; top navigation with a My List link.

**Verdict:** the layouts are one structure on all three. Only HBO Max documents a desktop switch for previews in Settings; take that, and keep our hero still by default.

## Browse rows and hover

- **Apple TV+:** "Hovering over a Continue Watching thumbnail reveals a Play button that resumes where you left off"; hovering any thumbnail shows More (Add or Remove from Watchlist, Share). Tiles scale on hover; otherwise standard macOS.
- **HBO Max:** hovering shows a three-dot menu with "+ Add to My List"; previews and hover-expand cards (secondary).
- **Netflix:** hovering for about 1–2 s opens a card with a preview, match percentage, genres, play, add to list and thumbs. The thumbs control fans out three options on hover, and one critic hit Dislike by accident (secondary).

**Verdict:** Apple's reveal-on-hover is the lightest match for our model, where hover is just focus. Avoid a control that fans out under one focus target.

## Show page

- **Apple TV+:** same structure as the TV page, driven by pointer.
- **HBO Max:** same structure, pointer-driven; no G3 page description in the help centre.
- **Netflix:** a title opens as an overlay with a season dropdown. A 2023 critique notes season 1 lists first when viewers often want the latest.

**Verdict:** an overlay with a season dropdown is a fair desktop pattern; open on the season of the Up Next episode.

## Player

- **Apple TV+:** pointer reveals controls; Skip Back and Forward 10 s; click or drag the timeline; Subtitles and Audio Options lower right; picture-in-picture upper left. Space pauses; Ctrl-Cmd-F is full screen (Mac). The web player gives 4K HDR only in Safari on Mac and up to 1080p in Chrome, Firefox and Edge. Chrome and shortcuts for the web player are undocumented.
- **HBO Max:** hover shows controls; 10 s skip icons and arrow keys; a drop-down arrow lists similar titles while playing. Skip Intro and the 15 s Up Next behave as on TV; X dismisses the countdown.
- **Netflix:** hover controls and a complete shortcut list: Space/Enter play-pause, F full screen, Esc, Left/Right 10 s, Up/Down volume, M mute, S skip intro. Playback speed 0.5x–1.5x (not on the ad plan in a browser). "Are you still watching?" follows three episodes with no control used.

**Verdict:** Netflix's shortcut set is the only complete one; map the arrow keys to the D-pad first, and treat S for Skip Intro as an optional extra.

## Lists

- **Apple TV+:** hover More, then Add or Remove from Watchlist.
- **HBO Max:** three-dot menu on tiles; My Stuff holds Continue Watching and My List.
- **Netflix:** "Add to My List" in the hover card; "Remove From Row" on hover for Continue Watching; a Viewing Activity page to hide titles.

**Verdict:** a single menu entry per action on hover; our `+` on the hero and show page stays the primary path.

## Search

- **Apple TV+:** search field in the sidebar; type and Return.
- **HBO Max:** search field with type-ahead; results can match an episode title as well as series, genre and people.
- **Netflix:** a search box in the top bar with instant results, plus "Browse by Languages".

**Verdict:** type-ahead is standard on desktop; the open item is a TV-shaped search that still works with the arrow keys alone.

## Captions and accessibility

- **Apple TV+:** Mac app Settings has Automatic Subtitles (When Muted, On Skip Back); styles come from macOS. Full keyboard operation; macOS VoiceOver.
- **HBO Max:** the same Audio and Subtitles picker; an in-app Subtitle Style (font, colour, size, opacity) that does not sync between devices. Full keyboard navigation (Tab, arrows, Space, Enter, Esc); NVDA, JAWS and VoiceOver are supported.
- **Netflix:** four steps to a track; appearance (font, size, shadow, background) is set under Account, Profiles, Subtitle appearance. Keyboard shortcuts; JAWS, NVDA and ChromeVox.

**Verdict:** desktop is where in-app caption styling is standard. Store ours per profile, not per device, which is HBO Max's documented weakness.

## Motion

- **Apple TV+:** hover scale on tiles; otherwise standard macOS. No web-specific motion documentation.
- **HBO Max:** hover-expand cards and previews; no public spec.
- **Netflix:** the hover card grows in place after a delay; delay timing is not published by Netflix (a critique measured about 2 s).

**Verdict:** no source specifies desktop motion. Reuse the TV focus animation for hover, and respect `prefers-reduced-motion`.
