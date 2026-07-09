/* eslint-disable no-undef */
const fs = require("fs");
const readline = require("readline");

const FILE = "./tasks.json";

function loadTasks() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, "[]");
    }

    return JSON.parse(fs.readFileSync(FILE));
}

function saveTasks(tasks) {
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log("\n===== TASK MANAGER =====");
    console.log("1. Ver tareas");
    console.log("2. Agregar tarea");
    console.log("3. Completar tarea");
    console.log("4. Eliminar tarea");
    console.log("5. Salir");

    rl.question("\nSeleccione una opción: ", option => {

        switch (option) {
            case "1":
                listTasks();
                break;

            case "2":
                addTask();
                break;

            case "3":
                completeTask();
                break;

            case "4":
                deleteTask();
                break;

            case "5":
                rl.close();
                break;

            default:
                console.log("Opción inválida");
                menu();
        }
    });
}

function listTasks() {
    const tasks = loadTasks();

    if (tasks.length === 0) {
        console.log("\nNo hay tareas.");
    } else {
        console.log("\nLista de tareas:\n");

        tasks.forEach(task => {
            console.log(
                `${task.id}. [${task.completed ? "✓" : " "}] ${task.title}`
            );
        });
    }

    menu();
}

function addTask() {
    rl.question("Nombre de la tarea: ", title => {

        const tasks = loadTasks();

        const task = {
            id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
            title,
            completed: false
        };

        tasks.push(task);

        saveTasks(tasks);

        console.log("Tarea agregada.");

        menu();
    });
}

function completeTask() {

    const tasks = loadTasks();

    listWithoutMenu(tasks);

    rl.question("ID de la tarea: ", id => {

        const task = tasks.find(t => t.id == id);

        if (!task) {
            console.log("No existe.");
        } else {
            task.completed = true;
            saveTasks(tasks);
            console.log("Tarea completada.");
        }

        menu();
    });

}

function deleteTask() {

    const tasks = loadTasks();

    listWithoutMenu(tasks);

    rl.question("ID de la tarea: ", id => {

        const newTasks = tasks.filter(t => t.id != id);

        if (newTasks.length === tasks.length) {
            console.log("No existe.");
        } else {
            saveTasks(newTasks);
            console.log("Tarea eliminada.");
        }

        menu();

    });

}

function listWithoutMenu(tasks) {

    console.log("");

    tasks.forEach(task => {
        console.log(
            `${task.id}. [${task.completed ? "✓" : " "}] ${task.title}`
        );
    });

    console.log("");
}

menu();