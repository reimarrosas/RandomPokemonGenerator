"use strict";

const pokemonData = {
	id: document.querySelector(".id > span"),
	pokeName: document.querySelector(".name"),
	category: document.querySelector(".category"),
	portrait: document.querySelector(".portrait"),
	type: document.querySelector(".type-text > strong"),
	weight: document.querySelector(".weight > p > span"),
	height: document.querySelector(".height > p > span"),
	abilityList: document.querySelector(".ability-list"),
	gen: document.querySelector(".gen"),
};

const toTitleCase = function (text) {
	let textArray = text.trim().split(" ");

	textArray = textArray.map(
		(word) => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
	);
	return textArray.join(" ");
};

document.querySelector(".reload").addEventListener("click", () => {
	const randomPokeID = Math.floor(Math.random() * 898) + 1;
	fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokeID}`)
		.then((response) => response.json())
		.then((data) => {
			pokemonData.id.textContent = randomPokeID;
			pokemonData.pokeName.textContent = toTitleCase(data.name);
			pokemonData.portrait.src = data.sprites.front_default;

			const types = [];
			data.types.forEach((type) => {
				types.push(type.type.name);
			});
			pokemonData.type.textContent = toTitleCase(types.join(", "));

			pokemonData.weight.textContent = Number(data.weight) / 10;
			pokemonData.height.textContent = Number(data.height) / 10;

			const normalAbility = data.abilities.filter(
				(ability) => !ability.is_hidden
			);

			for (let i = 0; i < normalAbility.length; ++i) {
				pokemonData.abilityList.querySelectorAll(".ability")[
					i
				].textContent = toTitleCase(normalAbility[i].ability.name);
			}
			const [hiddenAbility] = data.abilities.filter(
				(ability) => ability.is_hidden
			);

			if (hiddenAbility !== undefined) {
				pokemonData.abilityList.querySelector(
					".ability0"
				).textContent = toTitleCase(hiddenAbility.ability.name);
			}
		});

	fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomPokeID}`)
		.then((response) => response.json())
		.then((data) => {
			pokemonData.gen.textContent = data.generation.name
				.slice(data.generation.name.indexOf("-") + 1)
				.toUpperCase();
			pokemonData.category.textContent = data.genera[7].genus;
		});
});
