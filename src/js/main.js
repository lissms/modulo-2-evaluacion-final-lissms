"use strict";
/* me llamo al boton */
const button = document.querySelector(".js-search-button");
let resultsSearch = document.querySelector(".js-search-input");
let showsList;
/* obtengo el valor del input */
const addInputValue = () => {
  fetch(`http://api.tvmaze.com/search/shows?q=${resultsSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
      showsList = data;
      paintAllCards();
    });
};

addInputValue();
button.addEventListener("click", addInputValue);

const paintAllCards = () => {
  containerCardsSeries.innerHTML = "";

  for (let i = 0; i < showsList.length; i++) {
    if (showsList[i].show.image === null) {
      paintCard(
        `//via.placeholder.com/210x295/ffffff/666666/?
      text=TV.`,
        showsList[i].show.name,
        i
      );
    } else {
      paintCard(
        showsList[i].show.image.medium,
        showsList[i].show.name,
        i
      ); /* llamo a la funcion q pinta */
    }
  }
  assignListener();
};

/* paints funstions */
const containerCardsSeries = document.querySelector(".js-list-of-series");
const paintCard = (src, name, id, red) => {
  /*  containerCardsSeries.innerHTML = "";  */

  containerCardsSeries.innerHTML += ` 
  <li id = ${id} class="js-results">
  <div class="js-info-of-my-serie info-of-my-serie">
  <img class="image card" src="${src}" alt=""
    <h3 class="js-name-series"> ${name}</h3>
  </div>
</li>`;
};

//////////////////////////////
let listOfMyFavorite = [];

const assignListener = () => {
  let containerCards = document.querySelectorAll(".js-results");
  for (let i = 0; i < containerCards.length; i++) {
    containerCards[i].addEventListener("click", addFavoriteSeries);
  }
};

const addFavoriteSeries = (even) => {
  const cliked = even.currentTarget;
  console.log("cliked", cliked);
  let myFavoriteId = even.currentTarget.id;
  let favorite = showsList[myFavoriteId];
  listOfMyFavorite.push(favorite);
  console.log("favorite", favorite);

  for (let i = 0; i < listOfMyFavorite.length; i++) {
    if (listOfMyFavorite[i] === favorite) {
      console.log("entre en if");
      cliked.classList.add("red");
    }
  }

  paintAllFavorites();

  console.log("listOfMyFavorite", listOfMyFavorite);
};
/* pinta todas las tarjetas favoritas */
const paintAllFavorites = () => {
  containerFavorites.innerHTML = ""; /* borro para volver a pintar */
  for (let i = 0; i < listOfMyFavorite.length; i++) {
    paintFavoriteCard(
      listOfMyFavorite[i].show.image.medium,
      listOfMyFavorite[i].show.name,
      i
    );
  }
};
/* pinta una targeta favorita */
const containerFavorites = document.querySelector(
  ".js-container__favorite-series"
);
const paintFavoriteCard = (src, name, id) => {
  containerFavorites.innerHTML += ` <li id=${id} class="js-results js-font">
  <div class="js-info-of-my-serie info-of-my-serie js-width-info-of-my-serie">
  <img class="image-card js-width-image" src="${src}" alt="imagen"
    <h3 class="js-name-series js-width-h3"> ${name}</h3>
  </div>
  </li>`;
};

/* 
resumen:

- todo lo que sea cambiar el html desde las funciones de pintar
- las funciones manejadoras de eventos solo cambian los arrays y llaman a repintar
- después de pintar siempre volvemos a escuchar los eventos

*/
