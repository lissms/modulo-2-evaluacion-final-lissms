"use strict";

/*datos de inicio */

/* 1-DOM Y VARIABLES */
const button = document.querySelector(".js-search-button");
let resultsSearch = document.querySelector(".js-search-input");
const containerCardsSeries = document.querySelector(".js-ul-list-of-series");
const containerFavorites = document.querySelector(".js-container__favorite-series");
/* 2- MI API */
let showsList;

/* mis funciones que pintan */

const paintCard = (src, name, id, red) => {
  containerCardsSeries.innerHTML += ` 
    <li id = ${id} class="js-li-results ${red}">
    <div class="js-info-of-my-serie info-of-my-serie">
    <img class="image card" src="${src}" alt=""
      <h3 class="js-name-series"> ${name}</h3>
    </div>
  </li>`;
};
/* pinta todas las terjetas, cuando todavia no hay ninguna en favoritos */
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
      paintCard(showsList[i].show.image.medium, showsList[i].show.name, i);
    }
  }
};

/* pinta todas lar tarjetas y en rojo las q ya estan en favorito, es decir las q tb aparecen en el local-storage */

/* 1 FUNCIONES QUE PINTAN FAVORITOS */
/* pinta un favorito */
const paintFavoriteCard = (src, name, id) => {
  containerFavorites.innerHTML += ` <li id=${id} class="js-results js-font">
    <div class="js-info-of-my-serie info-of-my-serie js-width-info-of-my-serie">
    <img class="image-card js-width-image" src="${src}" alt="imagen"
      <h3 class="js-name-series js-width-h3"> ${name}</h3>
    </div><div id=${id}_div class="button-remove js-button-remove">X</div>
    </li>`;
};

const paintAllFavorites = () => {
  containerFavorites.innerHTML = "";
  let listOfMyFavorite = JSON.parse(localStorage.getItem("listOfMyFavorite"));
  if (listOfMyFavorite !== null) {
    /* para que cuando esté vacio el storage, no me de error la funcion */
    for (let i = 0; i < listOfMyFavorite.length; i++) {
      paintFavoriteCard(listOfMyFavorite[i].show.image.medium, listOfMyFavorite[i].show.name, i);
    }
  }
};

/* mis funciones handler */

/* 1-FUNCION HANDER DEL BOTON BUSCAR, Q LLAMA A FUNCION Q PINTA TODAS LAS TARJETAS */

const searchResultFromApi = () => {
  fetch(`//api.tvmaze.com/search/shows?q=${resultsSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
      showsList = data;
      let myLocalStorageFavorite = JSON.parse(localStorage.getItem("listOfMyFavorite"));
      if (myLocalStorageFavorite !== null) {
        paintAllCardsWithFavoriteCssClass();
      } else {
        paintAllCards();
      }
      assignListener();
    });
};

button.addEventListener("click", searchResultFromApi);

/* 1-FUNCION HANDER DE MI SERIE FAVORITA, Q METE EN LOCALSTORAGE(f2), Y LLAMA A FUNCION Q PINTA FAVORITAS, //Y A TODAS LAS TARJETASC ON CLASE ROJA EN LA SELECCIONADA */

const addFavoriteSeriesFromLocalStorage = (ev) => {
  let myFavorite = ev.currentTarget;
  let myFavoriteId = ev.currentTarget.id;
  console.log("myFavorite", myFavoriteId);
  let cliked = showsList[myFavoriteId];
  myFavorite.classList.add("red");

  let listOfMyFavoriteArray = [];
  let storagedFavoriteList = localStorage.getItem("listOfMyFavorite");
  let flag = false;
  if (listOfMyFavoriteArray.length === 0 && storagedFavoriteList === null) {
    listOfMyFavoriteArray.push(cliked);
    console.log("entro en el else");
  } else if (storagedFavoriteList !== null) {
    console.log("entro en el if");

    listOfMyFavoriteArray = JSON.parse(storagedFavoriteList);
    let index;
    for (let i = 0; i < listOfMyFavoriteArray.length; i++) {
      if (listOfMyFavoriteArray[i].show.id === cliked.show.id) {
        index = i;
        flag = true;
        break;
      } else {
        flag = false;
        console.log("metelo");
      }
    }
    console.log("i", index);
    if (flag === true) {
      listOfMyFavoriteArray.splice(index, 1);
      myFavorite.classList.remove("red");
    } else {
      listOfMyFavoriteArray.push(cliked);
    }
  }
  console.log("listOfMyFavoriteArray", listOfMyFavoriteArray);
  localStorage.setItem("listOfMyFavorite", JSON.stringify(listOfMyFavoriteArray));

  paintAllFavorites();
  assignListenerToRemove();
};

/* funciones herramientas */

const assignListener = () => {
  let containerCards = document.querySelectorAll(".js-li-results");
  for (let i = 0; i < containerCards.length; i++) {
    containerCards[i].addEventListener("click", addFavoriteSeriesFromLocalStorage);
  }
};

const assignListenerToRemove = () => {
  let buttonRemoveFavorite = document.querySelectorAll(".js-button-remove");
  for (let i = 0; i < containerCards.length; i++) {
    buttonRemoveFavorite.addEventListener("click", removeFavorite);
  }
};
/* llamadas */
paintAllFavorites();

//////////////

const removeFavorite = (event) => {
  const notAFavorite = event.currentTarget.id;
  console.log("notAFavorite", notAFavorite);
};

///////////////////////////////////////
