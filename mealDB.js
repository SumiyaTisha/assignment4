
const displayedMealIds = new Set();

function fetchMealsByIds(mealIds) {
    // Get the 'searchResults' element
    const searchResults = document.getElementById('searchResults');

    // Check if the element exists
    if (!searchResults) {
        console.error("Element with ID 'searchResults' not found.");
        return;
    }

    // Clear previous results and reset the set
    searchResults.innerHTML = '';
    displayedMealIds.clear();

    mealIds.forEach(mealId => {
        if (!displayedMealIds.has(mealId)) {
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                .then(response => response.json())
                .then(data => {
                    // Check if 'meals' property exists and has at least one item
                    if (data.meals && data.meals.length > 0) {
                        const meal = data.meals[0];
                        displayMeal(meal);
                        displayedMealIds.add(mealId);
                    } else {
                        console.error(`Meal with ID ${mealId} not found.;)`);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    });
}

function displayMeal(meal) {
    const searchResults = document.getElementById('searchResults');
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal');

    mealDiv.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
    `;

    searchResults.appendChild(mealDiv);
}