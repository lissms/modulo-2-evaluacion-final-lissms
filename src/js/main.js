"use strict";
/* me llamo al boton */
const button = document.querySelector(".js-search-button");
let resultsSearch = document.querySelector(".js-search-input");
/* obtengo el valor del input */
const addInputValue = () => {
  fetch(`http://api.tvmaze.com/search/shows?q=${resultsSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        paintCard(
          data[i].show.image.medium,
          data[i].show.name
        ); /* llamo a la funcion q pinta */
      }
    });
};

addInputValue();
button.addEventListener("click", addInputValue);

/* paints funstions */
const paintCard = (src, name) => {
  const containerCardSeries = document.querySelector(".js-container-result");
  containerCardSeries.innerHTML += ` <div class="js-info-of-my-serie info-of-my-serie">
        <img src="${src}" alt="image of series" class = "image-card" />
      <h3 class="js-name-series">${name}</h3>
      </div>`;
};
