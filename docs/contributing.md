# Contributors & contributing

gprop is a research and engineering project for urban RF propagation modelling. This page records the project contributions previously published on this site and explains how to contribute.

## Project team

### Alvi Rashid

**Contributions:** Documentation, multithreading, and benchmarking.  
**Program recorded in the original documentation:** Electrical Engineering, Sophomore.

- Authored the pipeline guides, flowcharts, file formats, algorithm references, and CLI documentation using MkDocs Material. The documentation is now hosted on Vercel.
- Implemented OpenMP multithreading for the propagation heatmap grid loop.
- Designed a benchmarking suite across 1, 2, 4, 8, and 10 cores, with repeated runs and summary statistics.
- Built reporting tools including `benchmark.py`, `plot_histogram.py`, and `plot_cores.py` for timing analysis and normalized CPU time.

The original contributor page reported a 4.3× speedup at 10 cores (18.4 s → 4.1 s). This is a historical benchmark from that page, not a new measurement of the current simulator configuration.

### Nick Toutoundjian

**Role:** Testing, Documentation & Benchmarking  
**Program:** Computer Engineering, Sophomore

- Assisted with the Deygout diffraction engine and created key functions in C/C++.
- Implemented several unit tests for core processes to ensure proper calculation and desired outputs.
- Structured the backbone of the documentation architecture and supported deployment of MkDocs to GitHub Pages.
- Tested the benchmarking reporting pipeline and comparison results across different CPUs and core counts.

### Christopher Chahine

**Role:** Geographical Data Preprocessing  
**Program:** Electrical Engineering, Junior

- Replaced OpenStreetMap building footprint fetching with Microsoft's GlobalMLBuildingFootprints dataset in `fetch.py`, using quadkey math to efficiently target only the tiles covering the area of interest.
- Implemented OSM/Microsoft patching logic: OSM is used as the default source due to its accuracy, with Microsoft footprints added only where they do not overlap with existing OSM buildings, using a spatial index for efficient filtering.
- Developed `visualize.py`, a Matplotlib and Contextily visualization script that generates side-by-side comparison plots of OSM-only, Microsoft-only, and combined building footprints across multiple areas with varying coverage.

### Venkata Ramireddy Gaddam

**Role:** Drive Test Processing & 3D Geospatial Visualization, New Drive Test Setup  
**Program:** Engineering Sciences Internet of Things

- Developed an end-to-end RF data processing pipeline converting raw drive-test logs into structured datasets (RSRP, SINR, RSRQ, Timestamp) with automated CSV cleaning, merging, and validation.
- Designed and implemented a Gaussian-based 3D heatmap generation engine using Python (NumPy, SciPy), converting sparse drive-test measurements into continuous spatial coverage maps.
- Built a Google Earth visualization pipeline generating KMZ outputs with GroundOverlay heatmaps, ScreenOverlay color legends, and antenna azimuth-based directional overlays.
- Implemented automatic coordinate handling and projection workflows (EPSG:3857 ↔ EPSG:4326), enabling accurate geospatial alignment of RF measurements on real terrain maps.
- Optimized the data preprocessing workflow to handle multi-million-point datasets with structured, memory-efficient CSV parsing and validation.
- Integrated antenna topology modeling (azimuth, height, location) into the visualization layer for realistic transmitter direction representation in 3D space.
- Developed a new portable DriveTest Setup and test-ready scripts.
- Conducted drive tests on FruitBelt and validated the results.

## Contribute a change

1. Review the [pipeline overview](pipeline/overview.md) and [build guide](reference/build.md).
2. Create a feature branch for your change.
3. Keep changes focused and include a reproducible command, inputs, and expected results for behavior changes.
4. Update the relevant documentation page when changing a command, file format, or default model.
5. Submit a pull request to the upstream `testing` branch, following the repository README.

[Simulator repository](https://github.com/WN4SS/gprop) · [Documentation repository](https://github.com/WN4SS/gprop-docs)

## Coding conventions

The repository README requests ANSI C, C++17, and POSIX Makefiles. Current build targets compile C with C99 and use platform-specific make settings; follow the surrounding code and verify the target platform when proposing changes.

## Improve the documentation

The editable pages are Markdown files under `docs/` in the simulator workspace. Navigation lives in `mkdocs.yml`.

```bash
python3 -m pip install mkdocs-material
python3 -m mkdocs build --strict
```

Check changed commands against the source, keep one workflow step per page, and preserve contributor credits and existing URLs. Include screenshots or concrete corrections in documentation issues.

## Acknowledgements

- **USGS 3DEP** — LiDAR through the Entwine Point Tile service.
- **OpenStreetMap contributors** — building footprints and map data.
- **Microsoft Global ML Building Footprints** — supplementary building footprints.
- **PDAL, GDAL, GEOS, PROJ, SDL, and the Python ecosystem** — the libraries behind the simulator.

## Questions or corrections

Use the relevant GitHub repository to contact the development team or report an issue. Include your operating system, the command you ran, and the relevant error output.
