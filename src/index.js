// console.log(data);

//You can start simple and just render a single
//pokemon card from the first element
// console.log(data[0]);

function loadData() {
  const cardList = document.getElementById("cards");
  cardList.innerHTML = "";

  data.forEach((pokemon) => {
    const card = makeCard(pokemon);
    const button = document.createElement("button");
    button.textContent = "Show Game Appearances";
    button.className = "card--button";
    button.onclick = () => showGameAppearances(card, pokemon);
    card.appendChild(button);
    cardList.appendChild(card);
  });
}

function showGameAppearances(card, pokemon) {
  const popup = document.getElementById("popup");
  const popupCard = document.getElementById("popup-card");
  popupCard.innerHTML = "";

  const li = document.createElement("li");

  console.log(pokemon.sprites.versions);
  let games = "";

  for (const generation in pokemon.sprites.versions) {
    if (pokemon.sprites.versions.hasOwnProperty(generation)) {
      for (const game in pokemon.sprites.versions[generation]) {
        if (pokemon.sprites.versions[generation].hasOwnProperty(game)) {
          games +=  game + ',  ';
        }
      }
    }
  }
  li.textContent = games;

  //   pokemon.sprites.versions.forEach(version => {
  //     console.log(version)
  //   });

  popupCard.appendChild(card);
  popupCard.appendChild(li);

  popup.style.display = "flex";

  const closeButton = document.querySelector(".close-button");
  closeButton.onclick = () => {
    popup.style.display = "none";
    loadData(); //not a good solution but I am lazy :P
  };
}

function makeCard(pokemon) {
  const li = document.createElement("li");
  const img = document.createElement("img");

  img.src = pokemon.sprites.other["official-artwork"].front_default;
  img.alt = pokemon.name;
  img.className = "card--img";

  li.textContent = pokemon.name;
  li.className = "card";

  const name = document.createElement("p");
  //   name.textContent = pokemon.name;
  name.className = "card--text";

  const stats = document.createElement("div");
  stats.className = "card--text stats";

  pokemon.stats.forEach((stat) => {
    const statElement = document.createElement("p");
    statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    stats.appendChild(statElement);
  });

  li.appendChild(img);
  li.appendChild(name);
  li.appendChild(stats);
  return li;
}

loadData();
