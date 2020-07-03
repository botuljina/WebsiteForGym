function storageGet(key) {
    return JSON.parse(localStorage.getItem(key));
}
function storageSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

window.addEventListener("load", () => {
    var version = "4.0";
    if (storageGet("version") === version) return;
    localStorage.clear();
    storageSet("version", version);


     //  userbase
    storageSet("users", []);

    //  ratings
    var ratings = {
        "KARMA": {"rating": 3, "count": 1}, "HATHA": {"rating": 3, "count": 1}, "GJANA": {"rating": 3, "count": 1},
        "KLASIKP": {"rating": 3, "count": 1}, "STOT": {"rating": 3, "count": 1}, "REFORMER": {"rating": 3, "count": 1},
        "KLASIKC": {"rating": 3, "count": 1}, "HIIT": {"rating": 3, "count": 1}, "KRUZNI": {"rating": 3, "count": 1},
        "TRCANJE": {"rating": 3, "count": 1}, "BICIKL": {"rating": 3, "count": 1}, "STEPENICE": {"rating": 3, "count": 1}
    }
    storageSet("ratings", ratings);

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