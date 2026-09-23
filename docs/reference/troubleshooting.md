# Troubleshooting

## The desktop app cannot find scripts or its font

Launch from `bin/` so relative paths resolve:

```bash
cd bin
./gprop
```

## Fetch fails before downloading LiDAR

Check network access, a valid longitude/latitude AOI, and the PDAL executable at `/opt/homebrew/bin/pdal`. The current fetcher already normalizes the old S3 endpoint. See [download data](../pipeline/fetch.md).

## Propagation writes a heatmap but fails afterward

The current `main` also runs drive-test comparison and expects `drive_test.csv` in the working directory. Supply a valid headerless file, or an empty file when there are no measurements. Do not overwrite existing measurements. See [run the simulation](../pipeline/prop.md).

## The first CSV row is missing or fields are misread

Both the current heatmap exporter and propagation topology reader expect **no header row**. Review the [file formats](formats.md) and use longitude/latitude for topology, projected X/Y for heatmap data.

## The map preview cannot find files

`--map_preview` looks for `heatmap.csv`, `topology.csv`, and `aoi.wkt` together in the directory containing `--csv`. It writes into the repository's `heatmaps/` directory, which must exist. It does not use `--outdir` for the preview.

## The GUI build fails with SDL linker errors

The native GUI requires SDL3, SDL3_image, SDL3_ttf, and libcurl. The current macOS and Windows link settings may need those libraries added; installing the libraries alone does not add linker flags. See [install and build](build.md).

## Changing the antenna pattern did not enable diffraction

Model selection is in `prop/prop.c`. The current heatmap loop uses log-distance loss with `n = 5` and zero diffraction loss. There is no CLI model switch. See [path-loss models](../algorithms/pathloss.md).
