import { Project, generateId } from './function';

import iconUser from '../img/topguntocat.png';

const user = (() => {
    function init() {
        return registerUser();
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

    return { init };
})()

export { user }
