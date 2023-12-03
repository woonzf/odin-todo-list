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
        user.projects.push(project);
        return user;
    }

    function addTask(description, dueDate, priority, id) {
        const projectId = getProjectId(id);
        const index = getIndex(user.projects, projectId);
        const task = new Task(description, dueDate, priority, user.projects[index].tasks, projectId);
        user.projects[index].tasks.push(task);
    }

    function addProject(title) {
        const project = new Project(title, user.projects);
        user.projects.push(project);
    }

    function deleteTask(id) {
        const indexProject = getIndex(user.projects, getProjectId(id));
        const indexTask = getIndex(user.projects[indexProject].tasks, getTaskId(id));
        user.projects[indexProject].tasks.splice(indexTask, 1);
    }

    function setTaskStatus(id, status) {
        const indexProject = getIndex(user.projects, getProjectId(id));
        const indexTask = getIndex(user.projects[indexProject].tasks, getTaskId(id));
        user.projects[indexProject].tasks[indexTask].status = status;
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
    }
    
    class Project {
        constructor(title, list) {
            this.title = title;
            this.id = generateId(list);
        }
        tasks = [];
    
        // Optional
        notes;
        checklist;
    }
    
    class Task {
        constructor(description, dueDate, priority, list, projectId) {
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.id = generateId(list);
            this.projectId = projectId;
        }
        status = false;
    }
    
    function generateId(list) {
        if (list.length === 0) return 1;
        let idList = [];
        for (const item of list) idList.push(item.id);
        return Math.max(...idList) + 1;
    }

    function getIndex(arr, id) {
        return arr.findIndex(el => el.id === id);
    }

    function getProjectId(id) {
        return parseInt(id.split("-")[1]);
    }

    function getTaskId(id) {
        return parseInt(id.split("-")[2]);
    }

    return { init, refresh, addTask, addProject, deleteTask, setTaskStatus };
})()

export { user }
