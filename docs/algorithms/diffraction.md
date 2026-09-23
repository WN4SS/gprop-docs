# Knife-Edge Diffraction

gprop contains a multi-edge Fresnel–Kirchhoff diffraction implementation for terrain, building, and tree obstructions.

!!! warning "Not enabled in the current default heatmap"
    The active `gen_heatmap` loop sets diffraction loss to zero for preliminary AOI coverage runs. The code described here remains available for full digital-twin experiments.

## Obstruction profile

For a transmitter/receiver path, the engine can:

1. Traverse intersected 10 m twin tiles with the Amanatides–Woo algorithm.
2. Sample the ground raster along the path.
3. Intersect the path with indexed building and tree footprint edges.
4. Compute roof height from plane coefficients and tree height from the cluster maximum.
5. Remove dominated edges before calculating loss.

## Single-edge loss

The Fresnel parameter is:

$$v = h\sqrt{\frac{2}{\lambda}\left(\frac{1}{d_1}+\frac{1}{d_2}\right)}$$

For `v > -0.78`, the ITU-R approximation is:

$$L = 6.9 + 20\log_{10}\left(\sqrt{(v-0.1)^2+1}+v-0.1\right)$$

Otherwise the loss is 0 dB.

## Multi-edge cascade

Dominant edges are processed sequentially from transmitter to receiver and the hop losses are accumulated. Terrain profiles are sampled through `surface_profile`; building and vegetation features are accelerated by the twin's 10 m tile index.
