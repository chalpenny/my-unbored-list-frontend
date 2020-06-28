class Activity {

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.url = data.url
        this.notes = data.notes
        this.category_id = data.category.id
        Activity.all.push(this)  
    }
}

Activity.all = []

