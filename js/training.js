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
    }
};
var comments = null;
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
    //  init comments
    comments = JSON.parse(localStorage.getItem("comments"));
    if (comments == null) {
        comments = {
            "KARMA": [], "HATHA": [], "GJANA": [],
            "KLASIKPILATES": [], "STOT": [], "REFORMER": [],
            "KLASIKCORE": [], "HIIT": [], "KRUZNI": [],
            "TRCANJE": [], "TRAKA": [], "STEPENICE": []
        }
        localStorage.setItem("comments", JSON.stringify(comments));
    }
    //  render comments
    var commentSections = document.querySelectorAll("[data-type=komentari]");
    commentSections.forEach(function (element) {
        let training = element.getAttribute("data-training");
        renderComments(training);
    })
}

function addComment(type, text) {
    var author = localStorage.getItem("logged");
    if (author == null) return;

    comments[type].push({author, text});
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments(type);
}

function renderComments(type) {
    var container = document.querySelector("#" + type + "Container * [data-type=komentari]");
    if (container == null) return;

    comments[type].forEach(element => {
        var comment = document.createElement("div");
        var author = document.createElement("h4");
        author.innerText = element.author;
        var text = document.createElement("p");
        text.innerText = element.text;
        comment.appendChild(author);
        comment.appendChild(text);
        container.appendChild(comment);
    })
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