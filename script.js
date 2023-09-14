const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const ingredientsInput = document.querySelector('#ingredients');
const instructionsInput = document.querySelector('#instructions');
const recipesList = document.querySelector('#recipes');
const searchInput = document.querySelector('#search');

let recipes = [];

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const recipe = {
		name: nameInput.value,
		ingredients: ingredientsInput.value,
		instructions: instructionsInput.value
	};
	recipes.push(recipe);
	displayRecipes();
	form.reset();
});

recipesList.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const recipeIndex = e.target.parentNode.dataset.index;
		recipes.splice(recipeIndex, 1);
		displayRecipes();
	}
});

searchInput.addEventListener('input', () => {
	displayRecipes();
});

function displayRecipes() {
	recipesList.innerHTML = '';
	const filteredRecipes = recipes.filter((recipe) => {
		return recipe.name.toLowerCase().includes(searchInput.value.toLowerCase());
	});
	filteredRecipes.forEach((recipe, index) => {
		const recipeElement = document.createElement('li');
		recipeElement.dataset.index = index;
		recipeElement.innerHTML = `
			<h3>${recipe.name}</h3>
			<p>${recipe.ingredients}</p>
			<p>${recipe.instructions}</p>
			<button>Delete</button>
		`;
		recipesList.appendChild(recipeElement);
	});
}