"use strict";
/* me llamo al boton */
const button = document.querySelector(".js-search-button");
let resultsSearch = document.querySelector(".js-search-input");
/* obtengo el valor del input */
const addInputValue = () => {
  console.log("object", resultsSearch.value);

  fetch(`http://api.tvmaze.com/search/shows?q=${resultsSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("input value", resultsSearch.value);
      console.log("api name", data[1].show.name);
      console.log("api img", data[1].show.image.medium);
      paintCard(data[1].show.image.medium, data[1].show.name);
    });

  /* debo meter funcion de pintar */
};

addInputValue();
button.addEventListener("click", addInputValue);

/* paints funstions */
const paintCard = (src, name) => {
  const containerCardSeries = document.querySelector(".js-container-result");
  const array = ["prueba", "prueba"];

  for (let i = 0; i < array.length; i++) {
    containerCardSeries.innerHTML += ` <div class="js-info-of-my-serie info-of-my-serie">
      <li class="js-results">
        <img src="${src}" alt="" />
      </li>
      <h3 class="js-name-series">${name}</h3>
      </div>`;
  }
};
