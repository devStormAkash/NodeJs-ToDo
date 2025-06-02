const fs = require('fs')
const filePath = "./tasks.json"
const listFilePath = "./list.txt"

// Creating the function loadTask()
const loadTask = () => {
    try {
        const dataBuffer = fs.readFileSync(filePath)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON) // Return type is array
    } catch (error) {
        return []
    }
}

// Creating the function saveTask()
const saveTask = (tasks) => {
    const dataJSON = JSON.stringify(tasks)
    fs.writeFileSync(filePath, dataJSON)
}


// Creating the function addTask()
const addTask = (task) => {
    const tasks = loadTask()
    tasks.push({ task })
    saveTask(tasks)
    taskList()
}

// Creating the function listTask()
const taskList = () => {
    const tasks = loadTask()
    fs.writeFileSync(listFilePath,'')
    tasks.forEach((task, index) => {
        console.log(`${index + 1} - ${task.task}`);
        fs.appendFileSync(listFilePath, `${index + 1} - ${task.task}\n`);
    })
    
}

// Creating the function removeTask()
const removeTask = (index)=>{
    if (index > 0) {
        let tasks = loadTask()
        tasks = tasks.filter((value, idx) => index - 1 != idx)
        saveTask(tasks)
        taskList()
    }
    else {
        console.error("Invalid index of task");
        
    }
}

// All the commands for todo 
const command = process.argv[2]
const arguement = process.argv[3]

if (command === "add") {
    addTask(arguement)
}
else if (command === "list"){
    taskList()
}
else if (command === "remove") {
    removeTask(Math.floor(Number(arguement)))
}
else {
    console.log("Command not found");
}