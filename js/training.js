const trainingData = {
    "HATHAContainer" : {
        "tezina" : 75,
        "duzina" : 45,
        "ime" : "Hatha"
    },
    "GJANAContainer" : {
        "tezina" : 50,
        "duzina" : 60,
        "ime" : "Gjana"
    },
    "KARMAContainer" : {
        "tezina" : 85,
        "duzina" : 30,
        "ime" : "Karma"
    },
    "KLASIKPContainer" : {
        "tezina" : 40,
        "duzina" : 40,
        "ime" : "Klasik"
    },
    "STOTContainer" : {
        "tezina" : 50,
        "duzina" : 60,
        "ime" : "Stot"
    },
    "REFORMERContainer" : {
        "tezina" : 85,
        "duzina" : 35,
        "ime" : "Reformer"
    },
    "KLASIKCContainer" : {
        "tezina" : 50,
        "duzina" : 60,
        "ime" : "Klasik"
    },
    "HIITContainer" : {
        "tezina" : 80,
        "duzina" : 30,
        "ime" : "Hiit"
    },
    "KRUZNIContainer" : {
        "tezina" : 70,
        "duzina" : 90,
        "ime" : "Kruzni"
    },
    "TRCANJEContainer" : {
        "tezina" : 25,
        "duzina" : 20,
        "ime" : "Trcanje"
    },
    "BICIKLContainer" : {
        "tezina" : 80,
        "duzina" : 60,
        "ime" : "Bicikl"
    },
    "STEPENICEContainer" : {
        "tezina" : 70,
        "duzina" : 45,
        "ime" : "Stepenice"
    },
};


window.addEventListener("load", initTrainingData);
function initTrainingData() {
    //  enable sorting
    document.getElementById("sortABC").addEventListener("click", function () {
        var order = this.getAttribute("data-order");
        sortTrainingCards("ime", order);
        this.setAttribute("data-order", order * -1);
    })
    document.getElementById("sortTezina").addEventListener("click", function () {
        var order = this.getAttribute("data-order");
        sortTrainingCards("tezina", this.getAttribute("data-order"));
        this.setAttribute("data-order", order * -1);
    })
    document.getElementById("sortDuzina").addEventListener("click", function () {
        var order = this.getAttribute("data-order");
        sortTrainingCards("duzina", this.getAttribute("data-order"));
        this.setAttribute("data-order", order * -1);
    })
    //  render comments
    var commentSections = document.querySelectorAll("[data-type=komentari]");
    commentSections.forEach(function (element) {
        let training = element.getAttribute("data-training");
        renderComments(training);
    })

    //  prikazi nedeljni pregled svih tipova treninga
    var nedeljniPregledi = document.querySelectorAll("[data-type=termini]");
    commentSections.forEach(function (element) {
        let training = element.getAttribute("data-training");
        prikaziTermine(training);
    })
    
    //  draw user ratings
    document.querySelectorAll(".rating").forEach(element => {
        drawStars(element.getAttribute("data-training"));
    })

    //  star clearing and drawing on mouseover
    document.querySelectorAll(".rating").forEach(element => {
        element.addEventListener("mouseout", () => drawStars(element.getAttribute("data-training")));
        element.addEventListener("mouseover", () => clearStars(element.getAttribute("data-training")));
    })

    //  setRating bind
    document.querySelectorAll("[data-type=star]").forEach(element => {
        element.addEventListener("click", function () {
            var type = this.parentElement.getAttribute("data-training");
            var rating = this.getAttribute("data-starindex");
            setRating(type, rating);
        });
    })

    //  draw global rating
    document.querySelectorAll("[data-type=rating]").forEach(element => {
        var type = element.getAttribute("data-training");
        drawRating(type);
    })
    if (storageGet("logged") != null) {
        document.querySelectorAll("[data-type=loginAlert]").forEach(element => element.hidden = true);
    }
}
function sortTrainingCards(criteria, order = 1) {
    //  sort function
    var trainingCards = document.getElementById("TRAININGContainer");
    var sorted = [].slice.call(trainingCards.children);
    sorted.sort((a, b) => {
        if (trainingData[a.id][criteria] > trainingData[b.id][criteria]) return order * 1;
        if (trainingData[a.id][criteria] < trainingData[b.id][criteria]) return order * -1;
        return 0;
    })

    sorted.forEach(element => element.remove());
    sorted.forEach(element => trainingCards.appendChild(element));
}


function addComment(type, text) {
    var author = storageGet("logged");
    if (author == null) return;
    if (attending(author, type) == false) {
        alert("Morate pohadjati trening kako biste ostavili komentar");
        return;
    }

    var comments = storageGet("comments");
    comments[type].push({author, text});
    storageSet("comments", comments);
    renderComments(type);
}
function renderComments(type) {
    var container = document.querySelector("#" + type + "Container * [data-type=komentari]");
    container.innerHTML = "";
    if (container == null) return;

    var comments = storageGet("comments");
    comments[type].forEach(element => {
        var comment = document.createElement("div");
        var text = document.createElement("h4");
        text.style = "word-wrap: break-word;";
        var author = document.createElement("p");
        author.innerText = "by: " + element.author;
        text.innerText = element.text;
        comment.appendChild(text);
        comment.appendChild(author);
        container.appendChild(comment);
    })
    if (comments[type].length == 0) {
        var message = document.createElement("h4");
        message.innerText = "Nema komentara za ovaj trening";
        container.appendChild(message);
    }
    if (storageGet("logged") == null) return;
    var createComment = document.createElement("div");
    createComment.innerHTML = "<textarea id='commentTextArea" + type + "' rows='3' cols='60'></textarea><br>";
    var post = document.createElement("button");
    post.classList.add("btn", "btn-secondary");
    post.innerText = "post";
    createComment.appendChild(post);
    post.addEventListener("click", ()=> {
        var text = document.getElementById('commentTextArea' + type).value;
        if (text == null) return;
        addComment(type, text);
    });
    container.appendChild(createComment);
}


function rezervisiTermin(tip, i, j) {
    var user = storageGet("logged");
    if (user == null) return;
    var termini = storageGet("termini");
    var termin = termini[tip][i][j];
    if (termin["mesta"] == 0) {
        alert("Termin je popunjen")
        return;
    }
    var users = storageGet("users");
    var terminiKorisnika = users.find(element => (element.username === user))["termini"];
    terminiKorisnika.push({"trening": tip, "dan": i, "termin": j});
    storageSet("users", users);

    termin["mesta"]--;
    storageSet("termini", termini);
    
    prikaziTermine(tip);
}
function otkaziRezervaciju(tip, i, j) {
    if (storageGet("logged") == null) return;

    var termini = storageGet("termini");
    var termin = termini[tip][i][j];

    var users = storageGet("users");
    var terminiKorisnika = users.find(element => (element.username === storageGet("logged")))["termini"];
    
    var si = 0;
    for (; si < terminiKorisnika.length; si++)
        if (terminiKorisnika[si].trening == tip && terminiKorisnika[si].dan == i && terminiKorisnika[si].termin == j)
            break;

    terminiKorisnika.splice(si, 1);

    storageSet("users", users);

    termin["mesta"]++;
    storageSet("termini", termini);
    
    prikaziTermine(tip);
}
function getRow(table, i) {
    while (table.rows.length < i + 1) table.insertRow();
    return table.rows[i];
}
function getCell(row, i) {
    while (row.cells.length < i + 1) row.insertCell();
    return row.cells[i];
}
function prikaziTermine(type) {
    var table = document.querySelector("#" + type + "Container * [data-type=termini]");
    table.innerHTML = "";
    const dani = ["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota", "Nedelja"];
    table.insertRow();
    for (let i = 0; i < 7; i++) {
        table.rows[0].insertCell();
        table.rows[0].cells[i].style = "width: 14%";
        table.rows[0].cells[i].innerHTML = "<h4>" + dani[i] + "</h4>";
    }
    for (let i = 0; i < 5; i++) table.insertRow();
    var termini = storageGet("termini");
    console.log(termini);
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < termini[type][i].length; j++) {
            let cardContainer = getCell(getRow(table, j+1), i);//table.rows[j + 1].insertCell();
            cardContainer.innerHTML = "<div class='card-header'>"+termini[type][i][j]["vreme"]+"</div><div class='card-header'>mesta: "+termini[type][i][j]["mesta"]+"</div>";
            if (storageGet("logged") == null) continue;
            let button = document.createElement("button");
            button.classList.add("btn", "btn-secondary");
            button.style = 'width:100%; border: 0';
            var users = storageGet("users");
            var terminiKorisnika = users.find(element => (element.username === storageGet("logged")))["termini"];
            if (terminiKorisnika.find(element => (element.trening == type && element.dan == i && element.termin == j))) {
                button.innerText = "otkazi";
                button.addEventListener("click", ()=>{
                    otkaziRezervaciju(type, i, j);
                });
            }
            else {
                button.innerText = "rezervisi";
                button.addEventListener("click", ()=>{
                    rezervisiTermin(type, i, j);
                });
            }
            cardContainer.appendChild(button);
        }
    }
}


function drawStars(type) {
    var user = storageGet("logged");
    if (user == null) return;
    var starContainer = document.querySelector(".rating[data-training="+type+"]");
    var users = storageGet("users");
    var rating = users.find(element => element.username = user)["ratings"][type];
    if (rating == null) return;
    
    for (let i = 0; i < rating; i++) starContainer.children[4 - i].innerHTML = "★";
}
function clearStars(type) {
    var starContainer = document.querySelector(".rating[data-training="+type+"]");
    for (let i = 0; i < 5; i++) starContainer.children[4 - i].innerHTML = "☆";
}
function setRating(type, rating) {
    var user = storageGet("logged");
    if (user == null) return;
    if (attending(user, type) == false) {
        alert("Morate pohadjati trening kako biste ostavili ocenu");
        return;
    }
    var users = storageGet("users");

    var old = users.find(element => element.username = user)["ratings"][type];
    var first = false;
    if (old == null) {
        old = 0;
        first = true;
    }
    var delta = rating - old;

    users.find(element => element.username = user)["ratings"][type] = rating;

    var ratings = storageGet("ratings");
    ratings[type]["rating"] = (ratings[type]["rating"] * ratings[type]["count"] + delta) / (ratings[type]["count"] + first);
    if (first) ratings[type]["count"]++;
    storageSet("users", users);
    storageSet("ratings", ratings);
    clearStars(type);
    drawStars(type);
    drawRating(type);
}

function drawRating(type) {
    document.querySelector("[data-type=rating][data-training="+type+"]").innerHTML = storageGet("ratings")[type]["rating"];
}

function attending(username, training) {
    var users = storageGet("users");
    var user = users.find(element => element.username == username);
    if (user["termini"].find(termin => termin.trening == training) == null) return false;
    return true;
}