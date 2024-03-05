# Simple Pokémon Team Display
A simple Pokémon team display built with Javascript and Vite, where images can be pulled up by clicking on a slot and searching the Pokémon name.

## Installation
Install dependencies with e.g. `pnpm install`.
Put tagged images of the Pokémon in the images directory. 
Finally, after adding the images, build with `pnpm run build` and copy the dist folder to your webserver.

## Image Tag Detection
The Pokemon are matched by their 4-digit national PokeDex-ID in it's filepath relative the root directory of this repository.
The build expects the file suffixes to be either gif, jpg, apng or png.
Examples:
- The file `./images/0004/coolnotyetcharizard.jpg` would be an image shown when searching for Charmander.
- The file `./images/0001somethingfoo.gif` would be an image shown when searching for Bulbasaur.
- The file `./images/somedirectory/0508IsARealCutie.png` would be an image shown when searching for Stoutland.

## Operation
Click on an image to open a dialoge for that slot. Type in the name of the Pokemon and press enter or the preview button.
Then select the image to show.

This will show the image in the team preview and set the name above the image to the name of the Pokemon.

## Limitations
- Saving the state between browser session implemented, but UX might use work.
- CSS is not good yet
- Loads all the images as JS modules after build (it's not terrible, but I am not a fan)
- The Browser Source in OBS doesn't have the default Suggestion under inputboxes so the autosuggestion doesn't work in it.
