class Category {

    constructor(data) {
        this.id = data.id
        this.name = data.name
        Category.all.push(this)  
    }
}

Category.all = []
