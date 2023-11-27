import iconUser from '../img/topguntocat.png';

const user = (() => {
    function init() {
        return registerUser();
    }

    function test() {
        const user = new User("John");
        const project = new Project("Shopping", generateId(user.projects));
        const task = new Task("Potato", "16 November 2023", "Urgent", generateId(project.tasks));
        project.tasks.push(task);
        user.projects.push(project);

        const user2 = new User("Alice");

        console.log(user, user2)
        console.log(user.projects[0])
        console.log(user.projects[0].tasks[0])
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
        const project = new Project("Default", generateId(user.projects));
        user.projects.push(project);
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
    }

    class Project {
        constructor(title, id) {
            this.title = title;
            this.id = id;
        }
        tasks = [];

        // Optional
        notes;
        checklist;
    }

    class Task {
        constructor(description, dueDate, priority, id) {
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.id = id;
        }
        status = false;
    }

    function generateId(list) {
        if (list.length === 0) return 1;
        let idList = [];
        for (const item of list) idList.push(item.id);
        return Math.max(...idList) + 1;
    }

    return { init };
})()

export { user }
