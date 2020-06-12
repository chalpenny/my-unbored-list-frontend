const BACKEND_URL = 'http://localhost:3000'
const CATEGORIES_URL = `${BACKEND_URL}/categories`
const ACTIVITIES_URL = `${BACKEND_URL}/activities`



document.addEventListener("DOMContentLoaded", () => {
   getCategoriesList()
})

function getCategoriesList(){
    fetch(CATEGORIES_URL)
    .then(response => response.json())
    .then(categories => {
    for (category of categories)
    makeCategoryList(category)
    })  
}

function makeCategoryList(category){
    const categoryList = document.getElementById("category-list")
    const categoryListBr = document.createElement("br")

    const categoryElement = document.createElement("a") 
    categoryElement.setAttribute("href", CATEGORIES_URL)
    categoryElement.innerText = category.name

    categoryList.appendChild(categoryElement).appendChild(categoryListBr)

    showActivities()
}

function showActivities(){
    console.log("ready for activities")
        /* add event listener on click, prevent_default action 
        iterate over category to display category.activity */
}
