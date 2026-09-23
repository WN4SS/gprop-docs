# Start here

Build a digital twin of your area, simulate radio coverage, and export a map you can inspect in Google Earth.

**New to gprop?** Start with installation, then follow the five steps below. Each step has its own page with the files you need, a command or action, and a way to check the result.

<div class="guide-cards">
<a class="guide-card" href="reference/build/"><span class="step-number">Step 0 · Setup</span><strong>Install &amp; build</strong><span>Prepare the tools and compile the simulator.</span></a>
<a class="guide-card" href="pipeline/gui/"><span class="step-number">Step 1 · Plan</span><strong>Plan your area</strong><span>Choose an area and place your antenna sectors.</span></a>
<a class="guide-card" href="pipeline/fetch/"><span class="step-number">Step 2 · Download</span><strong>Get terrain &amp; building data</strong><span>Fetch LiDAR, building footprints, and ground elevation.</span></a>
<a class="guide-card" href="pipeline/preproc/"><span class="step-number">Step 3 · Prepare</span><strong>Build the digital twin</strong><span>Turn the downloaded data into buildings and vegetation.</span></a>
<a class="guide-card" href="pipeline/prop/"><span class="step-number">Step 4 · Simulate</span><strong>Run your coverage simulation</strong><span>Calculate received signal strength across the area.</span></a>
<a class="guide-card" href="pipeline/heatmap/"><span class="step-number">Step 5 · View</span><strong>Export your coverage map</strong><span>Create a KMZ and inspect the result in Google Earth.</span></a>
</div>

## Know what the current model calculates

The current local simulator uses log-distance path loss with **n = 5**, directional antenna gain, a 5 m receiver grid, and a receiver height of 2 m. Diffraction and reflection are not enabled in the default heatmap calculation. Read [the propagation step](pipeline/prop.md) before interpreting coverage results.

## Find what you need

| I want to… | Go to |
|---|---|
| Understand how the files move through the simulator | [Pipeline overview](pipeline/overview.md) |
| Run several deployments | [Batch coverage](pipeline/batch.md) |
| Copy a command or look up an option | [CLI reference](reference/cli.md) |
| Check an input file | [File formats](reference/formats.md) |
| Fix an error | [Troubleshooting](reference/troubleshooting.md) |
| See project credits or contribute | [Contributors & contributing](contributing.md) |

## Navigate the guide

Use the numbered sidebar on desktop or the menu button on mobile. Every step links to the next step at the bottom. Search is available in the header; try a command such as `ground-only` or a file such as `topology.csv`.

These pages describe the current local simulator source, including its preliminary coverage configuration.
