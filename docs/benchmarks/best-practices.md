# Best practices for a FireTV app

[Index](/docs/benchmarks) · [Connected TV](/docs/benchmarks/connected-tv) · [Desktop](/docs/benchmarks/desktop) · [Mobile](/docs/benchmarks/mobile) · [Best practices](/docs/benchmarks/best-practices)

Ten recommendations, grouped by criterion, plus two supporting rules. Each states the rule, then the finding it rests on, with the service and the section of its research page: [Apple TV+](/docs/research/benchmark-apple-tv), [HBO Max](/docs/research/benchmark-hbo-max), [Netflix](/docs/research/benchmark-netflix). Where a number is ours rather than a service's, it says so. Researched 2 Nov 2026; nothing here was tested on a device.

## Home and hero

**1. Keep the hero still by default.** Show still art; start a muted preview only after a longer dwell, and give Tools a switch that is stored per profile. *Rests on:* Apple TV+ autoplays hero video with sound after about one second of focus and offers no way to remove it, the most criticised decision in four years of coverage (Apple research, "Home and hero": MacRumors 2022, 9to5Mac 2023). HBO Max's 2025 audio previews are its most criticised change, and TechRadar's reviewer found them "distracting" (HBO Max research, "Home and hero"). Netflix added an opt-out in 2020 after backlash and turns previews off under VoiceOver (Netflix research, "Browse rows, focus scaling and auto-preview"; "Accessibility").

**2. Put navigation in a persistent top bar and make Back return focus to it.** One press from anywhere on Home. *Rests on:* Netflix's May 2025 redesign moved Search and My List from the left to an always-visible top bar and sends Back from Home to the bar (Netflix research, "Home and hero"). Apple's sidebar needs "multiple" presses or swipes on generic remotes, a Fire TV case (Apple research, "Home and hero"). HBO Max's left menu that expands on focus is the alternative and is also viable; its focus visuals are undocumented (HBO Max research, "Open questions").

## Browse rows and focus

**3. Model focus as one path, restore it on return, and make the focused tile grow in place.** Exactly one tile is focused; initial focus is top-left; Back restores the last focus; focus never vanishes or doubles; arrow keys move to the nearest neighbour; the tile grows about 10 percent, lifts and glows while neighbours stay put and no row reflows; the title and logline show only on focus; animation speeds up when keys repeat. *Rests on:* Netflix's TV focus write-up ("If focus gets in a bad state ... the user will think the app has frozen") and its restore-on-return rule (Netflix research, "Browse rows, focus scaling and auto-preview"). Apple's published growth of 9 percent for 16:9 tiles and 14 percent for posters, neighbours that "don't move", poster titles hidden until focus, and animation that speeds up with swipe speed (Apple research, "Rows, tiles and focus"; "Motion and transition idiom"). Use a flat scale-and-glow rather than imitating Apple's parallax, because Apple warns an approximation "similar but slightly off" distracts. Our 200 ms focus timing is our own: no service publishes one.

## Show page

**4. Keep `+` on the hero and the show page, and open on the season of the Up Next episode.** The show page follows Apple's structure: full-bleed art, Play, an add toggle that becomes a tick, a season selector above the episode row, and AD, CC and SDH badges. *Rests on:* Apple's page structure and badges (Apple research, "Show page and season/episode model"). Netflix's "Add to My List" needs a scroll down on TV and lists season 1 first on desktop, both listed as things to avoid (Netflix research, "Title page and episode model"; "Worth avoiding"). *Undocumented:* the season selector's control type (Apple), the whole G3 series page (HBO Max) and the TV episode-list layout (Netflix), so the episode-row design needs a hands-on pass.

## Player

**5. Scrub with the D-pad using Apple's model, and keep a 10-second skip.** Left and right skip 10 s; holding cycles 2x, 3x, 4x; pausing then pressing left or right walks the timeline with a thumbnail; Select commits and Back cancels to the original position; Up reveals controls. Keep one chrome across device classes with a thin timeline and remaining time at lower right. *Rests on:* Apple's transport model and scrub behaviour (Apple research, "Player chrome and scrubbing"). HBO Max's single player chrome across device classes and its lack of a 10 s skip on TV, listed as a thing to avoid (HBO Max research, "Player chrome and scrubbing"; "Worth avoiding" 2). Netflix never shipped playback speed or brightness to TV (Netflix research, "Worth avoiding" 5). Thumbnails on Fire TV and HBO Max's exact fast-forward multipliers are *undocumented*.

**6. Offer Skip Intro, Skip Recap and the Up Next card on the rule "only when needed, one press".** Skip buttons sit bottom right as focusable buttons, appear only while the controls are hidden, hide after 10 s and return on any key. The Up Next card shrinks the video rather than covering it, counts down 15 s visibly, and Back dismisses it, after which nothing autoplays until the episode ends; offer "Watch Credits"; after three episodes or 90 minutes ask "Are you still watching?". *Rests on:* Netflix's Skip Intro rule (appear only when needed, one click; Netflix research, "Player chrome, 10 s skip, Skip Intro, post-play") and its three-episode and 90-minute gate. HBO Max's documented 10 s auto-hide and 15 s countdown dismissed with Back (HBO Max research, "Skip intro, skip credits, Up Next"). Apple's contextual actions shown only while the transport bar is hidden and its content proposal over a shrunken video (Apple research, "Skip intro/credits and next-episode countdown"). The 15 s figure is HBO Max's, not Apple's or Netflix's: neither publishes theirs, so it needs checking in a user session.

## Lists

**7. Put one Up Next row first under the hero, and keep Watchlist a separate screen.** Up Next holds started episodes and the next episode of a series in progress; expire items after 90 days; long-press on a focused tile adds to or removes from the Watchlist, with no sub-menu. *Rests on:* HBO Max's Continue Watching rule ("the next episode in a series that you're watching", 90-day expiry) and its 1-second long-press (HBO Max research, "Continue Watching and My List"). Apple's split into two rows with overlapping membership and a hero that pushed Up Next off the screen are both on its avoid list (Apple research, "Worth avoiding"; Six Colors 2022). Netflix's test that put Continue Watching third is an open question (Netflix research, "Open questions"). The 90 days is HBO Max's number, adopted without testing.

## Search

**8. Show categories and recent searches before any typing, and accept Alexa voice.** Keep text entry minimal. *Rests on:* Apple's browsable categories before typing, natural-language queries and its HIG line "People typically don't want to do a lot of typing in tvOS ... provide popular and context-specific search suggestions, including recent searches" (Apple research, "Search and on-screen keyboard"). Alexa "find" on Fire TV (HBO Max research, "Search and on-screen keyboard") and Alexa among the voice assistants Netflix supports (Netflix research, same section). *Undocumented* for all three: the on-screen keyboard layout on Fire TV.

## Captions and accessibility

**9. Build the accessibility settings into Tools, stored per profile.** Include text size, a high-contrast focus style, reduce motion, caption style, audio description and an automatic-captions toggle (skip back 10 s turns captions on for 30 s, up to three times; mute shows captions). Treat AD as a named, sticky audio track with a badge on the show page, and test VoiceView on Fire TV from the first build. *Rests on:* Apple re-implements these settings inside its app on third-party TVs including Fire TV, and its automatic-subtitle behaviours (Apple research, "Captions, audio description and accessibility"). HBO Max's AD as a named, sticky track and its per-device, non-syncing caption styles, listed as a thing to avoid (HBO Max research, "Captions and audio description"; "Worth avoiding" 7). Netflix's release notes show a trail of missing speech on TV controls and name no TV screen reader (Netflix research, "Accessibility"). **Decision recorded:** HBO Max and Apple disagree, since HBO Max defers caption style to Fire OS. A browser app on Silk cannot be shown to read Fire OS caption settings (no source covers this, so this reasoning is ours), so the demo implements them in-app and says in Tools that a native build would defer to the system.

## Motion

**10. Add a reduce-motion setting and gate heavy motion by device class.** Motion is optional; reduce replaces scale and shared-element transitions with fades; unfocused content may dim after inactivity; pre-mount the next screen and treat frames per second and key-to-render latency as metrics. *Rests on:* Apple's HIG ("Make motion optional"; Reduce Motion replaces transitions with fades) (Apple research, "Accessibility"; "Motion and transition idiom"). Netflix's 2023 "Reduce animation effects" setting, performance classes that gate effects and pre-mounted screens (Netflix research, "Motion and transition idiom"). HBO Max has no public motion specification (HBO Max research, "Motion and transition idiom"). *Open:* which Fire TV generations keep the heavier motion; Netflix's own bar is unpublished.

## Supporting rules

**11. Use Apple's layout numbers as the TV starting point.** At 1920 x 1080: safe inset 60 pt top and bottom and 80 pt at the sides, a 40 pt gap between tiles, body text 29 pt and nothing smaller than 23 pt, and controls at least 56 pt. *Rests on:* Apple HIG Layout, Typography and Accessibility (Apple research, "Rows, tiles and focus"). The side inset is 80 pt in the HIG and 90 pt in WWDC19 session 211; we pick 80 for the style guide.

**12. Store settings per profile, not per device.** Preview, caption and motion choices follow the viewer. *Rests on:* HBO Max's preview and caption settings are set "for each TV device you stream on" and do not sync, which viewers must repeat on every TV (HBO Max research, "Home and hero"; "Captions and audio description"; "Worth avoiding" 7).

## Where the research is silent

Collected from the three research pages' open questions. These need a hands-on session on a Fire TV Stick, not more reading.

- Focus visuals and the on-screen keyboard on HBO Max; the G3 season selector and series page.
- Apple and Netflix publish no skip-intro timings or next-episode countdown lengths; our 15 s is HBO Max's figure.
- How VoiceView on Fire TV announces our tile labels and badges.
- Whether Up Next belongs at the top of Home for every viewer, or only once an episode has been started.
- Which Fire TV generations count as the device class that keeps heavier motion.
