# Step 2 — Download data

**Goal:** Download the terrain, LiDAR, and building data for the area you planned in [Step 1](gui.md). You need `aoi.wkt`, network access, and the [acquisition dependencies](../reference/python_deps.md).

`fetch.py` reads an EPSG:4326 AOI WKT from standard input, obtains building footprints, locates intersecting USGS 3DEP Entwine datasets, and invokes the Homebrew PDAL executable to create terrain and point-cloud inputs.

## Full acquisition

```bash
python3 bin/fetch.py < aoi.wkt
```

| File | Description |
|---|---|
| `buildings.wkt` | OSM footprints plus non-overlapping Microsoft footprints, projected to EPSG:3857 |
| `lpc.laz` | Clipped, compressed non-ground LiDAR with noise and returns below 2 m removed |
| `ground.tif` | 1 m bare-earth raster from classification 2 returns, with holes filled |

The active filters for `lpc.laz` retain points matching:

```text
Classification != 2 && Classification != 7 && Classification != 18 && HeightAboveGround >= 2
```

## Terrain-only mode

```bash
python3 bin/fetch.py --ground-only < aoi.wkt
```

This mode skips footprint geometry retrieval and `lpc.laz`. It still reads the footprint catalog in the current implementation, then streams classification 2 points directly from EPT into `ground.tif`. Use it for terrain-only experiments; the full preprocessing step requires the full acquisition outputs.

## Implementation details

- EPT project URLs are normalized to HTTPS and the current `s3.us-west-2.amazonaws.com` endpoint.
- The AOI is projected to EPSG:3857 before clipping.
- PDAL is currently invoked as `/opt/homebrew/bin/pdal pipeline --stdin`; adjust that path on non-Homebrew systems.
- `gdal_fillnodata ground.tif ground.tif` fills raster gaps in place.

!!! warning
    The script requires network access to OpenStreetMap, Microsoft building footprints, and the USGS 3DEP catalog and EPT endpoints.

## Check before continuing

For the full workflow, confirm `lpc.laz`, `buildings.wkt`, and `ground.tif` were created in your working directory. Review any incomplete LiDAR coverage warning before moving on.

<div class="step-links" markdown>
[← Plan your area](gui.md)
[Next: Build the digital twin →](preproc.md)
</div>
