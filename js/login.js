var users = null;
window.addEventListener("load", initLoginElements);

function initLoginElements() {
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
   
    var users = storageGet("users");
    if (users.find(element => element.username === username) !== undefined) {
        alert("Username is taken");
        return;
    }
    users.push({ username, password, "termini": [], "ratings": {
        "KARMA": null, "HATHA": null, "GJANA": null,
        "KLASIKP": null, "STOT": null, "REFORMER": null,
        "KLASIKC": null, "HIIT": null, "KRUZNI": null,
        "TRCANJE": null, "BICIKL": null, "STEPENICE": null
    }});
    storageSet("users", users);
    if(document.getElementById('registerbtn').innerText =="REGISTRUJ SE!")
    {
        window.location.replace("index.html");
    }else{
        window.location.replace("english_index.html");
    }
}

function login(username, password) {
    var users = storageGet("users");
    if (users.find(element => (element.username === username && element.password === password)) === undefined) {
        alert("Username/password combination is incorrect");
        return;
    }
    storageSet("logged", username);
    location.reload();
}

function logout() {
    storageSet("logged", null);
    location.reload();
}