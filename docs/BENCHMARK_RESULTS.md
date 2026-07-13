# Benchmark results — Form2Dashboard pipeline

Generated: 2026-07-13T20:47:57.889Z
Environment: win32 · Node v22.14.0

Synthetic Google-Forms-like rows processed via `runPipeline` (validate → clean → aggregate → report).
Medians over 5 runs after 1 warm-up. Node/Vitest measurement — relative engineering evidence, not a browser FPS claim.

| Rows | Median total (ms) | Validate | Clean | Aggregate | Report | Output leads | Invalid | Dupes |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 100 | 1.32 | 0.24 | 0.54 | 0.47 | 0.07 | 97 | 3 | 0 |
| 1,000 | 8.9 | 1.57 | 4.52 | 1.67 | 0.58 | 975 | 25 | 0 |
| 5,000 | 33.08 | 7.12 | 19.53 | 4.84 | 1.68 | 4878 | 122 | 0 |
| 10,000 | 67.67 | 14.03 | 38.07 | 11.55 | 2.69 | 9756 | 244 | 0 |

## Soft limits (product)

- Upload hard cap: **5 MB**
- Soft warning: **10_000 rows**
- Processing remains on the browser main thread (lab / demo scope)

## Interpretation

- Sub-second for a few thousand rows is expected on modern hardware.
- At 10k rows, cost is still dominated by JS loops + Date parsing, not UI rendering.
- For larger files, the honest next step is a Web Worker — this lab does not claim multi-million-row scale.
