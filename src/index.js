console.log(data);

//You can start simple and just render a single
//pokemon card from the first element
console.log(data[0]);

function loadData() {
  const cardList = document.getElementById("cards");
  cardList.innerHTML = "";

  data.forEach((pokemon) => {
    const card = makeCard(pokemon);
    cardList.appendChild(card);
  });
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
  stats.className = 'card--text stats';

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
