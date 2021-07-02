require('colors');

const { saveDB, readDB } = require('./helpers/saveFile');
const {
    inquirerMenu,
    pause,
    readInput,
    listTasksDelete,
    confirm,
    showListCheckList
} = require('./helpers/inquirer');
const Tasks = require('./models/tasks');


const main = async () => {

    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if (tasksDB) {
        tasks.loadTasksFromArray(tasksDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // create option
                const description = await readInput('Descripción:')
                tasks.createTask(description);
            break;
            case '2':
                tasks.listCompleted();
                break;
            case '3':
                tasks.listPendingOrComplete(true);
                break;
            case '4':
                tasks.listPendingOrComplete(false);
                break;
            case '5':
                const ids = await showListCheckList(tasks.listArray);
                tasks.toggleComplete(ids);
                break;
            case '6':
                const id = await listTasksDelete(tasks.listArray);
                if (id !== '0') {
                    const ok = await confirm('¿Está seguro?')
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        }

        saveDB( tasks.listArray );

        await pause();

    } while (opt !== '0');
}

main();