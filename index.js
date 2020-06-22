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
    categoryElement.id = `category-name-${category.id}`
    categoryElement.innerText = category.name
    categoryList.appendChild(categoryElement)

    //EDIT BUTTON
    const editButton = document.createElement("button")
    editButton.classList += "edit"
    editButton.setAttribute("edit", category.id)
    editButton.innerText = "edit"
    categoryElement.appendChild(editButton)
 
    //DELETE BUTTON
    const deleteButton = document.createElement("button")
    deleteButton.id = "delete-button"
    deleteButton.classList += "delete"
    deleteButton.setAttribute("delete", category.id)
    deleteButton.innerText = "delete"
    categoryElement.appendChild(deleteButton)
    deleteButton.addEventListener("click", deleteCategory)

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
        //addActivtiesForm()
    })
}


//ADD NEW CATEGORY
function submitCategoryForm(event) {
    event.preventDefault()
    const newCategoryName = document.querySelector("#title").value
    let categoryName = {
        name: newCategoryName
    }
    const configObj = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(categoryName)
        }
        fetch (CATEGORIES_URL, configObj)
            .then(function(resp){
                return resp.json()
            })
            .then(function(newCat){
                makeCategoryList(newCat)
        })
}

//DELETE CATEGORY
function deleteCategory(){
    event.preventDefault()
    const deleteButId = event.target.attributes.delete.value
    // let deleteId = {
    //     id: deleteButId
    // }
    const configObj = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        //body: JSON.stringify(deleteId)
        }
        fetch (`${CATEGORIES_URL}` + "/" + `${deleteButId}`, configObj)
        .then(function(resp){
            return resp.json()
        })
        .then(function(category){
         const deleteBut = document.getElementById(`category-name-${category.id}`)
         deleteBut.remove()
        })
}



    // function addActivtiesForm() {
    //     const parentActivity = document.getElementById(`parent-category-${category.id}`)
        
    //     const newActivityButton = document.createElement("form")
    //     newActivityButton.id = "add-activity-form"
        
    //     categoryElement.appendChild(newActivityButton)}
    



     //Add URL
   // categoryElement.addEventListener("click", showActivities(category))
    // const categoryElement = document.createElement("a") 
    // categoryElement.setAttribute("href", CATEGORIES_URL)
    // categoryElement.innerText = category.name