document.addEventListener("DOMContentLoaded", async () => {
    let cards = localStorage.getItem("gallery") ? JSON.parse(localStorage.getItem("gallery")) : [];
  
    async function fetchRandomPokemon() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
      if (response.ok) {
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomPokemonUrl = data.results[randomIndex].url;
        const pokemonResponse = await fetch(randomPokemonUrl);
        if (pokemonResponse.ok) {
          return await pokemonResponse.json();
        }
      }
      throw new Error('Failed to fetch random Pokemon');
    }
  
    function renderCard(pokemon) {
      if (!pokemon.sprites.front_default || !pokemon.sprites.back_default) {
        return null; // Skip adding this Pokemon
      }
  
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card");
  
      const frontImg = document.createElement("img");
      frontImg.src = pokemon.sprites.front_default;
      frontImg.alt = 'Front Image';
  
      const backImg = document.createElement("img");
      backImg.src = pokemon.sprites.back_default;
      backImg.alt = 'Back Image';
  
      const name = document.createElement("div");
      name.textContent = pokemon.name;
  
      const type = document.createElement("div");
      type.textContent = pokemon.types[0].type.name; // Assuming only one type
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        deleteCard(pokemon.name);
      });
      
      const favButton = document.createElement("button");
      favButton.textContent = "favorite";
      favButton.addEventListener("click", () => {
        favButton(pokemon);
      });
  
      const moreButton = document.createElement("button");
      moreButton.textContent = "More Info";
      moreButton.addEventListener("click", () => {
        moreinfo(pokemon);
      });
  
      cardDiv.appendChild(frontImg);
      cardDiv.appendChild(backImg);
      cardDiv.appendChild(name);
      cardDiv.appendChild(type);
      cardDiv.appendChild(deleteButton);
      cardDiv.appendChild(favButton);   
      cardDiv.appendChild(moreButton);      
      document.getElementById("gallery").appendChild(cardDiv);
    }
  
    function rendercards() {
      const container = document.querySelector("#gallery");
      container.replaceChildren();
      cards.forEach((card) => renderCard(card));
  
      const moreButton = document.querySelector("#add-more");
      
      if (cards.length) {
        moreButton.classList.remove("hidden"); // Show clear button if tasks exist
      } else {
        moreButton.classList.add("hidden"); // Hide clear button if no tasks
      
      }
      localStorage.setItem("gallery", JSON.stringify(cards)); // Save tasks to localStorage
    }
  
    document.getElementById("add-Pokemon").addEventListener("click", () => {
        if (cards.length === 0) { // Check if the cards array is empty
            for (let i = 0; i < 6; i++) {
                add();
            }
        } else {
            for (let i = 0; i < 3; i++) {
                add();
            }
        }
    });
    
  
    function deleteCard(name) {
      cards = cards.filter((card) => card.name !== name);
      rendercards();
    }
  
    async function add() {
      const randomPokemon = await fetchRandomPokemon();
    //   if (!cards.find((card) => card.name === randomPokemon.name)){
        cards.push(randomPokemon);
        rendercards();
    //   }
      
    }
  
    function moreinfo(pokemon) {
      console.log("More info about:", pokemon.name);
    }
  
    rendercards();
  });
  