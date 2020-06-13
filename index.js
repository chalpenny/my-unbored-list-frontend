const BACKEND_URL = 'http://localhost:3000'
const CATEGORIES_URL = `${BACKEND_URL}/categories`
const ACTIVITIES_URL = `${BACKEND_URL}/activities`



document.addEventListener("DOMContentLoaded", () => {
   getCategories()
})

function getCategories(){
    fetch(CATEGORIES_URL)
    .then(response => response.json())
    .then(categories => {
    for (category of categories)
    makeCategoryList(category)
    //activities edit, delete
    })  
}

function makeCategoryList(category){

    //LIST CATEGORIES
    const categoryList = document.getElementById("category-list")
    const categoryElement = document.createElement("h2") 
    categoryElement.innerText = category.name
    categoryList.appendChild(categoryElement)

    //EDIT BUTTON
    const editButton = document.createElement("button")
    editButton.classList += "edit"
    editButton.setAttribute("edit-category", category.id)
    editButton.innerText = "edit"
    categoryElement.appendChild(editButton)

    //DELETE BUTTON
    const deleteButton = document.createElement("button")
    deleteButton.classList += "delete"
    deleteButton.setAttribute("delete-category", category.id)
    deleteButton.innerText = "delete"
    categoryElement.appendChild(deleteButton)

    //SHOW ACTIVITIES ON CLICK
    categoryElement.addEventListener("click", () => {
        const activitiesList = document.createElement("li")
        activitiesList.classList += "activities"
        activitiesList.setAttribute("parent-category", category.id)
        activitiesList.innerText = " activity here" 
            //  iterate over category.activity to display name, url, notes */

        categoryElement.appendChild(activitiesList) 
    })

}
 //Add URL
   // categoryElement.addEventListener("click", showActivities(category))
    // const categoryElement = document.createElement("a") 
    // categoryElement.setAttribute("href", CATEGORIES_URL)
    // categoryElement.innerText = category.name
