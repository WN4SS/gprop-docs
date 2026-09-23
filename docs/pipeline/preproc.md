# Step 3 — Build the digital twin

**Goal:** Convert the full acquisition outputs from [Step 2](fetch.md) into the geometry files used by the simulator.

`preproc` turns the clipped non-ground point cloud and building footprints into compact roof-plane and vegetation geometry.

## Run

```bash
./bin/preproc lpc.laz buildings.wkt ground.tif
```

| Position | Input | Description |
|---|---|---|
| 1 | `lpc.laz` | Non-ground LiDAR points in EPSG:3857 |
| 2 | `buildings.wkt` | One projected building footprint per line |
| 3 | `ground.tif` | Bare-earth elevation raster |

## Current processing

1. Read LAZ points through the PDAL bridge.
2. Load footprint geometries and the terrain raster.
3. Insert building footprints into a GEOS STRtree.
4. Query the tree for each point and assign it to the first containing footprint; unassigned points become vegetation candidates.
5. Segment each building with RANSAC, refine planes with PCA, merge coincident facets, and prune outliers.
6. Cluster vegetation with a spatial hash whose cell width matches the 0.6 m neighbor radius.
7. Write CSV geometry and the classified point cloud. PLY utilities exist in the source, but the current entry point does not call them.

The STRtree and spatial-grid clustering replace full scans that became prohibitively slow on large AOIs. Tree-clustering progress is printed while processing.

## Outputs

| File | Description |
|---|---|
| `buildings.csv` | Quoted WKT roof footprint plus plane coefficients `a,b,c,d` |
| `trees.csv` | Quoted WKT crown footprint plus maximum elevation |
| `out.laz` | Point cloud with segmentation classifications |

## Key parameters

| Constant | Value | Purpose |
|---|---:|---|
| `INITIAL_KNN` | 50 | RANSAC seed neighborhood |
| `MIN_INITIAL_POINTS` | 40 | Minimum initial plane inliers |
| `THRESH` | 0.1 m | Plane inlier distance |
| `MIN_NORMAL_Z` | 0.5 | Rejects near-vertical planes |
| `MAX_PLANES` | 10 | Maximum facets per building |
| `MAX_DISTANCE` | 0.6 m | Vegetation neighbor radius |
| `MIN_CLUSTER_POINTS` | 50 | Minimum accepted vegetation cluster |
| `MAX_CLUSTER_POINTS` | 500 | Maximum points retained per cluster |

Outputs are written to the current working directory.

## Check before continuing

Confirm `buildings.csv`, `trees.csv`, and `out.laz` were written. Keep `ground.tif` and your AOI alongside the twin files. An empty clutter file can be valid in an area with no detected features; inspect the segmentation counts to understand the result.

<div class="step-links" markdown>
[← Download data](fetch.md)
[Next: Run the simulation →](prop.md)
</div>
