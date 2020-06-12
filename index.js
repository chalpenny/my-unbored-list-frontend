const BACKEND_URL = 'http://localhost:3000'
const CATEGORIES_URL = `${BACKEND_URL}/categories`
const ACTIVITIES_URL = `${BACKEND_URL}/activities`



document.addEventListener("DOMContentLoaded", () => {
   getCategoriesList()
})

function getCategoriesList(){
    fetch(CATEGORIES_URL)
    .then(response => response.json())
    .then(category => {
    console.log(category)
 
    })
    console.log("loaded")
}