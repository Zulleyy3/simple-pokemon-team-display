"use strict"

let pictures_all = import.meta.glob("./images/**/*.png", );


import pokemon from "./pkmn_alternative.json";
let slots = document.querySelectorAll(".slot");
let favDialog = document.querySelector("#favDialog");
let dialogform = favDialog.querySelector("form");
const pokemon_input = favDialog.querySelector("#pokemon_input");
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
let lastPreview = undefined;

function callReplaceDialog() {
  console.log(this);
  modifiedImg = this;
  favDialog.showModal();
}

previewBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  previewImage(pokemon_input.value);
});

function previewImage(pokemonName) {
  let id = pokemon[pokemonName];
  if (lastPreview === id) {
    return;
  }

  preview_area.replaceChildren();
  lastPreview = id;
  let id_pad = id.toString().padStart(4, "0");
  for (const picture_path in pictures_all) {
    // console.log(picture_path)
    if (picture_path.includes(id_pad)) {
      // strip ./public
      pictures_all[picture_path]().then((url) => {
        // get static asset
        createPreviewImg(url.default);
      });
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
}

for (const slot of slots) {
  slot.querySelector("img").addEventListener("click", callReplaceDialog);
}
