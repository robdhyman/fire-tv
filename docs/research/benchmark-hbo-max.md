# Benchmark: HBO Max on connected TV, desktop and mobile

Resolves [issue 6](https://github.com/robdhyman/fire-tv/issues/6). Researched 2 Nov 2026 against the WBD help centre, WBD press releases and interviews, app-store listings and trade press. Vocabulary follows `GLOSSARY.md` (hero, row, tile, focus, Up Next, device class).

**Generations.** The app has had three names and two platforms, and sources describe different ones:

| Tag | Name | Dates | Platform |
|---|---|---|---|
| G1 | HBO Max | 27 May 2020 to 22 May 2023 | HBO Go/Now codebase, then You.i cross-platform engine on connected TV (2021-22) and a separate web/mobile codebase |
| G2 | Max | 23 May 2023 to 8 Jul 2025 | New single platform merged with Discovery+ ("Beam"), DixonBaxi "Max blue" identity; monochrome logo from 30 Mar 2025 |
| G3 | HBO Max | 9 Jul 2025 onward | Same app, in-place update, HBO black-and-white identity |

Every help-centre page cited below was fetched live under HBO Max branding, so it describes G3 unless noted. Help-centre pages carry no publication date.

## Summary

HBO Max in its current generation is a dark, picture-led app whose structure is almost identical across device classes but whose controls are not. Home is a scrollable hero over a long personalised stack of rows (Continue Watching, My List, Recommended For You, Because You Watched, Brand Spotlight, Top 10, Browse by Genre), with the row order itself personalised since 2024. On connected TV the January 2025 redesign moved browse "lenses" (Home, Series, Movies, HBO, Sports, What's New, Categories) into a left utility rail that expands on focus, Netflix-style; web keeps a top-left Browse menu and mobile a bottom tab bar. The player is the same chrome everywhere: thin timeline, remaining time lower-right, a speech-bubble "Audio and Subtitles" picker, Skip Intro / Skip Recap buttons that auto-hide after 10 s, and a 15-second Up Next countdown that Back dismisses. What differs per device is input: 10-second skip exists only on phone and web; TV scrubs by pausing and holding left/right with up to four fast-forward speeds. Caption style is deferred to the OS on every TV and mobile platform (in-app style editor only on web and "some TVs"). Autoplaying hero previews with audio arrived on TV in 2025 and are the most criticised feature; profile-level toggles exist but are per-TV. Accessibility support is broad on paper (VoiceView, Roku Screen Reader, TalkBack, VoiceOver) but with caveats, and the App Store listing still says the developer has not declared accessibility features.

## Comparison table

| Criterion | Connected TV (Fire TV, Roku, Apple TV) | Desktop web | Mobile (iOS, Android) |
|---|---|---|---|
| Home and hero | Scrollable hero (since G1 Apple TV revamp, 2022); hero carousel plays video previews with audio on US adult profiles since 2025; left rail with Home, Search, My Stuff, Settings, Profiles plus browse lenses (Jan 2025) | Hero plus rows; "Browse" menu upper-left holds Home and Categories; Autoplay Previews toggle in Settings | Hero plus rows; Home icon in tab bar; bell icon for notifications (mobile only); no preview toggle in settings |
| Rows and focus/hover | Horizontal and vertical rails re-ordered per profile ("Whole Page Optimization", all US adult profiles Aug 2024); long-press on a tile adds to or removes from My List; Roku uses `*` for the same | Hover shows a three-dot menu with "+ Add to My List" | Three-dot menu on tiles; same row model |
| Show page, seasons, episodes | Title-page navigation moved into the left utility menu (2025); after 25 s idle on a finished title a related title autoplays; Episodes lists one season's episodes (G1 report) | Same structure, pointer-driven | Same structure, touch-driven |
| Player chrome and scrubbing | Pause, then D-pad left/right walks the timeline; hold left/right or FF/RW for up to 4 speeds; remaining time lower-right; no 10 s skip; Apple TV uses touch-surface swipe (no jog wheel) | Hover shows controls; 10 s skip icons and arrow keys; drop-down arrow to browse similar titles while playing | Tap shows controls; 10 s skip icons; PiP (mobile only) |
| Skip intro/credits, Up Next | Skip Intro and Skip Recap jump to the last second of the segment and hide after 10 s; 15 s Up Next countdown; Back (Apple TV: Menu) dismisses to watch credits; no explicit skip-credits control documented in G3 (G1 had "binge mode") | Same; X dismisses the countdown | Same; X dismisses |
| Continue Watching and My List | Both are Home rows and live in My Stuff; items auto-drop from Continue Watching after 90 days; remove via long-press (1 s) or Roku `*` | Same; remove via three-dot menu | Same; three-dot menu |
| Search and keyboard | Search icon in left rail; type-ahead results; Siri dictation on Apple TV (hold mic); Alexa "find" on Fire TV; no Roku voice documented; keyboard layout undocumented | Search field; type-ahead | Search tab; system keyboard |
| Captions and AD | Speech-bubble "Audio and Subtitles" picker in player; saved on Back; caption style follows OS accessibility settings (Fire TV, Roku, Apple TV, Android TV); in-app Subtitle Style only on "some TVs"; AD via "[Language] - Audio Description", sticky across titles; Roku `*` for accessibility shortcuts | Same picker; in-app Subtitle Style (font, colour, size, opacity) | Same picker; style follows iOS/Android settings |
| Motion and transitions | Left rail expands on focus; hero carousel scrolls; previews start on dwell; no public motion spec found | Hover-expand on cards; previews | Standard native transitions; no public spec |
| Accessibility | VoiceView (Fire TV, with Dolby Audio caveat), Roku Screen Reader, VoiceOver (Apple TV), TalkBack (Android TV); photosensitivity warnings on details and player but not in autoplay previews; no keyboard shortcuts on TV | Full keyboard nav (Tab, arrows, Space, Enter, Esc); NVDA, JAWS, VoiceOver | VoiceOver, TalkBack; App Store accessibility section undeclared |
| What differs | Rail nav, hold-to-scrub, long-press for list actions, per-device preview preference, OS-owned caption style, Who's Watching shown on launch | Browse menu, 10 s skip, in-app caption style, hover menus | Bottom tabs, 10 s skip, PiP, notifications bell, opens straight into last profile |

## Detailed findings

### Home and hero

- Home rows listed by WBD: popular titles, Continue Watching, My List, featured collections, Recommended For You, Because You Watched, Top 10 Series / Top 10 Movies, Channels. Categories page adds a "Brand Spotlight" row (HBO, DC, HGTV, Magnolia) and "Browse by Genre". Browse lenses: Series, Movies, HBO, Sports, What's New. [Getting around the app](https://help.hbomax.com/us-en/Answer/Detail/000002559) (G3).
- G1 Apple TV revamp (Apr 2022) introduced a scrollable hero banner, "binge mode" (skip credits and auto-advance) and My Stuff for editing My List and Continue Watching; built on the You.i engine WarnerMedia bought in Dec 2020. [MacRumors](https://www.macrumors.com/2022/04/07/hbo-max-revamped-apple-tv-app/) (G1).
- G2 launch design brief from CPO Tyler Whitworth: "more of an evolution of HBO Max than a revolution"; content nav at the top of the screen; genre hubs plus brand pages; most of the page "generated using machine learning" with editorial override; every app to be "at least 20% faster". [TechCrunch, 5 May 2023](https://techcrunch.com/2023/05/05/warner-bros-discovery-cto-and-cpo-explain-how-they-made-max-less-buggy/) (G2).
- Launch-week critics counted about 30 rows on Home and found the old hubs demoted to harder-to-find brand portals. [Redef](https://redef.com/item/64714569f37bb81bea6292ed); hubs reached "by scrolling down to the middle of the page" per [Tom's Guide](https://www.tomsguide.com/opinion/max-hands-on-hbo-max-reboot-makes-it-easier-to-find-something-you-like) (G2, snippets).
- "Whole Page Optimization": from Dec 2023, all US adult profiles by Aug 2024, both horizontal and vertical rails are ordered per profile, titles are de-duplicated and suppressed after repeated ignored impressions; success metric is visit-to-playback efficiency. [Cord Cutters News citing Variety](https://cordcuttersnews.com/max-refreshes-homepage-personalization-system-heres-everything-we-know/) (G2).
- Jan 2025 TV redesign: browse lenses moved from the top of the page into the left utility menu that already held Search, My Stuff, Settings and Profiles; new What's New and Categories pages; rolled out to Apple TV, Google TV, Fire TV, Tizen and webOS after a Latin America test; side panel "expands when highlighted". [Yahoo/ComingSoon](https://www.yahoo.com/entertainment/max-user-interface-changes-navigation-221146798.html), [9to5Google](https://9to5google.com/2025/01/30/max-google-tv-redesign/), [Xataka Home](https://www.xatakahome.com/centro-multimedia/max-cambia-nuevo-lavado-cara-su-interfaz-diseno-parecido-a-netflix-que-incluye-nuevas-pestanas-navegacion) (late G2, TV only).
- Hero previews: video previews with audio in the hero carousel arrived early 2025; from June 2025 focusing a title at the top of Home autoplays an AI-nominated, editorially curated "Drop-In Moment" (CTV only, US adult profiles). [TheWrap](https://www.thewrap.com/max-artificial-intelligence-video-preview-clip-suggestions/), [Cord Cutters News](https://cordcuttersnews.com/?p=206022) (late G2). TechRadar's reviewer found audio previews "distracting" and wanted them muted. [TechRadar via Yahoo, 21 Mar 2025](https://tech.yahoo.com/streaming/articles/max-adding-prime-videos-most-193000138.html).
- Preview control: TV Settings > Playback > Autoplay Previews and Preview Audio, set "for each TV device you stream on"; web has the toggle; mobile settings do not. [Settings](https://help.hbomax.com/us-en/Answer/Detail/000002541) (G3).

### Rows, tiles, focus and hover

- No WBD source documents focus scale, outline or alignment on TV; the help centre only says "choose" a tile. Documented focus interactions: press and hold a tile (1 s) to add or remove from My List; Roku uses `*`; web and mobile use a three-dot menu. [My List and Continue Watching](https://help.hbomax.com/us-en/Answer/Detail/000002505) (G3).
- Photosensitivity warnings appear on detail pages and in the player but "autoplay previews on some devices don't include these warnings"; a TV preview is stopped by moving focus left into the global nav. [Accessibility](https://help.hbomax.com/us-en/Answer/Detail/000002553) (G3).

### Show page and season/episode model

- The help centre does not describe the series page. A G1 Fire TV review reported that the Episodes option lists all episodes of one season rather than a season list first, and that skip-intro and skip-to-next buttons appear automatically. [The Streamable](https://thestreamable.com/hbo-max-user-interface-review) (G1, paywalled snippet).
- 2025: navigation tools that sat at the top of a title page moved into the left utility menu; after a title finishes, 25 s of inactivity autoplays a related title; a drop-down arrow in the player opens a similar-titles list. [TechRadar via Yahoo](https://tech.yahoo.com/streaming/articles/max-adding-prime-videos-most-193000138.html) (G2).
- Search matches an "episode title" as well as series, brand, genre, actor and creator. [Getting around the app](https://help.hbomax.com/us-en/Answer/Detail/000002559).

### Player chrome and scrubbing

- Show controls: phone tap, web hover, TV pause. TV scrubbing: "Use the left/right navigation on your remote to move forward/backwards on the progress bar"; hold left/right or FF/RW and "press the same button again (up to 4 times)" for speed; Apple TV holds the touch surface; PlayStation R2/L2. Remaining time lower-right. 10-second skip icons on phone and web only, plus arrow keys on web. Playback speed cannot be adjusted. Ad markers on the timeline on Basic with Ads. [Playback options and controls](https://help.hbomax.com/us-en/Answer/Detail/000002510) (G3).
- Apple TV history: G1 v50.30.0 (Jun 2021) replaced the native tvOS player and lost 15 s edge-tap skip, timeline tap-scrub and Siri subtitle control; reverted within a week. G2 launch shipped a custom player again with swipe-only scrubbing, no "What did they say?", no PiP, and ignored system subtitle style and Reduce Loud Sounds. [9to5Mac 2021](https://9to5mac.com/2021/06/03/latest-hbo-max-app-update-for-tvos-breaks-multiple-key-features-on-apple-tv/), [MacRumors 2021](https://www.macrumors.com/2021/06/09/hbo-max-app-update-apple-tv-native-video-player/), [9to5Mac 2023](https://9to5mac.com/2023/05/23/hbo-max-app-tvos-apple-tv), [AppleInsider 2023](https://appleinsider.com/articles/23/05/23/wbs-rebranded-max-app-launches-has-some-issues-on-apple-tv).
- G1 player replatform ("DMX") used a column-based responsive layout on "Slate", HBO Max's proprietary token-based design system, presented at Figma Config 2022. [Steven Hartwig portfolio](https://stevenhartwig.squarespace.com/video-player) (first-hand, self-published).

### Skip intro, skip credits, Up Next

- Skip Intro and Skip Recap "skip ahead to the last second" of the segment; the button "disappears in 10 seconds" and returns on tap/click/remote press. [Playback options](https://help.hbomax.com/us-en/Answer/Detail/000002510).
- Autoplay Next Episode is on by default: when credits start, "Next Episode" plays immediately or after a 15-second countdown; dismiss with X (phone, web), Menu (Apple TV) or Back (other TV), after which the next episode "won't play until the episode has completely finished". Autoplay Recommended Movies & Series is a separate default-on toggle. [Settings](https://help.hbomax.com/us-en/Answer/Detail/000002541) (G3).
- No G3 skip-credits control is documented; G1's "binge mode" covered it. [MacRumors](https://www.macrumors.com/2022/04/07/hbo-max-revamped-apple-tv-app/).

### Continue Watching and My List

- Continue Watching is automatic, includes "the next episode in a series that you're watching", drops items after 90 days, and appears as a Home row and in My Stuff. My List is most-recent-first and per profile. Removal: long-press 1 s on TV, `*` on Roku, three-dot menu on web and mobile. [My List and Continue Watching](https://help.hbomax.com/us-en/Answer/Detail/000002505) (G3). A regional variant describes an Edit / Clear All flow; not on the US page, unconfirmed.
- Profiles: up to 5; each has its own My List, Continue Watching, language and recommendations. "Who's Watching" appears on launch on TV only when the last profile was an adult; phone and web open straight into the last profile. [Profiles](https://help.hbomax.com/us-en/Answer/Detail/000002539). Kids profiles default to PG / TV-PG with Kid-Proof Exit and a 4-digit code, and browse by character pictures. [Kids](https://help.hbomax.com/us-en/Answer/Detail/000002540).

### Search and on-screen keyboard

- Type-ahead: "As you type, you'll find the most relevant or popular results"; results filtered to the active profile. Voice: Apple TV hold-mic dictation; Fire TV Alexa "open HBO Max", "find", play/pause/resume, FF/RW 30 s (Fire TV with Alexa remote or Echo, select countries). No Roku or Google voice search documented. Keyboard layout (grid vs row) is not documented. [Getting around](https://help.hbomax.com/us-en/Answer/Detail/000002559), [Accessibility](https://help.hbomax.com/us-en/Answer/Detail/000002553) (G3).
- G2 removed the need to type credentials on a TV remote for sign-in. [TechCrunch](https://techcrunch.com/2023/05/05/warner-bros-discovery-cto-and-cpo-explain-how-they-made-max-less-buggy/).

### Captions and audio description

- Toggle in-player via the speech-bubble "Audio and Subtitles" icon; TV saves on Back. "HBO Max follows the subtitle and caption settings set on your device": Fire TV Settings > Accessibility > Closed Caption; Roku Settings > Accessibility > Caption style; Apple TV Subtitles & Captioning > Style; iOS and Android likewise. In-app Subtitle Style (font, colour, size, opacity) only on web and "some TV devices"; styling does not sync between devices. Audio language is remembered. [Subtitles and captions](https://help.hbomax.com/us-en/Answer/Detail/000002515), [Settings](https://help.hbomax.com/us-en/Answer/Detail/000002541) (G3).
- Audio description: choose "[Language] - Audio Description" in the same picker; once on it "plays by default" for other titles; English only; 8,000+ hours; AD badge on the details page; discoverable by searching "DVS" or via Browse by Genre > Audio Description; Roku `*` opens accessibility options during playback. [Audio description / Accessibility](https://help.hbomax.com/us-en/Answer/Detail/000002553) (G3).

### Motion and transition idiom

- No WBD motion spec, design-system article or conference talk for G2/G3 was found. Documented motion: hero carousel scroll, left rail expanding on focus, previews starting on dwell (hero only), and the 10 s auto-hide of skip buttons. Brand motion: DixonBaxi's 2023 identity used a "spotlight" device from the lowercase "a", a logo mnemonic and a three-beat sonic by Zelig; "Max Sans" by F37. [Design Week, 24 Apr 2023](https://www.designweek.co.uk/issues/17-april-21-april-2023/dixonbaxi-max-identity/) (G2). 30 Mar 2025 monochrome logo quietly replaced Max blue; [DesignRush](https://news.designrush.com/max-leans-into-hbo-prestige-updated-monochrome-logo); 9 Jul 2025 rename shipped as an in-place update ("Same app. New-ish name"). [Advanced Television](https://www.advanced-television.com/2025/07/09/hbo-max-re-rebrand-rolls-out) (G3).

### Accessibility

- Screen readers: TalkBack (Android, Android TV), VoiceOver (iPhone, iPad, Apple TV, Screen Curtain supported), Fire TV VoiceView (caveat: "does not support Dolby Audio playback", disable Dolby Audio), Roku Screen Reader, Samsung Voice Guide, Xbox Narrator, PS5; web with NVDA, JAWS, VoiceOver. Web keyboard navigation documented; "keyboard shortcuts are not available" on TV. ASL titles via search. No text-size, high-contrast or colour settings mentioned. [Accessibility](https://help.hbomax.com/us-en/Answer/Detail/000002553) (G3).
- App Store listing (v7.14.0, Oct 2026): "The developer has not yet indicated which accessibility features this app supports." [App Store](https://apps.apple.com/us/app/hbo-max-stream-movies-tv/id1666653815) (G3).

### Device support and what differs

- Fire TV: Fire OS 6+ or Vega OS 1+; Roku: current OS; Apple TV 4K/HD tvOS 16.4+; iOS 16.4+; Android 7.1+; web: latest Chrome, Firefox, Edge, Safari. [Supported devices](https://help.hbomax.com/us-en/Answer/Detail/000002506). 4K and Atmos need the Premium plan; Dolby Vision on Fire TV, Apple TV 4K and listed Rokus. [4K](https://help.hbomax.com/us-en/Answer/Detail/000002523), [Audio](https://help.hbomax.com/us-en/Answer/Detail/000002549) (G3).
- G1 reliability history that drove the rebuilds: the original app crashed on 15 s fast-forward and an exec promised to "replace every single connected TV app" ([Gizmodo via Vulture, 2021](https://gizmodo.com/hbo-max-is-aware-its-app-is-shit-1847484833)); the G2 platform was built from scratch over 12 months with 400+ microservices ([Built In, WBD-supplied](https://builtin.com/articles/engineering-team-creating-whats-next-warner-bros-discovery)).

## Worth copying for a FireTV app

1. One player chrome across device classes with only the input mapping changing: thin timeline, remaining time lower-right, one speech-bubble picker for captions and audio, skip buttons that auto-hide after 10 s and return on any key.
2. 15-second Up Next countdown that Back dismisses, after which autoplay is suppressed until the episode fully ends. Matches the glossary's Up Next card.
3. Continue Watching that includes "the next episode" of a series the viewer is watching, with a 90-day expiry, so the Up Next row stays short and relevant.
4. Long-press on a focused tile as the single TV gesture for add/remove to Watchlist; no sub-menu needed.
5. Defer caption styling to Fire OS Accessibility settings and say so in Tools; HBO Max's "follows the settings set on your device" is the right default for a TV app.
6. A left utility rail that collapses to icons and expands on focus, holding Home, Search, Watchlist, Profile and Tools, with browse lenses as pages rather than a second top bar.
7. Audio description as a sticky audio-track choice plus a badge on the show page and a browsable AD category.
8. Photosensitivity warnings on the show page and in the player, and never autoplay a preview that lacks them.

## Worth avoiding

1. Autoplaying hero previews with audio on dwell. The most criticised 2025 change; the toggle is per-TV, so viewers re-disable it on every device. Default off, or muted static art with an explicit Play Preview action.
2. Dropping the 10-second skip on TV. HBO Max offers it on phone and web but not on the D-pad, leaving only pause-and-hold scrubbing. A D-pad left/right tap should skip a fixed interval.
3. A custom player that ignores platform conventions (Apple TV lost jog-wheel scrubbing and system caption style twice). On Fire TV, honour the Fire OS caption style and the remote's dedicated transport keys.
4. Thirty-plus rows on Home with hubs buried mid-page. Launch critics and WBD's own 2024-25 rework both point to fewer, better-ordered rows and nav that exposes browse pages directly.
5. Autoplaying a related title after 25 s idle at the end of a show. Up Next should offer the next episode only, and stop when the season ends.
6. Shipping without declaring accessibility features (App Store listing) and with screen-reader caveats tied to audio formats (VoiceView vs Dolby Audio).
7. Per-device, non-syncing preferences for previews and caption style. If the demo has settings, store them per profile.

## Open questions

- TV focus visuals (tile scale, outline weight, left-aligned vs centred focus) and the on-screen keyboard layout are not documented by WBD and no reputable teardown with screenshots was reachable (The Streamable paywalled, Mobbin login-gated). Needs a hands-on session on a Fire TV Stick.
- Show page season model in G3: is the season picker a dropdown, tabs or a row, and are episodes a vertical list or a horizontal row? Only a G1 snippet exists.
- Whether scrubbing shows thumbnail previews on Fire TV, and the exact fast-forward multipliers behind "up to 4 times".
- Whether a skip-credits control exists in G3 or only the Up Next card.
- Whether the Jan 2025 left-rail nav and 2025 hero previews shipped unchanged into G3, and whether the 2025 HBO black-and-white palette changed focus or accent colours in the app.
- press.wbd.com returned 403 to automated fetches; the 2023 and 2025 rename releases are cited from search snippets and trade press rather than read in full.
- This turn's web-search budget ran out before Brand New, Variety and Demuxed could be checked for a WBD design or engineering talk on the TV home screen; treat their absence as unverified.
