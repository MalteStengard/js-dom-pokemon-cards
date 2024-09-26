// console.log(data);

//You can start simple and just render a single
//pokemon card from the first element
// console.log(data[0]);
let currentIndex = 0;

function loadData() {
  const cardList = document.getElementById("cards");
  cardList.innerHTML = "";

  data.forEach((pokemon) => {
    const card = makeCard(pokemon);
    const button = document.createElement("button");
    button.textContent = "Show Game Appearances";
    button.className = "card--button";
    button.onclick = () => showGameAppearances(card, pokemon, button);
    card.appendChild(button);
    cardList.appendChild(card);
  });
}

function showGameAppearances(card, pokemon, button) {
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
          games += game + ",  ";
        }
      }
    }
  }
  li.textContent = games;


  card.removeChild(button)


  card.appendChild(li);

  popupCard.appendChild(card);


  popup.style.display = "flex";

  const nextImgButton = document.createElement("button");
  nextImgButton.textContent = "Next Image";
  nextImgButton.className = "img-button";
  nextImgButton.onclick = () => nextImage(card, pokemon);

  const prevImgButton = document.createElement("button");
  prevImgButton.textContent = "Previous Image";
  prevImgButton.className = "img-button";
  prevImgButton.onclick = () => prevImage(card, pokemon);

  const resetImgButton = document.createElement("button");
  resetImgButton.textContent = "Reset Image";
  resetImgButton.className = "img-button";
  resetImgButton.onclick = () => resetImage(card, pokemon);

  popupCard.appendChild(prevImgButton);
  popupCard.appendChild(nextImgButton);
  popupCard.appendChild(resetImgButton);

  const closeButton = document.querySelector(".close-button");
  closeButton.onclick = () => {
    popup.style.display = "none";
    loadData(); //not a good solution but I am lazy :P
  };
}

function compileImageSources(pokemon) {
 const imageSources = []
 console.log("Img compiler hit")

 for (const key in pokemon.sprites) {
    if (pokemon.sprites.hasOwnProperty(key)) {
      const value = pokemon.sprites[key];
      if (typeof value === 'string' && value) {
        imageSources.push(value);
      } else if (typeof value === 'object' && value !== null) {
        for (const subKey in value) {
          if (value.hasOwnProperty(subKey) && value[subKey]) {
            imageSources.push(value[subKey]);
          }
        }
      }
    }
  }

  console.log(imageSources)
  return imageSources;
}

  function nextImage(card, pokemon) {
    const imageSources = compileImageSources(pokemon);
    currentIndex = (currentIndex + 1) % imageSources.length;
    card.querySelector('img').src = imageSources[currentIndex];
  }
  
  function prevImage(card, pokemon) {
    const imageSources = compileImageSources(pokemon);
    currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
    card.querySelector('img').src = imageSources[currentIndex];
  }
  
  function resetImage(card, pokemon) {
    console.log("reset hit ", pokemon)
    const img = card.querySelector("img");
    img.src = pokemon.sprites.other["official-artwork"].front_default
    currentIndex = 0;
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
