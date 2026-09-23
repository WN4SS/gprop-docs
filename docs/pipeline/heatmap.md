# Step 5 — Export your coverage map

**Goal:** Turn the results from [Step 4](prop.md) into a KMZ for Google Earth. You need `heatmap.csv`, `topology.csv`, and the [export dependencies](../reference/python_deps.md).

`bin/heatmap.py` converts the headerless propagation grid into a smoothed Google Earth overlay.

## Run

```bash
python3 bin/heatmap.py \
  --csv heatmap.csv \
  --topology_csv topology.csv \
  --outdir outputs
```

## Processing

1. Read the first three headerless columns as projected X, Y, and RSS.
2. Remove malformed and non-finite samples.
3. Aggregate samples into a regular grid.
4. Apply Gaussian smoothing and a minimum-support mask.
5. Render a fixed −120 to −60 dBm color scale.
6. Hide values below −120 dBm and apply the requested alpha to visible pixels.
7. Create antenna arrows from the headerless topology file.
8. Package the overlay, legend, and arrows as KMZ.
9. Optionally call `generate_map_previews.render_deployment` for a labeled street-map PNG.

## Outputs

The script scans `--outdir` and chooses the next unused number:

```text
Heatmap1.kmz
Heatmap2.kmz
Heatmap3.kmz
```

Temporary overlay and legend assets are built in `HeatmapN_tmp/` while the KMZ is assembled.

## Arguments

| Argument | Default | Description |
|---|---:|---|
| `--csv` | `heatmap3.csv` | Headerless X/Y/RSS input |
| `--cell` | `0.8` | Grid cell size in metres |
| `--sigma` | `5.0` | Gaussian blur in grid cells |
| `--alpha` | `0.60` | Visible overlay opacity |
| `--min_weight` | `0.02` | Minimum blurred support |
| `--outdir` | `.` | Output directory, created if needed |
| `--cmap` | `turbo` | Matplotlib colormap |
| `--topology_csv` | `topology.csv` | Headerless transmitter sectors |
| `--antenna_length_m` | `300` | Direction-line length |
| `--arrow_head_m` | `25` | Arrowhead length |
| `--arrow_head_angle_deg` | `25` | Arrowhead angle |
| `--antenna_line_width` | `80` | KML line width |
| `--antenna_label_scale` | `2.0` | KML label scale |
| `--map_preview` | off | Also create a street-map deployment preview |

Open the resulting `HeatmapN.kmz` in Google Earth.

## Optional street-map preview

Add `--map_preview` only when the directory containing `--csv` has files named `heatmap.csv`, `topology.csv`, and `aoi.wkt`. Create the repository's `heatmaps/` directory first if absent. The preview is written there, independently of `--outdir` and `--topology_csv`.

## Check the result

Open the KMZ and check the map location, antenna directions, and legend. The exporter labels its legend “RSRP”, but the input is the simulator's predicted RSS; the script does not convert RSS into measured RSRP. Gaussian smoothing changes the presentation, not the underlying propagation calculation.

Temporary assets in `HeatmapN_tmp/` are removed after a successful export.

<div class="step-links" markdown>
[← Run the simulation](prop.md)
[Next: Explore batch coverage →](batch.md)
</div>
