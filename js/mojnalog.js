window.addEventListener("load", () => {
    prikaziMojeTermine();
    prikaziMojeKomentare();
    prikaziMojeOcene();
});


function getRow(table, i) {
    while (table.rows.length < i + 1) table.insertRow();
    return table.rows[i];
}
function getCell(row, i) {
    while (row.cells.length < i + 1) row.insertCell();
    return row.cells[i];
}
function prikaziMojeTermine() {
    var username = storageGet("logged");
    if (username == null) return;

    var users = storageGet("users");
    var mojiTermini = users.find(element => (element.username === username))["termini"];
    var termini = storageGet("termini");

    var sorted = [[],[],[],[],[],[],[]];

    mojiTermini.forEach(element => sorted[element.dan].push(element));
    sorted.forEach(element => element.sort((a, b) => {
        var A = termini[a.trening][a.dan][a.termin]["vreme"].split(':');
        var B = termini[b.trening][b.dan][b.termin]["vreme"].split(':');
        var vremeA = A[0] + A[1]/60;
        var vremeB = B[0] + B[1]/60;
        return vremeA - vremeB;
    }));
    
    
    var table = document.getElementById("termini");
    
    var english = isEnglish();
    table.innerHTML = "";
    var dani = ["Ponedeljak", "Utorak", "Sreda", "Cetvrtak", "Petak", "Subota", "Nedelja"];
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    if (english) dani = days;
    table.insertRow();
    for (let i = 0; i < 7; i++) {
        table.rows[0].insertCell();
        table.rows[0].cells[i].style = "width: 14%";
        table.rows[0].cells[i].innerHTML = "<h4>" + dani[i] + "</h4>";
    }
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < sorted[i].length; j++) {
            let cardContainer = getCell(getRow(table, j+1), i);//table.rows[j + 1].insertCell();
            var idkman = termini[sorted[i][j].trening][sorted[i][j].dan][sorted[i][j].termin];
            cardContainer.innerHTML = "<div class='card-header'>"+idkman["vreme"]+"</div><div class='card-header'>"+sorted[i][j].trening+"</div>";
            if (storageGet("logged") == null) continue;
            let button = document.createElement("button");
            button.classList.add("btn", "btn-secondary");
            button.style = 'width:100%; border: 0';
            button.innerText = english ? "cancel" : "otkazi";
            button.addEventListener("click", ()=>{
                otkaziRezervaciju(sorted[i][j]["trening"], sorted[i][j]["dan"], sorted[i][j]["termin"]);
                prikaziMojeTermine();
            });
            cardContainer.appendChild(button);
        }
    }
}
function prikaziMojeKomentare() {
    var username = storageGet("logged");
    if (username == null) return;
    var komentari = Object.entries(storageGet("comments"))
    var mojiKomentari = [];

    komentari.forEach(element => {
        var moji = element[1].filter(kk => kk.author == username);
        moji.forEach(idk => mojiKomentari.push([element[0], idk.text]))
        
    })
    
    var commentDiv = document.getElementById("komentari");
    mojiKomentari.forEach(element => {
        var comment = document.createElement("div");
        var text = document.createElement("h4");
        text.style = "word-wrap: break-word;";
        var trening = document.createElement("p");
        trening.innerText = (isEnglish() ? "on: " : "na: ") + element[0];
        text.innerText = element[1];
        comment.appendChild(text);
        comment.appendChild(trening);
        commentDiv.appendChild(comment);
    })
}
function prikaziMojeOcene() {
    var username = storageGet("logged");
    if (username == null) return;
    var users = storageGet("users");
    var ocene = users.find(element => (element.username === username))["ratings"];
    var oceneDiv = document.getElementById("ocene");
    Object.entries(ocene).forEach(element => {
        if (element[1] == null) return;
        var ocena = document.createElement("div");
        var trening = document.createElement("p");
        trening.innerText = element[0];
        var rating = document.createElement("h4");
        rating.innerHTML = "";
        var i = 0;
        for (; i < element[1]; i++) rating.innerHTML += '★';
        for (; i < 5; i++) rating.innerHTML += '☆';
        ocena.appendChild(trening);
        ocena.appendChild(rating);
        
        oceneDiv.appendChild(ocena);
        oceneDiv.appendChild(document.createElement("hr"));
    })
}