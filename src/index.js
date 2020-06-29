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
    })  
}


function makeCategoryList(category){

    //LIST CATEGORIES
    const categoryList = document.getElementById("category-list")
    const categoryElement = document.createElement("h5") 
    categoryElement.id = `category-name-${category.id}`
    categoryElement.innerText = category.name
    categoryList.appendChild(categoryElement)

    //DELETE BUTTON
    const deleteButton = document.createElement("button")
    deleteButton.setAttribute("delete", category.id)
    deleteButton.className="buttonClass"
    deleteButton.innerText = "delete"
    categoryElement.appendChild(deleteButton)
    deleteButton.addEventListener("click", deleteCategory)

    activityAddButton(category)

    categoryElement.addEventListener("click", () => {
        
        //SHOW ACTIVITIES
        function clearActivities() {
            let activityObj = document.getElementsByClassName("activity");
            for (let i = activityObj.length; i > 0 ; i--) {
                activityObj.item(i - 1).remove()}
        }

        clearActivities()
        const list = category.activities
            list.forEach((el) => {
                    makeActivityList(el, category.id)
        })     
    })
}


//CATEGORY ADD NEW 
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
        .then(function(data){
            let newCategory = new Category(data)
            makeCategoryList(newCategory)
    })
    document.getElementById("title").value=""
}


//DELETE CATEGORY
function deleteCategory(){
    const deleteButId = event.target.attributes.delete.value
    const configObj = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
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


//ADD ACTIVITY BUTTON
function activityAddButton(category) {
    const categoryElement = document.getElementById(`category-name-${category.id}`)
    const newActivityButton = document.createElement("button")
    newActivityButton.className="buttonClass"
    newActivityButton.innerText = "add new"
    categoryElement.appendChild(newActivityButton)

    newActivityButton.onclick = function() {
        const newForm = document.createElement("FORM");
        newForm.setAttribute("id", "activityForm");
 
        const name = document.createElement("INPUT");
        name.setAttribute("type", "text");
        name.setAttribute("value", "name");
        newForm.appendChild(name);
          
        const url = document.createElement("INPUT");
        url.setAttribute("type", "text");
        url.setAttribute("value", "url");
        newForm.appendChild(url);

        const notes = document.createElement("INPUT");
        notes.setAttribute("type", "text");
        notes.setAttribute("value", "notes");
        newForm.appendChild(notes)

        const submitBut = document.createElement("INPUT"); 
        submitBut.setAttribute('type',"submit");
        submitBut.setAttribute("id", `${category.id}`)
        submitBut.setAttribute('value',"Submit");
        newForm.appendChild(submitBut);
        
        categoryElement.appendChild(newForm);
        newForm.addEventListener("submit", submitActivityForm)
        newForm.addEventListener("submit", resetForm)
    }
}

//RESET ACTIVITY FORM
function resetForm() {
    let x = document.getElementById("activityForm")
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}


//ACTIVITY ADD NEW 
function submitActivityForm(event) {
    event.preventDefault()

    const formData = document.getElementById("activityForm")
    const newActivityName = formData.attributes[0].ownerElement[0].value
    const activityUrl = formData.attributes[0].ownerElement[1].value
    const activityNotes = formData.attributes[0].ownerElement[2].value
    const categoryId = formData.attributes[0].ownerElement[3].id

    const activityData = {
        name: newActivityName,
        url: activityUrl,
        notes: activityNotes,
        category_id: categoryId
    }
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(activityData)
    }

    fetch (ACTIVITIES_URL, configObj)
        .then(function(resp){
            return resp.json()
        })
        .then(function(data){
            let newActivity = new Activity(data)
            makeActivityList(newActivity, newActivity.category_id)                
        })
}


// LIST ACTIVITIES
function makeActivityList(el, categoryId) {
    const activitiesList = document.createElement("ul")
    activitiesList.id = `activity-${el.id}`
    activitiesList.classList += "activity"
    activitiesList.style.color = "rgb(73, 72, 72)"
    activitiesList.style.fontSize = "18px"

    activitiesList.setAttribute("parent-category", categoryId)

    const activitiesInfo = el.name + " | " + el.url + " | " + el.notes
    activitiesList.innerText += activitiesInfo 
    
    const categoryList = document.getElementById(`category-name-${categoryId}`);
    categoryList.appendChild(activitiesList);
    activityDeleteButton(el)
}


//ACTIVITY DELETE BUTTON
function activityDeleteButton(el) {
    const deleteButton = document.createElement("button")
    deleteButton.setAttribute("delete", el.id)
    deleteButton.className="buttonClass"
    deleteButton.innerText = "delete" 
    
    const categoryList = document.getElementById(`activity-${el.id}`)
    categoryList.appendChild(deleteButton)
    deleteButton.addEventListener("click", deleteActivity)
}


//DELETE ACTIVITY
function deleteActivity(){
    const deleteButId = event.target.attributes.delete.value
    const configObj = {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        }

        fetch (`${ACTIVITIES_URL}` + "/" + `${deleteButId}`, configObj)
        .then(function(resp){
            return resp.json()
        })
        .then(function(activity){
            const deleteBut = document.getElementById(`activity-${activity.id}`)
            deleteBut.remove()
        })
}
