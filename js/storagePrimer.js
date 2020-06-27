function storageGet(key) {
    return JSON.parse(localStorage.getItem(key));
}
function storageSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

window.addEventListener("load", () => {
    var version = "2.1";
    if (storageGet("version") === version) return;
    localStorage.clear();
    storageSet("version", version);


     //  userbase
    storageSet("users", []);

    //  commentbase
    var comments = {
        "KARMA": [], "HATHA": [], "GJANA": [],
        "KLASIKP": [], "STOT": [], "REFORMER": [],
        "KLASIKC": [], "HIIT": [], "KRUZNI": [],
        "TRCANJE": [], "BICIKL": [], "STEPENICE": []
    }
    storageSet("comments", comments);

    //  termini
    var termini = {
        "KARMA": [[{"vreme": "8:00", "mesta": 20}, {"vreme": "15:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20}],[],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "16:00", "mesta": 20}],[{"vreme": "18:00", "mesta": 20}]],
        "HATHA": [[],[{"vreme": "8:00", "mesta": 20}, {"vreme": "15:00", "mesta": 20}],[{"vreme": "10:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "16:00", "mesta": 20}],[],[{"vreme": "12:00", "mesta": 20}]],
        "GJANA": [[{"vreme": "8:00", "mesta": 20}],[{"vreme": "15:00", "mesta": 20}],[{"vreme": "10:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "14:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20}]],
        "KLASIKP": [[{"vreme": "8:00", "mesta": 20}, {"vreme": "15:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20}],[],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "16:00", "mesta": 20}],[{"vreme": "18:00", "mesta": 20}]], 
        "STOT": [[],[{"vreme": "8:00", "mesta": 20}, {"vreme": "15:00", "mesta": 20}],[{"vreme": "10:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "16:00", "mesta": 20}],[],[{"vreme": "12:00", "mesta": 20}]],
        "REFORMER": [[{"vreme": "8:00", "mesta": 20}],[{"vreme": "15:00", "mesta": 20}],[{"vreme": "10:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "14:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20}]],
        "KLASIKC": [[{"vreme": "8:00", "mesta": 20}, {"vreme": "15:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20}],[],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "16:00", "mesta": 20}],[{"vreme": "18:00", "mesta": 20}]],
        "HIIT": [[],[{"vreme": "8:00", "mesta": 20}, {"vreme": "15:00", "mesta": 20}],[{"vreme": "10:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "16:00", "mesta": 20}],[],[{"vreme": "12:00", "mesta": 20}]],
        "KRUZNI": [[{"vreme": "8:00", "mesta": 20}],[{"vreme": "15:00", "mesta": 20}],[{"vreme": "10:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "14:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20}]],
        "TRCANJE": [[{"vreme": "8:00", "mesta": 20}, {"vreme": "15:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20}],[],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "16:00", "mesta": 20}],[{"vreme": "18:00", "mesta": 20}]],
        "BICIKL": [[],[{"vreme": "8:00", "mesta": 20}, {"vreme": "15:00", "mesta": 20}],[{"vreme": "10:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "16:00", "mesta": 20}],[],[{"vreme": "12:00", "mesta": 20}]],
        "STEPENICE": [[{"vreme": "8:00", "mesta": 20}],[{"vreme": "15:00", "mesta": 20}],[{"vreme": "10:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20},{"vreme": "14:00", "mesta": 20}],[],[{"vreme": "10:00", "mesta": 20}]]
    }
    storageSet("termini", termini);


})