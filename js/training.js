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
            "KLASIKP": [], "STOT": [], "REFORMER": [],
            "KLASIKC": [], "HIIT": [], "KRUZNI": [],
            "TRCANJE": [], "BICIKL": [], "STEPENICE": []
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
    var author = storageGet("logged");
    if (author == null) return;

    comments[type].push({author, text});
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments(type);
}

function renderComments(type) {
    var container = document.querySelector("#" + type + "Container * [data-type=komentari]");
    container.innerHTML = "";
    if (container == null) return;

    comments[type].forEach(element => {
        var comment = document.createElement("div");
        var text = document.createElement("h4");
        text.style = "word-wrap: break-word;";
        var author = document.createElement("p");
        author.innerText = "comment by: " + element.author;
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