const searchButton = document.getElementById('search-btn');
const foodList =  document.getElementById('food');
const foodDetailsContent = document.querySelector('.food-details-content');
const recipeButtonClose = document.getElementById('recipe-close-btn');

//event listeners
searchButton.addEventListener('click', getFood);

function getFood(){
    let searchInputText = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        let html = '';
        if(data.meals){
        data.meals.forEach(meal => {
            html += `
            <div class="food-item" data-id = "${meal.idMeal}">
                <div class="food-img">
                    <img src="${meal.strMealThumb}" alt="food">
                </div>
                <div class="food-name">
                    <h3>${meal.strMeal}</h3>
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