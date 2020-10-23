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

/* const assignListener = () => {
  let containerCards = document.querySelectorAll(".js-results");
  for (let i = 0; i < containerCards.length; i++) {
    containerCards[i].addEventListener("click", addFavoriteSeries);
  }
};

const addFavoriteSeries = (even) => {
  console.log("object", even.currentTarget.id);
}; */

//////////////////////////////
let listOfMyFavorite = [];

const assignListener = () => {
  let containerCards = document.querySelectorAll(".js-results");
  for (let i = 0; i < containerCards.length; i++) {
    containerCards[i].addEventListener("click", addFavoriteSeries);
  }
};

/* const addFavoriteSeries = (even) => {
  const myFavorite = even.currentTarget;
  console.log("id de dond fue el evento:", myFavorite);
  myFavorite.classList.add("red");
  listOfMyFavorite.push(myFavorite);
  console.log("listOfMyFavorite", listOfMyFavorite);
  paintFavorite();
};

const paintFavorite = () => {
  const containerFavorites = document.querySelector(
    ".js-container__favorite-series"
  );
    containerFavorites.innerHTML = `${listOfMyFavorite[i]}`;
  
}; */

const addFavoriteSeries = (even) => {
  const myFavorite = even.currentTarget;
  let myFavoriteId = even.currentTarget.id;
  console.log("elemento:", myFavorite);
  console.log("id de dond fue el evento:", myFavoriteId);
  myFavorite.classList.add("red");
  paintFavoriteCard(
    showsList[myFavoriteId].show.image.medium,
    showsList[myFavoriteId].show.name,
    myFavoriteId
  );

  /*  listOfMyFavorite.push(myFavorite);
  console.log("listOfMyFavorite", listOfMyFavorite); */
};
const paintFavoriteCard = (src, name, id) => {
  const containerFavorites = document.querySelector(
    ".js-container__favorite-series"
  );
  containerFavorites.innerHTML += ` <li id = ${id} class="js-results">
  <div class="js-info-of-my-serie info-of-my-serie">
  <img class="image card" src="${src}" alt=""
    <h3 class="js-name-series"> ${name}</h3>
  </div>
  </li>`;
};
