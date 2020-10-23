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
    paintCard(
      showsList[i].show.image.medium,
      showsList[i].show.name,
      i
    ); /* llamo a la funcion q pinta */
  }
  assignListener();
};

/* paints funstions */
const containerCardsSeries = document.querySelector(".js-list-of-series");
const paintCard = (src, name, id) => {
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
  const myFavorite = even.currentTarget;
  let myFavoriteId = even.currentTarget.id;
  listOfMyFavorite.push(showsList[myFavoriteId]);
  paintAllCards();
  paintAllFavorites();

  // guardar en un listOfMyFavorites
  // llamar a pintar
  //console.log("elemento:", myFavorite);
  // console.log("id de dond fue el evento:", myFavoriteId);
  // myFavorite.classList.add("red"); /* añade cnuevas clases */
  //  paintFavoriteCard(
  //    showsList[myFavoriteId].show.image.medium,
  //    showsList[myFavoriteId].show.name,
  //    myFavoriteId
  //   ); /* pinta a la izquierda */

  //  listOfMyFavorite.push(myFavorite);
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
  containerFavorites.innerHTML += ` <li id=${id} class="js-results">
  <div class="js-info-of-my-serie info-of-my-serie">
  <img class="image card" src="${src}" alt=""
    <h3 class="js-name-series"> ${name}</h3>
  </div>
  </li>`;
};

/* 
resumen:

- todo lo que sea cambiar el html desde las funciones de pintar
- las funciones manejadoras de eventos solo cambian los arrays y llaman a repintar
- después de pintar siempre volvemos a escuchar los eventos

*/
