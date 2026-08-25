# Learn AI PPT with Phoebe

Six 45-minute sessions, single track, and **one real deck** you build across all of them.

AI can make a presentation in thirty seconds. It cannot tell you whether the room understood it.
This course teaches the part that decides.

**Live:** https://phoebefu6.github.io/learn-ai-ppt-with-phoebe/

## The sessions

| # | Session | What your deck gains |
|---|---------|----------------------|
| 1 | The 30-second test | A measured score on your worst slide, and the reason it scores that way |
| 2 | Outline first | An outline that is an argument, approved before a single slide is designed |
| 3 | Slides that carry | Every slide rebuilt as one claim plus its evidence |
| 4 | Charts and data | Charts that argue, with every figure traceable to a source you can open |
| 5 | Build the deck | The real build, in whichever tool you actually have a licence for |
| 6 | The room | Speaker notes, the Q and A you are dreading, and an accessibility pass |

## The simulator

`assets/ppt-live.js` renders a real slide in your browser and rebuilds it as you toggle each
design lever, scored against a deterministic comprehension model.

| Rung | Understood in 30 seconds |
|------|--------------------------|
| a normal corporate slide | 27% |
| + sentence headline | 48% |
| + one visual as the evidence | 64% |
| + strip anything off-message | 73% |
| + cue the one number that matters | 82% |
| + text clears WCAG 4.5:1 | **91%** |

The top rung is locked until session 6, so 91% is genuinely unreachable before the end. Two
traps backfire from the ceiling: putting the script on the slide costs 20 points, adding bullets
costs 15.

**What is real and what is not:** the contrast ratio is real WCAG 2.2 maths on the colours the
slide is actually painted with, and the chart is real SVG built from the numbers. The audience is
a teaching simulation - the lever weights model Garner and Alley 2013 and Mayer's principles,
they do not measure your room.

## Honesty

Assertion-evidence is peer-reviewed (Garner and Alley, *International Journal of Engineering
Education* 29(6) 2013, 110 students, p < .01). The 10/20/30 rule is convention with no study
behind it, and the course says so. No AI deck tool claims WCAG conformance for its output, so
accessibility is a manual gate you own.

Every vendor limit on these pages is quoted from the vendor's own published wording. The full
source map, with every URL and a dated "do not state as fact" list, is in
[`materials/official-course-map.md`](materials/official-course-map.md).

by Phoebe Fu · part of [Learn with Phoebe](https://phoebefu6.github.io/learn-with-phoebe/)
