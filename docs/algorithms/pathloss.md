# Path-Loss Models

The propagation engine implements three base models. Model choice is currently made in `prop/prop.c`, not through a CLI option.

## Current active model

The default heatmap uses log-distance loss with `n = 5`:

$$L = L_{FSPL}(1\,m) + 10n\log_{10}(d)$$

The active link budget is:

$$RSS = P_{tx} - L_{log-distance} + G_{directional}$$

Diffraction is set to zero in this path. The strongest sector value is retained for each receiver cell.

## Free-space path loss

$$L_{FSPL} = 20\log_{10}\left(\frac{4\pi d f}{c}\right)$$

Distance is three-dimensional in metres and frequency is in hertz.

## Alpha-beta

$$L = 10\alpha\log_{10}(d) + \beta + 10\log_{10}\left(\frac{f}{1\,GHz}\right)$$

FSPL and alpha-beta are implemented and tested but are not selected by the current default heatmap loop.

## Directional antenna gain

$$G = G_{max} + H[\theta] + V[\phi]$$

The horizontal and vertical attenuation tables come from the 541-line pattern file. The engine combines them with sector azimuth, downtilt, and boresight gain from `topology.csv`.
