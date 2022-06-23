const searchButton = document.getElementById('search-btn');
const foodList =  document.getElementById('food');
const foodDetailsContent = document.querySelector('.food-details-content');
const recipeButtonClose = document.getElementById('recipe-close-btn');

//event listeners
searchButton.addEventListener('click', getFoodList);
foodList.addEventListener('click', getFoodRecipe);
recipeButtonClose.addEventListener('click', () => foodDetailsContent.parentElement.classList.remove('showRecipe'));

function getFoodList(){
    let searchInputText = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        let html = '';
        if(data.meals){
        data.meals.forEach(food => {
            html += `
            <div class="fooditem" data-id = "${food.idMeal}">
                <div class="food-img">
                    <img src="${food.strMealThumb}" alt="food">
                </div>
                <div class="food-name">
                    <h3>${food.strMeal}</h3>
                    <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
            </div>`;
        })
        foodList.classList.remove('notFound');
    }else{
        html = "Sorry,no food results found!";
        foodList.classList.add('notFound');
    }
        foodList.innerHTML = html;
    })
}

//get food recipe
function getFoodRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let foodItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)
        .then(response => response.json())
        .then(data => foodRecipeModal(data.meals))
    }
}

function foodRecipeModal(food){
    food = food[0];
    let html = `
        <h2 class="recipe-title">${food.strMeal}</h2>
        <p class="recipe-category">${food.strCategory}</p>
        <div class="recipe-instructions">
            <h3>Instructions:</h3>
            <p>${food.strInstructions}</p>
        </div>
        <div class="recipe-food-image">
            <img src="${food.strMealThumb}" alt="food">
        </div>
        <div class="recipe-link">
            <a href="${food.strYoutube}" target="_blank" >Watch Video</a> 
        </div>`
        foodDetailsContent.innerHTML = html;
        foodDetailsContent.parentElement.classList.add("showRecipe");
}