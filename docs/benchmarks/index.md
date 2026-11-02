# Streaming benchmarks

[Index](/docs/benchmarks) · [Connected TV](/docs/benchmarks/connected-tv) · [Desktop](/docs/benchmarks/desktop) · [Mobile](/docs/benchmarks/mobile) · [Best practices](/docs/benchmarks/best-practices)

How Apple TV+, HBO Max and Netflix behave on connected TV, desktop and mobile, and what that means for the FireTV app. This is a rebuild of an earlier benchmarking exercise whose original document did not survive; it is compiled from published sources, not from memory.

## Method

- **Date of evaluation:** researched and compiled on 2 Nov 2026. Each service's current generation is the one described unless a claim is tagged with an older one (HBO Max has three: G1 HBO Max 2020–23, G2 Max 2023–25, G3 HBO Max from 9 Jul 2025; Apple TV has three too, ending with the tvOS 26 redesign of Sept 2025; Netflix's TV layout changed in May 2025).
- **Sources:** primary first. Apple Human Interface Guidelines and developer documentation, Apple support guides; the WBD help centre and press releases; Netflix's Tech Blog, Help Centre and about.netflix.com. Trade press and critiques fill gaps and are marked as secondary. The three research pages hold every link and quote.
- **Eight criteria, the same for every service and device class:** home and hero, browse rows and focus, show page, player, lists, search, captions and accessibility, motion.
- **Verdicts** are written for a FireTV app. A verdict names what to take, not which service is "best".
- **What this is not:** no one handled a device for this document. Behaviour that no source describes is marked **undocumented** or **unverified** and left open rather than smoothed over. The open questions on each research page are the list of what a hands-on session on a Fire TV Stick should check.
- **Vocabulary** follows the project [GLOSSARY.md](https://github.com/robdhyman/fire-tv/blob/main/GLOSSARY.md): hero, row, tile, focus, Up Next. "Billboard" appears only inside Netflix quotes.

## The three services

| Service | Positioning in this document | Notable naming |
|---|---|---|
| Apple TV+ | The reference for focus behaviour and for the player on a remote with few buttons. Best documented, because Apple publishes its design rules. | Renamed Apple TV on 13 Oct 2025. Its "Up Next" queue became Continue Watching and a separate Watchlist in 2024. |
| HBO Max | The reference for a single player chrome across device classes and for the 15-second Up Next countdown. Weakest on documented focus and motion. | Max from 2023 to Jul 2025, HBO Max again since. |
| Netflix | The reference for the focus model, Skip Intro and the 2025 TV navigation. Strongest engineering write-ups. | Netflix's "billboard" is our hero. |

## The three device classes

| Device class | Covers | What it means for the rebuilt app |
|---|---|---|
| Connected TV | Fire TV, Roku, Apple TV, smart TVs; D-pad or clickpad remote, voice | The primary target: the TV layout. |
| Desktop | Web in a browser, plus the Mac app for Apple TV+; pointer and keyboard | The browser demo, where hover moves focus and the arrow keys are the D-pad. |
| Mobile | iPhone, iPad and Android apps; touch | The phone and tablet layouts of the same app. |

## Pages

- [Connected TV](/docs/benchmarks/connected-tv): the three services compared on the eight criteria.
- [Desktop](/docs/benchmarks/desktop)
- [Mobile](/docs/benchmarks/mobile)
- [Best practices for a FireTV app](/docs/benchmarks/best-practices): ten numbered recommendations plus two supporting rules, each with its source finding.

## Research pages

The comparison pages summarise these three, which carry the full sourced findings, a "worth copying / worth avoiding" list and open questions for each service.

- [Apple TV+ research](/docs/research/benchmark-apple-tv) (issue [#5](https://github.com/robdhyman/fire-tv/issues/5))
- [HBO Max research](/docs/research/benchmark-hbo-max) (issue [#6](https://github.com/robdhyman/fire-tv/issues/6))
- [Netflix research](/docs/research/benchmark-netflix) (issue [#7](https://github.com/robdhyman/fire-tv/issues/7))

## Where the three services agree

- All three keep information architecture the same across device classes and change input: D-pad focus on TV, hover on desktop, touch on mobile.
- All three offer Skip Intro, an automatic next episode, and a captions-and-audio picker inside the player.
- All three personalise row order, and all three have been criticised for autoplaying previews, Apple and HBO Max for sound on dwell, Netflix until it added an opt-out.
- None publishes focus or transition timings in milliseconds.
