# Step 0 — Install & build

**Goal:** Build the three programs you need for the workflow. Run these commands from the simulator repository root.

Install the [Python dependencies](python_deps.md) for the helper scripts as well as the native libraries below.

The root Makefile dispatches to `preproc/`, `prop/`, and `gui/`, producing three binaries in `bin/`.

## Build

=== "macOS"

    ```bash
    brew install pdal gdal geos proj libomp sdl3 sdl3_image sdl3_ttf curl
    make TARGET=darwin
    ```

=== "Linux"

    ```bash
    # Install development packages for PDAL, GDAL, GEOS, PROJ,
    # OpenMP, SDL3, SDL3_image, SDL3_ttf, and libcurl first.
    make TARGET=linux
    ```

=== "Windows"

    ```powershell
    make TARGET=windows
    ```

## Outputs

The existing platform targets may need local adjustments. In particular, the macOS and Windows `LDFLAGS` do not currently include all GUI libraries. If GUI linking fails, add the installed SDL3, SDL3_image, SDL3_ttf, and curl libraries to those platform settings. The Linux target already lists them.

| Binary | Role |
|---|---|
| `bin/gprop` | SDL3 desktop planner |
| `bin/preproc` | Point-cloud and digital-twin preprocessing |
| `bin/prop` | Propagation and heatmap engine |

## Languages and libraries

- C99 for GUI, preprocessing, propagation, diffraction, reflection, and geometry
- C++17 for the PDAL LAZ bridge
- OpenMP for parallel preprocessing and propagation
- PDAL, GDAL, GEOS, PROJ, SDL3, SDL3_image, SDL3_ttf, and libcurl

On macOS, the Makefile obtains dependency paths from Homebrew and links `libomp`. On Linux it expects headers under `/usr/include/gdal`. The Windows target uses a Conda environment named `WN4SS`.

## Clean

```bash
make clean
```

This removes generated binaries and per-component object files. Avoid running it while a simulation is active.

## Check before continuing

Confirm `bin/gprop`, `bin/preproc`, and `bin/prop` exist. Running `./bin/preproc` or `./bin/prop` without arguments prints their expected input arguments; a usage error is expected without inputs.

<div class="step-links" markdown>
[← Start here](../index.md)
[Next: Plan your area →](../pipeline/gui.md)
</div>
