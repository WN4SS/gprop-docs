# Python dependencies

Use a Python environment with native geospatial libraries available. Keep GDAL's Python bindings compatible with the installed GDAL library.

| Task | Packages or tools |
|---|---|
| Download data | `requests`, `pandas`, `geopandas`, `shapely`, `osmnx`; PDAL CLI and `gdal_fillnodata` |
| Export KMZ | `numpy`, `pandas`, `matplotlib`, `scipy`, `pyproj`, `contextily` (imported at startup) |
| Street-map previews | `contextily`, `geopandas`, `shapely`, `numpy`, `pandas`, `matplotlib` |
| Batch coverage | `geopandas`, `numpy`, `shapely`, GDAL Python bindings (`osgeo`) |
| Documentation | `mkdocs-material` |

## Check your environment

```bash
python3 --version
python3 -c "import geopandas, shapely, osmnx, requests"
python3 -c "import numpy, pandas, matplotlib, scipy, pyproj"
python3 -c "from osgeo import gdal; print(gdal.VersionInfo())"
```

Run only the checks relevant to your workflow. For package installation, use the same Python interpreter that launches the helper scripts.

!!! note "PDAL executable path"
    The current fetcher invokes `/opt/homebrew/bin/pdal` directly. A Python `pdal` installation alone does not satisfy this requirement. Other installations need that executable path adjusted in `bin/fetch.py`.

[Native build requirements](build.md) · [Troubleshooting](troubleshooting.md)
