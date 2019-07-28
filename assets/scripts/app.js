// fighter object
function Fighter(name, minPower, maxPower, special, type, health, image) {
    this.name = name;
    this.minPower = minPower;
    this.maxPower = maxPower;
    this.special = special;
    this.type = type;
    this.health = health;
    this.image = image;
    this.attack = function () {
        return Math.floor(Math.random() * (this.maxPower - this.minPower + 1)) + this.minPower;
    };
    this.defense = function () {
        return Math.floor(Math.random() * (this.maxPower - this.minPower + 1)) + this.minPower;
    };
    this.saber = function (color) {
        this.color = color;
        let green = "#00c851";
        let red = "#ff4444";
        if (type === "Jedi") {
            return color = green;
        } else {
            return color = red;
        }
    };
}
// setting up game
const Gameboard = {
    currentFighters: [],
    availableFighters: [
        Yoda = new Fighter("Yoda", 90, 99, 100, "Jedi", 100, "http://pluspng.com/img-png/star-wars-yoda-png--421.jpg"),
        Quigon = new Fighter("Qui Gon", 90, 99, 100, "Jedi", 100, "https://vignette.wikia.nocookie.net/the-beaver-run-wars/images/a/ad/Qui-Gon_Jinn.png/revision/latest?cb=20160216022027"),
        Vader = new Fighter("Vader", 90, 99, 100, "Sith", 100, "https://i1.wp.com/freepngimages.com/wp-content/uploads/2015/11/darth-vader-transparent-image.png?fit=608%2C514"),
        Sidious = new Fighter("Sidious", 90, 99, 100, "Sith", 100, "https://vignette.wikia.nocookie.net/vsbattles/images/6/64/Darth_Sidious_Render.png/revision/latest?cb=20170810182252")
    ],
    choosePlayer: document.addEventListener("click", function (e) {
        for (let i = 0; i < Gameboard.availableFighters.length; i++) {
            if (e.target.innerText === Gameboard.availableFighters[i].name) {
                Gameboard.currentFighters.push(Gameboard.availableFighters[i]);
            }
        }
        Gameboard.gameInit();
    }),
    listFighters: function () {
        this.availableFighters.forEach((fighter) => {
            var fighterNameButton = $(`<button class="btn mx-1 fighter-button">`);
            fighterNameButton.text(`${fighter.name}`);
            $("#fighters-to-choose").append(fighterNameButton);
        });
    },
    gameInit: function () {
        if (Gameboard.currentFighters.length === 2) {
            $("#fighters-to-choose").slideUp(1000);
            let player1 = $("#player-1image");
            let player2 = $("#player-2image");
            player1.html(`<img class="fighter-img" src="${this.currentFighters[0].image}"/>`)
            player2.html(`<img class="fighter-img" src="${this.currentFighters[1].image}"/>`)
        }
    }
}
Gameboard.listFighters();

