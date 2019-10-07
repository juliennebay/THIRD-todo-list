function loadScript(){
    const taskInput = document.querySelector("input")
    const addButton = document.querySelector("#addItem")
    const clearButton = document.querySelector("#clearAll")

    function addItem(previouslyStoredItem){
        const ul = document.querySelector("ul")
        if (taskInput.value.length || previouslyStoredItem){
            const li = document.createElement("li")
            li.textContent = previouslyStoredItem || taskInput.value
            ul.appendChild(li)

        //store item in local storage
            if (!previouslyStoredItem){
                const taskItemsArray = JSON.parse(localStorage.getItem("todoItems")) || []
                taskItemsArray.push(taskInput.value)
                localStorage.setItem("todoItems", JSON.stringify(taskItemsArray))

                //taskInput.value gets cleared *AFTER* it gets stored in local storage 
                taskInput.value = ""
                }
        }
    }
    addButton.addEventListener("click", e => addItem())
    taskInput.addEventListener("keyup", e => e.keyCode === 13 && addItem())

    //call the addItem function with each item in local storage (when the pg is refreshed)
    const taskItemsArray = JSON.parse(localStorage.getItem("todoItems"))
    taskItemsArray && taskItemsArray.forEach(item => addItem(item))

    function clearItems(){
        localStorage.setItem("todoItems", JSON.stringify([]))
        const ul = document.querySelector("ul")
        Array.from(ul.children).forEach(element => element.remove())
    }
    clearButton.addEventListener("click", clearItems)
}
document.addEventListener("DOMContentLoaded", loadScript)