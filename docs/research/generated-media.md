# Generated media: models, costs, prompt templates and a consistency technique

Resolves [#32](https://github.com/robdhyman/fire-tv/issues/32) on map [#25](https://github.com/robdhyman/fire-tv/issues/25). Researched 3 Nov 2026. Part 1 comes from the Figma Weave tools reachable in a Claude Code session here (`weave_list_tools`, `weave_find_model`, `generate_image`), listing and input contracts only; nothing was generated. Part 2 comes from vendor pricing, docs and terms pages fetched the same day; prices are dated and anything a vendor page did not state is marked UNCONFIRMED rather than guessed. Vocabulary follows [GLOSSARY.md](https://github.com/robdhyman/fire-tv/blob/main/GLOSSARY.md): hero, still, poster, b-roll, generated art, placeholder art.

## Summary

- **Image model: Nano Banana 2.1** (`fal-ai/nano-banana-2`, Weave id `bebebed5-50c1-4701-98b3-86929db21585`, ~7 credits per image). It is the only reachable image model that has all four things the batch needs: a seed, up to 14 reference images, every aspect we use (16:9, 2:3) and output up to 4K, and Google states it renders legible text, so the same model can set a poster title when one is wanted.
- **Video model: Runway Gen-4 Turbo** (`rw_4_video`, Weave id `QoZ5Ep88oat556S1tpN0`, ~30 credits per 5 s clip). Cheapest reachable image-to-video with a required first frame, a seed and a 5 s 1280x720 16:9 option, which is exactly the b-roll brief (hero scene, slow camera). Luma Ray 3.2 (~45 credits) is the upgrade when 1080p or a seamless loop is wanted.
- **Consistency technique: style lock, then edit.** Pick one hero per show, record its seed and prompt, and generate every still and the poster as an *edit* of that hero (hero as reference image, same seed, same locked suffix, same aspect and lens language). Section 4.
- **Posters leave the title clear by default.** The app sets the title in the brand's display face (SYFY condensed, USA wide), so burnt-in type would break the brand switch. The in-image variant exists for Coming Soon movies if Rob wants it.
- **Budget**: 13 heroes, 13 posters and 135 stills at ~7 credits each is ~1,130 credits for one pass, ~2,250 with two candidates per still; one b-roll clip is ~30. At the ~$0.01 per credit that Weave's own top-ups imply (section 1.3), the whole batch is in the $10–25 range.

## 1. Models reachable from a Claude Code session here

### 1.1 What the tools expose

- `weave_list_tools` returned no published Weave workflows for this account (`{"tools":[],"totalCount":0}`), so everything below is a raw model reached through `weave_find_model` / `weave_run_model`.
- `weave_find_model` reports a `costEstimate` in Weave credits per run ("approximate"), the model's inputs (text, image, mask, video) and its params (seed, aspect ratio, resolution, duration). No USD figure and no per-pixel or per-second rate is reported by the tool itself.
- `generate_image` (Figma's own tool) writes straight into a Figma file and bills Figma AI credits against that file's plan. Models: `gemini-3.1-flash-lite-image`, `gpt-image-2.5-flare` (default), `gpt-image-2.5-sunburst`, `gemini-3.1-flash-image`. Inputs: prompt, width and height up to 2048 (the model picks the nearest supported size), optional `nodeId` to replace an image fill. No seed, no reference image. Useful for dropping comps into the Figma file, not for the batch.
- Not reachable by name: Midjourney (`weave_find_model` returns "No Weave model matches that name"), Google Imagen (the query falls through to unrelated models), Sora.

### 1.2 Image models

Credits are Weave `costEstimate` values as reported 3 Nov 2026. "Ref" is the number of reference or edit images the contract accepts. Text-in-image is the vendor's own claim where one exists; none of it was tested here.

| Model (Weave label) | Model id | Credits | Seed | Ref images | Aspects | Max output | Text in image |
|---|---|---|---|---|---|---|---|
| **Nano Banana 2.1** | `fal-ai/nano-banana-2/edit` | ~7 | yes | up to 14 | 15 incl. 16:9, 2:3, 21:9, 9:16 | 512, 1K, 2K, 4K; png/jpeg/webp; thinking level | Google: "legible, stylized text" ([image-generation doc](https://aistudio.google.com/docs/image-generation), 3 Nov 2026) |
| Nano Banana Pro | `fal-ai/nano-banana-pro/edit` | ~11 | yes | up to 14 | 11 incl. 16:9, 2:3 | 1K, 2K, 4K | same family |
| Nano Banana 2 Lite | `fal-ai/nano-banana-2-lite/edit` | ~3 | yes | up to 14 | 13 incl. 16:9, 2:3 | 1K only | same family |
| Nano Banana (2.5 Flash) | `fal-ai/nano-banana/edit` | ~3 | no | up to 10 | 11 incl. 16:9, 2:3 | not exposed (1K) | same family; Google deprecates this model 15 Mar 2027 |
| GPT Image 2.5 | `gpt-image-2.5` (Flare / Sunburst) | ~8 | no | up to 16 + mask | fal presets; custom up to 3840 px/side, 3:1 | quality low–max | OpenAI: "can still struggle with precise text placement" ([guide](https://developers.openai.com/api/docs/guides/image-generation), 3 Nov 2026) |
| ChatGPT Images 2.0 | `gpt_image_1` (GPT Image 1.5 / 1.5 Turbo / 2) | ~9 | no | none (Edit variant: 1) | fixed sizes 1024x1024 … 3840x2160 | 3840x2160 | as above |
| Ideogram V4.5 | `ideogram/v4.5` | ~5 | yes | none (Edit variant: 1 + mask) | fal presets only: 16:9 is 1280x720, 4:3 is 1152x864; **no 2:3** | 1280 px long edge | Ideogram: "crisp typography" ([API overview](https://developer.ideogram.ai/ideogram-api/api-overview), 3 Nov 2026) |
| Ideogram V3 | `ig_v3` | ~8 | yes | remix image + 1 style reference | 1:1, 3:4, 9:16, 4:3, 16:9 | not exposed | as above |
| Ideogram V3 Character | `ig_v3_character` | ~15 | yes | character image + reference + mask | 1:1, 3:4, 9:16, 4:3, 16:9 | not exposed | as above |
| flux-3 | `blackforestlabs/flux-3/text-to-image` | ~4 | **no** | up to 10 | 15 incl. 16:9, 2:3 | 768sq, 1K, 2K, 4K | not stated by BFL |
| Flux 2 Pro / Max | `fal-ai/flux-2-pro`, `fal-ai/flux-2-max/edit` | ~5 / ~10 | yes | up to 8 | fal presets (16:9, 4:3, square); no 2:3 | not exposed | not stated |
| Flux Pro 1.1 Ultra | `black-forest-labs/flux-1.1-pro-ultra` | ~7 | yes | 1 (`image_prompt`, Redux, strength 0–1) | 11 incl. 16:9, 2:3, 21:9 | 4 MP (vendor) | not stated |
| Flux Kontext (Dev/Pro/Max) | `flux-kontext` | ~3 | yes | 1 required | match input, 16:9, 2:3, 21:9 … | not exposed | not stated |
| Flux Kontext Multi Image | `flux-kontext-apps/multi-image-kontext-max` | ~10 | yes | 2 required | 14 incl. 16:9, 2:3 | not exposed | not stated |
| Flux Dev LoRA / Flux 2 Dev LoRA | `fal_flux_multilora`, `fal_flux_2_dev_lora` | ~4 | yes | 1 + a LoRA file | 1:1, 4:3, 16:9, 3:4, 9:16 | not exposed | not stated |
| Seedream V5 (4.0 … 5.0 Pro) | `fal-ai/bytedance/seedream/v5/lite/edit` | ~12 | yes | up to 10 | fal presets + auto 2K/3K | 3072x3072 | not stated |
| Seedream V4.5 Edit | `fal-ai/bytedance/seedream/v4.5/edit` | ~4 | yes | up to 14 | fal presets + auto 2K/4K | 4096 | not stated |
| Runway Gen-4 Image | `runwayml/gen4-image` | ~10 | yes | 3, taggable `@name` | 16:9, 9:16, 4:3, 3:4, 1:1, 21:9 | 720p, 1080p | not stated |
| Luma Photon | `luma/photon` | ~2 | yes | image + style + character reference, weighted | 1:1, 3:4, 4:3, 9:16, 16:9, 9:21, 21:9 | not exposed | not stated |
| Mystic (Freepik) | `fp_mystic` | ~12 | "fixed generation" flag | style + structure reference | 13 incl. 16:9, 2:3 | 1K, 2K, 4K | not stated |
| Flux Fast (schnell) | `black-forest-labs/flux-schnell` | ~0.4 | yes | none | 9 incl. 16:9, 2:3 | not exposed | not stated |

Also present and useful after generation: Flux Pro Outpaint (~6, zoom out 1.5x/2x, directional outpaint), Flux Fill Pro (~4, inpaint with mask), Magnific Upscale and Precision Upscale (~18, 2x–16x), Topaz Sharpen (~19), Ideogram Remove Background (~1).

Why Nano Banana 2.1 over the others: flux-3 has no seed; Flux 2 Pro and Ideogram V4.5 cannot make 2:3; GPT Image 2.5 has no seed; Flux Pro 1.1 Ultra takes only one reference and only as a composition hint (strength default 0.1); Seedream V5 is the closest rival (seed, 10 refs, 3K) at ~12 credits and with no vendor claim on text. If a batch of candidates shows Nano Banana's look is wrong for the house style, Seedream V5 is the swap with the same workflow.

### 1.3 What a Weave credit costs

- Weave's standalone plans (weave.figma.com, fetched 3 Nov 2026): Free 150 credits; Starter $24/month billed annually, 1,500 credits; Professional $45/month, 4,000; Max $100/month, 10,000; top-ups "$10 per 1,000 credits" on Starter and "$10 per 1,200" on Pro/Max. That is **$0.01 per credit** (Starter) to **$0.0083** (Pro/Max). [weave.figma.com/pricing](https://weave.figma.com/pricing).
- Figma Design's own AI-credit pool (used by `generate_image`) is separate: Starter 500 credits/month per seat, Professional 3,000, Organization 3,500, Enterprise 4,250, no rollover; in-Design image rates as of 15 Oct 2026 are ChatGPT Images 2.0 2 credits, Nano Banana 2 Lite 6, Nano Banana 8, Nano Banana 2 16 per image, which differ from the Weave `costEstimate` figures above. USD per Figma AI credit is only shown in the admin "Add credits" flow: UNCONFIRMED. [help.figma.com 33459875669015](https://help.figma.com/hc/en-us/articles/33459875669015), [figma.com/pricing](https://www.figma.com/pricing/), both 3 Nov 2026.
- `whoami` shows this account on a Pro-tier team ("hevy") and a Starter team ("Workshop"); which pool `weave_run_model` draws from, and its balance, is not reported by the tools: UNCONFIRMED until the first run.
- Licence: Figma's AI terms (effective 30 Oct 2026) say the customer retains all right, title and interest in Input and Output, but add that they "do not apply to the Figma Weave platform when used as a standalone product". The standalone Weave terms were not fetched: UNCONFIRMED. [figma.com/legal/ai-terms](https://www.figma.com/legal/ai-terms/), 3 Nov 2026.

### 1.4 Video models

| Model (Weave label) | Model id | Credits | Seed | First frame | Last frame / refs | Durations | Resolution and aspect | Audio |
|---|---|---|---|---|---|---|---|---|
| **Runway Gen-4 Turbo** | `rw_4_video` | ~30 | yes | **required** | no | 5, 10 s | 1280:720, 720:1280, 1104:832, 832:1104, 960:960, 1584:672 | no |
| Runway Gen-4 | `rw_4_video_original` | ~70 | yes | required | no | 2–10 s | same ratios | no |
| Runway Gen-4.5 | `rw_4_5_video_original` | ~70 | yes | required | no | 5, 8, 10 s | 1280:720 … 960:960 | no |
| Runway Gen-3 Turbo | `rw_video` | ~30 | yes | required | last frame | 5, 10 s | 1280:768, 768:1280 | no |
| Kling Video (2.5 Turbo Pro / 2.6 Pro) | `kling` | ~35 | no | optional | no | 5, 10 s | 16:9, 9:16, 1:1 (default 1:1) | no |
| Kling First & Last Frame (O1 Pro / Std / 2.5 Turbo Pro) | `kling` | ~55 | no | required | last frame, negative prompt | 5, 10 s | follows image | no |
| Kling 3 (3.0 Pro / Std) | `kling` | ~82 | no | optional | last frame, 1 element, negative | 3–15 s | 16:9, 9:16, 1:1 | optional |
| Kling 3.0 Turbo | `kling-3-turbo` | ~60 | no | optional | no | 3–15 s | 16:9, 9:16, 1:1 | no |
| Kling 4.0 | `kling/v4/text-to-video` | ~100 | no | optional | last frame | 3–30 s | 720p, 1080p; 16:9, 9:16, 1:1, 21:9 | no |
| Kling 4.0 Reference | `kling/v4/reference-to-video` | ~120 | no | optional | up to 10 images, 5 videos, 7 elements (`@Image1`) | 3–30 s | 720p, 1080p | no |
| Luma Ray 3.2 | `luma/ray-3-2` | ~45 | no | optional | last frame; **loop** flag | 5, 10 s | 540p, 720p, 1080p; 16:9, 21:9, 9:16, 3:4, 1:1, 4:3 | no |
| Luma Ray 2 / Ray 2 Flash | `luma/ray-2-720p`, `luma/ray-flash-2-720p` | ~108 / ~36 | no | optional | last frame; loop; named camera `concepts` (push_in, dolly_zoom, crane_up …) | 5, 9 s | 720p; 7 aspects | no |
| Veo 3.1 Image to Video (Standard / Fast; Veo 3 or 3.1) | `google-veo3-i2v` | ~90 | yes | **required** | last frame, negative prompt | 4, 6, 8 s (**no 5 s**) | 720p, 1080p, 4K; 16:9, 9:16 | yes (toggle) |
| Veo 3.1 Text to Video | `google-veo3-t2v` | ~90 | yes | no | negative prompt | 4, 6, 8 s | 720p, 1080p, 4K | yes |
| Veo 2 | `google-veo2` | ~225 | no | optional | no | 5, 8 s | 16:9, 9:16 | no |
| MiniMax H3 Max / Standard | `minimax/h3/image-to-video` | ~20 | yes | optional | last frame | 5–15 s | 480P, 768P native; 2K, 4K upscaled; 6 aspects | no |
| MiniMax H3 Reference Video | `minimax/h3/reference-to-video` | ~35 | yes | via refs | up to 12 image/video/audio refs | 5–15 s | as above | no |
| Minimax Hailuo-02 (Std / Pro) | `minimaxV2` | ~32 | no | optional | no | fixed | not exposed | no |
| Flux 3 Video (Standard / Max) | `blackforestlabs/flux-3/text-to-video` | ~35 | yes | optional | last frame, up to 10 keyframes | 5–20 s | 720p–2160p; 8 aspects | yes (toggle) |
| Runway Aleph / Aleph 2 (video edit) | `rw_aleph`, `rw_aleph2` | ~90 / ~504 | yes | video in | 1 reference image | source length | 1280:720 … | no |

Why Runway Gen-4 Turbo: the b-roll is one 5 s clip of the hero scene with a slow camera, so the first frame *is* the hero still, and a seed makes a re-run reproducible. It is the cheapest model with both. Trade-off: 720p, which is upscaled 1.3x to fill the 1686x672 hero; acceptable for a prototype clip. MiniMax H3 Max is cheaper (~20) with a seed, but its native output is 768P and the first frame is optional rather than enforced. Luma Ray 3.2 (~45) adds 1080p and a seamless loop, which matters if the clip is ever set to autoplay (out of scope on this map). Veo 3.1 cannot make a 5 s clip and costs 3x for audio the app will not play.

## 2. Alternatives Rob could run himself

Prices are per image or per 5 s clip at the standard tier, in USD, from the vendor's own page on 3 Nov 2026. Where a vendor's page could not be read, the row says so.

### 2.1 Image services

| Service | Price per image | Sizes and aspects | Seed and reference | Text in image | Licence for a commercial portfolio |
|---|---|---|---|---|---|
| **Midjourney** (subscription only) | Plans $10 / $30 / $60 / $120 per month for 3.3 / 15 / 30 / 60 Fast GPU hours; no per-image price exists. UNCONFIRMED: every docs.midjourney.com page returned 403; figures are the official page's search snippet. | UNCONFIRMED | `--seed`, `--sref` (style reference), `--oref` (omni-reference), `--ar`: documented but pages unreadable, UNCONFIRMED | UNCONFIRMED | ToS snippet: "You own all Assets You create"; a company with over $1M annual revenue must be on Pro or Mega to own assets; Stealth Mode (private generations) is Pro and Mega only. UNCONFIRMED (403). |
| **FLUX 1.1 [pro] ultra** via fal.ai | **$0.06 per image**, billed per megapixel rounded up, up to 4 MP (2048x2048). [fal.ai/models/fal-ai/flux-pro/v1.1-ultra](https://fal.ai/models/fal-ai/flux-pro/v1.1-ultra) | up to 4 MP; multiple aspect ratios (default 16:9) | `seed`; `image_url` + `image_prompt_strength` 0–1 (Redux composition guide); `raw` | not stated | fal model page: "Commercial use enabled via fal partnership". fal ToS (8 Sep 2026) has **no clause assigning output ownership to the customer**; BFL's developer ToS (4 Aug 2026) says "you own all right, title, and interest in and to Output" and permits commercial use. [fal.ai/terms](https://fal.ai/terms), [bfl.ai developer terms](https://bfl.ai/legal/developer-terms-of-service) |
| FLUX 1.1 [pro] ultra via Replicate | **$0.06 per image** (flux-1.1-pro $0.04, flux-dev $0.025, schnell $0.003). [replicate.com/pricing](https://replicate.com/pricing) | up to 4 MP | `seed`, `aspect_ratio`, `image_prompt` + strength | not stated | Replicate ToS (1 Apr 2026): grants "all right, title and interest, if any, in and to Output" incl. "commercial purposes such as sale or publication", subject to the model's own terms. [replicate.com/terms](https://replicate.com/terms) |
| FLUX.1 Kontext [pro] via fal | **$0.04 per image**; "Commercial usage rights included". [fal.ai/models/fal-ai/flux-pro/kontext](https://fal.ai/models/fal-ai/flux-pro/kontext) | sample 1248x832; match input | `image_url` required, `seed` | not stated | as fal above |
| **Ideogram** | Subscription: Plus $20/month (2,400 priority credits), Pro $60 (7,500), pay-as-you-go 1¢ per credit; credits per image load by script and were not readable. API per image: 3.0 Turbo $0.04 / Default $0.07 / Quality $0.10 per a search snippet dated 6 Aug 2025, UNCONFIRMED. [ideogram.ai/pricing?pricing_tab=api](https://ideogram.ai/pricing/?pricing_tab=api) | largest listed dimension 1536 px; many aspects incl. 2:3 | `seed`, `style_reference_images`, `character_reference_images` (one, surcharge), `style_codes`. [developer.ideogram.ai generate-v3](https://developer.ideogram.ai/api-reference/api-reference/generate-v3) | "crisp typography" (vendor) | ToS (14 Aug 2024): "we hereby assign to you all right, title and interest in and to such User Output", commercial use not restricted. [ideogram.ai/legal/tos](https://ideogram.ai/legal/tos) |
| Google Gemini image API (Nano Banana family, direct) | Gemini 2.5 Flash Image **$0.039**; Gemini 3.1 Flash Image ≈ $0.045 (0.5K) / $0.067 (1K) / $0.101 (2K) / $0.151 (4K); Gemini 3 Pro Image ≈ $0.134 (1K/2K) / $0.24 (4K). Price changes announced for 1 Dec 2026 and 1 Jan 2027. [aistudio.google.com/docs/pricing](https://aistudio.google.com/docs/pricing) | 0.5K–4K; aspects incl. 1:1, 5:4, 16:9, 1:4 … 8:1 | up to 14 reference images inline; Gemini 3 Pro Image up to 3 style references; **no seed documented** | "legible, stylized text" (vendor) | Terms (23 Mar 2026): "Google won't claim ownership over that content"; no explicit commercial grant sentence. [aistudio.google.com/docs/terms](https://aistudio.google.com/docs/terms). Imagen is shut down on the Gemini API ([aistudio.google.com/docs/imagen](https://aistudio.google.com/docs/imagen)). |
| OpenAI GPT Image | GPT Image 1.5 medium **$0.034** (1024²) / $0.05 (1536x1024); high $0.133 / $0.20. GPT Image 2 medium $0.053 / $0.041; high $0.211 / $0.165. gpt-image-2.5 priced only in a calculator: UNCONFIRMED. [developers.openai.com image guide](https://developers.openai.com/api/docs/guides/image-generation) | 1024², 1536x1024, 1024x1536; custom up to 3840 px per side on 2.5 | reference images via edit endpoint + mask; **no seed** | "can still struggle with precise text placement and clarity" (vendor) | openai.com/policies returned 403: UNCONFIRMED |

### 2.2 Video services

| Service | Price per 5 s clip | Durations, resolution, aspect | Image-to-video, seed | Licence for a commercial portfolio |
|---|---|---|---|---|
| **Runway** | API: credits $0.01 each; Gen-4.5 12 credits/s = **$0.60 per 5 s**; Gen-4 Turbo 5 credits/s = **$0.25 per 5 s**. App: Standard $15/month for 625 credits ($0.024 per credit) so Gen-4.5 is $1.44 per 5 s there. [docs.dev.runwayml.com pricing](https://docs.dev.runwayml.com/guides/pricing/), [runway.com/pricing](https://runway.com/pricing) | Gen-4.5 5/8/10 s; ratios 1280:720, 1584:672, 1104:832, 720:1280, 832:1104, 960:960 | `promptImage` required on `/v1/image_to_video`; seed documented only in a changelog snippet (max 4294967295), UNCONFIRMED | ToS (23 Oct 2026): "does not claim ownership of any of your Inputs or Outputs"; commercial use allowed; Runway takes a perpetual licence to Inputs and Outputs for training. [runway.com/terms-of-use](https://runway.com/terms-of-use) |
| **Kling** (Kuaishou) | UNCONFIRMED: every kling.ai page returned an empty shell. Search snippets of kling.ai/dev/pricing: standard no-audio 0.6 units ($0.084)/s, pro 0.8 units ($0.112)/s, pro with audio 1.0 unit ($0.14)/s; Kling 4.0 1.0 unit/s 720p, 1.5 units/s 1080p. Derived: ≈ $0.42 (standard) to $0.70 (pro + audio) per 5 s. | 3–30 s on 4.0; 720p/1080p; 16:9, 9:16, 1:1, 21:9 (from the Weave contract, section 1.4) | first and last frame, elements, `@Image` references (Weave contract); seed not exposed | not fetched: UNCONFIRMED |
| **Google Veo 3.1** | Gemini API Veo "was shut down on October 22, 2026" per the vendor page; Veo 3.1 is GA on Vertex (Gemini Enterprise Agent Platform). Vertex price: pricing page returned no body; a search snippet shows "$0.40" per unit for 720p/1080p with audio, unit unclear: UNCONFIRMED. [aistudio.google.com/docs/video](https://aistudio.google.com/docs/video), [Vertex Veo 3.1 model card](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/veo/3-1-generate) | 4, 6 or 8 s (**no 5 s**); 720p/1080p/4K standard, 720p/1080p fast and lite; 16:9, 9:16; sound generation | image-to-video, reference images, first and last frame supported; parameter names and seed not on the fetched page | not fetched: UNCONFIRMED |
| **Luma Ray 3.2** | API: 5 s **$0.30 at 720p**, $0.15 at 540p, $1.20 at 1080p (SDR; HDR 2x). App: Plus $30/month for 10,000 credits ($0.003 per credit); Ray 3.2 is 100 credits per 5 s at 720p = $0.30, 400 at 1080p = $1.20. [lumalabs.ai/api/pricing](https://lumalabs.ai/api/pricing), [lumalabs.ai/pricing](https://lumalabs.ai/pricing) | 5 or 10 s; 540p, 720p, 1080p, 4K (docs); 16:9 and six others; loop | `keyframes.frame0` / `frame1` as `{type:"image", url}` for first/last frame; **no seed documented**. [docs.lumalabs.ai video-generation](https://docs.lumalabs.ai/docs/video-generation) | ToS (14 May 2026): "Customer owns and retains all right, title, and interest in and to the Output" but "can only use the Outputs for commercial purposes if the Outputs were produced during an active Subscription Term"; free-tier output grants Luma a perpetual licence. [lumalabs.ai/legal/tos](https://lumalabs.ai/legal/tos) |
| OpenAI Sora 2 | Vendor guide: Sora 2 models and the Videos API "were shut down on September 24, 2026". Not an option. [developers.openai.com video guide](https://developers.openai.com/api/docs/guides/video-generation) | — | — | — |
| MiniMax Hailuo (brief) | Hailuo-2.3 768P 6 s **$0.28**, 1080P 6 s $0.49 (no 5 s option); MiniMax-H3 768P $0.08/s = $0.40 per 5 s. [platform.minimax.io pricing](https://platform.minimax.io/docs/pricing/overview) | 6 s minimum on Hailuo-2.3; H3 per second | first/last frame (Weave contract); seed on H3 | not fetched: UNCONFIRMED |

Reading across the two tables: the Weave route is price-competitive with running the same models directly (Nano Banana 2.1 at ~$0.07 against Google's $0.067 for 3.1 Flash Image at 1K; Runway Gen-4 Turbo at ~$0.30 against Runway's own $0.25 per 5 s), it needs no new account, API key or billing relationship, and it keeps the prompts and seeds in one place. The reasons to go direct are Midjourney's look (not reachable through Weave at all) and Ideogram's typography at 2:3 (Weave's Ideogram V4.5 lacks a 2:3 preset). Licence is the one place the direct route is clearer: BFL, Replicate, Ideogram and Luma (paid) assign the output in writing; fal and standalone Weave do not say so in the pages read.

## 3. Prompt templates

Every template is three parts: a **scene line** built from the show's `genre` and `logline` in `src/data/catalogue.json` (and the episode `synopsis` for a still), a **composition line** fixed per template, and the **house-style suffix**, which never changes. The suffix is versioned (`HS-1`) and recorded with every generated file so a later change cannot silently re-style half a show.

### 3.0 The house-style suffix (`HS-1`)

```
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of {palette} with a single accent of {accent}, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

`{palette}` and `{accent}` are fixed per show at the style lock (section 4) and reused by every template. The poster template is the only one allowed to drop "No on-screen text".

For `the-drowned-court` (fantasy, SYFY): `{palette}` = "lake-black, bottle green, tarnished brass and bone white"; `{accent}` = "cold rowan-berry red".

### 3.1 Show hero (16:9, 1920 wide, portrait-safe)

Where it is used: Home hero strip and the show page header on TV (1686x672, a 5:2 band cut from the 16:9 art, `object-fit: cover` with the show's `artFocus`); the phone Home hero is **3:4** and the phone show page header is **4:5** (`src/mobile/Home.tsx`, `src/mobile/ShowDetail.tsx`), both cut from the same file. The portrait-safe rule follows: everything that matters sits inside a **central 810x768 window** of a 1920x1080 frame (810 wide is the 3:4 column; 768 tall is the 5:2 band). Generate at 2K 16:9 (2048x1152 on Nano Banana) and downscale to 1920x1080 in the existing resize script.

```
{Title}, a {genre} series. {Logline}
Establishing image of the series' world with its central figure or object held in the middle third of the frame, mid-shot, horizon in the lower third, headroom above, atmosphere rather than detail in the outer thirds, nothing essential near the left or right edge, no cropped faces, no action at the frame edge.
{HS-1}
```

Filled in for `the-drowned-court`:

```
The Drowned Court, a fantasy series. Beneath the lake lies a kingdom that drowned a thousand years ago and never stopped ruling. Two sisters from the shore town are summoned to serve at its court, and only one of them is meant to come back up.
Establishing image of the series' world with its central figure or object held in the middle third of the frame: two young women in wet wool coats standing waist-deep at the lake edge at night, the spires of a sunken court faintly lit green beneath the surface in front of them, a rowan branch floating between them; mid-shot, horizon in the lower third, headroom above, fog and black water in the outer thirds, nothing essential near the left or right edge, no cropped faces, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

Params: Nano Banana 2.1, `aspect_ratio` 16:9, `resolution` 2K, `thinking_level` High for the hero only (it is generated once and chosen from candidates), `seed` random for candidates, then fixed (section 4).

### 3.2 Episode still (16:9, same look, different scene)

Where it is used: tiles (318x179 up to 590x332) and the phone episode list (42% width 16:9). 1K 16:9 is enough. Generated as an **edit** of the show's hero so the world, lens and grade carry over.

```
Same series, same world, same lens and grade as the reference image. New scene for episode {S}x{E} "{Episode title}": {synopsis}
Single moment, one or two figures, mid-shot or wide, a different location or time of day from the reference, subject in the central third, no action at the frame edge.
{HS-1}
```

Filled in for `the-drowned-court` S1 E3 "The Berry Tithe":

```
Same series, same world, same lens and grade as the reference image. New scene for episode 1x3 "The Berry Tithe": Every servant of the court must eat from the rowan. Wren refuses and the lake begins to rise over the town.
Single moment: a long stone table in a drowned hall lit green from above, a bowl of red rowan berries pushed away by a young woman's hand, courtiers in sodden finery turned toward her; wide shot, subject in the central third, no action at the frame edge.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

Params: Nano Banana 2.1, `images[0]` = the show's locked hero, `aspect_ratio` 16:9, `resolution` 1K, `thinking_level` Minimal, `seed` = the show's locked seed.

### 3.3 Movie poster (2:3 key art)

Two variants. **Title clear (default)**: the top 30% of the frame is quiet so the app can set the title in the brand's display face; the SYFY and USA skins use different faces, so burnt-in type would break the brand switch. **Title in image**: only for a Coming Soon movie whose title is part of the art; Nano Banana 2.1 renders text per Google's claim, with Ideogram V4.5 as the fallback at `portrait_4_3` (864x1152) cropped to 2:3. Generate at 2K 2:3 (1365x2048), downscale to 1000x1500.

```
{Title}, a {genre} film. {Logline}
Key art, vertical, a single iconic image of the central figure or object, three-quarter or full-length, lit from one side, the lower two-thirds carry the image and the top third is a dark quiet gradient with no detail.
[title clear]  {HS-1}
[title in image]  The title "{TITLE}" set once, large, centred in the top third, in a {brand display face description}, {accent} on dark, perfectly legible, correctly spelled, nothing else written. {HS-1 with "No on-screen text, no lettering" removed}
```

Filled in for `the-drowned-court`, title clear:

```
The Drowned Court, a fantasy film. Beneath the lake lies a kingdom that drowned a thousand years ago and never stopped ruling. Two sisters from the shore town are summoned to serve at its court, and only one of them is meant to come back up.
Key art, vertical: a young woman in a drowned queen's brass crown seen from the chest up, eyes closed, black water at her collarbone and a second face reflected beneath the surface, lit from one side by green light from below; the lower two-thirds carry the image and the top third is a dark quiet gradient of lake-black with no detail.
Dark, cinematic, photographic realism, shot on anamorphic 35 mm, shallow depth of field, one motivated light source, deep shadows with lifted blacks, fine film grain, muted palette of lake-black, bottle green, tarnished brass and bone white with a single accent of cold rowan-berry red, colour held consistent across the series. No on-screen text, no lettering, no logos, no watermark, no captions, no subtitles, no UI. No one looks at the camera.
```

Title-in-image line for the same poster (SYFY): `The title "THE DROWNED COURT" set once, large, centred in the top third, in a tall condensed sans-serif, bone white on lake-black, perfectly legible, correctly spelled, nothing else written.` Expect to generate two or three and pick; text is the least reliable element and the ticket's "is text reliable" question stays open until the first batch (section 5).

Params: Nano Banana 2.1, `images[0]` = the show's locked hero, `aspect_ratio` 2:3, `resolution` 2K, `seed` = the show's locked seed.

### 3.4 B-roll (5 s, hero scene, slow camera)

The clip starts from the hero still, so the prompt describes motion only and nothing new enters the frame.

```
Slow {camera move} over {duration}, locked horizon, no camera shake, no cut, no zoom burst. {two or three ambient motions drawn from the scene}. Figures hold still or move slightly; nothing enters or leaves the frame; lighting and colour unchanged from the first frame; no text.
```

Filled in for `the-drowned-court`:

```
Slow push-in over five seconds, locked horizon, no camera shake, no cut, no zoom burst. Fog drifts left to right across the water, the green light beneath the surface pulses once, ripples spread from the floating rowan branch, the sisters' coats stir in a faint wind. Figures hold still; nothing enters or leaves the frame; lighting and colour unchanged from the first frame; no text.
```

Params: Runway Gen-4 Turbo, `start_frame` = the locked hero (1920x1080), `duration` 5, `ratio` 1280:720, `seed` fixed and recorded. Luma Ray 3.2 variant: `start_image_url` = hero, `duration` 5s, `resolution` 1080p, `aspect_ratio` 16:9, `loop` true.

## 4. Consistency technique: style lock, then edit

The map already fixed the budget as "one still per episode after a one-show style lock". The technique has six levers; the first three do most of the work.

1. **Lock one hero per show, then edit from it.** Generate 3–4 hero candidates with random seeds, pick one, and from then on every still and poster for that show is generated with the hero as `images[0]` and the prompt opening "Same series, same world, same lens and grade as the reference image". The reference carries palette, grain, lens and lighting far more reliably than words do. This is why the image model had to accept reference images.
2. **Fix the seed per show.** Record the chosen hero's seed and reuse it for the show's stills and poster. With the same model, seed and suffix, the noise field and therefore the texture and grade are stable; the prompt changes only the scene. A re-run of any file reproduces it.
3. **Lock the suffix and version it.** `HS-1` is pasted verbatim, never paraphrased, and carries the show's palette and accent words. If the suffix changes it becomes `HS-2` and the whole show is regenerated, not patched.
4. **Same aspect, resolution and lens language.** Heroes 16:9 at 2K, stills 16:9 at 1K, posters 2:3 at 2K; "anamorphic 35 mm, shallow depth of field" in every prompt; "central third" composition in every prompt so the crops (5:2, 3:4, 4:5, tile) land the same way.
5. **Generate two, keep one.** Two candidates per still, pick by palette match against the hero, not by drama. The cull is where series look is enforced; a still that is beautiful and off-palette is rejected.
6. **One grade pass in the resize step.** The existing resize script can apply the same mild curve to every file of a show (lift blacks, pull saturation) so small model drift is flattened. Optional; try the batch without it first.

Record per file, in a `public/art/prompts.json` keyed by show id and file: model id, seed, suffix version, prompt, reference file, date. That file is the "prompts that made them" the map's destination asks for.

Why not a LoRA or a Midjourney `--sref`: a trained LoRA (Flux Dev LoRA is reachable) would give the tightest lock but needs a training set we do not have until the first batch exists; `--sref` is Midjourney-only and Midjourney is not reachable here. Both are second-batch options if reference-plus-seed drifts.

## 5. Open points and what could not be confirmed

- **Weave credit to USD** is derived from standalone Weave top-ups ($10 per 1,000); the pool `weave_run_model` bills, its balance, and the in-Design pool's USD rate were not visible to the tools. Check the balance before and after the first hero run and record the real per-image cost.
- **Text reliability** for posters is a vendor claim (Google, Ideogram) and an admitted weakness (OpenAI); untested here because the ticket forbade generation. The first poster batch decides it.
- **Midjourney, Kling and OpenAI terms pages** returned 403 or empty shells; their figures are search snippets of the official pages and are marked UNCONFIRMED above. Veo on the Gemini API and the Sora 2 API are reported shut down by their own docs pages as of 3 Nov 2026.
- **fal and standalone Weave output ownership**: neither page read assigns output to the customer in words; BFL's own developer terms do. Fine for a portfolio demo; worth a line in the case study's credits.
- **Gen-4 Turbo is 720p**; if the hero clip looks soft at 1686 wide, the swap is Luma Ray 3.2 at 1080p (~45 credits) or Runway Gen-4.5 (~70) with the same first frame and prompt.
