import iconUser from '../img/topguntocat.png';

const user = (() => {
    let user = null;

    function init() {
        user = registerUser();
        return user;
    }

    function refresh() {
        console.log(user)
        return user;
    }

    function addNewTask(description, dueDate, priority, projectId) {
        const index = user.projects.findIndex(project => project.id === parseInt(projectId.split("-")[1]));
        const task = new Task(description, dueDate, priority, user.projects[index].tasks);
        user.projects[index].addTask(task);
    }

    function registerUser() {
        let name = "John";
        // while (name === "") name = prompt("Welcome, what is your name?");
        return createUser(name);
    }

    function createUser(name) {
        const user = new User(name);
        user.icon.src = iconUser;
        user.icon.alt = "Topguntocat";
        const project = new Project("Default", user.projects);
        user.addProject(project);
        return user;
    }

    class User {
        constructor(name) {
            this.name = name;
        }
        icon = {
            src: null,
            alt: null,
        };
        projects = [];
        addProject(project) {
            this.projects.push(project);
        }
    }
    
    class Project {
        constructor(title, list) {
            this.title = title;
            this.id = generateId(list);
        }
        tasks = [];
        addTask(task) {
            this.tasks.push(task);
        }
    
        // Optional
        notes;
        checklist;
    }
    
    class Task {
        constructor(description, dueDate, priority, list) {
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.id = generateId(list);
        }
        status = false;
    }
    
    function generateId(list) {
        if (list.length === 0) return 1;
        let idList = [];
        for (const item of list) idList.push(item.id);
        return Math.max(...idList) + 1;
    }

    return { init, refresh, addNewTask };
})()

export { user }
