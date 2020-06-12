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
    // make Add A Category button function to go here

}

function makeCategoryList(category) {
    /* make const in htmal file for category to attach to
        attach cat element to const
        attach cat el const to html const
    */
    const categoryList = document.getElementById("category-list")
    const categoryElement = document.createElement("h2") 
    categoryElement.innerText = category.name
    categoryList.appendChild(categoryElement)

    console.log(category)
}

