# CLI Reference

## Desktop planner

```bash
cd bin
./gprop
```

The native SDL3 application uses relative helper paths and should be launched from `bin/`.

## Data acquisition

```bash
python3 bin/fetch.py [--ground-only] < aoi.wkt
```

`--ground-only` writes terrain without downloading clutter or footprints.

## Preprocessing

```bash
./bin/preproc <lpc.laz> <buildings.wkt> <ground.tif>
```

Outputs are written to the current directory.

## Propagation

```bash
OMP_NUM_THREADS=8 ./bin/prop \
  <topology.csv> <antenna.pat> <aoi.wkt> \
  <buildings.csv> <trees.csv> <ground.tif>
```

`heatmap.csv` and `comparison.csv` are written to the current directory. The current model selection is compiled into `prop/prop.c`; there is no model-selection command-line flag.

## KMZ generation

```bash
python3 bin/heatmap.py [options]
```

| Option | Default |
|---|---:|
| `--csv` | `heatmap3.csv` |
| `--cell` | `0.8` |
| `--sigma` | `5.0` |
| `--alpha` | `0.60` |
| `--min_weight` | `0.02` |
| `--outdir` | `.` |
| `--cmap` | `turbo` |
| `--topology_csv` | `topology.csv` |
| `--antenna_length_m` | `300` |
| `--arrow_head_m` | `25` |
| `--arrow_head_angle_deg` | `25` |
| `--antenna_line_width` | `80` |
| `--antenna_label_scale` | `2.0` |
| `--map_preview` | disabled |

## Batch preliminary coverage

```bash
python3 run_temporary_coverage.py
python3 generate_map_previews.py
```

The first command rewrites coverage outputs and final AOIs under `deployments/`. The second writes site-level PNG previews under `heatmaps/`.
