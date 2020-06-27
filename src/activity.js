class Activity {

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.url = data.url
        this.notes = data.notes
        this.category_id = data.category.id
        Activity.all.push(this)  
    }
    
    // render() {
    //     debugger
    //     // const activityData = document.createElement("li")
    //     // activityData.setAttribute("parent-category", this.category_id)
    //     // activityData.innerHTML += this



    //     categoryElement.addEventListener("click", () => {
    //         const activitiesList = document.createElement("ul")
    //         activitiesList.id = `parent-category-${category.id}`
    //         activitiesList.classList += "activities"
    //         activitiesList.setAttribute("parent-category", category.id)
    
    //         const list = category.activities
    //         list.forEach((el) => {
    //             const activitiesInfo = el.name + " " + el.url + " " + el.notes
    //             activitiesList.innerText += activitiesInfo 
    //             categoryElement.appendChild(activitiesList)
    //             deleteActivityButton(el)
    // }
}

Activity.all = []

