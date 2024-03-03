"use strict"

let pictures_all = import.meta.glob("./public/Gen5/**/*.png", {import: "default", eager: true, query:"?url"});
console.log(pictures_all);
pictures_all = Object.keys(pictures_all);


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

function callReplaceDialog() {
  console.log(this);
  modifiedImg = this;
  favDialog.showModal();
}

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
  // let path = `/public/Gen5/female/${id_pad}.png`;
  // if (pictures_female.includes(path)) {
  //     url =  `/Gen5/female/${id_pad}.png`;
  //     createPreviewImg(url);
  // }
  // path = `./public/Gen5/${id_pad}.png`;
  for (const picture_path of Object.values(pictures_all)) {
    // console.log(picture_path)
    if (picture_path.includes(id_pad)) {
      // strip ./public
      url = picture_path.slice(8);
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

for (const slot of slots) {
  slot.querySelector("img").addEventListener("click", callReplaceDialog);
}
