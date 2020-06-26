var users = null;
window.addEventListener("load", initLoginData);

function initLoginData() {
    users = JSON.parse(localStorage.getItem("users"));
    if (users != null) return;
    users = [];
    localStorage.setItem("users", JSON.stringify(users));
}

function register(username, password) {
    var users = JSON.parse(localStorage.getItem("users"));
    if (users.find(element => element.username === username) !== undefined) return; //alert username taken
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
}

function login(username, password) {
    var users = JSON.parse(localStorage.getItem("users"));
    if (users.find(element => (element.username === username && element.password === password)) === undefined) return;  //alert wrong username/passwd
    localStorage.setItem("logged", username);
}

function logout() {
    localStorage.setItem("logged", null);
}