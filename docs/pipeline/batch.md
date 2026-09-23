# Batch coverage

Run preliminary coverage across the deployment folders after you understand the [single-area simulation](prop.md).

## Before you run

You need a built `bin/prop`, the [Python dependencies](../reference/python_deps.md), and a `topology.csv` and `aoi.wkt` in each folder under `deployments/`.

!!! warning "This workflow replaces deployment data"
    `run_temporary_coverage.py` empties `buildings.csv`, `trees.csv`, and `drive_test.csv`, and rewrites the heatmap and final AOI in each deployment folder. Use copies of your deployments if you need to keep existing digital twins or measurements.

## 1. Generate preliminary coverage

```bash
python3 run_temporary_coverage.py
```

The script uses a flat zero-elevation raster, the active log-distance model (`n = 5`), and analytic antenna patterns: 33° for Fruitbelt and 65° for the other deployments. These are preliminary patterns, not measured antenna patterns.

It preserves the initial AOI as `temporary_aoi.wkt` if that file does not yet exist, keeps samples at or above −110 dBm, groups samples by their nearest site, and forms buffered convex hulls with a 25 m margin. Their union becomes the new `aoi.wkt`.

## 2. Create map previews

```bash
python3 generate_map_previews.py
```

This writes a PNG for each deployment under `heatmaps/`, with site markers, sector arrows, a coverage color scale, and the final AOI outline. Street-map tiles require network access.

## Check the result

Each deployment receives `heatmap.csv` and `coverage_summary.json`. The summary includes the pattern name, threshold, qualifying sample count, and strongest prediction. `deployments/coverage_summary.json` collects all summaries.

These AOIs are planning boundaries derived from buffered sample hulls; they are not exact signal contours or measured coverage guarantees.

[Back to the workflow overview](overview.md) · [Export an individual KMZ](heatmap.md)
