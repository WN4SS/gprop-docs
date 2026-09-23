# Step 1 — Plan your area

**Goal:** Define where to simulate and where the transmitters are. You need the compiled desktop app from [Step 0](../reference/build.md).

`bin/gprop` is the native SDL3 planning interface. It displays OpenStreetMap tiles, lets you search for a location, draw or load an AOI, place directional antenna sectors, manage saved digital twins, and launch the downstream scripts.

## Run

The GUI expects its helper scripts, font, cache, and `index` file in the current directory:

```bash
cd bin
./gprop
```

## Main controls

1. Search for your location and press **Go**.
2. Choose **New AOI** and draw the area on the map.
3. Enter height, downtilt, frequency, power, and gain for a sector, then use **Place Antenna** to position and orient it. Repeat for additional sectors.
4. Choose **Select Pattern** and select the antenna `.pat` file.
5. Give the twin a name and select **Generate Twin** to launch acquisition and preprocessing. Follow [Step 2](fetch.md) and [Step 3](preproc.md) for those operations and their manual equivalents.

| Control | Behavior |
|---|---|
| Search Location / Go | Geocodes a place using OpenStreetMap Nominatim and recenters the map |
| New AOI | Starts polygon drawing on the map |
| Height, Downtilt, Freq, Power, Gain | Sets parameters for the next antenna sector |
| Place Antenna | Places a sector and lets you orient its azimuth on the map |
| Select Pattern | Selects a `.pat` antenna-pattern file |
| New Twin Name / Generate Twin | Saves `aoi.wkt` and invokes `generate.py` for a named twin |
| Run Simulation | Saves `topology.csv`, invokes `run.py`, then generates a KMZ |
| Inspect | Opens the selected twin through `viewer.py` |
| Delete | Removes the selected twin through `delete.py` |

## Files written by the map

### `aoi.wkt`

The desktop map writes a Polygon in EPSG:4326, with longitude before latitude. The propagation engine also accepts externally prepared MultiPolygon AOIs.

### `topology.csv`

Headerless, one sector per row:

```text
longitude,latitude,height_m,azimuth_deg,downtilt_deg,frequency_MHz,power_dBm,gain_dBi
```

The propagation engine projects sector coordinates to EPSG:3857 and adds local surface elevation to the configured height.

!!! warning "Working-directory requirement"
    Start the GUI from `bin/`. Its helper commands use relative paths such as `python3 run.py`, `python3 generate.py`, `font.ttf`, `index`, and `cache/`.

## Check before continuing

Confirm the AOI encloses your intended study area and the antenna arrows face the intended directions. **Generate Twin** saves the AOI and starts the next two stages. **Run Simulation** saves the current sector positions to `topology.csv` and runs against the selected saved twin.

For a manual workflow, prepare `aoi.wkt` and `topology.csv` using the [file formats](../reference/formats.md), then continue to download data.

<div class="step-links" markdown>
[← Install & build](../reference/build.md)
[Next: Download data →](fetch.md)
</div>
