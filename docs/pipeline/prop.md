# Step 4 — Run the simulation

**Goal:** Produce a grid of predicted received signal strengths. You need the digital twin from [Step 3](preproc.md), the planned topology, and an antenna pattern.

`prop` loads transmitters, an antenna pattern, the AOI, digital-twin clutter, and terrain. It evaluates the strongest received signal at each 5 m sample inside the AOI.

## Run

The executable also reads `drive_test.csv` from the working directory. If you have no drive-test measurements, create an empty file only if one is absent; this command preserves existing data:

```bash
touch drive_test.csv
```

```bash
OMP_NUM_THREADS=8 ./bin/prop \
  topology.csv antenna.pat aoi.wkt buildings.csv trees.csv ground.tif
```

| Position | Input |
|---|---|
| 1 | Headerless 8-column `topology.csv` |
| 2 | 541-line antenna `.pat` file |
| 3 | EPSG:4326 Polygon or MultiPolygon AOI |
| 4 | `buildings.csv` |
| 5 | `trees.csv` |
| 6 | `ground.tif` |

## Active heatmap model

The current `gen_heatmap` path uses:

```text
RSS = transmit power
      - log-distance path loss (n = 5)
      + directional antenna gain
```

- Grid spacing: 5 m
- Receiver height: ground elevation + 2 m
- Transmitter height: configured height + local surface elevation
- Result per cell: maximum RSS across all sectors
- Diffraction loss: explicitly set to zero in the active loop
- Reflection heatmap: implemented but its call is commented out

This configuration is intended for the current preliminary AOI coverage runs. The repository still contains FSPL, alpha-beta, knife-edge diffraction, terrain profiles, and up-to-three-bounce reflection code for future or experimental use.

## AOI and terrain handling

The entire GEOS geometry is projected from EPSG:4326 to EPSG:3857, preserving every MultiPolygon component and interior ring. Ground raster indices are clamped using the raster dimensions. Buildings and trees are indexed in 10 m tiles for obstruction queries.

## Outputs

| File | Description |
|---|---|
| `heatmap.csv` | Headerless `x,y,rss` samples in EPSG:3857 |
| `comparison.csv` | Absolute difference against `drive_test.csv`, when that file supplies samples |

`heatmap.csv` is always written to the current working directory. The executable currently also calls the drive-test comparison path, so provide an empty or valid `drive_test.csv` in the working directory.

The comparison routine uses FSPL plus diffraction, while the active coverage grid uses log-distance loss without diffraction. Do not interpret `comparison.csv` as validation of the active coverage configuration.

## Check before continuing

Confirm `heatmap.csv` contains numeric `x,y,rss` rows without a header. Keep `topology.csv` available for the antenna arrows in the next step.

<div class="step-links" markdown>
[← Build the digital twin](preproc.md)
[Next: Export your coverage map →](heatmap.md)
</div>
