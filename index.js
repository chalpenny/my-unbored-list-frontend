const BACKEND_URL = 'http://localhost:3000'
const CATEGORIES_URL = `${BACKEND_URL}/categories`
const ACTIVITIES_URL = `${BACKEND_URL}/activities`



document.addEventListener("DOMContentLoaded", () => {
   getCategories()

   const categoryForm = document.getElementById("add-category-form")
   categoryForm.addEventListener("submit", (event) => submitCategoryForm(event))


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
        const activitiesList = document.createElement("ul")
        activitiesList.id = `parent-category-${category.id}`
        activitiesList.classList += "activities"
        activitiesList.setAttribute("parent-category", category.id)

        const list = category.activities
        list.forEach((el) => {
            const activitiesInfo = el.name + " " + el.url + " " + el.notes
            activitiesList.innerText += activitiesInfo 
        })
        categoryElement.appendChild(activitiesList) 
    })
}

function submitCategoryForm(event) {
    event.preventDefault()
    var newCatName = {
        name: document.querySelector("#title").value
    }
    postFetch(newCatName)
}

function postFetch(name){
    console.log(name, category)

    // fetch (CATEGORIES_URL, {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify({
    //         name: name
    //     })
    // .then(response => response.json())
    // .then(category => {
    //     const categoryData = category
    //     const categoryMarkup = 
    //         <h2>`${category}`
    //         <button class="edit" edit-category="`${name.id}`">edit</button>
    //         <button class="delete" delete-category="id somehow">delete</button></h2>
    // document.getElementById("category-list").innterHTML += categoryMarkup
    // })
    // })
}


 //Add URL
   // categoryElement.addEventListener("click", showActivities(category))
    // const categoryElement = document.createElement("a") 
    // categoryElement.setAttribute("href", CATEGORIES_URL)
    // categoryElement.innerText = category.name
