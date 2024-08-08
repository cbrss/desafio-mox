const menu = document.getElementById("menu");
const game = document.getElementById("game");

const colorsContainer = document.getElementById("colorsContainer");

const fragment = document.createDocumentFragment();
const templateCardColor = document.getElementById("templateColorBox");

let currentHexColor;
let currentDifficulty;

/// falta que en facil los colores sean similares y en dificil los colores sean distintos

document.addEventListener("click", (e) => {
	if (e.target.matches("#play")) {
		const difficulty = document.getElementById("difficulty").value;
		startGame(difficulty);
	}

	if (e.target.matches("#restart")) {
		generateColors(currentDifficulty);
	}

	if (e.target.matches("#backToMenu")) {
		backToMenu(difficulty);
	}
});

function startGame(difficulty) {
	currentDifficulty = difficulty;
	menu.classList.add("d-none");
	game.classList.remove("d-none");
	generateColors(difficulty);
}

function backToMenu() {
	game.classList.add("d-none");
	menu.classList.remove("d-none");
}

function generateColors(difficulty) {
	colorsContainer.innerHTML = "";

	currentHexColor = getRandomColor();
	document.getElementById(
		"hex_color"
	).textContent = `¿Cual es el color: ${currentHexColor}?`;
	const colors = [currentHexColor];

	const numColors =
		difficulty === "easy" ? 3 : difficulty === "normal" ? 6 : 9;

	for (let i = 1; i < numColors; i++) {
		let newCol = getSimilarColor(difficulty, currentHexColor);
		colors.push(newCol);
	}

	colors.sort(() => Math.random() - 0.5);

	colors.forEach((color) => {
		const clone = templateCardColor.content.cloneNode(true);
		const colorBox = clone.querySelector(".colorBox");
		colorBox.style.backgroundColor = color;
		colorBox.dataset.hexColor = color;
		fragment.appendChild(clone);
	});

	colorsContainer.appendChild(fragment);
}

colorsContainer.addEventListener("click", (event) => {
	if (event.target.classList.contains("colorBox")) {
		checkColor(event.target.dataset.hexColor, currentHexColor);
	}
});

function getRandomColor() {
	const letters = "0123456789ABCDEF";
	let color = "#";

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	return color;
}
function getSimilarColor(difficulty, hexCode) {
	let r1 = parseInt(hexCode.substring(1, 3), 16);
	let g1 = parseInt(hexCode.substring(3, 5), 16);
	let b1 = parseInt(hexCode.substring(5, 7), 16);

	let variation;
	if (difficulty === "easy") {
		variation = 255;
	} else if (difficulty === "normal") {
		variation = 100;
	} else {
		variation = 50;
	}
	function applyVariation(value) {
		let newValue =
			value + Math.floor(Math.random() * (2 * variation + 1)) - variation;
		return Math.min(255, Math.max(0, newValue));
	}

	let r2 = applyVariation(r1);
	let g2 = applyVariation(g1);
	let b2 = applyVariation(b1);

	let newColor = `#${r2.toString(16).padStart(2, "0")}${g2
		.toString(16)
		.padStart(2, "0")}${b2.toString(16).padStart(2, "0")}`;
	return newColor;
}

function checkColor(selectedColor, correctColor) {
	if (selectedColor === correctColor) {
		alert("Ganaste!");
		generateColors(currentDifficulty);
	} else {
		alert("Perdiste :(");
	}
}
