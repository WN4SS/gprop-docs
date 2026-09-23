# File Formats

All CSV files below are headerless unless stated otherwise.

## `aoi.wkt`

One WKT Polygon or MultiPolygon in EPSG:4326:

```text
POLYGON ((-78.875 42.895, -78.855 42.895, -78.855 42.915, -78.875 42.895))
```

Longitude comes first. The current propagation loader transforms the complete geometry, including MultiPolygon parts and interior rings.

## `topology.csv`

One transmitter sector per row:

```text
longitude,latitude,height_m,azimuth_deg,downtilt_deg,frequency_MHz,power_dBm,gain_dBi
-78.8645,42.9067,20,90,-1,3560,43,17
```

Frequency is converted from MHz to Hz by the topology reader. Height is above the local surface; azimuth uses 0° as north.

## `antenna.pat`

Exactly 541 attenuation values, one per line:

- Lines 1–360: horizontal angles 0–359°
- Lines 361–541: vertical angles 0–180°
- Values are relative attenuation in dB; 0 is boresight

## `buildings.wkt`

One building geometry per line in EPSG:3857, produced during full acquisition.

## `ground.tif`

Single-band Float64 GeoTIFF in EPSG:3857. Full and terrain-only acquisition both generate 1 m mean elevation from classification 2 LiDAR returns and fill NoData holes.

## `lpc.laz`

Compressed EPSG:3857 LiDAR used by `preproc`. Ground, classifications 7 and 18, and points below 2 m height above ground are removed.

## `buildings.csv`

One roof plane per line:

```text
"POLYGON ((x1 y1, x2 y2, ...))",a,b,c,d
```

The roof elevation is `z = (d - ax - by) / c`.

## `trees.csv`

One vegetation cluster per line:

```text
"POLYGON ((x1 y1, x2 y2, ...))",maximum_elevation_m
```

## `heatmap.csv`

One sample per line in EPSG:3857:

```text
x,y,rss_dbm
-8771523.691700,5309832.084700,-86.520000
```

There is no literal header row. Samples are spaced 5 m apart and only points strictly inside the AOI are emitted.

## `drive_test.csv` and `comparison.csv`

`drive_test.csv` supplies `x,y,measured_rss` rows. The current executable writes `comparison.csv` as `x,y,absolute_error`. An empty file is valid for coverage-only runs.

## Deployment outputs

Each `deployments/<name>/coverage_summary.json` records the pattern, −110 dBm threshold, qualifying sample count, and strongest predicted signal. The aggregate `deployments/coverage_summary.json` contains all deployments.
