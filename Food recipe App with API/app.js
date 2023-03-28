const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// add event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim()
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then((res) => res.json())
    .then((data) => {
        // console.log(data);
        let html = ""
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                <div class = "meal-item" data-id = "${meal.idMeal}">
                    <div class = "meal-img">
                        <img src = "${meal.strMealThumb}" alt = "food">
                    </div>
                    <div class = "meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href = "#" class = "recipe-btn">Get Recipe</a>
                    </div>
                </div>
                `;
            });
            mealList.classList.remove('notFound')
        } else {
            html = "Sorry Boss! I can't find a meal with that ingredient!"
            mealList.classList.add('notFound')
        }
        
        mealList.innerHTML = html;
    })
}
getMealList()


// Time to get the recipes.

function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItems = e.target.parentElement.parentElement;
        // console.log(mealItems);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItems.dataset.id}`)
        .then((res) => res.json())
        .then((data) => mealRecipeModal(data.meals))
    }
}


function mealRecipeModal(meal) {
    console.log(meal);
    meal = meal[0];
    let html = `<h2 class = "recipe-title">"${meal.strMeal}"</h2>
                <p class = "recipe-category">"${meal.strCategory}"</p>
                <div class = "recipe-instruct">
                    <h3>Instructions:</h3>
                    <p>"${meal.strInstructions}"</p>
                </div>
                <div class = "recipe-meal-img">
                    <img src = "${meal.strMealThumb}" alt = "">
                </div>
                <div class = "recipe-link">
                    <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
                </div>`

    mealDetailsContent.innerHTML = html
    mealDetailsContent.parentElement.classList.add('showRecipe')
}


// light/dark mode

let moon = document.querySelector(".fa-moon")
let sun = document.querySelector(".fa-sun")

function toggleTheme() {
    const html = document.querySelector('html');
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
      html.setAttribute('data-theme', 'dark');
      sun.style.display = "none"
      moon.style.display = "block"
    
    } else {
      html.setAttribute('data-theme', 'light');
      sun.style.display = "block"
      moon.style.display = "none"
    }
}


  


// function lightMode() {
//     console.log('clicked');
//     if (darkMode.classList.contains("bx-moon")) {
//         darkMode.classList.replace("fa-moon", "fa-sun")
//         document.body.classList.add("active")
//     } 
//     else {
//         darkMode.classList.replace("bx-sun", "bx-moon")
//         document.body.classList.remove("active")
//     }
// }