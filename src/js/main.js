"use strict";

let showsList = [];

/* 1-FUNCION HANDER DEL BOTON BUSCAR, Q LLAMA A FUNCION Q PINTA TODAS LAS TARJETAS */

const button = document.querySelector(".js-search-button");
const resultsSearch = document.querySelector(".js-search-input");

const searchResultFromApi = () => {
  fetch(`//api.tvmaze.com/search/shows?q=${resultsSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
      showsList = data;
      paintAllCards();
      assignListener();
    });
};

button.addEventListener("click", searchResultFromApi);

/* 1 FUNCIONES QUE PINTAN BUSQUEDA (paintCard. una sola) (paintAllCards. todas con localstorage vacio) (paintAllCardsWithFavoriteCssClass. todas con alguna q coincide conel local storage)*/

const containerCardsSeries = document.querySelector(".js-ul-list-of-series");

const getCardHtml = (show, id) => {
  let image;
  if (show.image === null) {
    image = "//via.placeholder.com/210x295/ffffff/666666/?text=TV.";
  } else {
    image = show.image.medium;
  }
  return ` 
    <li id="${id}" class="js-li-results">
    <div class="js-info-of-my-serie info-of-my-serie">
    <img class="image card" src="${image}" alt=""
    <h3 class="js-name-series"> ${show.name}</h3>
    <h3 class="js-name-series"> ${show.genres}</h3>
    </div>
  </li>`;
};

/* pinta todas las terjetas, cuando todavia no hay ninguna en favoritos */
const paintAllCards = () => {
  //containerCardsSeries.innerHTML = "";
  /*for (let i = 0; i < showsList.length; i++) {
    const name = showsList[i].show.name;
    containerCardsSeries.innerHTML += getCardHtml(showsList[i].show, i);
  }*/
  /*const cards = showsList.map(function (showItem, i) {
    return getCardHtml(showItem.show, i);
  });
  no nos gusta porque nos faltaría otro paso más
  */
  /*showsList.forEach(function (showItem, i) {
    containerCardsSeries.innerHTML += getCardHtml(showItem.show, i);
  });*/
  const htmlCode = showsList.reduce(function (acc, showItem, i) {
    return acc + getCardHtml(showItem.show, i);
  }, "");
  console.log(htmlCode);
  containerCardsSeries.innerHTML = htmlCode;
};

function assignListener() {}
