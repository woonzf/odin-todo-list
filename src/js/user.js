import iconUser from '../img/topguntocat.png';

const user = (() => {
    let user = null;

    function init() {
        const storageUser = localStorage.getItem("todoUser");
        if (_checkUserExist(storageUser) === false) {
            user = _registerUser();
            _saveLocal();
        }
        else user = JSON.parse(storageUser);
    }

    function _checkUserExist(storageUser) {
        if (storageUser === null) return false;
        else return true;
    }

    function _saveLocal() {
        localStorage.setItem("todoUser", JSON.stringify(user));
    }

    function refresh() {
        return user;
    }

    function _registerUser() {
        let name = "John";
        // while (name === "") name = prompt("Welcome, what is your name?");
        return _createUser(name);
    }

    function _createUser(name) {
        const user = new _User(name);
        user.icon.src = iconUser;
        user.icon.alt = "Topguntocat";
        const project = new _Project("Default", user.projects);
        user.projects.push(project);
        return user;
    }

    function addTask(description, dueDate, priority, id) {
        const projectId = _getProjectId(id);
        const index = _getIndex(user.projects, projectId);
        const task = new _Task(description, dueDate, priority, user.projects[index].tasks, projectId);
        user.projects[index].tasks.push(task);
        _saveLocal();
    }

    function addProject(title) {
        const project = new _Project(title, user.projects);
        user.projects.push(project);
        _saveLocal();
    }

    function deleteItem(type, id) {
        const indexProject = _getIndex(user.projects, _getProjectId(id));

        switch(type) {
            case "task":
                const indexTask = _getIndex(user.projects[indexProject].tasks, _getTaskId(id));
                user.projects[indexProject].tasks.splice(indexTask, 1);
                break;
            case "project":
                user.projects.splice(indexProject, 1);
                break;
            default:
                break;
        }
        _saveLocal();
    }

    function setTaskStatus(id, status) {
        const indexProject = _getIndex(user.projects, _getProjectId(id));
        const indexTask = _getIndex(user.projects[indexProject].tasks, _getTaskId(id));
        user.projects[indexProject].tasks[indexTask].status = status;
        _saveLocal();
    }

    class _User {
        constructor(name) {
            this.name = name;
        }
        icon = {
            src: null,
            alt: null,
        };
        projects = [];
    }
    
    class _Project {
        constructor(title, list) {
            this.title = title;
            this.id = _generateId(list);
        }
        tasks = [];
    
        // Optional
        notes;
        checklist;
    }
    
    class _Task {
        constructor(description, dueDate, priority, list, projectId) {
            this.description = description;
            this.dueDate = dueDate;
            this.priority = priority;
            this.id = _generateId(list);
            this.projectId = projectId;
        }
        status = false;
    }
    
    function _generateId(list) {
        if (list.length === 0) return 1;
        let idList = [];
        for (const item of list) idList.push(item.id);
        return Math.max(...idList) + 1;
    }

    function _getIndex(arr, id) {
        return arr.findIndex(el => el.id === id);
    }

    function _getProjectId(id) {
        return parseInt(id.split("-")[1]);
    }

    function _getTaskId(id) {
        return parseInt(id.split("-")[2]);
    }

    return { init, refresh, addTask, addProject, deleteItem, setTaskStatus };
})()

export { user }
