const Task = require('./task');

class Tasks {

    _list = {};

    get listArray() {
        const lists = [];
        Object.keys(this._list).forEach(key => {
            const task = this._list[key];
            lists.push(task);
        });
        return lists;
    }

    constructor() {
        this._list = {};
    }

    deleteTask(id = '') {
        if(this._list[id]) {
            delete this._list[id];
        }
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task;
        });
    }

    createTask(description = ''){
        const task = new Task(description);
        this._list[task.id] = task;
    }

    listCompleted() {

        console.log('');
        this.listArray.forEach((task, i) => {

            const idx = `${i + 1}`.green;
            const { description, completedIn } = task;
            const status = ( completedIn )
                ? 'Completado'.green
                : 'Pendiente'.red;

            console.log(`${ idx } ${ description } :: ${ status }`)

        })
    }

    listPendingOrComplete(complete = true) {

        console.log('');
        let count = 0;
        this.listArray.forEach((task) => {

            const { description, completedIn } = task;
            const status = ( completedIn )
                ? 'Completado'.green
                : 'Pendiente'.red;

            if (complete) {
                if (completedIn) {
                    count++;
                    console.log(`${ (count + '.').green } ${ description } :: ${ completedIn.green }`);
                }
            } else {
                if (!completedIn) {
                    count++;
                    console.log(`${ (count + '.').green } ${ description } :: ${ status }`);
                }
            }
        })
    }

    toggleComplete(ids = []) {
        ids.forEach( id => {
            const task = this._list[id];
            if( !task.completedIn ) {
                task.completedIn = new Date().toISOString();
            }
        })

        this.listArray.forEach(task => {
            if(!ids.includes(task.id)){
                this._list[task.id].completedIn = null;
            }
        })
    }
}

module.exports = Tasks;