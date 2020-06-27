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

    // //EDIT BUTTON
    // const editButton = document.createElement("button")
    // editButton.setAttribute("edit", category.id)
    // editButton.innerText = "edit"
    // categoryElement.appendChild(editButton)
    // editButton.addEventListener("click", editCategory)

    categoryElement.addEventListener("click", () => {

        //DELETE BUTTON
        const deleteButton = document.createElement("button")
        deleteButton.setAttribute("delete", category.id)
        deleteButton.innerText = "delete"
        categoryElement.appendChild(deleteButton)
        deleteButton.addEventListener("click", deleteCategory)

        //SHOW ACTIVITIES
        const list = category.activities
        list.forEach((el) => {
           makeActivityList(el, category)
        })
        activityAddButton(category)
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
            .then(function(newCat){
                makeCategoryList(newCat)
        })
    document.getElementById("title").value=""
}


// //EDIT CATEGORY
// function editCategory(){
//     const editButId = event.target.attributes.edit.value
//     const configObj = {
//         method: "PATCH",
//         headers: {"Content-Type": "application/json"},
//         }

//         fetch (`${CATEGORIES_URL}` + "/" + `${editButId}`, configObj)
//         .then(function(resp){
//             return resp.json()
//         })
//         .then(function(category){
//             const someData = {
//                 name: document.getElementById(`category-name-${category.id}`).value
//                }
//             //    console.log(someData)
//             //    console.log(category)
//         })
// }


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
                makeActivityList(newActivity, `${newActivity.category.id}`)                
            })
}

// LIST ACTIVITIES
function makeActivityList(el, category) {
    const activitiesList = document.createElement("ul")
    activitiesList.id = `parent-category-${category.id}`
    activitiesList.classList += "activity"
    activitiesList.setAttribute("parent-category", category.id)

    const activitiesInfo = el.name + " " + el.url + " " + el.notes
    activitiesList.innerText += activitiesInfo 
    document.getElementById(`category-name-${category.id}`).appendChild(activitiesList)
    activityDeleteButton(el)
}

//ACTIVITY DELETE BUTTON
function activityDeleteButton(el) {
    // console.log(el)
    // const deleteButton = document.createElement("button")
    // deleteButton.setAttribute("delete", el.id)
    // deleteButton.innerText = "delete" 
    
    // const categoryList = document.getElementById(`activity-${el.id}`)
    // categoryList.appendChild(deleteButton)
    // //deleteButton.addEventListener("click", deleteActivity)
}

//DELETE ACTIVITY
function deleteActivity(){
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


    // event.preventDefault()
    // const newCategoryName = document.querySelector("#title").value
    // let categoryName = {
    //     name: newCategoryName
    // }
    // const configObj = {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(categoryName)
    //     }

    //     fetch (CATEGORIES_URL, configObj)
    //         .then(function(resp){
    //             return resp.json()
    //         })
    //         .then(function(newCat){
    //             makeCategoryList(newCat)
    //     })
    // document.getElementById("title").value=""


 // categoryElement.addEventListener("click", addActivityForm)   
//     newActivityButton.setAttribute("new-activity", category.id)
//     newActivityButton.innerText = "add activity"
//     
// }



// //ADD NEW ACTIVITY FORM
// function addActivityForm(){
//     console.log(event.currentTarget.id)
//     const parentCategory = document.getElementById(event.currentTarget.id)
//     const newActivityForm = document.createElement("form")

//     parentCategory.appendChild(newActivityForm)

    // newActivityButton.id = "add-activity-form"
        //<input type="text" id="title"></input>

    /*
    user clicks Add Activity button
    get Category to add activity to
    create form
    append form to DOM
    save activity form to database on submit
    */


//EDIT ACTIVITY

//DELETE ACTIVITY



   
  

    


    // const categoryForm = document.getElementById("add-category-form")
    // categoryForm.addEventListener("submit", (event) => submitCategoryForm(event))





    // event.preventDefault()
    // const newCategoryName = document.querySelector("#title").value
    // let categoryName = {
    //     name: newCategoryName
    // }
    // const configObj = {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(categoryName)
    //     }

    //     fetch (CATEGORIES_URL, configObj)
    //         .then(function(resp){
    //             return resp.json()
    //         })
    //         .then(function(newCat){
    //             makeCategoryList(newCat)
    //     })
    // document.getElementById("title").value=""
    



     //Add URL
   // categoryElement.addEventListener("click", showActivities(category))
    // const categoryElement = document.createElement("a") 
    // categoryElement.setAttribute("href", CATEGORIES_URL)
    // categoryElement.innerText = category.name


    /*
    create a JS class
    create prototype

    create one method for rendering activities

    either create all your html elements at the beg and hide them or at each click delete them all and rerender them, to avoid the duplicate listings.  OR, a validation. 
    */