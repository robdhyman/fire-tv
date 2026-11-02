# Mobile

[Index](/docs/benchmarks) · [Connected TV](/docs/benchmarks/connected-tv) · [Desktop](/docs/benchmarks/desktop) · [Mobile](/docs/benchmarks/mobile) · [Best practices](/docs/benchmarks/best-practices)

Apple TV+, HBO Max and Netflix on iPhone, iPad and Android. In the rebuilt app these are the phone and tablet layouts of the same app. Researched 2 Nov 2026. Full sources: [Apple TV+](/docs/research/benchmark-apple-tv), [HBO Max](/docs/research/benchmark-hbo-max), [Netflix](/docs/research/benchmark-netflix).

## Verdicts at a glance

| Criterion | Take from | Verdict |
|---|---|---|
| Home and hero | Netflix | Bottom bar with four destinations; avoid Apple's Android app that drops Home. |
| Browse rows and tap | Apple TV+ | Tap opens the show page; touch-and-hold opens the same menu as the TV. |
| Show page | Netflix | Large Play and a season selector button. |
| Player | Netflix | Double-tap edges for 10 s; speed, brightness, lock stay mobile-only. |
| Lists | Netflix | A single hub for in-progress, list and reminders. |
| Search | any | A Search tab with the system keyboard; no differences worth copying. |
| Captions and accessibility | Netflix | Defer caption style to the system; Dynamic Type; previews off under a screen reader. |
| Motion | Netflix | Interruptible card expansion; nothing specified by the others. |

## Home and hero

- **Apple TV+:** iPhone has a bottom tab bar (Home, Apple TV, Store, Library, Search); iPad uses a sidebar; **Android has only Apple TV, Downloads and Search tabs, with no Home, Store or Library**. Autoplaying previews extended to lower rows when scrolling pauses (Mar 2026, press report). The iOS 26 tab bar uses Liquid Glass.
- **HBO Max:** hero plus rows; Home icon in the tab bar; a notifications bell exists on mobile only; Settings has no preview toggle on mobile.
- **Netflix:** bottom bar Home, Clips, Search, My Netflix (Apr 2026); swipeable top shortcuts for Shows, Movies, Games, Podcasts, New & Hot and Category; a bell for new arrivals. The 2023 iPhone refresh added an accelerometer-driven parallax hero and gradients drawn from the art (secondary).

**Verdict:** four bottom destinations with a filtered top strip is the pattern to follow. Apple's Android cut-down is the one to avoid: the phone layout must keep the same screens as TV.

## Browse rows and tap

- **Apple TV+:** tap opens the show page; touch-and-hold opens the same menu as on TV (Add to Watchlist); in Library, long-press offers Play, Go to Show and Download.
- **HBO Max:** a three-dot menu on tiles; the same row model as TV.
- **Netflix:** tap opens the title page and the cover expands into details (iOS 2023). An autoplay-previews toggle exists; iPads are unsupported for it.

**Verdict:** touch-and-hold mirrors TV long-press, which keeps one idea across device classes.

## Show page

- **Apple TV+:** same structure as TV, plus a Download button on movies and a per-episode cloud icon on iPhone and iPad.
- **HBO Max:** same structure, touch-driven. No G3 page description in the help centre.
- **Netflix:** full page; Play and Download buttons enlarged (Jan 2022); the season selector became a button (Nov 2021); a My List icon.

**Verdict:** downloads need real video, which the project excludes, so skip them; the large Play and the season selector button are the transferable parts.

## Player

- **Apple TV+:** tap shows controls; 10 s skips; playback speed and Enhance Dialogue on iPhone and iPad only; picture-in-picture; Google Cast on Android.
- **HBO Max:** tap shows controls; 10 s skip icons; picture-in-picture (mobile only). Playback speed cannot be adjusted.
- **Netflix:** tap shows controls; double-tap the edges for ±10 s (2018); speed, brightness, a screen-lock padlock, a Clip button and picture-in-picture. No autoplay on cellular.

**Verdict:** the 10 s edge double-tap is the touch version of the D-pad's left/right skip. Netflix never shipped speed or brightness to TV, and we should not either.

## Lists

- **Apple TV+:** touch-and-hold, then Add or Remove; on Android a setting chooses a still frame or poster art for Continue Watching.
- **HBO Max:** a three-dot menu; My Stuff holds both lists.
- **Netflix:** the My Netflix tab (Jul 2023) holds downloads, likes, list, reminders and in-progress titles, with an Edit mode to delete and sort and filter options (Date Added, A–Z, Release Date; Haven't Started, Started).

**Verdict:** Netflix's hub is the clearest, but our Watchlist screen is its equivalent and needs no extra tabs.

## Search

- **Apple TV+:** a Search tab with the system keyboard. AppleVis reports that VoiceOver in the iOS search tab "just says button".
- **HBO Max:** a Search tab with type-ahead.
- **Netflix:** a Search tab; an opt-in conversational search beta on iOS (2025).

**Verdict:** no differences worth copying. Fix the label problem AppleVis found by naming every search control.

## Captions and accessibility

- **Apple TV+:** on iOS, caption style and AD live in iOS Settings, Accessibility; on Android the app handles them in-app and **no accessibility section is documented**. VoiceOver and TalkBack are supported.
- **HBO Max:** style follows iOS and Android settings; VoiceOver and TalkBack; the App Store accessibility section is undeclared.
- **Netflix:** the same four-step path; iOS defers to system caption settings; Android appearance is per device. Dynamic Type across Home, title and New & Hot; trailer autoplay is turned off when VoiceOver runs; Android exposes rows as headings.

**Verdict:** on a phone the system settings do the work. Netflix's two best moves are previews off under a screen reader and rows exposed as headings.

## Motion

- **Apple TV+:** standard native transitions; a Liquid Glass tab bar on iOS 26.
- **HBO Max:** standard native transitions; no public spec.
- **Netflix:** interruptible card expansion; haptics on launch and profile pick.

**Verdict:** Netflix is the only one that says anything. Make shared-element transitions interruptible, so Back mid-way reverses cleanly, as the glossary's Back entry requires.
