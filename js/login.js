var users = null;
window.addEventListener("load", initLoginData);

function storageGet(key) {
    return JSON.parse(localStorage.getItem(key));
}
function storageSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function initLoginData() {
    if (storageGet("version 1.1") == null) {
        localStorage.clear();
        storageSet("version 1.1", true);
    }
    users = JSON.parse(localStorage.getItem("users"));
    if (users == null) {
        users = [];
        localStorage.setItem("users", JSON.stringify(users));
    }
    if (storageGet("logged") == null)
        document.getElementById("logoutButton").hidden = true;
    else {
        document.getElementById("loginButton").hidden = true;
        document.getElementById("usernameField").hidden = true;
        document.getElementById("passwdField").hidden = true;
        document.getElementById("registerButton").hidden = true;
    }
        
    document.getElementById("registerButton").addEventListener("click", ()=>{
        var username = document.getElementById("usernameField").value;
        var passwd = document.getElementById("passwdField").value;
        register(username, passwd);
    })
    document.getElementById("logoutButton").addEventListener("click", logout);
    document.getElementById("loginButton").addEventListener("click", ()=>{
        var username = document.getElementById("usernameField").value;
        var passwd = document.getElementById("passwdField").value;
        login(username, passwd);
    });
}
function register(username, password) {
    var users = JSON.parse(localStorage.getItem("users"));
    if (users.find(element => element.username === username) !== undefined) {
        alert("Username is taken");
        return;
    }
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
}

function login(username, password) {
    var users = JSON.parse(localStorage.getItem("users"));
    if (users.find(element => (element.username === username && element.password === password)) === undefined) {
        alert("Username/password combination is incorrect");
        return;
    }
    storageSet("logged", username);
    //localStorage.setItem("logged", username);
    location.reload();
    /*
    document.getElementById("logoutButton").hidden = false;
    document.getElementById("loginButton").hidden = true;
    document.getElementById("registerButton").hidden = true;
    document.getElementById("usernameField").hidden = true;
    document.getElementById("passwdField").hidden = true;
    */
}

function logout() {
    localStorage.setItem("logged", null);
    location.reload();
    /*
    document.getElementById("logoutButton").hidden = true;
    document.getElementById("loginButton").hidden = false;
    document.getElementById("registerButton").hidden = false;
    document.getElementById("usernameField").hidden = false;
    document.getElementById("passwdField").hidden = false;
    */
}