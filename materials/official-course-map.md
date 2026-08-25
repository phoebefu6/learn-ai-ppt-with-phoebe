# AI + PPT - official source map and coverage

Verified 2026-08-24. Every fact on a course page traces to a URL below. Re-verify the vendor
rows before any delivery: Copilot and Gemini surfaces move monthly.

## The 80% bar

Each session teaches ~80% of its mapped sources' working content. Certificates, videos and
assessments stay with the official providers. Said plainly on every session page.

## Why this course exists (the defensible gap)

Every official path teaches the tool surface. None of them teach audience-level framing,
evidence integrity, or export and accessibility QA. The only research-backed slide-design
method lives in academic sources that no vendor course cites.

- Microsoft Learn "Build effective presentations with AI" - 7 units, Intermediate, updated
  2026-08-20. Teaches Idea Coach, tone/length/slide-count control, speaker notes at scale.
  https://learn.microsoft.com/en-us/training/modules/present-copilot-microsoft-powerpoint/
- LinkedIn Learning "Copilot in PowerPoint: From Prompt to Presentation" - 51 min,
  released 2026-01-22, 4.7/5 from 838 learners, Julie Terberg.
  https://www.linkedin.com/learning/copilot-in-powerpoint-from-prompt-to-presentation-30342076
  Note the unsuffixed URL resolves to the stale 2024 edition (45 min).
- Assertion-evidence, the research the vendor courses skip: Garner and Alley,
  *International Journal of Engineering Education* 29(6) 2013, pp. 1564-1579, ISSN 0949-149X.
  110 engineering students, better comprehension, fewer misconceptions, lower perceived
  cognitive load, stronger delayed recall, significant at p < .01.
  https://pure.psu.edu/en/publications/how-the-design-of-presentation-slides-affects-audience-comprehens/
  Wider body of work: https://writing.engr.psu.edu/research.html
  The method in one line: https://writing.engr.psu.edu/assertion_evidence_EA.html
- Mayer's coherence, signaling and redundancy principles.
  https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-reducing-extraneous-processing-in-multimedia-learning-coherence-signaling-redundancy-spatial-contiguity-and-temporal-contiguity-principles/CD5B7AE1279A9AB81F8EEBB53DBEC86E
- WCAG 2.2 SC 1.4.3 - 4.5:1 normal text, 3:1 large text (18pt, or 14pt bold), no rounding.
  https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

## Honesty rails carried on the pages

1. **10/20/30 is convention, not evidence.** Kawasaki's own reasoning is asserted from
   experience. https://guykawasaki.com/the_102030_rule/ - no study validates it. Say so.
2. **Assertion-evidence IS evidence.** p < .01, named journal, named sample. Cite it properly.
3. **No AI deck tool claims WCAG conformance for its output.** Canva states outright that
   "No automated accessibility checker can guarantee accessibility compliance".
   https://www.canva.com/help/using-design-accessibility/ Gamma has completed no formal
   screen-reader audit. Accessibility is a manual gate the learner owns.
4. **Tome is gone, and a course still sells it.** tome.app returns 404 (checked 2026-08-24),
   the founders left to build Lightfield https://lightfield.app/
   https://venturebeat.com/technology/tomes-founders-ditch-viral-presentation-app-with-20m-users-to-build-ai
   and Coursera's Tome-based course is still enrollable
   https://www.coursera.org/learn/ai-enhanced-presentations-captivating-audiences-with-tome
   Taught in session 5 as curriculum decay, not as a tool recommendation.

## Verified tool reality (session 5 spine)

| Tool | What it really does | The catch that bites | Source |
|---|---|---|---|
| Copilot in PowerPoint | from a prompt, from a Word doc, from your org template; rewrite; speaker notes; summarize with citations | needs a **Designer license** for generate-a-slide / create-from-topic / images. Without it you get summarize and chat only, and no message says why | https://support.microsoft.com/en-us/powerpoint/frequently-asked-questions-about-copilot-in-powerpoint |
| Copilot, limits | notes work best under 50 slides; summarize caps near 40,000 words; one file at a time; rewrite only on text boxes; design suggestions officially en-US only; one output language at a time | 2,000-character prompt ceiling, and no iterative edit of existing slide content. Microsoft support called the concern valid and offered workarounds only | https://learn.microsoft.com/en-us/answers/questions/5516746/is-copilot-integration-with-powerpoint-really-this |
| Copilot, templates | starting from your org template retains theme and layouts | "tends to default to the first layout in the Slide Master unless explicitly guided". Fix: name layouts, save .potx, apply template FIRST | https://learn.microsoft.com/en-us/answers/questions/5515849/creating-powerpoint-presentation-from-a-custom-tem |
| Claude for PowerPoint | builds on your existing template, pinpoint single-slide edits, native editable PowerPoint charts, reads slide master and colour scheme | Pro/Max/Team/Enterprise only; web, Windows 16.0.13127.20296+, Mac 16.46+; NOT on 2016/2019 perpetual, iPad or Android. "Only use with trusted files" - prompt injection is documented | https://claude.com/docs/office-agents/powerpoint |
| Gamma | generates decks, exports PDF, PNG, PPTX | gradient headings may flatten on export; Google Slides ignores fonts embedded in an uploaded PPTX; exports match Present Mode not Edit Mode; free exports carry "Made with Gamma" | https://help.gamma.app/en/articles/8022861-what-s-the-easiest-way-to-export-my-gamma |
| Beautiful.ai | outline-first "Create with AI", per-slide regenerate preserving copy, PPTX + PDF export | Pro $14.50/mo billed annually; Team $40/user/mo annual | https://www.beautiful.ai/pricing |
| Canva | Magic Design for Presentations / "Create a presentation with Canva AI", 10 free uses | PPTX export for presentations only; "may look different when opened in Microsoft Powerpoint"; fonts may need local install; animations and embedded video not supported in PPTX | https://www.canva.com/help/download-file-types/ |
| Google Slides + Gemini | generate a full editable deck from a prompt or Drive files, match an existing deck's style, editable outline gate | **Workspace Experiments (trusted tester)**, desktop only, English only. No PPTX export mentioned anywhere on Google's own page | https://support.google.com/docs/answer/17111393 |
| python-pptx | create/read/update .pptx, no PowerPoint install needed, most 2D chart types | no 3D charts, no multi-plot chart creation, no documented render-to-PDF. Latest release 1.0.2, 2024-08-07 - stable but quiet | https://python-pptx.readthedocs.io/en/latest/user/charts.html · https://pypi.org/project/python-pptx/ |

## Session coverage

| Session | Teaches | Mapped sources | Coverage |
|---|---|---|---|
| 1 · The 30-second test | why a slide fails in a real room; the comprehension bar; assertion-evidence introduced | Garner and Alley 2013; Mayer coherence | ✓ full |
| 2 · Outline first | the deck is an argument; generate structure not slides; the outline gate every good tool has | Beautiful.ai outline-first; Gemini editable-outline gate; Copilot from-Word-doc | ✓ full |
| 3 · Slides that carry | sentence headline, one idea, visual as evidence, hero number | Alley assertion-evidence; Mayer signaling and redundancy; 10/20/30 as convention | ✓ full |
| 4 · Charts and data | charts that argue; where fabricated figures come from; labelling and integrity | Microsoft "cannot evaluate accuracy"; "not optimized for verbatim reproduction"; MIT Sloan on hallucination | ◐ partial - chart craft beyond AI is its own field |
| 5 · Build the deck | the real build, tool by tool, with the licence and export traps; Tome as curriculum decay | every row of the tool table above | ✓ full |
| 6 · The room | speaker notes, Q and A prep, accessibility as a manual gate, export without breakage | Microsoft accessibility checker + unique titles + reading order; WCAG 1.4.3; Canva and Gamma a11y statements | ✓ full |

## Not covered by design

- Visual design craft as a discipline (typography, grid). Pointed at, not taught.
- Public speaking and delivery. Different course.
- Vendor certification paths. Left with the vendors.

## Do not state as fact (unverified)

Gamma's dollar prices (help centre lists plan names and credits only, pricing page 403s to
automated fetch). The exact Tome shutdown date of 2025-04-30 (secondary blogs only; the 404
and the founders' pivot are first-party). Any research validating 10/20/30 - none exists.
Whether "DesignerBot" is still a live Beautiful.ai name - the current site says "Create with AI".
Which Workspace tiers include Gemini deck generation - Google says only "an eligible plan".

## Simulator canon - VERIFIED IN-BROWSER 2026-08-24

`assets/ppt-live.js`. Every number below was read out of the live simulator after tuning, not
estimated. Session pages must quote these exactly. Re-verify with the console harness before
changing any weight.

**The ladder** (average across the six-slide golden set, levers added in teaching order):

| Rung | Lever added | Understood in 30s | Taught in |
|---|---|---|---|
| 0 | a normal corporate slide | **27%** | session 1 |
| 1 | sentence headline that states the message | **48%** | session 3 |
| 2 | one visual as the evidence | **64%** | session 3 |
| 3 | strip anything off-message | **73%** | session 3 |
| 4 | cue the one number that matters | **82%** | session 4 |
| 5 | text clears WCAG 4.5:1 | **91%** | session 6 |

**The locked top rung is real.** With every lever except the accessibility one, the ceiling is
**82%**. 91% is unreachable until session 6. The lever is gated behind 4 passport stamps with an
honest "unlock now" bypass for anyone who wants to skip ahead.

**The two traps backfire from the 91% ceiling:**

| Trap | Result | The principle it violates |
|---|---|---|
| put the script on the slide and read it aloud | 91% to **71%** (-20) | Mayer's redundancy principle |
| add more bullets so nothing gets missed | 91% to **76%** (-15) | every bullet splits the 30 seconds further |

**Per-slide ceilings** (a great slide is a great slide, but they do not all get there the same
way): Q3 revenue 93, Hiring request 92, Pricing change 92, Vendor renewal 91, H2 roadmap 90,
Incident review 87. Zero-lever floors run 24 to 30.

**The finding worth teaching, which came out of the model rather than into it:** the sentence
headline is the single biggest lever on all six slides, dropping each by 20 to 25 points when
removed. That is Alley's whole argument, and it survives contact with the simulator.

**What is real vs simulated, stated on every page carrying the sim:** the contrast ratio is real
WCAG 2.2 maths on the colours the slide is actually painted with (1.76:1 fails, 16.88:1 passes,
floored never rounded up per the spec), and the chart is real SVG built from the numbers. The
audience is a teaching simulation - the weights model Garner and Alley 2013 and Mayer, they do
not measure your room.
