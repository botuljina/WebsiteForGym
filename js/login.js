var users = null;
window.addEventListener("load", initLoginElements);

function initLoginElements() {
    if (storageGet("logged") == null) {
        document.getElementById("logoutButton").hidden = true;
        document.getElementById("MojNalogDugme").hidden = true;
    }
    else {
        document.getElementById("loginButton").hidden = true;
        document.getElementById("usernameField").hidden = true;
        document.getElementById("passwdField").hidden = true;
        document.getElementById("registerButtonRedirect").hidden = true;
    }
    
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
        if (isEnglish()) alert("Username is taken");
        else alert("Korisnicko ime je zauzeto");
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
        if (isEnglish()) alert("Username/password combination is incorrect");
        else alert("Pogresno korisnicko ime i/ili lozinka");
        return;
    }
    storageSet("logged", username);
    location.reload();
}

function logout() {
    storageSet("logged", null);
    if (location.pathname.includes("MojNalog")) {
        console.log("kurac");
        window.open("index.html","_self");
        console.log("picka");
    }
    else location.reload();
}