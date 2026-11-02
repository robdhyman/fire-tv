# Connected TV

[Index](/docs/benchmarks) · [Connected TV](/docs/benchmarks/connected-tv) · [Desktop](/docs/benchmarks/desktop) · [Mobile](/docs/benchmarks/mobile) · [Best practices](/docs/benchmarks/best-practices)

Apple TV+, HBO Max and Netflix on Fire TV, Roku, Apple TV and smart TVs, the primary device class for the rebuild. Researched 2 Nov 2026. Full sources: [Apple TV+](/docs/research/benchmark-apple-tv), [HBO Max](/docs/research/benchmark-hbo-max), [Netflix](/docs/research/benchmark-netflix). "Undocumented" means no source we could reach describes it.

## Verdicts at a glance

| Criterion | Take from | Verdict |
|---|---|---|
| Home and hero | Netflix | Persistent top bar, Back returns focus to it; avoid Apple's and HBO Max's autoplaying hero with sound. |
| Browse rows and focus | Apple TV+ and Netflix | Apple for how focus looks and moves, Netflix for how focus is modelled. HBO Max is undocumented. |
| Show page | Apple TV+ | Best documented; keep `+` visible, which Netflix buries. |
| Player | Apple TV+, HBO Max, Netflix | Apple's scrub model, HBO Max's 15 s Up Next, Netflix's one-press Skip Intro. |
| Lists | HBO Max | Long-press to add or remove; one Up Next row, not Apple's two. |
| Search | Apple TV+ | Browsable categories before typing; nobody documents a Fire TV keyboard. |
| Captions and accessibility | Apple TV+ | Re-implemented in-app; HBO Max defers to the OS, Netflix leaves gaps. |
| Motion | Apple TV+ | Only service with stated principles; none publishes durations. |

## Home and hero

- **Apple TV+:** left sidebar (Search, Home, Apple TV, Store, Library, channels), opened with Back or a swipe up, and on generic remotes "you may have to press or swipe multiple times". Above the rows sits a featured hero carousel whose video and audio start after about one second of focus; it cannot be hidden. tvOS 18.4 added Play, `+` and `i` to the hero.
- **HBO Max:** scrollable hero over a long personalised stack of rows. Since January 2025 the left utility menu holds Home, Search, My Stuff, Settings, Profiles and the browse lenses (Series, Movies, HBO, Sports, What's New, Categories), and expands when focused. Hero previews with audio arrived on US adult profiles in 2025. Row order is personalised per profile (Whole Page Optimization, 2024).
- **Netflix:** since May 2025 a top bar (Search, Shows, Movies, Games, My Netflix) replaces the left menu on most TVs; devices below an unpublished bar keep the old layout. The focused title's information sits beside its tile, not in a hero at the top. Back from Home moves focus to the top bar. Home is assembled per member; the upper left is the most-seen position.

**Verdict:** Netflix's top bar with Back-to-bar is the pattern that needs one press on a Fire TV remote. Apple's hero is the most-criticised feature in four years of coverage, and HBO Max's is the most-criticised 2025 change. Critics also report Apple's hero pushing Up Next off the screen (Six Colors, 2022), and launch-week critics counted about 30 rows on HBO Max's G2 Home (second-hand), so keep Up Next first and the stack short.

## Browse rows and focus

- **Apple TV+:** one focus at a time; the focused tile "expands slightly", lifts, sways and shines, and neighbours do not move. Published sizes: 16:9 tiles grow about 9 percent, posters about 14 percent. Poster titles appear only on focus. Animation speeds up when the viewer swipes fast, and focusing runs faster than unfocusing for a trail. Press-and-hold opens a menu with Add to Watchlist.
- **HBO Max:** WBD documents no tile scale, outline or alignment. The one documented gesture is a 1-second press on a tile to add or remove it from My List (`*` on Roku). Previews start on focus in the hero only.
- **Netflix:** focus is app state, with one focus path, nearest-neighbour spatial navigation and restore-last-focus on return; "the user will think the app has frozen" if focus is lost. From 2025 the focused tile enlarges in place and plays a preview inside itself, with genre, episodes, rating and duration beneath it. Autoplay previews default on and can be switched off per profile.

**Verdict:** copy Apple's visual behaviour, because it is the only one with numbers, and Netflix's focus model, because it is the only one that says how to avoid losing focus. HBO Max is a gap, not a lesson. The 2025 Netflix tile animation is reported to tax older TVs (secondary source).

## Show page

- **Apple TV+:** full-bleed art; Play, then Add, which becomes a tick; a season selector over a horizontal episode row (described by a user; no Apple page documents the control type); How to Watch, Related, Cast and Crew rows; AD, CC and SDH badges.
- **HBO Max:** the help centre does not describe the series page. A first-generation Fire TV review reported that Episodes lists one season at a time. In 2025 the title-page navigation moved into the left menu, and after 25 seconds idle on a finished title a related title autoplays (secondary source).
- **Netflix:** "Add to My List" is reached by selecting a title and moving down; AD and SDH badges on the details page are read aloud (Oct 2022). The episode-list layout is undocumented.

**Verdict:** Apple's structure is the template. Do not hide `+` below the first screen as Netflix does, and do not autoplay a related title when a show ends. HBO Max's G3 season model and Apple's season control are both undocumented and need a hands-on pass.

## Player

- **Apple TV+:** thin timeline with the title above it. Left/right skips 10 s; holding cycles 2x, 3x, 4x; pausing then swiping scrubs with a thumbnail; Play commits, Back cancels. Skip Intro and Skip Recap are contextual actions at bottom right, shown only while the transport bar is hidden. The next episode is a content proposal over a shrunken video that auto-accepts on a timer; the TV+ countdown length is undocumented.
- **HBO Max:** pause, then left/right walks the timeline; holding steps through up to four speeds; remaining time lower right; **no 10 s skip on TV** (phone and web only). Skip Intro and Skip Recap hide after 10 s and return on any press. The Up Next countdown is 15 s and Back dismisses it, after which the next episode does not play until the current one finishes. No skip-credits control is documented in G3.
- **Netflix:** Up/Down reveals controls with Audio & Subtitles top or bottom; no playback speed on TV. Skip Intro appears "only when needed" with one press (shipped on TV Aug 2017). After an episode, "Watch Credits" is offered; "Are you still watching?" follows three episodes or 90 minutes. The Up Next countdown length is undocumented, and a 10 s skip on TV is unverified in Netflix's own text.

**Verdict:** take Apple's D-pad scrub, HBO Max's 15 s countdown that Back dismisses, and Netflix's skip rule and still-watching gate. HBO Max's missing 10 s skip is something to avoid.

## Lists

- **Apple TV+:** since tvOS 18.1 Continue Watching (in-progress, added, live sports) is separate from Watchlist (added only); both appear on Home. Order rules and when a finished show leaves Continue Watching are undocumented.
- **HBO Max:** Continue Watching and My List are Home rows and also live in My Stuff. Continue Watching includes "the next episode in a series that you're watching" and drops items after 90 days. Remove by long-press (1 s).
- **Netflix:** the 2025 My Netflix hub holds Continue Watching, My List and Remind Me. Remove from Continue Watching via the title page menu. My List is capped at 2,000 titles.

**Verdict:** HBO Max's long-press and next-episode rule fit a D-pad. Avoid Apple's overlapping pair of rows; one Up Next row and a Watchlist screen is the glossary's model.

## Search

- **Apple TV+:** finds by title, cast and genre, offers browsable categories before typing and accepts natural-language queries. The Siri Remote uses a linear keyboard; other remotes get a grid keyboard. Apple's own advice: "People typically don't want to do a lot of typing in tvOS", so offer popular and recent searches.
- **HBO Max:** search icon in the left menu, type-ahead results, Alexa "find" on Fire TV. Keyboard layout undocumented.
- **Netflix:** search icon in the top bar, a category list on the left of the 2025 search screen plus typed search, voice via Alexa and others. A–Z keyboard layout undocumented. On Fire TV, apps must handle the D-pad because media keys may be absent (Amazon).

**Verdict:** Apple's categories-before-typing plus recent searches. No source documents the Fire TV on-screen keyboard for any of the three.

## Captions and accessibility

- **Apple TV+:** on tvOS the options live in system Settings; on Fire TV and other third-party TVs the app re-implements Bold Text, Text Size, high-contrast focus style, Reduce Motion, caption styles, audio description and sign language in its own Settings. Skipping back 10 s turns subtitles on for 30 s, up to three times; muting does the same. Screen reading uses the TV's built-in reader.
- **HBO Max:** "follows the subtitle and caption settings set on your device" (Fire TV: Settings, Accessibility, Closed Caption). In-app Subtitle Style only on "some TV devices". AD is a named audio choice that stays on for other titles. VoiceView works with a Dolby Audio caveat. The App Store listing declares no accessibility features. No text-size or contrast settings are mentioned.
- **Netflix:** Audio & Subtitles in four steps on every device; AD is an audio track with "Audio Description" in its name. TV appearance is under pause, Settings, "Size and Style", with fewer options than web. Netflix names no TV screen reader; release notes show a trail of missing speech on TV controls.

**Verdict:** Apple's in-app set is the most complete. HBO Max and Netflix show the cost of deferring: gaps and per-device settings. Whether a web app on Silk can read Fire OS caption settings is not covered by any source (see [best practices](/docs/benchmarks/best-practices), recommendation 9).

## Motion

- **Apple TV+:** "Embrace the tvOS focus system"; parallax is "almost unnoticeable"; unfocused content dims after inactivity; Reduce Motion stops autoplay and auto-scroll; "Make motion optional". The Home-to-show-page transition is not described by Apple.
- **HBO Max:** no public motion specification. Documented: hero carousel scroll, left menu expanding on focus, previews starting on dwell.
- **Netflix:** whole-scene transitions since 2013, gated by device performance class; the 2023 refresh replaced fades with zooms and added "Reduce animation effects" (wording unverified); screens are pre-mounted for perceived speed; the 2025 tile animation is "snappier and more fluid".

**Verdict:** Apple for principles, Netflix for the setting and the performance-class gate. None publishes durations, so our 200 ms focus scale and 15 s Up Next are our own choices.
