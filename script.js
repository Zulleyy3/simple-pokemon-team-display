"use strict"

const pictures_female = import.meta.glob("./images/Gen5/female/*.png",{query: "?url"});
console.log(pictures_female);
const pictures_all = import.meta.glob("./images/Gen5/*.png");
console.log(pictures_all);

import pokemon from "./pkmn_alternative.json";
let slots = document.querySelectorAll(".slot");
let favDialog = document.querySelector("#favDialog");
let dialogform = favDialog.querySelector("form");
const pokemon_input = favDialog.querySelector("#pokemon_input");
const confirmBtn = favDialog.querySelector("#confirmBtn");
const previewBtn = favDialog.querySelector("#previewBtn");
const preview_area = favDialog.querySelector("#preview_area");

function populate_pokemonlist(pokemonlist, form) {
    const datalist = document.createElement("datalist");
    datalist.setAttribute("id", "pokemonlist");
    Object.keys(pokemonlist).forEach(name => {
        const option = document.createElement("option");
        option.setAttribute("value", name);
        datalist.append(option);
    });
    form.appendChild(datalist);
}

populate_pokemonlist(pokemon, dialogform);

let modifiedImg = undefined;

function callReplaceDialog() {
  console.log(this);
  modifiedImg = this;
  favDialog.showModal();
}


// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  // favDialog.close(selectEl.value); // Have to send the select box value here.
 modifiedImg.src = findImage(pokemon_input.value, gender.value);
 
  console.log(gender.value);
  console.log(pokemon_input.value);
  favDialog.close();
});

previewBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  // favDialog.close(selectEl.value); // Have to send the select box value here.
  previewImage(pokemon_input.value);
});

function previewImage(pokemonName) {
  preview_area.replaceChildren();
  let id = pokemon[pokemonName];
  let id_pad = id.toString().padStart(4, "0");
  let url;
  let path = `./images/Gen5/female/${id_pad}.png`;
  let picture = pictures_female[path];
  if (picture) {
      url =  new URL(`./images/Gen5/female/${id_pad}.png`, import.meta.url).href;
      createPreviewImg(url);
  }
  // path = `./images/Gen5/${id_pad}.png`;
  picture = pictures_all[path];
  for (const picture_path of Object.keys(pictures_all)) {
    console.log(picture_path)
    if (picture_path.includes(id_pad)) {
      const last = picture_path.split('/').at(-1);
      url =  new URL(`./images/Gen5/${last}`, import.meta.url).href;
      createPreviewImg(url);
    }
  }
}

function createPreviewImg(url) {
  let img = document.createElement("img");
  img.src = url;
  img.addEventListener("click", updateImage);
  preview_area.appendChild(img);
}

function updateImage() {
  let slot = modifiedImg.parentNode;
  let input = slot.querySelector("input");
  input.value = pokemon_input.value;
  modifiedImg.src = this.src;
  favDialog.close();
  preview_area.replaceChildren();
}

function findImage(pokemonName, gender) {
  let id = pokemon[pokemonName];
  let url;
  if (gender === "Female") {
    let path = `./images/Gen5/female/${id.toString().padStart(4,"0")}.png`;
    const picture = pictures_female[path];
    if (picture) {
      url =  new URL(`./images/Gen5/female/${id.toString().padStart(4,"0")}.png`, import.meta.url).href;
      return url;
    }
  }
  let path = `./images/Gen5/${id.toString().padStart(4,"0")}.png`;
  const picture = pictures_all[path];
	console.log(path);
  if (picture) {
    url =  new URL(`./images/Gen5/${id.toString().padStart(4,"0")}.png`, import.meta.url).href;
    return url;
  }
  return new URL(`./images/.png`, import.meta.url).href;
}

for (const slot of slots) {
  slot.querySelector("img").addEventListener("click", callReplaceDialog);
}
